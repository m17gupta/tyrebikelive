"use client";

import React from "react";
import { useAuth } from "@/components/AdminAuthProvider";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

/**
 * Admin Dashboard Page
 * Provides a high-level overview of the tenant's business performance.
 */
export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      label: "Total Products",
      value: "1,284",
      change: "+12.5%",
      trend: "up",
      icon: <Package className="text-cyan-400" size={24} />,
    },
    {
      label: "Total Sales",
      value: "₹4,28,400",
      change: "+24.8%",
      trend: "up",
      icon: <TrendingUp className="text-emerald-400" size={24} />,
    },
    {
      label: "Active Orders",
      value: "42",
      change: "-4.2%",
      trend: "down",
      icon: <ShoppingCart className="text-amber-400" size={24} />,
    },
    {
      label: "New Customers",
      value: "156",
      change: "+8.1%",
      trend: "up",
      icon: <Users className="text-indigo-400" size={24} />,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back, {user?.name?.split(" ")[0] || "Admin"}!
        </h1>
        <p className="text-slate-500 mt-2">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-slate-100 transition-colors">
                {stat.icon}
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                  stat.trend === "up"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}
                {stat.change}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 tabular-nums">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for charts/recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-2xl bg-white border border-slate-200 h-[400px] flex flex-col items-center justify-center space-y-4 text-center">
          <TrendingUp size={48} className="text-slate-200 mb-2" />
          <h3 className="text-lg font-semibold text-slate-800">
            Revenue Analytics
          </h3>
          <p className="text-slate-400 max-w-xs">
            Interactive charts and detailed performance insights will appear
            here as your store processes data.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-white border border-slate-200 h-[400px] flex flex-col items-center justify-center space-y-4 text-center">
          <Users size={48} className="text-slate-200 mb-2" />
          <h3 className="text-lg font-semibold text-slate-800">
            Recent Customers
          </h3>
          <p className="text-slate-400 max-w-xs">
            A live feed of customer registrations and activity across your
            platform.
          </p>
        </div>
      </div>
    </div>
  );
}
