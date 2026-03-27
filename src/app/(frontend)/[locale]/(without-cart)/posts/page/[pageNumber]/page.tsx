import { notFound } from "next/navigation";
import React from "react";

import { CollectionArchive } from "@/components/CollectionArchive";
import { PageRange } from "@/components/PageRange";
import { Pagination } from "@/components/Pagination";
import { type Locale } from "@/i18n/config";

import PageClient from "./page.client";

import type { Metadata } from "next/types";

export const revalidate = 600;

type Args = {
  params: Promise<{
    pageNumber: string;
    locale: Locale;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise;

  const sanitizedPageNumber = Number(pageNumber);
  if (!Number.isInteger(sanitizedPageNumber)) notFound();

  // TODO: Replace with your custom API call to fetch paginated posts
  // e.g. const posts = await fetchPosts({ page: sanitizedPageNumber, limit: 12, locale });
  const posts = { docs: [], page: sanitizedPageNumber, totalDocs: 0, totalPages: 1 };

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange collection="posts" currentPage={posts.page} limit={12} totalDocs={posts.totalDocs} />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise;
  return {
    title: `BikeTyre Posts Page ${pageNumber || ""}`,
  };
}
