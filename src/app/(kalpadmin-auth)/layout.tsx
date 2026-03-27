import React from "react";
import type { Metadata } from "next";
import "@/app/(frontend)/globals.css";

export const metadata: Metadata = {
  title: "KalpGo Admin — Sign In",
  description: "Sign in to your KalpGo administrative dashboard.",
};

export default function KalpAdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="antialiased font-sans">
      {children}
    </div>
  );
}
