export interface NavOverrideSpec {
  label?: string;
  path?: string;
  icon?: string;
  parentId?: string;
}

export interface VocabularyTermsSpec {
  catalogPlural: string;
  catalogSingular: string;
  categories: string;
  attributes: string;
  orders: string;
}

export interface TenantVocabularyProfileSpec {
  version: number;
  key: string;
  source: "auto" | "manual";
  generatedAt: Date;
  contexts: string[];
  businessType: string;
  industry: string;
  terms: VocabularyTermsSpec;
  navOverrides: Record<string, NavOverrideSpec>;
}

const CANONICAL_TRAVEL_CONTEXT = "travel-and-tour-package";
const CANONICAL_EDUCATION_CONTEXT = "education-and-training";

const TRAVEL_CONTEXT_KEYS = new Set<string>([
  "travel-tour-package",
  "travel-and-tour-package",
  "travel-package",
  "tour-package",
  "travel-agency",
  "travel-agencies",
  "travel-and-tour",
  "travel-tour",
  "adventure-and-activity-experience",
  "vacation-rental-homestay",
]);

const EDUCATION_CONTEXT_KEYS = new Set<string>([
  "education-and-training",
  "school-and-institute",
  "school-institute",
  "coaching",
  "coaching-and-mentoring",
  "online-courses",
  "college",
  "college-management",
  "tuition",
  "edtech",
]);

const COMMERCE_CONTEXT_KEYS = new Set<string>([
  "online-store",
  "ecommerce",
  "e-commerce",
  "retail",
  "fashion-boutique",
  "grocery-delivery",
  "commerce",
  "store",
]);

/**
 * Normalizes a string to a URL-friendly business context slug.
 */
