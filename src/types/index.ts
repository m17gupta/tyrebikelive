/**
 * Central type definitions replacing @/types
 * These are standalone TypeScript interfaces matching the Payload CMS
 * collection shapes, now decoupled from any CMS dependency.
 */

// ────────────────────────────────────────────────
// Shared primitives
// ────────────────────────────────────────────────
export type Config = {
  collections: Record<string, unknown>;
  globals: Record<string, unknown>;
};

export type Media = {
  id: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  alt?: string;
  createdAt?: string;
  updatedAt?: string;
  thumbnailURL?: string | null;
};

// ────────────────────────────────────────────────
// Content Types
// ────────────────────────────────────────────────
export type Page = {
  id: string;
  title?: string;
  slug?: string;
  hero?: {
    type?: string;
    richText?: unknown;
    media?: string | Media;
    links?: { link?: Link }[];
  };
  layout?: unknown[];
  meta?: Meta;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Post = {
  id: string;
  title?: string;
  slug?: string;
  heroImage?: string | Media;
  content?: unknown;
  excerpt?: string;
  categories?: (string | Category)[];
  authors?: (string | User)[];
  publishedAt?: string;
  meta?: Meta;
  createdAt?: string;
  updatedAt?: string;
};

export type Meta = {
  title?: string;
  description?: string;
  image?: string | Media;
};

export type Link = {
  type?: "reference" | "custom";
  reference?: {
    relationTo: "pages" | "posts";
    value: string | Page | Post;
  };
  url?: string;
  newTab?: boolean;
  label?: string;
  appearance?: string;
};

export type Category = {
  id: string;
  title?: string;
  slug?: string;
  parent?: string | Category;
  breadcrumbs?: { label?: string; url?: string; doc?: string | Category }[];
  createdAt?: string;
  updatedAt?: string;
};

// ────────────────────────────────────────────────
// eCommerce Types
// ────────────────────────────────────────────────
export type ProductCategory = {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  image?: string | Media;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductSubCategory = {
  id: string;
  name?: string;
  slug?: string;
  category?: string | ProductCategory;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductVariant = {
  id?: string;
  name?: string;
  sku?: string;
  price?: number;
  stock?: number;
  color?: string;
  size?: string;
  images?: (string | Media)[];
};

export type Product = {
  id: string;
  name?: string;
  slug?: string;
  description?: unknown;
  price?: number;
  salePrice?: number;
  status?: "active" | "draft" | "archived";
  type?: string;
  images?: (string | Media)[];
  primaryImageId?: string;
  gallery?: { id?: string; url?: string }[];
  categories?: (string | ProductCategory)[];
  subcategories?: (string | ProductSubCategory)[];
  variants?: ProductVariant[];
  stock?: number;
  categoryIds?: string[];
  createdAt?: string;
  updatedAt?: string;
};

// ────────────────────────────────────────────────
// User / Customer / Admin Types
// ────────────────────────────────────────────────
export type User = {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Customer = {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  addresses?: Address[];
  createdAt?: string;
  updatedAt?: string;
};

export type Administrator = {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Address = {
  id?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  isDefault?: boolean;
};

// ────────────────────────────────────────────────
// Order Types
// ────────────────────────────────────────────────
export type OrderProduct = {
  productName?: string;
  color?: string;
  size?: string;
  quantity?: number;
  price?: number;
  productId?: string | Product;
};

export type Order = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  customer?: string | Customer;
  orderDetails: {
    status: string;
    totalWithShipping: number;
    currency: string;
    transactionID?: string;
  };
  shippingAddress: {
    email: string;
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  products?: OrderProduct[];
};

// ────────────────────────────────────────────────
// Payment Types
// ────────────────────────────────────────────────
export type Payment = {
  id: string;
  orderId?: string | Order;
  amount?: number;
  currency?: string;
  status?: string;
  provider?: string;
  transactionId?: string;
  createdAt?: string;
  updatedAt?: string;
};

// ────────────────────────────────────────────────
// Shop Settings
// ────────────────────────────────────────────────
export type ShopSetting = {
  id: string;
  availableCurrencies: string[];
  defaultCurrency?: string;
  shopName?: string;
  contactEmail?: string;
  createdAt?: string;
  updatedAt?: string;
};

