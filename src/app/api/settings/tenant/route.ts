import { NextRequest, NextResponse } from "next/server";
import { requireTenantAccess } from "@/lib/api-auth";
import { getAgencyById } from "@/lib/models/agency";

export const dynamic = "force-dynamic";

/**
 * GET /api/settings/tenant
 * Returns the current tenant's global settings and branding.
 * Used by the ThemeInjector for authenticated dashboard sessions.
 */
export async function GET(req: NextRequest) {
  try {
    const access = await requireTenantAccess();
    if (!access.ok) return access.response;

    const { session, tenantKey } = access;
    
    // In a real scenario, we would lookup the specific tenant doc in the master DB.
    // For this implementation, we pull branding from the agency associated with the user.
    const agencyId = session.payload.agencyId;
    let brand = {
      name: tenantKey.charAt(0).toUpperCase() + tenantKey.slice(1),
      primary: "#00f0ff",
      secondary: "#8b5cf6",
    };

    if (agencyId) {
      const agency = await getAgencyById(agencyId);
      if (agency?.ecosystem?.whiteLabel) {
        brand = {
          name: agency.ecosystem.whiteLabel.brandName || brand.name,
          primary: "#00f0ff", // Defaulting to cyan/purple for KalpGo look
          secondary: "#8b5cf6",
        };
      }
    }

    return NextResponse.json({
      key: tenantKey,
      name: brand.name,
      brand: brand,
      subscription: session.payload.subscriptionLevel,
    });
  } catch (error) {
    console.error("[SettingsTenantAPI] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
