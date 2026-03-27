import { ObjectId } from "mongodb";
import { getTenantDb } from "@/lib/db";

export interface SiteHeaderDocument {
  _id?: ObjectId;
  siteId: string;
  templateType: "header";
  name: string;
  html: string;
  css: string;
  isActive: boolean;
  updatedAt: Date;
}

/**
 * Retrieves the current active global header for a site.
 */
export async function getActiveSiteHeader(tenantKey: string): Promise<SiteHeaderDocument | null> {
  try {
    const db = await getTenantDb(tenantKey);
    const header = await db
      .collection<SiteHeaderDocument>("templates")
      .findOne({ siteId: tenantKey, templateType: "header", isActive: true });
    return header ? JSON.parse(JSON.stringify(header)) : null;
  } catch (error) {
    console.error(`[getActiveSiteHeader] Error for tenant ${tenantKey}:`, error);
    return null;
  }
}

/**
 * Retrieves all saved headers for a site.
 */
export async function getAllSiteHeaders(tenantKey: string): Promise<SiteHeaderDocument[]> {
  try {
    const db = await getTenantDb(tenantKey);
    const headers = await db
      .collection<SiteHeaderDocument>("templates")
      .find({ siteId: tenantKey, templateType: "header" })
      .sort({ updatedAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(headers));
  } catch (error) {
    console.error(`[getAllSiteHeaders] Error for tenant ${tenantKey}:`, error);
    return [];
  }
}

/**
 * Retrieves a specific header by ID.
 */
export async function getSiteHeaderById(tenantKey: string, id: string | ObjectId): Promise<SiteHeaderDocument | null> {
  if (!id) return null;
  const targetId = typeof id === "string" ? (ObjectId.isValid(id) ? new ObjectId(id) : null) : id;
  if (!targetId) return null;

  try {
    const db = await getTenantDb(tenantKey);
    const header = await db.collection<SiteHeaderDocument>("templates").findOne({
      _id: targetId,
      siteId: tenantKey,
      templateType: "header",
    });
    return header ? JSON.parse(JSON.stringify(header)) : null;
  } catch (error) {
    console.error(`[getSiteHeaderById] Error for header ${id} in tenant ${tenantKey}:`, error);
    return null;
  }
}

/**
 * Saves or updates a site header.
 */
export async function saveSiteHeader(
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

    // If this header is being set to active, deactivate all others first
    if (payload.isActive) {
      await db.collection("templates").updateMany({ siteId: tenantKey, templateType: "header" }, { $set: { isActive: false } });
    }

    const { id, ...data } = payload;
    const filter: any = id
      ? { _id: typeof id === "string" ? new ObjectId(id) : id, siteId: tenantKey, templateType: "header" }
      : { name: payload.name, siteId: tenantKey, templateType: "header" };

    const result = await db.collection("templates").updateOne(
      filter,
      {
        $set: {
          ...data,
          siteId: tenantKey,
          templateType: "header",
          isActive: payload.isActive ?? false,
          updatedAt: now,
        },
      },
      { upsert: true },
    );

    return result.modifiedCount > 0 || result.upsertedCount > 0;
  } catch (error) {
    console.error(`[saveSiteHeader] Error for tenant ${tenantKey}:`, error);
    return false;
  }
}

/**
 * Activates a specific site header.
 */
export async function activateSiteHeader(tenantKey: string, id: string | ObjectId): Promise<boolean> {
  if (!id) return false;
  const targetId = typeof id === "string" ? (ObjectId.isValid(id) ? new ObjectId(id) : null) : id;
  if (!targetId) return false;

  try {
    const db = await getTenantDb(tenantKey);

    // Deactivate all others
    await db.collection("templates").updateMany({ siteId: tenantKey, templateType: "header" }, { $set: { isActive: false } });

    // Activate specific one
    const result = await db.collection("templates").updateOne(
      { _id: targetId, siteId: tenantKey, templateType: "header" },
      { $set: { isActive: true, updatedAt: new Date() } },
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error(`[activateSiteHeader] Error for header ${id} in tenant ${tenantKey}:`, error);
    return false;
  }
}

/**
 * Deletes a site header.
 */
export async function deleteSiteHeader(tenantKey: string, id: string | ObjectId): Promise<boolean> {
  if (!id) return false;
  const targetId = typeof id === "string" ? (ObjectId.isValid(id) ? new ObjectId(id) : null) : id;
  if (!targetId) return false;

  try {
    const db = await getTenantDb(tenantKey);
    const result = await db.collection("templates").deleteOne({
      _id: targetId,
      siteId: tenantKey,
      templateType: "header",
    });
    return result.deletedCount > 0;
  } catch (error) {
    console.error(`[deleteSiteHeader] Error for header ${id} in tenant ${tenantKey}:`, error);
    return false;
  }
}
