import React from "react";

export const ClientPanel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Basic Client Panel Stub */}
      <aside className="w-64 bg-white shadow-sm hidden md:block border-r border-gray-100">
        <nav className="p-4 space-y-2">
          <a href="/account" className="block text-sm font-medium text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">Dashboard</a>
          <a href="/account/orders" className="block text-sm font-medium text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">Orders</a>
          <a href="/account/settings" className="block text-sm font-medium text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">Settings</a>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
