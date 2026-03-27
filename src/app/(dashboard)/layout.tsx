import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/(frontend)/globals.css";
import { AdminLayout } from "@/components/AdminLayout";
import { AdminAuthProvider } from "@/components/AdminAuthProvider";
import { ThemeInjector } from "@/components/ThemeInjector";
import ReduxProvider from "@/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KalpGo Admin Dashboard",
  description: "Secure multi-tenant administrative suite for KalpGo.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} antialiased`}>
      <AdminAuthProvider>
        <ReduxProvider>
          <ThemeInjector />
          <AdminLayout>{children}</AdminLayout>
        </ReduxProvider>
      </AdminAuthProvider>
    </div>
  );
}
