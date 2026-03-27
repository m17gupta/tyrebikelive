import jwt, { type JwtPayload } from "jsonwebtoken";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import configPromise from "@payload-config";

const payloadToken = "payload-token";

export async function GET(req: Request): Promise<Response> {
  const payload = await getPayload({ config: configPromise });
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const collection = searchParams.get("collection") || "pages";
  const id = searchParams.get("id");

  // Extract token from cookies
  const cookieHeader = req.headers.get("cookie");
  let token: string | undefined;

  if (cookieHeader) {
    const cookies = cookieHeader.split(";").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>,
    );
    token = cookies[payloadToken];
  }

  if (!path) {
    return NextResponse.json({ error: "No path provided" }, { status: 400 });
  }

  // Allow preview mode without authentication for development/demo purposes
  // In production, you might want to add some form of authorization
  let user: User | JwtPayload | string | null = null;
  let isAuthenticated = false;

  if (token) {
    try {
      user = jwt.verify(token, payload.secret);
      isAuthenticated = true;
    } catch (error) {
      payload.logger.warn("Invalid token for preview mode, allowing unauthenticated preview:", error);
    }
  }

  // Allow preview for authenticated admins or unauthenticated users (for demo purposes)
  if (isAuthenticated && user && (user as User).collection !== "administrators") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  // Enable draft mode
  const draft = await draftMode();
  draft.enable();

  // Log for debugging
  console.log("Enable preview - Original path:", path, "Locale:", searchParams.get("locale"));

  // Construct preview URL
  const previewUrl = `/next/preview?path=${encodeURIComponent(path)}&locale=${searchParams.get("locale") || "en"}`;

  console.log("Enable preview - Preview URL:", previewUrl);

  return NextResponse.json({
    success: true,
    previewUrl,
    message: "Preview mode enabled",
  });
}

