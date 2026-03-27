"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tags,
  AlignLeft,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "./AdminAuthProvider";
import GetAllAttributes from "@/admin/useEffectForGet/GetAllAttributes";
import GetAllCategories from "@/admin/useEffectForGet/GetAllCategories";
import GetAllProducts from "@/admin/useEffectForGet/GetAllProducts";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTenant?: string;
}

const SIDEBAR_LINKS = [
  {
    href: "/kalpadmin",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    href: "/kalpadmin/products",
    label: "Products",
    icon: <Package size={18} />,
  },
  {
    href: "/kalpadmin/categories",
    label: "Categories",
    icon: <AlignLeft size={18} />,
  },
  {
    href: "/kalpadmin/attributes",
    label: "Attributes",
    icon: <Tags size={18} />,
  },
  {
    href: "/kalpadmin/orders",
    label: "Orders",
    icon: <ShoppingCart size={18} />,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isPathActive = (href: string) => {
    if (href === "/kalpadmin")
      return pathname === "/kalpadmin" || pathname === "/kalpadmin/";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Mobile Header */}
      <GetAllAttributes />
      <GetAllCategories />
      <GetAllProducts />
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
        <div className="font-bold text-lg tracking-tight text-slate-900">
          KalpGo Admin
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-600"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full bg-white border-r border-slate-200 transition-all duration-300 ease-in-out z-50 flex flex-col
          ${isMobileMenuOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"} 
          ${isSidebarCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 flex-shrink-0">
          <div
            className={`flex items-center gap-2 overflow-hidden transition-all ${isSidebarCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center font-bold text-white shrink-0">
              K
            </div>
            <span className="font-bold text-lg text-slate-900 whitespace-nowrap">
              KalpGo
            </span>
          </div>
          {isSidebarCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center font-bold text-white mx-auto">
              K
            </div>
          )}
        </div>

        {/* Sidebar Content */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          <div
            className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-3 ${isSidebarCollapsed ? "text-center" : ""}`}
          >
            {isSidebarCollapsed ? "..." : "Management"}
          </div>

          {SIDEBAR_LINKS.map((link) => {
            const active = isPathActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-slate-900 text-white font-semibold shadow-lg shadow-slate-200"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                } ${isSidebarCollapsed ? "justify-center" : ""}`}
                title={isSidebarCollapsed ? link.label : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span
                  className={`shrink-0 transition-transform ${active ? "scale-110" : "group-hover:scale-110"}`}
                >
                  {link.icon}
                </span>
                <span
                  className={`transition-all duration-300 ${isSidebarCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block"}`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 ${isSidebarCollapsed ? "justify-center" : ""}`}
          >
            <LogOut size={18} className="shrink-0" />
            <span
              className={`transition-all duration-300 ${isSidebarCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block"}`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden pt-16 lg:pt-0 bg-slate-50">
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">{children}</div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
