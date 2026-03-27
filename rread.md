# Goodyear Bike E-Commerce Application - Technical Documentation

## Table of Contents
1. [About the Tech Stack](#about-the-tech-stack)
2. [About the App](#about-the-app)
3. [Structural Flow](#structural-flow)
4. [Database Collections Schema](#database-collections-schema)

---

## About the Tech Stack

### Frontend & Framework
- **Next.js 15.4.8** - React framework for building modern web applications with server-side rendering and static generation
- **React 19** - JavaScript library for building user interfaces with component-based architecture
- **TypeScript** - Typed superset of JavaScript for improved developer experience and code safety
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion 12.23.24** - Animation library for creating smooth, interactive UI animations
- **PostCSS** - CSS transformation tool for processing stylesheets

### Backend & CMS
- **Payload CMS 3.47.0** - Headless CMS for content management and API generation
- **Node.js with Express** - Server-side JavaScript runtime
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js (@payloadcms/db-mongodb)

### UI Components & Libraries
- **Radix UI** - Unstyled, accessible component primitives
  - React Accordion, Checkbox, Dialog, Dropdown, Label, Popover, Radio, Select, Separator, Tabs, Tooltip
- **Headless UI** - Unstyled UI components
- **Hero Icons** - Beautiful hand-crafted SVG icons
- **Lucide React** - Icon library with 525+ icons
- **Embla Carousel** - Carousel/slider component with autoplay and auto-scroll
- **Geist UI** - Modern component library
- **CMDk** - Command menu component
- **Class Variance Authority** - CSS class composition library

### Rich Text & Content
- **@payloadcms/richtext-lexical** - Advanced rich text editor with Lexical
- **@react-email/components** - React-based email template builder

### Data Management & State
- **@tanstack/react-table** - Headless UI table component for React
- **@hookform/resolvers** - Form validation resolvers
- **Axios** - HTTP client for API requests
- **Date-fns** - Modern date utility library
- **Lodash.debounce** - Debounce utility for function optimization
- **Zod** - TypeScript-first schema validation

### E-Commerce & Payments
- **@stripe/stripe-js** - Stripe payment integration
- **Stripe API** - Payment processing for e-commerce transactions

### Storage & Media
- **@payloadcms/storage-vercel-blob** - Vercel Blob storage integration
- **@payloadcms/storage-s3** - AWS S3 storage adapter
- **Sharp** - High-performance image processing

### Internationalization
- **next-intl 4.3.4** - Multi-language support for Next.js applications
- **@payloadcms/translations** - Built-in translation support in Payload CMS
- **Supported Languages**: English, Polish, Chinese, Croatian

### SEO & Analytics
- **@payloadcms/plugin-seo** - SEO optimization plugin
- **next-sitemap** - XML sitemap generation for search engines
- **next-plausible** - Privacy-first analytics

### Plugins & Extensions
- **@payloadcms/plugin-form-builder** - Dynamic form creation
- **@payloadcms/plugin-nested-docs** - Hierarchical document management
- **@payloadcms/plugin-redirects** - URL redirect management
- **@payloadcms/plugin-search** - Full-text search functionality
- **@payloadcms/live-preview-react** - Live preview for content editing
- **@payloadcms/payload-cloud** - Cloud deployment support

### Development Tools
- **ESLint** - JavaScript/TypeScript linting
- **PNPM** - Fast, disk space efficient package manager
- **Cross-env** - Cross-platform environment variable management
- **GraphQL** - Query language for API requests
- **JWT (JSON Web Tokens)** - Secure authentication and authorization

### Additional Libraries
- **GraphQL** - Query language for API
- **MongoDB** - Database driver
- **Motion** - Animation library
- **Clsx** - Utility for constructing class strings

---

## About the App

### Overview
The Goodyear Bike application is a full-featured e-commerce platform built with Payload CMS and Next.js. It provides a complete solution for selling bicycles with product management, customer accounts, order processing, and content management capabilities.

### Key Features

#### 1. **E-Commerce Functionality**
- Complete product catalog with variants (sizes, colors, etc.)
- Shopping cart and checkout process
- Order management and tracking
- Payment processing via Stripe
- Product inventory management
- Shipping integration with multiple courier options

#### 2. **Product Management**
- Product creation with rich descriptions
- Multiple product images per item
- Product variants with attributes (size, color, specifications)
- Product categories and sub-categories
- Product reviews and ratings
- Stock tracking and inventory management

#### 3. **Customer Management**
- Customer registration and authentication
- Customer profiles and address management
- Order history
- Wishlist functionality
- Customer reviews and feedback

#### 4. **Admin Panel**
- Comprehensive dashboard with sales analytics
- Order management and fulfillment tracking
- Product inventory management
- Customer management
- Content management for pages and posts
- User roles and permissions system
- Multi-language content management

#### 5. **Content Management**
- Dynamic page builder with various layout options
- Blog functionality with posts and categories
- SEO optimization for all pages
- Media library for image management
- Customizable header and footer
- Email messaging templates

#### 6. **Multi-Language Support**
- English, Polish, Chinese, and Croatian
- Content localization across all collections
- Language-specific product descriptions and pages

#### 7. **Security & Access Control**
- Role-based access control (RBAC)
- Permission management system
- Authenticated endpoints
- Admin-only operations
- User authentication with JWT

#### 8. **Analytics & Reporting**
- Revenue tracking
- Order analytics and charts
- Customer insights
- Sales metrics in admin dashboard

---

## Structural Flow

### Application Architecture

```
Frontend (Next.js)
    ↓
API Layer (Payload CMS)
    ↓
Database (MongoDB)
```

### Folder Structure

```
src/
├── app/                      # Next.js app directory with routes
│   ├── (frontend)/          # Customer-facing frontend routes
│   ├── (payload)/           # Payload CMS admin routes
│   └── api/                 # API endpoints
│
├── collections/             # Database collection schemas
│   ├── (ecommerce)/         # E-commerce specific collections
│   │   ├── Products/        # Product catalog
│   │   ├── Orders/          # Order management
│   │   ├── Customers/       # Customer accounts
│   │   ├── ProductCategories/
│   │   ├── ProductSubCategories/
│   │   └── ProductReviews/
│   │
│   ├── Product/             # Product variant collection
│   ├── Productvariant/      # Product variant management
│   ├── Attribute/           # Product attributes (size, color, etc.)
│   ├── Pages/               # CMS pages
│   ├── Posts/               # Blog posts
│   ├── Categories/          # Post categories
│   ├── Media/               # Image/file uploads
│   ├── Administrators/      # Admin user accounts
│   ├── Regions/             # Shipping regions
│   ├── Courier/             # Courier/shipping options
│   ├── Payment/             # Payment methods
│   ├── Roles/               # User role definitions
│   ├── Permission/          # Permission configurations
│   ├── Presets/             # Saved layout presets
│   └── Tenants/             # Website/tenant configuration
│
├── blocks/                   # Reusable content blocks
│   ├── RenderBlocks.tsx      # Block rendering component
│   ├── Banner/               # Banner blocks
│   ├── Button/               # Button blocks
│   ├── Carousel/             # Carousel blocks
│   ├── Content/              # Content blocks
│   ├── Form/                 # Form blocks
│   ├── MediaBlock/           # Image/media blocks
│   ├── Heading/              # Text heading blocks
│   └── RelatedPosts/         # Related posts blocks
│
├── components/               # React components
│   ├── (ecommerce)/         # E-commerce specific components
│   │   ├── AdminDashboard/  # Admin dashboard
│   │   └── ProductCard/
│   │
│   ├── Header.tsx            # Main header component
│   ├── NotFound.tsx          # 404 page
│   ├── AdminNavbar/          # Admin navigation
│   ├── AdminBar/             # Admin toolbar
│   ├── Link/                 # Custom link component
│   ├── Media/                # Media display component
│   ├── Card/                 # Card component
│   └── Emails/               # Email templates
│
├── globals/                  # Global configuration collections
│   ├── (ecommerce)/
│   │   ├── Couriers/         # Shipping options configuration
│   │   ├── Fulfilment/       # Fulfillment settings
│   │   ├── Layout/           # Shop layout settings
│   │   ├── Paywalls/         # Paywall configuration
│   │   └── ShopSettings/     # E-commerce settings
│   │
│   ├── Header/               # Header global settings
│   ├── Footer/               # Footer global settings
│   └── EmailMessages/        # Email templates
│
├── hooks/                    # Custom React hooks
├── providers/                # Context providers and wrappers
├── utilities/                # Helper functions and utilities
├── lib/                      # Library functions
├── access/                   # Access control and permissions
│   ├── anyone.ts             # Public access
│   ├── authenticated.ts      # Authenticated users only
│   └── roleBasedAccess.ts    # Role-based access control
│
├── fields/                   # Custom Payload field definitions
├── endpoints/                # Custom API endpoints
├── schemas/                  # Data validation schemas
├── stores/                   # State management (Zustand, Jotai, etc.)
├── i18n/                     # Internationalization configuration
├── plugins/                  # Payload plugin configurations
├── middleware.ts             # Next.js middleware
└── payload.config.ts         # Payload CMS configuration

public/
├── assets/                   # Static images and media
│   ├── about/
│   ├── feature/
│   ├── hero/
│   ├── products/
│   └── img/
└── robots.txt & sitemap.xml  # SEO files
```

### Data Flow

```
User (Customer)
    ↓
Frontend (Next.js Pages)
    ↓
API Routes / Payload Endpoints
    ↓
Collections (Database Layer)
    ↓
MongoDB (Data Storage)
    ↓
Response back to Frontend
    ↓
Display to User
```

### Authentication Flow

```
User Registration/Login
    ↓
Customers Collection (Authentication)
    ↓
JWT Token Generated
    ↓
Token Stored in Session/Cookie
    ↓
Authenticated Requests Include Token
    ↓
Access Control Verified
    ↓
Request Processed
```

### Admin Access Control Flow

```
Admin User Login
    ↓
Administrators Collection (Auth)
    ↓
Role & Permissions Checked
    ↓
Access Control Rules Applied (roleBasedAccess.ts)
    ↓
User Granted/Denied Access to Resources
    ↓
Admin Panel Features Available Based on Permissions
```

---

## Database Collections Schema

### Core E-Commerce Collections

#### 1. **Products Collection** (`/collections/(ecommerce)/Products`)
Manages the bicycle product catalog.

```typescript
Fields:
- title (text, required, localized) - Product name
- slug (text, unique) - URL slug
- description (richText, localized) - Detailed product description
- images (upload array) - Product images (multiple)
- price (currency field) - Base price
- status (select) - published/draft/archived
- categories (relationship) - Links to ProductCategories
- subcategories (relationship) - Links to ProductSubCategories
- variants (relationship) - Links to product variants
- stock (number) - Available quantity
- sku (text) - Stock keeping unit
- reviews (relationship) - Links to ProductReviews
- seo (SEO fields) - Title, description, image for search engines
```

#### 2. **Product Variants** (`/collections/Productvariant`)
Manages different variations of products (size, color, etc.).

```typescript
Fields:
- productId (relationship) - Links to Products
- attributes (object) - Size, color, specifications
- price (currency) - Variant-specific pricing
- sku (text, unique) - Variant SKU
- stock (number) - Stock quantity for this variant
- images (upload array) - Variant-specific images
- status (select) - Available/unavailable
```

#### 3. **Product Attributes** (`/collections/Attribute`)
Defines product attribute types and values.

```typescript
Fields:
- name (text) - Attribute name (e.g., "Size", "Color")
- sku (text, unique) - Attribute identifier
- values (array) - Possible values with labels
  - value (text) - The actual value
  - label (text) - Display label
```

#### 4. **Product Categories** (`/collections/(ecommerce)/ProductCategories`)
Main product categories.

```typescript
Fields:
- name (text, localized) - Category name
- slug (text, unique) - URL slug
- description (richText, localized) - Category description
- image (upload) - Category image
- parent (relationship) - For hierarchical structure
- products (relationship) - Related products (many)
```

#### 5. **Product Sub-Categories** (`/collections/(ecommerce)/ProductSubCategories`)
Subcategories under main categories.

```typescript
Fields:
- name (text, localized) - Subcategory name
- slug (text, unique) - URL slug
- parentCategory (relationship) - Links to ProductCategories
- description (richText, localized) - Description
- image (upload) - Subcategory image
```

#### 6. **Product Reviews** (`/collections/(ecommerce)/ProductReviews`)
Customer reviews and ratings for products.

```typescript
Fields:
- product (relationship, required) - Links to Products
- customer (relationship, required) - Links to Customers
- rating (number, 1-5) - Review rating
- title (text) - Review title
- content (richText) - Review content
- verified (checkbox) - Verified purchase flag
- helpful (number) - Helpful count
- createdAt (date) - Review date
- status (select) - approved/pending/rejected
```

#### 7. **Customers** (`/collections/(ecommerce)/Customers`)
Customer user accounts and profiles.

```typescript
Fields:
- firstName (text, required) - Customer first name
- lastName (text, required) - Customer last name
- fullName (text) - Auto-generated full name
- email (email, unique, required) - Customer email
- password (password, required) - Encrypted password
- phone (text) - Contact phone number
- addresses (array) - Multiple address entries
  - street (text)
  - city (text)
  - state (text)
  - country (select)
  - postalCode (text)
  - isDefault (checkbox)
- dateOfBirth (date) - Customer birth date
- preferences (object) - Newsletter, notifications, etc.
- orders (relationship) - Links to Orders (many)
- reviews (relationship) - Links to ProductReviews (many)
- loyaltyPoints (number) - Accumulated loyalty points
- lastLogin (date) - Last login timestamp
- status (select) - active/inactive/suspended
```

#### 8. **Orders** (`/collections/(ecommerce)/Orders`)
Customer purchase orders and order management.

```typescript
Fields:
- id (text, unique) - Order ID (auto-generated)
- customer (relationship) - Links to Customers
- date (date) - Order creation date
- items (array, required) - Order line items
  - product (relationship) - Product reference
  - variant (relationship) - Product variant selected
  - quantity (number) - Item quantity
  - price (currency) - Item price at purchase
  - subtotal (currency) - Line item total
- subtotal (currency) - Pre-tax total
- tax (currency) - Tax amount
- shippingCost (currency) - Shipping charge
- total (currency) - Order total
- status (select) - pending/processing/shipped/delivered/cancelled
- paymentStatus (select) - pending/paid/failed/refunded
- shippingAddress (object) - Delivery address
  - street, city, state, country, postalCode
- billingAddress (object) - Billing address
- courier (relationship) - Selected shipping courier
- trackingNumber (text) - Shipping tracking number
- notes (text) - Admin notes
- customerNotes (text) - Customer special requests
- paymentMethod (relationship) - Links to Payment collection
```

### Content Management Collections

#### 9. **Pages** (`/collections/Pages`)
CMS pages with dynamic block-based layout system.

```typescript
Fields:
- title (text, localized, required) - Page title
- slug (text, unique) - URL slug
- website (relationship) - Website/tenant association
- breadcrumbs (text) - Navigation breadcrumbs
- layout (blocks) - Dynamic page layout blocks
  - TextBlock
  - ButtonBlock
  - LayoutBlock
  - AboutPage
  - Multiple section layout options (2-column, 3-column, etc.)
- status (select) - published/draft
- meta (SEO fields) - Title, description, image
- publishedAt (date) - Publication date
- updatedAt (date) - Last update
```

#### 10. **Posts** (`/collections/Posts`)
Blog posts and articles.

```typescript
Fields:
- title (text, localized, required) - Post title
- slug (text, unique) - URL slug
- content (richText, localized) - Post content
- excerpt (text, localized) - Short description
- featured (boolean) - Feature on homepage
- featuredImage (upload) - Post thumbnail
- categories (relationship) - Links to Categories (many)
- authors (relationship) - Links to Administrators (many)
- publishedAt (date) - Publication date
- status (select) - published/draft
- comments (relationship) - Links to comments (many)
- viewCount (number) - Article view statistics
```

#### 11. **Categories** (`/collections/Categories`)
Post categories for blog organization.

```typescript
Fields:
- title (text, localized, required) - Category name
- slug (text, unique) - URL slug
- description (richText, localized) - Category description
```

#### 12. **Media** (`/collections/Media`)
Image and file uploads.

```typescript
Fields:
- alt (text, localized, required) - Alternative text for accessibility
- caption (richText, localized) - Image caption
- filename (text) - Original filename
- createdBy (relationship) - User who uploaded
- sourceFormat (text) - Original file format
```

### Admin & Access Control Collections

#### 13. **Administrators** (`/collections/Administrators`)
Admin user accounts with roles and permissions.

```typescript
Fields:
- name (text, required) - Admin name
- email (email, unique, required) - Admin email
- password (password, required) - Encrypted password
- roles (relationship) - Links to Roles (many)
- permissions (relationship) - Links to Permission (many)
- isActive (checkbox) - Account status
- lastLogin (date) - Last login timestamp
- avatar (upload) - Profile picture
```

#### 14. **Roles** (`/collections/roles/UserRoles`)
User role definitions for access control.

```typescript
Fields:
- name (text, unique, required) - Role name
- description (text) - Role description
- permissions (relationship) - Assigned permissions (many)
- accessLevel (select) - superadmin/admin/manager/user
```

#### 15. **Permissions** (`/collections/permission`)
Fine-grained permission definitions.

```typescript
Fields:
- name (text, unique) - Permission name
- slug (text, unique) - Permission identifier
- description (text) - What this permission allows
- category (select) - products/orders/customers/content/admin
- actions (array) - create/read/update/delete
```

### E-Commerce Settings & Configuration

#### 16. **Payment Methods** (`/collections/Payment`)
Payment processing configuration.

```typescript
Fields:
- name (text, unique) - Payment method name (e.g., Stripe, PayPal)
- type (select) - stripe/paypal/bank_transfer
- isActive (checkbox) - Enabled status
- config (json) - Payment gateway configuration
- fee (number) - Processing fee percentage
```

#### 17. **Couriers** (`/collections/Courier`)
Shipping and delivery courier options.

```typescript
Fields:
- name (text, unique) - Courier company name
- code (text, unique) - API code
- website (text) - Courier website URL
- trackingUrl (text) - Tracking URL pattern
- baseCost (currency) - Base shipping cost
- perKgCost (currency) - Cost per kilogram
- estimatedDays (number) - Estimated delivery days
- supportedCountries (array) - List of countries served
- isActive (checkbox) - Active status
```

#### 18. **Regions** (`/collections/Regions`)
Shipping regions and delivery zones.

```typescript
Fields:
- name (text, unique) - Region name
- countries (array) - Country list
- shippingCost (currency) - Default shipping cost
- estimatedDays (number) - Estimated delivery time
- couriers (relationship) - Available couriers for region (many)
- taxRate (number) - Regional tax rate
```

### Content Presets & Library

#### 19. **Presets/Library** (`/collections/Presets`)
Saved layout and content presets for reuse.

```typescript
Fields:
- name (text, unique) - Preset name
- description (text) - Preset description
- category (select) - layouts/banners/forms/blocks
- content (json) - Saved configuration
- thumbnail (upload) - Preset preview image
- isPublic (checkbox) - Shared with other users
- createdBy (relationship) - Creator reference
```

#### 20. **Tenants/Websites** (`/collections/Tenants`)
Multi-tenant support for multiple websites/stores.

```typescript
Fields:
- name (text, unique) - Website/store name
- domain (text, unique) - Primary domain
- logo (upload) - Site logo
- favicon (upload) - Favicon
- settings (json) - Site-specific configuration
- theme (object) - Color scheme and branding
- languages (array) - Supported languages
- currency (select) - Primary currency
- isActive (checkbox) - Active status
```

### Global Settings (Not Collections, but Global Configurations)

#### Header Global (`/globals/Header`)
Site-wide header configuration

#### Footer Global (`/globals/Footer`)
Site-wide footer configuration

#### Email Messages Global (`/globals/EmailMessages`)
Email templates for transactional emails (order confirmation, shipping, etc.)

#### Shop Settings Global (`/globals/(ecommerce)/ShopSettings`)
E-commerce general settings

#### Fulfillment Global (`/globals/(ecommerce)/Fulfilment`)
Order fulfillment and warehouse settings

#### Shop Layout Global (`/globals/(ecommerce)/Layout`)
Layout configuration for shop pages

#### Courier Configurations (`/globals/(ecommerce)/Couriers`)
- InPost Courier Config
- InPost Courier COD Config
- InPost Pickup Config

---

## Relationships Overview

```
Products
├── → ProductCategories (many)
├── → ProductSubCategories (many)
├── → ProductVariants (one-to-many)
├── → ProductReviews (one-to-many)
├── → Media (many images)
└── → Attributes (through variants)

Customers
├── → Orders (one-to-many)
├── → ProductReviews (one-to-many)
└── → Addresses (array field)

Orders
├── → Customers (many-to-one)
├── → Products (through OrderItems array)
├── → ProductVariants (through OrderItems)
├── → Payment (many-to-one)
├── → Courier (many-to-one)
└── → Regions (for delivery)

Administrators
├── → Roles (many-to-many)
└── → Permissions (many-to-many)

Pages
├── → Website/Tenants (many-to-one)
└── → Media (for images)

Posts
├── → Categories (many-to-many)
├── → Administrators (authors, many-to-many)
└── → Media (featured image)
```

---

## Summary

This is a comprehensive e-commerce platform for Goodyear Bikes with:
- **20+ Database collections** for managing products, orders, customers, content, and admin functions
- **Multi-language support** (English, Polish, Chinese, Croatian)
- **Role-based access control** with fine-grained permissions
- **Payment processing** via Stripe
- **Shipping integration** with multiple courier options
- **SEO optimization** built-in
- **Modern tech stack** using Next.js, Payload CMS, MongoDB, and React
- **Scalable architecture** supporting multi-tenant deployments

The application follows a well-organized structure with clear separation of concerns between frontend components, collections, and business logic.
