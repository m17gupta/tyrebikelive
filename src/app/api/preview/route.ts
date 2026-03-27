import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "home";
  const locale = searchParams.get("locale") || "en";

  // Enable draft mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the page being previewed
  const redirectUrl = `/${locale}/${slug === "home" ? "" : slug}`;
  redirect(redirectUrl);
}

