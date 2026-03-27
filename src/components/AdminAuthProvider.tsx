"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { useRouter, usePathname } from "next/navigation";
import {
  getRoleMeta,
  isScopedRoleView,
  resolveRoleProfileForView,
  resolveRoleSwitchCandidates,
  type RoleProfileKey,
} from "@/lib/role-scope";

export type MockAuthContextType = {
  tenantId: string;
  userId: string;
  roleIds: string[];
  roleRank: number;
  subscriptionLevel: string;
  flags: Record<string, boolean>;
  currentProfile: RoleProfileKey;
  sessionRole: RoleProfileKey;
  availableProfiles: RoleProfileKey[];
  isScopedRoleView: boolean;
  user: {
    email: string;
    name: string;
    role: string;
    tenantKey: string;
    subscriptionLevel: string;
  } | null;
  switchRole: (roleProfile: string) => void;
  logout: () => void;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  enabledModules: string[];
};

const AuthContext = createContext<MockAuthContextType | null>(null);

const RESERVED_PUBLIC_TOP_LEVEL_ROUTES = new Set([
  "kalpadmin",
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
  const pathnameSegments = pathname.split("/").filter(Boolean);
  if (pathnameSegments.length !== 1) return false;
  return !RESERVED_PUBLIC_TOP_LEVEL_ROUTES.has(pathnameSegments[0]);
}

function isAuthBypassPublicPath(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/packages/") ||
    pathname.startsWith("/business/") ||
    pathname.startsWith("/proposal/") ||
    pathname.startsWith("/catalog/") ||
    pathname.startsWith("/resume/") ||
    pathname.startsWith("/profile/") ||
    pathname === "/catalog-builder" ||
    pathname === "/front-builder" ||
    pathname === "/front-builder-v2" ||
    pathname === "/resume-builder" ||
    pathname === "/portfolio-profile-builder" ||
    pathname === "/claim" ||
    pathname.startsWith("/claim/") ||
    pathname === "/discover" ||
    pathname.startsWith("/discover/") ||
    pathname.startsWith("/p/") ||
    pathname.startsWith("/c/") ||
    pathname.startsWith("/product/") ||
    pathname.startsWith("/cart/") ||
    pathname.startsWith("/checkout/") ||
    isLikelyPublicSlugPath(pathname)
  );
}

function getRoleViewStorageKey(
  user: { email: string; tenantKey: string } | null,
): string | null {
  if (!user?.email || !user?.tenantKey) return null;
  return `kalp_role_view::${user.tenantKey}::${user.email}`.toLowerCase();
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<MockAuthContextType["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileKey, setProfileKey] = useState<RoleProfileKey>("tenant_admin");
  const isLoggingOut = useRef(false);
  const lastCheckedPath = useRef<string | null>(null);

  const fetchSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/auth/me");
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
        const sessionRole = resolveRoleProfileForView(
          data.user.role,
          data.user.role,
        );
        const storageKey = getRoleViewStorageKey(data.user);
        const persistedRole = storageKey
          ? window.localStorage.getItem(storageKey)
          : null;
        setProfileKey(resolveRoleProfileForView(sessionRole, persistedRole));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("[AdminAuthProvider] Session fetch failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggingOut.current) {
      isLoggingOut.current = false;
      lastCheckedPath.current = pathname;
      return;
    }
    fetchSession().then(() => {
      lastCheckedPath.current = pathname;
    });
  }, [pathname, fetchSession]);

  useEffect(() => {
    if (isLoading) return;
    if (lastCheckedPath.current !== pathname) return;
    if (user) return;

    const isPublicPath = isAuthBypassPublicPath(pathname);

    console.log("isPublicPath", isPublicPath, pathname);
    if (
      pathname === "/kalpadmin/login" ||
      pathname === "/onboarding" ||
      isPublicPath
    )
      return;

    router.replace("/kalpadmin/login");
  }, [isLoading, pathname, router, user]);

  useEffect(() => {
    const storageKey = getRoleViewStorageKey(user);
    if (!storageKey) return;
    window.localStorage.setItem(storageKey, profileKey);
  }, [user, profileKey]);

  const switchRole = (newProfile: string) => {
    if (!user?.role) return;
    setProfileKey(resolveRoleProfileForView(user.role, newProfile));
  };

  const logout = async () => {
    isLoggingOut.current = true;
    const storageKey = getRoleViewStorageKey(user);
    setUser(null);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("[AdminAuthProvider] Logout API failed:", error);
    }
    if (storageKey) window.localStorage.removeItem(storageKey);
    router.push("/kalpadmin/login");
  };

  const sessionRole = resolveRoleProfileForView(
    user?.role || "tenant_admin",
    user?.role || "tenant_admin",
  );
  const effectiveProfileKey = resolveRoleProfileForView(
    sessionRole,
    profileKey,
  );
  const roleMeta = getRoleMeta(effectiveProfileKey);
  const availableProfiles = resolveRoleSwitchCandidates(sessionRole);

  const contextValue: MockAuthContextType = {
    tenantId: user?.tenantKey || "demo",
    userId: user?.email || "anonymous",
    roleIds: [effectiveProfileKey],
    roleRank: roleMeta.rank,
    subscriptionLevel: user?.subscriptionLevel || "starter",
    flags: { beta: sessionRole === "platform_owner" },
    currentProfile: effectiveProfileKey,
    sessionRole,
    availableProfiles,
    isScopedRoleView: isScopedRoleView(sessionRole, effectiveProfileKey),
    switchRole,
    user,
    logout,
    isLoading,
    refreshSession: fetchSession,
    enabledModules: ["marketing", "sales", "content", "email"],
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AdminAuthProvider");
  return ctx;
}
