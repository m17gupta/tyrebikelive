import { NextRequest, NextResponse } from "next/server";
import configPromise from "@payload-config";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { collection, docId, field, value } = await req.json();

    // Validate required fields
    if (!collection || !docId || !field || value === undefined) {
      return NextResponse.json(
        { 
          success: false,
          error: "Missing required fields" 
        }, 
        { status: 400 }
      );
    }

    const valuePreview =
      typeof value === "string"
        ? value.length > 50
          ? value.substring(0, 50) + "..."
          : value
        : JSON.stringify(value).substring(0, 50) + "...";

    console.log("📝 Update request:", { collection, docId, field, valuePreview });

    // Get Payload instance
    const payload = await getPayload({ config: configPromise });

    // Fetch the current document with all data
    // Using depth: 0 to get relationship IDs instead of populated objects
    const currentDoc = await payload.findByID({
      collection,
      id: docId,
      depth: 0,
      overrideAccess: true,
    });

    if (!currentDoc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    console.log("📊 Current document fetched");
    console.log("🔍 Original website value:", currentDoc.website);
    console.log("🔍 Website type:", typeof currentDoc.website);

    // Deep clone to avoid mutations
    const pageData = JSON.parse(JSON.stringify(currentDoc));

    // Navigate to the nested field and update it
    const fieldParts = field.split(".");
    let target: any = pageData;

    // Navigate to the parent of the field we want to update
    for (let i = 0; i < fieldParts.length - 1; i++) {
      const part = fieldParts[i];

      // Handle array indices in both formats: layout[0] or layout.0
      const arrayMatch = part.match(/^(.+)\[(\d+)\]$/);
      if (arrayMatch) {
        const [, arrayName, indexStr] = arrayMatch;
        const index = parseInt(String(indexStr));

        if (!target[arrayName]) {
          target[arrayName] = [];
        }
        if (!target[arrayName][index]) {
          target[arrayName][index] = {};
        }
        target = target[arrayName][index];
      } else if (!isNaN(Number(part)) && Array.isArray(target)) {
        // Handle numeric index when target is already an array
        const index = parseInt(String(part));
        if (!target[index]) {
          target[index] = {};
        }
        target = target[index];
      } else {
        if (!target[part]) {
          target[part] = {};
        }
        target = target[part];
      }
    }

    // Update the final field
    const finalField = fieldParts[fieldParts.length - 1];
    console.log(`🎯 Updating field: ${field} = "${value}"`);
    target[finalField] = value;

    // Clean up the data before sending to Payload
    // Remove ONLY top-level metadata fields (keep nested block IDs!)
    delete pageData.id;
    delete pageData.createdAt;
    delete pageData.updatedAt;
    delete pageData.publishedAt;

    // With depth: 0, relationships should already be IDs, but double-check
    console.log("🔍 Website type before cleaning:", typeof pageData.website, pageData.website);
    console.log("🔍 CreatedBy type before cleaning:", typeof pageData.createdBy, pageData.createdBy);

    // Ensure website is a string ID
    if (!pageData.website) {
      console.error("❌ Website field is missing!");
      console.error("📋 Current document:", JSON.stringify(currentDoc, null, 2));

      // Try to get website from the current document
      if (currentDoc.website) {
        console.log("🔄 Restoring website from current document");
        pageData.website = currentDoc.website;
      } else {
        throw new Error("Website field is required but missing from the document");
      }
    }

    if (typeof pageData.website === "object" && pageData.website !== null) {
      console.log("🔄 Converting website object to ID:", pageData.website);
      pageData.website = ((pageData.website as Record<string, unknown>).id as string) || pageData.website;
    }

    console.log("✅ Final website value:", pageData.website, "Type:", typeof pageData.website);

    // Ensure createdBy is a string ID
    if (typeof pageData.createdBy === "object" && pageData.createdBy !== null) {
      pageData.createdBy =
        ((pageData.createdBy as Record<string, unknown>).id as string) || pageData.createdBy;
    }

    console.log("💾 Saving entire page data to Payload...");
    console.log("📦 Website ID:", pageData.website);
    console.log("📦 Created By:", pageData.createdBy);
    console.log("📦 Layout blocks:", pageData.layout?.length || 0);
    console.log("📦 Status:", pageData._status);
    console.log("📦 Slug:", pageData.slug);

    // Log the full data structure for debugging
    console.log("📋 Full page data being sent:");
    console.log(
      JSON.stringify(
        {
          slug: pageData.slug,
          title: pageData.title,
          _status: pageData._status,
          website: pageData.website,
          createdBy: pageData.createdBy,
          slugLock: pageData.slugLock,
          hero: pageData.hero ? "{ ... }" : undefined,
          layout: pageData.layout ? `[${pageData.layout.length} blocks]` : undefined,
        },
        null,
        2,
      ),
    );

    // Update the document with the entire page data
    // Using Local API as recommended for Next.js server-side operations
    const updatedDoc = await payload.update({
      collection,
      id: docId,
      data: pageData,
      depth: 0, // Return IDs instead of populated objects
      overrideAccess: true,
      showHiddenFields: false,
    });

    console.log("✅ Update successful!");

    return NextResponse.json({
      success: true,
      message: "Content updated successfully",
      data: updatedDoc,
    });
  } catch (error) {
    console.error("❌ Update content error:", error);

    // Log more details about the error
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // If it's a Payload validation error, log the details
    if (error && typeof error === "object" && "data" in error) {
      console.error(
        "Payload validation error data:",
        JSON.stringify((error as Record<string, unknown>).data, null, 2),
      );
    }

    // Check if it's a validation error with field details
    if (error && typeof error === "object" && "status" in error) {
      const errorObj = error as Record<string, unknown>;
      if (errorObj.status === 400) {
        console.error("🔴 Validation Error Details:", JSON.stringify(error, null, 2));
      }
    }

    return NextResponse.json(
      {
        error: "Failed to update content",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

