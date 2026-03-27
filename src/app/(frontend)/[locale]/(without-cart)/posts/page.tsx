import React from "react";

import { CollectionArchive } from "@/components/CollectionArchive";
import { PageRange } from "@/components/PageRange";
import { Pagination } from "@/components/Pagination";
import { getLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";

import PageClient from "./page.client";

import type { Metadata } from "next/types";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Page() {
  const locale = (await getLocale()) as Locale;
  void locale;

  // TODO: Replace with your custom API call to fetch posts
  // e.g. const posts = await fetchPosts({ limit: 12, locale });
  const posts = { docs: [], page: 1, totalDocs: 0, totalPages: 1 };

  return (
    <div className="pb-24 pt-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose max-w-none dark:prose-invert">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange collection="posts" currentPage={posts.page} limit={12} totalDocs={posts.totalDocs} />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `BikeTyre Posts`,
  };
}
