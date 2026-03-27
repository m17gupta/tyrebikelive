"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AdminDatePicker } from "./components/AdminDatePicker";
import { AdminSearch, type MockNavGroupType } from "./components/AdminSearch";
import { AdminTabs } from "./components/AdminTabs";
import { AdminViews } from "./components/views";
import { Button } from "@/components/ui/button";

export const AdminDashboard = () => {
  const t = useTranslations("adminDashboard");

  // Static nav groups for standalone mode (no Payload config available)
  const groups: MockNavGroupType[] = [
    {
      label: "Products",
      entities: [
        { label: "All Products", slug: "products", type: "collection" },
      ],
    },
    {
      label: "Orders",
      entities: [
        { label: "All Orders", slug: "orders", type: "collection" },
      ],
    },
  ];

  return (
    <>
      <main className="gutter--left gutter--right dashboard__wrap">
        <section className="flex flex-wrap items-center gap-4">
          <h1 className="mr-auto">{t("linkTitle")}</h1>
          <AdminSearch groups={groups} />
          <Button asChild className="my-0 block min-h-11">
            <Link href="/admin/collections/products/create">+ {t("addProduct")}</Link>
          </Button>
        </section>
        <section className="twp my-6 flex flex-col justify-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          <AdminTabs />
          <AdminDatePicker />
        </section>
        <AdminViews />
      </main>
    </>
  );
};

