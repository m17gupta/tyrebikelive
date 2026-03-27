import { unstable_cache } from "next/cache";
import { getServerSideSitemap } from "next-sitemap";

const getPostsSitemap = unstable_cache(
  async () => {
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      "https://example.com";

    // Placeholder until dynamic kalpgopost fetching is implemented
    const sitemap: any[] = [];

    return sitemap;
  },
  ["posts-sitemap"],
  {
    tags: ["posts-sitemap"],
  },
);

export async function GET() {
  const sitemap = await getPostsSitemap();

  return getServerSideSitemap(sitemap);
}
