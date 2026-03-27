"use client";
import { useTranslations } from "next-intl";
import { ChartNoAxesCombined } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminDashboardNavLink = () => {
  const t = useTranslations("adminDashboard");
  const pathname = usePathname();

  return (
    <div>
      <Link
        href="/admin"
        className={`nav__link twp mb-2.5 flex items-center py-2 ${pathname === "/admin" ? "active" : ""}`}
      >
        <ChartNoAxesCombined width={20} height={20} className="mr-2" />
        {pathname === "/admin" && <div className="nav__link-indicator"></div>}
        {t("linkTitle")}
      </Link>
    </div>
  );
};

