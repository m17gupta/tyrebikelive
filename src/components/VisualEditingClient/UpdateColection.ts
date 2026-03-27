import { NextRequest, NextResponse } from "next/server";
import configPromise from "@payload-config";

export const updateField = async (request: NextRequest) => {
  try {
    const payload = await getPayload({ config: configPromise });
    const { collection, docId, field, value, blockType, blockId, layoutId } = await request.json();

    if (!collection || !docId || !field || value === undefined) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Validate field is a string
    if (typeof field !== "string") {
      return NextResponse.json({ error: "Field must be a string" }, { status: 400 });
    }

    // Fetch the current document
    const currentDoc = await payload.findByID({
      collection,
      id: docId,
      depth: 0,
      overrideAccess: false,
      //req: request as any,
    });

    console.log("📄 Current document fetched for updateField", currentDoc);

    // Clone the document to avoid mutations
    const updatedData = JSON.parse(JSON.stringify(currentDoc));

    // Navigate to the nested field and update it
    const fieldParts = field.split(".");
    console.log("Field parts:", fieldParts);
    console.log("fielkd value:", value);
    // Handle block-based updates (for layout blocks)
    if (blockType && blockId) {
      // Validate blockType and blockId are strings
      if (typeof blockType !== "string" || typeof blockId !== "string" || typeof layoutId !== "string") {
        return NextResponse.json(
          {
            error: "blockType, blockId, and layoutId must be strings",
          },
          { status: 400 },
        );
      }

      const updated = updateBlockContent(updatedData, blockType, blockId, fieldParts, value, layoutId);
      if (!updated) {
        return NextResponse.json(
          {
            error: "Block not found with the specified blockType and blockId",
          },
          { status: 404 },
        );
      }
    } else {
      // Handle regular field updates
      updateNestedField(updatedData, fieldParts, value);
    }

    // Update the document in the database
    const updatedDoc = await payload.update({
      collection,
      id: docId,
      data: updatedData,
      depth: 0,
      overrideAccess: false,
      // req: request as any,
    });

    console.log("✅ Document updated successfully", updatedDoc);

    return NextResponse.json({
      success: true,
      updatedDoc,
    });
  } catch (error) {
    console.error("Error updating field:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

/**
 * Update content within a specific block identified by blockType and blockId
 * Handles nested blocks (e.g., aboutPage > story/missionVision)
 */
export function updateBlockContent(
  data: any,
  blockType: string,
  blockId: string,
  fieldParts: string[],
  value: any,
  layoutId: string,
): boolean {
  if (!data.layout || !Array.isArray(data.layout)) {
    return false;
  }

  // search layout id first
  const layoutBlock = data.layout.find((lay: any) => lay.id === layoutId);

  if (!layoutBlock) {
    return false;
  }
  console.log("Found layout block:", layoutBlock);
  // Now search for the block within the found layout block
  const block = layoutBlock.blocks.find(
    (block: any) => block.id === blockId && block.blockType === blockType,
  );

  console.log("Found target block:", block);
  if (block) {
    updateNestedField(block, fieldParts, value);
    return true;
  }

  return false;
}

/**
 * Update a nested field in an object using dot notation path
 * Handles key:value pairs in blocks
 */
 export function updateNestedField(obj: any, fieldParts: string[], value: any): void {
  let current = obj;

  // Navigate to the parent object of the field to update
  for (let i = 0; i < fieldParts.length - 1; i++) {
    const part = fieldParts[i];

    // Handle array indices (e.g., "blocks.0.content")
    if (!isNaN(Number(part))) {
      const index = Number(part);
      if (Array.isArray(current)) {
        current = current[index];
      }
    } else {
      // Create nested object if it doesn't exist
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
  }

  // Update the final field
  const lastPart = fieldParts[fieldParts.length - 1];

  // Handle array indices in the last part
  if (!isNaN(Number(lastPart))) {
    const index = Number(lastPart);
    if (Array.isArray(current)) {
      current[index] = value;
    }
  } else {
    // Set the key:value pair
    current[lastPart] = value;
  }

  console.log(`✅ Updated field: ${fieldParts.join(".")} = `, value);
}

