import config from "@payload-config";

export async function getTenantByDomain(
  domain: string,
  slug: string,
 locale: "en" | "zh"
) {
  try {
    // Skip database operations during build if SKIP_DB_DURING_BUILD is set
    if (process.env.SKIP_DB_DURING_BUILD === 'true') {
      console.log('Skipping database operation during build');
      return null;
    }

    // For static generation, try to use Payload directly first
    if (process.env.NODE_ENV === "development" || process.env.PAYLOAD_SECRET) {
      return await getTenantByDomainPayload(domain, slug, locale);
    }

    // Fallback to REST API
    return await getTenantByDomainREST(domain, slug, locale);
  } catch (error) {
    console.error("Error in getTenantByDomain:", error);
    return null;
  }
}

async function getTenantByDomainPayload(
  domain: string,
  slug: string,
  locale: "en" | "zh"
) {
  try {
    const payload = await getPayload({ config });

    // First, let's try to find the page directly without website constraint
    // This is a fallback in case website association is not set up
    let pages = await payload.find({
      collection: "pages",
      where: {
        and: [
          { slug: { equals: slug } }
        ]
      },
      locale,
      limit: 1,
      pagination: false,
      depth: 2,
    });

    if (pages.docs[0]) {
      // console.log('Found page directly by slug:', slug);
      return pages.docs[0];
    }

    // If not found, try with website constraint
    let website;
    if (domain === "default" || !domain) {
      const websites = await payload.find({
        collection: "websites" as any,
        limit: 1,
        pagination: false,
      });
      website = websites.docs[0];
      // console.log('Found default website:', !!website);
    } else {
      const websites = await payload.find({
        collection: "websites" as any,
        where: {
          "domains.domain": {
            equals: domain,
          },
        },
        limit: 1,
        pagination: false,
      });
      website = websites.docs[0];
      // console.log('Found website for domain', domain, ':', !!website);
    }

    if (!website?.id) {
      // console.log('No website found, returning null');
      return null;
    }

    // Get page by website and slug
    pages = await payload.find({
      collection: "pages",
      where: {
        and: [
          { website: { equals: website.id } },
          { slug: { equals: slug } }
        ]
      },
      locale,
      limit: 1,
      pagination: false,
      depth: 2,
    });

    // console.log('Found page with website constraint:', !!pages.docs[0]);
    return pages.docs[0] || null;
  } catch (error) {
    console.error("Error in getTenantByDomainPayload:", error);
    return null;
  }
}

async function getTenantByDomainREST(
  domain: string,
  slug: string,
  locale: "en" | "zh"
) {
  try {
    // First, try to find page directly by slug without website constraint
    const directPageRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[slug][equals]=${slug}&locale=${locale}&depth=2&limit=1`,
      { next: { revalidate: 60 } }
    );

    const directPageJson = await directPageRes.json();
    if (directPageJson?.docs?.[0]) {
      // console.log('Found page directly by slug via REST:', slug);
      return directPageJson.docs[0];
    }

    // If not found directly, try with website constraint
    let targetDomain = domain;

    // If no specific domain or default domain, get the first available website
    if (domain === "default" || !domain) {
      const allSites = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/websites?limit=1`,
        { next: { revalidate: 3600 } }
      );
      const allSitesJson = await allSites.json();
      if (allSitesJson?.docs?.[0]?.domains?.[0]?.domain) {
        targetDomain = allSitesJson.docs[0].domains[0].domain;
      }
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/websites?where[domains.domain][equals]=${targetDomain}`,
      { next: { revalidate: 3600 } }
    );

    const json = await res.json();
    let id = json?.docs?.[0];

    // If no website found for domain, try to get default website
    if (!id?.id && domain !== "default") {
      const defaultRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/websites?limit=1`,
        { next: { revalidate: 3600 } }
      );
      const defaultJson = await defaultRes.json();
      id = defaultJson?.docs?.[0];
    }

    if (!id?.id) {
      // console.log('No website found via REST API');
      return null;
    }

    const final = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[website][equals]=${id.id}&where[slug][equals]=${slug}&locale=${locale}&depth=2`,
      { next: { revalidate: 60 } }
    );

    const jsonm = await final.json();
    // console.log('Found page with website constraint via REST:', !!jsonm?.docs?.[0]);
    return jsonm?.docs?.[0] ?? null;
  } catch (error) {
    console.error("Error in getTenantByDomainREST:", error);
    return null;
  }
}

