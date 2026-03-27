import jwt, { type JwtPayload } from "jsonwebtoken";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { type Locale } from "@/i18n/config";
import configPromise from "@payload-config";

const payloadToken = "payload-token";

export async function GET(
  req: Request & {
    cookies: {
      get: (name: string) => {
        value: string;
      };
    };
  },
): Promise<Response> {
  const payload = await getPayload({ config: configPromise });
  const token = req.cookies.get(payloadToken)?.value;
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const locale = searchParams.get("locale") as Locale;
  const draft = await draftMode();

  if (!path) {
    return new Response("No path provided", { status: 404 });
  }

  // Allow preview mode without authentication for development/demo purposes
  let user: User | JwtPayload | string | null = null;
  let isAuthenticated = false;

  if (token) {
    try {
      user = jwt.verify(token, payload.secret);
      isAuthenticated = true;
    } catch (error) {
      payload.logger.warn("Invalid token for preview, allowing unauthenticated preview:", error);
    }
  }

  // Allow preview for authenticated admins or unauthenticated users (for demo purposes)
  if (isAuthenticated && user && (user as User).collection !== "administrators") {
    draft.disable();
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  draft.enable();

  // Since we're already getting the full path with locale, just redirect to it directly
  console.log("Preview redirect - Redirecting to path:", path);

  return redirect(path);
}

