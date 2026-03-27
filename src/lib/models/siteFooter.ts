import { ObjectId } from "mongodb";
import { getTenantDb } from "@/lib/db";

export interface SiteFooterDocument {
  _id?: ObjectId;
  siteId: string;
  templateType: "footer";
  name: string;
  html: string;
  css: string;
  isActive: boolean;
  updatedAt: Date;
}

/**
 * Retrieves the current active global footer for a site.
 */
export async function getActiveSiteFooter(tenantKey: string): Promise<SiteFooterDocument | null> {
  try {
    const db = await getTenantDb(tenantKey);
    const footer = await db
      .collection<SiteFooterDocument>("templates")
      .findOne({ siteId: tenantKey, templateType: "footer", isActive: true });
    return footer ? JSON.parse(JSON.stringify(footer)) : null;
  } catch (error) {
    console.error(`[getActiveSiteFooter] Error for tenant ${tenantKey}:`, error);
    return null;
  }
}

/**
 * Retrieves all saved footers for a site.
 */
export async function getAllSiteFooters(tenantKey: string): Promise<SiteFooterDocument[]> {
  try {
    const db = await getTenantDb(tenantKey);
    const footers = await db
      .collection<SiteFooterDocument>("templates")
      .find({ siteId: tenantKey, templateType: "footer" })
      .sort({ updatedAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(footers));
  } catch (error) {
    console.error(`[getAllSiteFooters] Error for tenant ${tenantKey}:`, error);
    return [];
  }
}

/**
 * Retrieves a specific footer by ID.
 */
export async function getSiteFooterById(tenantKey: string, id: string | ObjectId): Promise<SiteFooterDocument | null> {
  if (!id) return null;
  const targetId = typeof id === "string" ? (ObjectId.isValid(id) ? new ObjectId(id) : null) : id;
  if (!targetId) return null;

  try {
    const db = await getTenantDb(tenantKey);
    const footer = await db.collection<SiteFooterDocument>("templates").findOne({
      _id: targetId,
      siteId: tenantKey,
      templateType: "footer",
    });
    return footer ? JSON.parse(JSON.stringify(footer)) : null;
  } catch (error) {
    console.error(`[getSiteFooterById] Error for footer ${id} in tenant ${tenantKey}:`, error);
    return null;
  }
}

/**
 * Saves or updates a site footer.
 */
export async function saveSiteFooter(
  tenantKey: string,
  payload: {
    id?: string | ObjectId;
    name: string;
    html: string;
    css: string;
    isActive?: boolean;
  },
): Promise<boolean> {
  try {
    const db = await getTenantDb(tenantKey);
    const now = new Date();

    // If this footer is being set to active, deactivate all others first
    if (payload.isActive) {
      await db.collection("templates").updateMany({ siteId: tenantKey, templateType: "footer" }, { $set: { isActive: false } });
    }

    const { id, ...data } = payload;
    const filter: any = id
      ? { _id: typeof id === "string" ? new ObjectId(id) : id, siteId: tenantKey, templateType: "footer" }
      : { name: payload.name, siteId: tenantKey, templateType: "footer" };

    const result = await db.collection("templates").updateOne(
      filter,
      {
        $set: {
          ...data,
          siteId: tenantKey,
          templateType: "footer",
          isActive: payload.isActive ?? false,
          updatedAt: now,
        },
      },
      { upsert: true },
    );

    return result.modifiedCount > 0 || result.upsertedCount > 0;
  } catch (error) {
    console.error(`[saveSiteFooter] Error for tenant ${tenantKey}:`, error);
    return false;
  }
}

/**
 * Activates a specific site footer.
 */
export async function activateSiteFooter(tenantKey: string, id: string | ObjectId): Promise<boolean> {
  if (!id) return false;
  const targetId = typeof id === "string" ? (ObjectId.isValid(id) ? new ObjectId(id) : null) : id;
  if (!targetId) return false;

  try {
    const db = await getTenantDb(tenantKey);

    // Deactivate all others
    await db.collection("templates").updateMany({ siteId: tenantKey, templateType: "footer" }, { $set: { isActive: false } });

    // Activate specific one
    const result = await db.collection("templates").updateOne(
      { _id: targetId, siteId: tenantKey, templateType: "footer" },
      { $set: { isActive: true, updatedAt: new Date() } },
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error(`[activateSiteFooter] Error for footer ${id} in tenant ${tenantKey}:`, error);
    return false;
  }
}

/**
 * Deletes a site footer.
 */
export async function deleteSiteFooter(tenantKey: string, id: string | ObjectId): Promise<boolean> {
  if (!id) return false;
  const targetId = typeof id === "string" ? (ObjectId.isValid(id) ? new ObjectId(id) : null) : id;
  if (!targetId) return false;

  try {
    const db = await getTenantDb(tenantKey);
    const result = await db.collection("templates").deleteOne({
      _id: targetId,
      siteId: tenantKey,
      templateType: "footer",
    });
    return result.deletedCount > 0;
  } catch (error) {
    console.error(`[deleteSiteFooter] Error for footer ${id} in tenant ${tenantKey}:`, error);
    return false;
  }
}
