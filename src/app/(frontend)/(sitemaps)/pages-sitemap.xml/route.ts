import { unstable_cache } from "next/cache";
import { getServerSideSitemap } from "next-sitemap";

const getPagesSitemap = unstable_cache(
  async () => {
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      "https://example.com";

    const dateFallback = new Date().toISOString();

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/search`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/posts`,
        lastmod: dateFallback,
      },
    ];

    // Placeholder until dynamic kalpgopage fetching is implemented
    const sitemap: any[] = [];

    return [...defaultSitemap, ...sitemap];
  },
  ["pages-sitemap"],
  {
    tags: ["pages-sitemap"],
  },
);

export async function GET() {
  const sitemap = await getPagesSitemap();

  return getServerSideSitemap(sitemap);
}
