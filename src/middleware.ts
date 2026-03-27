// import createMiddleware from "next-intl/middleware";

// import { routing } from "./i18n/routing";

// export default createMiddleware(routing);

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ["/", "/(pl|en)/:path*", "/((?!api|_next|next|admin|route|proxy|.*\\..*).*)"],
// };

import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// 1️⃣ Create the i18n middleware from next-intl
const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {

  const {pathname} = req.nextUrl

   const pathWithoutLocale = pathname.replace(/^\/(en|pl|hr)/, "");
  // --- Tenant extraction ---


  if (pathWithoutLocale.startsWith("/checkout")) {
    const token = req.cookies.get("payload-token")?.value; // adjust name for your auth cookie

    if (!token) {
      const locale = pathname.split("/")[1]; // 'en', 'pl', 'hr'
      const redirectURL = req.nextUrl.clone();
      redirectURL.pathname = `/${locale}/login`;
      return Response.redirect(redirectURL);
    }
  }

  const host = req.headers.get("host") || "";
  const domain = host.replace(/:\d+$/, ""); // remove port
  const parts = domain.split(".");
  let tenant = "default";

  if (parts.length > 2) {
    tenant = parts[0]; // e.g. subdomain.example.com → subdomain
  }

  // --- Run next-intl middleware ---
  const response = intlMiddleware(req);

  // --- Add tenant info to response headers ---
  response.headers.set("x-tenant", tenant);
  response.headers.set("x-tenant-domain", domain);

  return response;
}

// 2️⃣ Merge both matchers (i18n + custom middleware)
export const config = {
  matcher: [
    "/",
    "/(pl|en|hr)/:path*",
    "/((?!api|_next|next|admin|kalpadmin|route|proxy|.*\\..*).*)",
  ],
};