export function normalizeBusinessContext(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTitleCase(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Heuristic pluralization for vocabulary terms.
 */
function pluralizeToken(token: string): string {
  const normalized = token.trim();
  if (!normalized) return "Products";

  const lower = normalized.toLowerCase();
  if (lower.endsWith("y") && !/[aeiou]y$/.test(lower)) {
    return `${normalized.slice(0, -1)}ies`;
  }
  if (
    lower.endsWith("s") ||
    lower.endsWith("x") ||
    lower.endsWith("z") ||
    lower.endsWith("ch") ||
    lower.endsWith("sh")
  ) {
    return `${normalized}es`;
  }
  return `${normalized}s`;
}

/**
 * Extracts a canonical key from various business type formats.
 */
export function extractBusinessTypeKey(bt: unknown): string {
  if (!bt) return "";
  if (typeof bt === "string") return bt.trim();
  if (Array.isArray(bt)) return bt.length > 0 ? extractBusinessTypeKey(bt[0]) : "";
  if (typeof bt === "object" && bt !== null) {
    const raw = bt as Record<string, unknown>;
    return typeof raw.key === "string" ? raw.key : typeof raw.businessType === "string" ? raw.businessType : "";
  }
  return "";
}

/**
 * Builds a fallback set of terms based on the business type name.
 */
function buildFallbackTerms(businessType: string): VocabularyTermsSpec {
  const trimmed = businessType.trim();
  if (!trimmed) {
    return {
      catalogPlural: "Products",
      catalogSingular: "Product",
      categories: "Categories",
      attributes: "Attributes",
      orders: "Orders",
    };
  }

  const base = toTitleCase(trimmed.split("&")[0].split("/")[0]);
  const singular = base || "Product";
  const plural = pluralizeToken(singular);

  return {
    catalogPlural: plural,
    catalogSingular: singular,
    categories: "Categories",
    attributes: "Attributes",
    orders: "Orders",
  };
}

/**
 * Maps input contexts to a canonical vocabulary profile.
 */
function getRuleBasedTerms(
  contexts: string[],
  businessType: string,
  industry: string,
): { key: string; terms: VocabularyTermsSpec; navOverrides: Record<string, NavOverrideSpec> } {
  const contextSet = new Set(contexts.map(toCanonicalBusinessContext));
  const btKey = extractBusinessTypeKey(businessType);
  const lookup = `${normalizeBusinessContext(btKey)} ${normalizeBusinessContext(industry)}`;

  const hasAnyToken = (tokens: string[]): boolean => tokens.some((token) => lookup.includes(token));

  // Travel Domain
  if (contextSet.has(CANONICAL_TRAVEL_CONTEXT) || hasAnyToken(["travel", "tour", "itinerary", "trip", "vacation"])) {
    const terms: VocabularyTermsSpec = {
      catalogPlural: "Travel Packages",
      catalogSingular: "Travel Package",
      categories: "Hotels",
      attributes: "Package Attributes",
      orders: "Orders",
    };
    return {
      key: "travel-vocabulary",
      terms,
      navOverrides: {
        "nav.products": { label: terms.catalogPlural },
        "nav.products.categories": { label: terms.categories },
        "nav.products.attributes": { label: terms.attributes, path: "/ecommerce/attributes" },
        "nav.ecommerce.orders": { label: terms.orders, path: "/ecommerce/orders" },
        "nav.travel.packages": { label: terms.catalogPlural, path: "/travel/packages" },
        "nav.travel.hotels": { label: "Hotels", path: "/travel/catalog/hotels" },
        "nav.travel.activities": { label: "Activities", path: "/travel/catalog/activities" },
        "nav.travel.transfers": { label: "Transfers", path: "/travel/catalog/transfers" },
        "nav.travel.customers": { label: "Customers", path: "/customers" },
      },
    };
  }

  // Education Domain
  if (
    contextSet.has(CANONICAL_EDUCATION_CONTEXT) ||
    hasAnyToken(["school", "education", "academy", "coaching", "college", "tuition"])
  ) {
    const terms: VocabularyTermsSpec = {
      catalogPlural: "Programs",
      catalogSingular: "Program",
      categories: "Curriculum",
      attributes: "Program Attributes",
      orders: "Enrollments",
    };
    return {
      key: "education-vocabulary",
      terms,
      navOverrides: {
        "nav.products": { label: terms.catalogPlural, path: "/ecommerce" },
        "nav.products.categories": { label: terms.categories, path: "/ecommerce/categories" },
        "nav.products.attributes": { label: terms.attributes, path: "/ecommerce/attributes" },
        "nav.ecommerce.orders": { label: terms.orders, path: "/ecommerce/orders" },
      },
    };
  }

  // General Property Domain
  if (hasAnyToken(["property", "real-estate", "brokerage", "rental"])) {
    const terms: VocabularyTermsSpec = {
      catalogPlural: "Listings",
      catalogSingular: "Listing",
      categories: "Property Types",
      attributes: "Listing Attributes",
      orders: "Leads",
    };
    return {
      key: "property-vocabulary",
      terms,
      navOverrides: {
        "nav.products": { label: terms.catalogPlural, path: "/ecommerce" },
        "nav.products.categories": { label: terms.categories, path: "/ecommerce/categories" },
        "nav.products.attributes": { label: terms.attributes, path: "/ecommerce/attributes" },
        "nav.ecommerce.orders": { label: terms.orders, path: "/ecommerce/orders" },
      },
    };
  }

  // Fallback to generic commerce
  const fallbackTerms = buildFallbackTerms(btKey);
  return {
    key: normalizeBusinessContext(btKey) || "default-vocabulary",
    terms: fallbackTerms,
    navOverrides: {
      "nav.products": { label: fallbackTerms.catalogPlural, path: "/ecommerce" },
      "nav.products.categories": { label: fallbackTerms.categories, path: "/ecommerce/categories" },
      "nav.products.attributes": { label: fallbackTerms.attributes, path: "/ecommerce/attributes" },
      "nav.ecommerce.orders": { label: fallbackTerms.orders, path: "/ecommerce/orders" },
    },
  };
}

/**
 * Resolves the canonical business context for a given value.
 */
export function toCanonicalBusinessContext(value: string): string {
  const normalized = normalizeBusinessContext(value);
  if (!normalized) return "";
  if (TRAVEL_CONTEXT_KEYS.has(normalized)) return CANONICAL_TRAVEL_CONTEXT;
  if (EDUCATION_CONTEXT_KEYS.has(normalized)) return CANONICAL_EDUCATION_CONTEXT;
  return normalized;
}

/**
 * Heuristically resolves the active business contexts for a tenant.
 */
export function resolveBusinessContexts(tenant: Record<string, unknown> | null): string[] {
  const rawContexts = (tenant?.activeBusinessContexts || tenant?.businessContexts || []) as string[];
  const explicitContexts = rawContexts.map(toCanonicalBusinessContext).filter(Boolean);

  if (explicitContexts.length > 0) return Array.from(new Set(explicitContexts));

  // Fallback to deriving from businessType if no explicit contexts found
  const btKey = extractBusinessTypeKey(tenant?.businessType);
  const canonicalBt = toCanonicalBusinessContext(btKey);
  return canonicalBt ? [canonicalBt] : [];
}

/**
 * Generates an automated vocabulary profile based on business identity.
 */
export function buildAutoTenantVocabularyProfile(input: {
  businessType?: unknown;
  industry?: unknown;
}): TenantVocabularyProfileSpec {
  const btKey = extractBusinessTypeKey(input.businessType);
  const industry = typeof input.industry === "string" ? input.industry.trim() : "";
  const contexts = resolveBusinessContexts(input as any);
  const mapped = getRuleBasedTerms(contexts, btKey, industry);

  return {
    version: 1,
    key: mapped.key,
    source: "auto",
    generatedAt: new Date(),
    contexts,
    businessType: btKey,
    industry,
    terms: mapped.terms,
    navOverrides: mapped.navOverrides,
  };
}

/**
 * Synthesizes the final navigation overrides for a tenant, merging defaults with manual adjustments.
 */
export function getNavigationOverridesForTenant(tenant: Record<string, unknown> | null): {
  activeBusinessContexts: string[];
  vocabularyProfile: TenantVocabularyProfileSpec;
  navigationOverrides: Record<string, NavOverrideSpec>;
} {
  const activeBusinessContexts = resolveBusinessContexts(tenant);
  const vocabularyProfile = buildAutoTenantVocabularyProfile({
    businessType: tenant?.businessType,
    industry: tenant?.industry,
  });

  const navigationOverrides = {
    ...vocabularyProfile.navOverrides,
    ...((tenant?.navOverrides as Record<string, NavOverrideSpec>) || {}),
  };

  return {
    activeBusinessContexts,
    vocabularyProfile,
    navigationOverrides,
  };
}

/**
 * Checks if the travel context is active in the given context list.
 */
export function isTravelContextActive(contexts: string[]): boolean {
  return contexts.includes(CANONICAL_TRAVEL_CONTEXT);
}

/**
 * Checks if the education context is active in the given context list.
 */
export function isEducationContextActive(contexts: string[]): boolean {
  return contexts.includes(CANONICAL_EDUCATION_CONTEXT);
}
