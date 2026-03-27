import { NextRequest, NextResponse } from "next/server";
import { getAgencyBySlug } from "@/lib/models/agency";

export const dynamic = "force-dynamic";

/**
 * GET /api/public/business/[slug]
 * Public endpoint to fetch branding and essential business context for a tenant.
 * Used by the ThemeInjector and public site headers/footers.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Business slug is required" }, { status: 400 });
    }

    const agency = await getAgencyBySlug(slug);

    if (!agency) {
      console.warn(`[PublicBusinessAPI] Agency not found for slug: ${slug}`);
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Map Agency ecosystem settings to the expected theme/brand structure
    const whiteLabel = agency.ecosystem?.whiteLabel;
    
    // Construct the brand response expected by ThemeInjector
    const responseData = {
      id: agency._id.toString(),
      name: agency.name,
      domain: agency.customDomain || `${slug}.kalpgo.com`,
      brand: {
        name: whiteLabel?.brandName || agency.name,
        logo: whiteLabel?.logoUrl || "",
        favicon: whiteLabel?.faviconUrl || "",
        // If agency has specific colors defined in ecosystem, they would go here.
        // For now, we'll provide the basic structure.
      },
      // ThemeInjector also looks for brandKit or brand
      brandKit: {
        brand: {
          primary: "#00f0ff", // Default brand colors if not in Agency doc yet
          secondary: "#8b5cf6",
        }
      }
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("[PublicBusinessAPI] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
