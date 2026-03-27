import { ObjectId } from "mongodb";
import { getTenantDb } from "@/lib/db";

export type NavigationItemType = "link" | "dropdown" | "mega";
export type NavigationItemTarget = "_self" | "_blank";

export interface MegaMenuColumn {
  title: string;
  links: {
    label: string;
    url: string;
    target?: NavigationItemTarget;
  }[];
}

export interface NavigationItem {
  id: string; // Internal UUID or unique string for drag and drop
  label: string;
  url: string;
  target: NavigationItemTarget;
  type: NavigationItemType;
  children?: NavigationItem[];
  megaMenuColumns?: MegaMenuColumn[];
}

export interface NavigationDocument {
  _id?: ObjectId;
  siteId: string; // Equivalent to tenantKey
  name: string; // e.g., "Primary Menu", "Footer Menu"
  items: NavigationItem[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Retrieves all navigation menus for a specific tenant.
 */
export async function getNavigationsBySite(tenantKey: string): Promise<NavigationDocument[]> {
  try {
    const db = await getTenantDb(tenantKey);
    const navigations = await db.collection<NavigationDocument>("navigations").find({}).sort({ updatedAt: -1 }).toArray();

    // Serialize for Next.js boundary
    return JSON.parse(JSON.stringify(navigations));
  } catch (error) {
    console.error(`[getNavigationsBySite] Error fetching navigations for tenant ${tenantKey}:`, error);
    return [];
  }
}

/**
 * Retrieves a specific navigation menu by its ID within a tenant's database.
 */
export async function getNavigationById(tenantKey: string, id: string | ObjectId): Promise<NavigationDocument | null> {
  if (!id) return null;
  const targetId = typeof id === "string" ? (ObjectId.isValid(id) ? new ObjectId(id) : null) : id;
  if (!targetId) return null;

  try {
    const db = await getTenantDb(tenantKey);
    const nav = await db.collection<NavigationDocument>("navigations").findOne({ _id: targetId });
    return nav ? JSON.parse(JSON.stringify(nav)) : null;
  } catch (error) {
    console.error(`[getNavigationById] Error fetching navigation ${id} for tenant ${tenantKey}:`, error);
    return null;
  }
}

/**
 * Creates a new navigation menu for a tenant.
 */
export async function createNavigation(
  tenantKey: string,
  payload: Omit<NavigationDocument, "_id" | "siteId" | "createdAt" | "updatedAt">,
): Promise<ObjectId | null> {
  try {
    const db = await getTenantDb(tenantKey);
    const now = new Date();
    const doc: Omit<NavigationDocument, "_id"> = {
      ...payload,
      siteId: tenantKey,
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection("navigations").insertOne(doc);
    return result.insertedId;
  } catch (error) {
    console.error(`[createNavigation] Error creating navigation for tenant ${tenantKey}:`, error);
    return null;
  }
}

/**
 * Updates an existing navigation menu.
 */
export async function updateNavigation(
  tenantKey: string,
  id: string | ObjectId,
  payload: Partial<Omit<NavigationDocument, "_id" | "siteId" | "createdAt" | "updatedAt">>,
): Promise<boolean> {
  if (!id) return false;
  const targetId = typeof id === "string" ? (ObjectId.isValid(id) ? new ObjectId(id) : null) : id;
  if (!targetId) return false;

  try {
    const db = await getTenantDb(tenantKey);
    const result = await db.collection("navigations").updateOne(
      { _id: targetId },
      {
        $set: {
          ...payload,
          updatedAt: new Date(),
        },
      },
    );
    return result.modifiedCount > 0;
  } catch (error) {
    console.error(`[updateNavigation] Error updating navigation ${id} for tenant ${tenantKey}:`, error);
    return false;
  }
}

/**
 * Deletes a navigation menu.
 */
export async function deleteNavigation(tenantKey: string, id: string | ObjectId): Promise<boolean> {
  if (!id) return false;
  const targetId = typeof id === "string" ? (ObjectId.isValid(id) ? new ObjectId(id) : null) : id;
  if (!targetId) return false;

  try {
    const db = await getTenantDb(tenantKey);
    const result = await db.collection("navigations").deleteOne({ _id: targetId });
    return result.deletedCount > 0;
  } catch (error) {
    console.error(`[deleteNavigation] Error deleting navigation ${id} for tenant ${tenantKey}:`, error);
    return false;
  }
}
