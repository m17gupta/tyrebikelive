import Image from "next/image";
import Link from "next/link";

import { NavHamburger } from "./NavHamburger";
import { NavWrapper } from "./NavWrapper";
import { NavClient } from "./index.client";

export const baseClass = "nav";

type NavGroupType = {
  label: string;
  entities: {
    label: string | Record<string, string>;
    slug: string;
    type: "collection" | "global";
  }[];
};

// Static nav groups for standalone KalpGo mode
const adminGroups: NavGroupType[] = [
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
  {
    label: "Website Management",
    entities: [
      { label: "Websites", slug: "websites", type: "collection" },
    ],
  },
];

export const AdminNavbar = () => {
  return (
    <NavWrapper baseClass={baseClass}>
      <div className="flex-shrink-0 bg-[#F9FAFB] pb-4">
        <div className="relative h-10 w-40">
          <img
            src="/assets/img/Goodyear-Bicyle-Logo-Black-logo.png"
            alt="Goodyear"
            className="object-contain object-left"
          />
        </div>
      </div>

      <nav className={`${baseClass}__wrap`}>
        <NavClient groups={adminGroups} />
      </nav>

      <div className={`${baseClass}__header`}>
        <div className={`${baseClass}__header-content`}>
          <NavHamburger baseClass={baseClass} />
        </div>
      </div>
    </NavWrapper>
  );
};

