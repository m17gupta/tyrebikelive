'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
type AccessContext = any;
import { getRoleMeta, isScopedRoleView, resolveRoleProfileForView, resolveRoleSwitchCandidates, type RoleProfileKey } from '@/lib/role-scope';

export type MockAuthContextType = AccessContext & {
    roleRank: number;
    switchRole: (roleProfile: string) => void;
    currentProfile: RoleProfileKey;
    sessionRole: RoleProfileKey;
    availableProfiles: RoleProfileKey[];
    isScopedRoleView: boolean;
    user: { email: string; name: string; role: string; tenantKey: string; subscriptionLevel: string } | null;
    logout: () => void;
    isLoading: boolean;
    refreshSession: () => Promise<void>;
};

const AuthContext = createContext<MockAuthContextType | null>(null);

const RESERVED_PUBLIC_TOP_LEVEL_ROUTES = new Set([
    'admin',
    'blog',
    'bookings',
    'branding',
    'business',
    'catalog',
    'catalog-builder',
    'c',
    'cart',
    'checkout',
    'claim',
    'commerce',
    'customers',
    'dashboard',
    'discover',
    'ecommerce',
    'forms',
    'front-builder',
    'front-builder-v2',
    'invoices',
    'kalpbodh',
    'login',
    'marketing',
    'media',
    'onboarding',
    'p',
    'packages',
    'page',
    'pages',
    'portfolio',
    'product',
    'proposal',
    'proposal-builder',
    'profile',
    'portfolio-profile-builder',
    'resume',
    'resume-builder',
    'settings',
    'sources',
    'tenants',
    'terminal',
    'travel',
    'users',
]);

function isLikelyPublicSlugPath(pathname: string): boolean {
    const pathnameSegments = pathname.split('/').filter(Boolean);
    if (pathnameSegments.length !== 1) return false;
    return !RESERVED_PUBLIC_TOP_LEVEL_ROUTES.has(pathnameSegments[0]);
}

function isAuthBypassPublicPath(pathname: string): boolean {
    return pathname === '/'
        || pathname.startsWith('/packages/')
        || pathname.startsWith('/business/')
        || pathname.startsWith('/proposal/')
        || pathname.startsWith('/catalog/')
        || pathname.startsWith('/resume/')
        || pathname.startsWith('/profile/')
        || pathname === '/catalog-builder'
        || pathname === '/front-builder'
        || pathname === '/front-builder-v2'
        || pathname === '/resume-builder'
        || pathname === '/portfolio-profile-builder'
        || pathname === '/claim'
        || pathname.startsWith('/claim/')
        || pathname === '/discover'
        || pathname.startsWith('/discover/')
        || pathname.startsWith('/p/')
        || pathname.startsWith('/c/')
        || pathname.startsWith('/product/')
        || pathname.startsWith('/cart/')
        || pathname.startsWith('/checkout/')
        || isLikelyPublicSlugPath(pathname);
}

function getRoleViewStorageKey(user: { email: string; tenantKey: string } | null): string | null {
    if (!user?.email || !user?.tenantKey) return null;
    return `kalp_role_view::${user.tenantKey}::${user.email}`.toLowerCase();
}

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<MockAuthContextType['user']>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [profileKey, setProfileKey] = useState<RoleProfileKey>('tenant_admin');
    const isLoggingOut = useRef(false);
    const lastCheckedPath = useRef<string | null>(null);

    const fetchSession = React.useCallback(() => {
        setIsLoading(true);
        return fetch('/api/customer/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.authenticated && data.user) {
                    setUser(data.user);
                    const sessionRole = resolveRoleProfileForView(data.user.role, data.user.role);
                    const storageKey = getRoleViewStorageKey(data.user);
                    const persistedRole = storageKey ? window.localStorage.getItem(storageKey) : null;
                    setProfileKey(resolveRoleProfileForView(sessionRole, persistedRole));
                } else {
                    setUser(null);
                }
            })
            .catch(() => { setUser(null); })
            .finally(() => setIsLoading(false));
    }, []);

    // Re-fetch session on every pathname change so a fresh cookie after login is
    // picked up before the redirect guard runs.

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

    //Route-aware redirect guard. Keeps public routes like /discover open without login.
    useEffect(() => {
        if (isLoading) return;
        if (lastCheckedPath.current !== pathname) return; // Wait for session sync for the current path
        if (user) return;
        const isPublicPath = isAuthBypassPublicPath(pathname);
        if (pathname === '/login' || pathname === '/onboarding' || isPublicPath) return;
        router.replace('/login');
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
        console.log("logout");
        isLoggingOut.current = true;
        setUser(null);
        await fetch('/api/customer/auth/logout', { method: 'POST' });
        const storageKey = getRoleViewStorageKey(user);
        if (storageKey) window.localStorage.removeItem(storageKey);
        router.push('/');
    };

    // Compose the access context from the active view profile
    const sessionRole = resolveRoleProfileForView(user?.role || 'tenant_admin', user?.role || 'tenant_admin');
    const effectiveProfileKey = resolveRoleProfileForView(sessionRole, profileKey);
    const roleMeta = getRoleMeta(effectiveProfileKey);
    const availableProfiles = resolveRoleSwitchCandidates(sessionRole);

    const contextValue: MockAuthContextType = {
        tenantId: user?.tenantKey || 'demo',
        userId: user?.email || 'anonymous',
        roleIds: [effectiveProfileKey],
        roleRank: roleMeta.rank,
        subscriptionLevel: user?.subscriptionLevel || 'starter',
        flags: { beta: sessionRole === 'platform_owner' },
        currentProfile: effectiveProfileKey,
        sessionRole,
        availableProfiles,
        isScopedRoleView: isScopedRoleView(sessionRole, effectiveProfileKey),
        switchRole,
        user,
        logout,
        isLoading,
        refreshSession: fetchSession,
        enabledModules: ['marketing', 'sales', 'content', 'email']
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an CustomerAuthProvider');
    return ctx;
}

