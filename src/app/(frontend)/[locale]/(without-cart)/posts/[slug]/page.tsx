import { draftMode } from "next/headers";
import React from "react";

import { LivePreviewListener } from "@/components/LivePreviewListener";
import { PayloadRedirects } from "@/components/PayloadRedirects";
import RichText from "@/components/RichText";
import { PostHero } from "@/components/heros/PostHero";
import { type Locale } from "@/i18n/config";

import PageClient from "./page.client";

import type { Post } from "@/types";
import type { Metadata } from "next";

// Force dynamic rendering due to draftMode() usage
export const dynamic = "force-dynamic";

type Args = {
  params: Promise<{
    slug?: string;
    locale: Locale;
  }>;
};

export default async function PostPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug = "", locale } = await paramsPromise;
  const url = "/posts/" + slug;

  // TODO: Replace with your custom API call to fetch post by slug & locale
  // e.g. const post = await fetchPost(slug, locale);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post: any = null;


  if (!post) return <PayloadRedirects locale={locale} url={url} />;

  return (
    <article className="pb-16 pt-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects locale={locale} disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="mx-auto max-w-3xl" data={post.content} enableGutter={false} />
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = "" } = await paramsPromise;
  return {
    title: `Post - ${slug}`,
  };
}
