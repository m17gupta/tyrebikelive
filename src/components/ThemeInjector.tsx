"use client";

import { useEffect } from "react";
import { applyRuntimeTheme } from "@/lib/theme-runtime";

const RESERVED_PUBLIC_TOP_LEVEL_ROUTES = new Set([
  "admin",
  "api",
  "blog",
  "bookings",
  "branding",
  "business",
  "catalog",
  "catalog-builder",
  "c",
  "cart",
  "checkout",
  "claim",
  "commerce",
  "customers",
  "dashboard",
  "discover",
  "ecommerce",
  "forms",
  "front-builder",
  "front-builder-v2",
  "invoices",
  "kalpbodh",
  "login",
  "marketing",
  "media",
  "onboarding",
  "p",
  "packages",
  "page",
  "pages",
  "portfolio",
  "product",
  "proposal",
  "proposal-builder",
  "profile",
  "portfolio-profile-builder",
  "resume",
  "resume-builder",
  "settings",
  "sources",
  "tenants",
  "terminal",
  "travel",
  "users",
]);

function isLikelyPublicSlugPath(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length !== 1) return false;
  return !RESERVED_PUBLIC_TOP_LEVEL_ROUTES.has(parts[0]);
}

/**
 * Heuristically identifies the tenant slug from the URL structure.
 */
function resolveTenantHint(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "";

  if (pathname.startsWith("/business/")) return parts[1] || "";
  if (pathname.startsWith("/p/tenant/")) return parts[2] || "";

  if (
    pathname.startsWith("/p/") ||
    pathname.startsWith("/c/") ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/catalog/") ||
    pathname.startsWith("/resume/") ||
    pathname.startsWith("/profile/") ||
    pathname.startsWith("/cart/") ||
    pathname.startsWith("/checkout/")
  ) {
    const routeSlug = parts[1] || "";
    return routeSlug.includes("--") ? routeSlug.split("--")[0] : routeSlug;
  }

  if (isLikelyPublicSlugPath(pathname)) return parts[0] || "";
  return "";
}

/**
 * ThemeInjector
 * Headless component that fetches tenant brand tokens and applies them as CSS variables.
 * Works for both authenticated dashboard routes and public storefront pages.
 */
export function ThemeInjector() {
  useEffect(() => {
    const loadTheme = async () => {
      const pathname = window.location.pathname;
      const tenantHint = resolveTenantHint(pathname);

      // 1. Try public business context if on a tenant page
      if (tenantHint) {
        try {
          const publicRes = await fetch(`/api/public/business/${encodeURIComponent(tenantHint)}`);
          if (publicRes.ok) {
            const data = await publicRes.json();
            applyRuntimeTheme(data.brandKit || { brand: data.brand || {} });
            return;
          }
        } catch (error) {
          console.warn("[ThemeInjector] Public theme fetch failed:", error);
        }
      }

      // 2. Cascade through admin/settings routes if authenticated
      const endpoints = ["/api/settings/admin-theme", "/api/settings/brand", "/api/settings/tenant"];

      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint);
          if (res.ok) {
            const data = await res.json();
            if (endpoint === "/api/settings/tenant") {
              applyRuntimeTheme({ brand: data.brand || {} });
            } else {
              applyRuntimeTheme(data || {});
            }
            return;
          }
        } catch (error) {
          // Continue to next endpoint
        }
      }
    };

    const handleRefresh = (event: Event) => {
      const detail = (event as CustomEvent<{ payload?: unknown }>).detail;
      if (detail?.payload && typeof detail.payload === "object") {
        applyRuntimeTheme(detail.payload as Record<string, unknown>);
        return;
      }
      loadTheme().catch(() => {});
    };

    loadTheme().catch(() => {});
    window.addEventListener("kalp-theme-refresh", handleRefresh);
    return () => {
      window.removeEventListener("kalp-theme-refresh", handleRefresh);
    };
  }, []);

  return null;
}
