import { draftMode } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import React, { cache } from "react";

import { RenderBlocks } from "@/blocks/RenderBlocks";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import { RenderHero } from "@/components/heros/RenderHero";
import { VisualEditingToolbar } from "@/components/VisualEditingToolbar";
import { VisualEditingClient } from "@/components/VisualEditingClient";
import { type Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { generateMeta } from "@/utilities/generateMeta";
import { config as pageconfig } from "../../../../../EditorComp/config";
import PageClient from "./page.client";

import type { Metadata } from "next";
import { getTenantByDomain } from "@/lib/getPage";
import Hero from "../../../../../frontendComponents/Hero";
import AboutKarloBan from "@/frontendComponents/sections/AboutKarloBan";
import AboutStrip from "@/frontendComponents/sections/AboutStrip";
import Testimonials from "@/frontendComponents/sections/Testimonials";
import ProductTabsGrid from "@/frontendComponents/sections/ProductTabsGrid";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { Config, Media } from "@/types";
import { getServerSideURL } from "@/utilities/getURL";
import NotFound from "@/components/NotFound";
import { Render } from "@measured/puck";
import { RenderClient } from "@/EditorComp/RenderClient";

// Force dynamic rendering to avoid headers() conflicts
export const dynamic = 'force-dynamic';

const pettyProducts: any = [
  {
    id: "p1",
    name: "Petty 173mm",
    priceEUR: 220,
    image: "/assets/products/product-img.png",
    size: "173mm",
  },
  {
    id: "p2",
    name: "Petty 173mm",
    priceEUR: 220,
    image: "/assets/products/product-img.png",
    size: "173mm",
  },
  {
    id: "p3",
    name: "Petty 173mm",
    priceEUR: 220,
    image: "/assets/products/product-img.png",
    size: "173mm",
  },
  {
    id: "p4",
    name: "Petty 173mm",
    priceEUR: 220,
    image: "/assets/products/product-img.png",
    size: "173mm",
  },
  {
    id: "p5",
    name: "Petty 173mm",
    priceEUR: 220,
    image: "/assets/products/product-img.png",
    size: "173mm",
  },
  {
    id: "p6",
    name: "Petty 173mm",
    priceEUR: 220,
    image: "/assets/products/product-img.png",
    size: "173mm",
  },
  {
    id: "p7",
    name: "Petty 173mm",
    priceEUR: 220,
    image: "/assets/products/product-img.png",
    size: "173mm",
  },
  {
    id: "p8",
    name: "Petty 173mm",
    priceEUR: 220,
    image: "/assets/products/product-img.png",
    size: "173mm",
  },
];

const categories = [
  { id: "petty", label: "Petty", products: pettyProducts },
  { id: "gyuto", label: "Gyuto", products: pettyProducts.slice(0, 6) },
  { id: "santoku", label: "Santoku", products: pettyProducts.slice(0, 6) },
  { id: "nakiri", label: "Nakiri", products: pettyProducts.slice(0, 6) },
];

// export async function generateStaticParams() {
//   const payload = await getPayload({ config });
//   const pages = await payload.find({
//     collection: "pages",
//     draft: false,
//     limit: 1000,
//     overrideAccess: true,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   });

//   const params = routing.locales.flatMap((locale) => {
//     return pages.docs
//       ?.filter((doc) => doc.slug !== "home")
//       .map(({ slug }) => {
//         return { locale, slug };
//       });
//   });

//   return params;
// }

// Commented out to prevent MongoDB connection during build when using dynamic = 'force-dynamic'
// export async function generateStaticParams() {
//   const payload = await getPayload({ config });
//   const pages = await payload.find({
//     collection: "pages",
//     draft: false,
//     limit: 1000,
//     overrideAccess: true,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   });

//   // ✅ Ensure only valid slugs are included
//   const params = routing.locales.flatMap((locale) => {
//     return pages.docs
//       ?.filter(
//         (doc) =>
//           typeof doc.slug === "string" &&
//           doc.slug.length > 0 &&
//           doc.slug !== "home"
//       )
//       .map(({ slug }) => ({
//         locale,
//         slug,
//       }));
//   });
//   return params;
// }
// Removed generateStaticParams since we're using dynamic rendering
// export async function generateStaticParams() {
//   const payload = await getPayload({ config });
//   const pages = await payload.find({
//     collection: "pages",
//     draft: false,
//     limit: 1000,
//     overrideAccess: true,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   });

//   // ✅ Ensure only valid slugs are included
//   const params = routing.locales.flatMap((locale) => {
//     return pages.docs
//       ?.filter((doc) => typeof doc.slug === "string" && doc.slug.length > 0 && doc.slug !== "home")
//       .map(({ slug }) => ({
//         locale,
//         slug,
//       }));
//   });
//   return params;
// }

type Args = {
  params: Promise<{
    locale: Locale;
    slug?: string;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  
  const { slug = "home", locale } = await paramsPromise;

  let page: any = null;

  // For dynamic rendering, we can use domain-specific logic
  try {
    page = await getTenantByDomain("default", slug, locale);
    console.log("Page fetched:", {
      slug,
      locale,
      hasPage: !!page,
      pageKeys: page ? Object.keys(page as object) : [],
      meta: page?.meta,
      title: page?.title,
      id: page?.id
    });
  } catch (error) {
    console.error("Error fetching page:", error);
  }
  
  if (!page) {
    console.log(`Page not found: slug="${slug}", locale="${locale}"`);
    return <NotFound/>
  }

  const url = `/${locale}/${slug}`;

  // page = await queryPageBySlug({
  //   slug,
  //   locale,
  // });

  // if (!page) {
  //   return <PayloadRedirects url={url} locale={locale} />;
  // }

  setRequestLocale(locale);

  const { hero, section, Code } = page;

  return (
    <article className="pt-16 pb-24">
     {/* <RenderClient data={page["Page Data"]}/> */}
      {/* <PageClient /> */}
      {/* Allows redirects for valid pages too */}
      {/* {!page && slug !== "home" && (
        <PayloadRedirects locale={locale} url={url} />
      )} */}

      {/* {draft && <LivePreviewListener />}
      {draft && <VisualEditingToolbar pageId={page?.id} pageSlug={slug} />}
      {draft && <VisualEditingClient pageId={page?.id} />} */}

      {/* <RenderHero {...hero} /> */}
      {/* <Hero
        title="Izuzetna oštrina nadomak ruke"
        subtitle="Autentični, 100% ručno kovani noževi. Izrađeni da nadžive generacije."
        cta={{ label: "Kupi nož" }}
        // bgImage="/assets/hero/hero-knife.jpg"
      /> */}

      {/* <div dangerouslySetInnerHTML={{ __html: Code }} /> */}
      {/* 
      <AboutKarloBan />
      <AboutStrip /> */}
      {/* <section className="container mx-auto px-4 py-10"> */}
        {/* Section Title */}
        {/* <h3 className="mb-1 inline-block w-full border-b border-gray-200 pb-2 text-[16px] font-medium text-[#FF7020]">
          Naši kuharski noževi
        </h3> */}

        {/* Section Description */}
        {/* <p className="max-w-4xl text-[28px] leading-[160%] font-medium text-[#4F4640]">
          Otkrijte kolekciju ručno kovanih noževa stvorenih za kuhare koji traže više od alata. Svaki model
          spaja preciznost, dugotrajnost i ljepotu rada iz majstorskih ruku.
        </p> */}
      {/* </section> */}

      {/* <ProductTabsGrid categories={categories} /> */}
      {/* 
      <Testimonials /> */}
      <RenderBlocks blocks={section} />
    </article>
  );
}

const getImageURL = (image?: Media | string | null) => {
  const serverUrl = getServerSideURL();

  let url = serverUrl + "/website-template-OG.webp";

  if (image && typeof image === "object" && "url" in image) {
    url = serverUrl + image.url;
  }

  return url;
};

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "home", locale } = await paramsPromise;

  let page;
  try {
    // Use the same tenant-based approach as the main component
    page = await getTenantByDomain("default", slug, locale);
    console.log("Page fetched for metadata:", { slug, locale, hasPage: !!page, hasMeta: !!page?.meta });
  } catch (error) {
    console.error("Error fetching page for metadata:", error);
    page = null;
  }

  // Provide fallback meta information if page or meta is not available
  const meta = page?.meta || {};
  const ogImage = getImageURL(meta?.image as Media | string | null);
  
  // Create a more descriptive title based on slug if meta title is not available
  const pageTitle = meta?.title || (slug === "home" ? "Home" : slug.charAt(0).toUpperCase() + slug.slice(1));
  const title = `${pageTitle} | Karloban`;

  // Generate URL based on slug parameter if page is not available
  const pageUrl = page?.slug
    ? Array.isArray(page.slug)
      ? page.slug.join("/")
      : `/${page.slug}`
    : slug === "home"
      ? "/"
      : `/${slug}`;

  return {
    description:
      meta?.description ||
      "Autentični, 100% ručno kovani noževi. Izrađeni da nadžive generacije.",
    openGraph: mergeOpenGraph({
      description:
        meta?.description ??
        "Autentični, 100% ručno kovani noževi. Izrađeni da nadžive generacije.",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: pageUrl,
    }),
    title,
  };
}

// queryPageBySlug removed as payload is no longer used
