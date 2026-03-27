"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { baseClass } from "./index";
import { getNavIcon } from "./navIconMap";

type NavGroupType = {
  label: string;
  entities: {
    label: string | Record<string, string>;
    slug: string;
    type: "collection" | "global";
  }[];
};

type Props = {
  groups: NavGroupType[];
  navPreferences?: Record<string, { open?: boolean }> | null;
};

const collectionOrder: string[] = [
  "Website Management",
  "Customer Management",
  "Products",
  "Orders",
  "Page Settings",
  "Shop settings",
  "Courier integrations",
  "Payments settings",
  "Administration",
  "Collections",
  "Paywalls",
];

export const NavClient = ({ groups, navPreferences }: Props) => {
  const pathname = usePathname();
  const adminRoute = "/admin";

  const updatedGroups = useMemo(() => {
    const tenantsGroup = groups.find((group) => group.label === "Website Management");
    const needsModification =
      tenantsGroup && !tenantsGroup.entities.some((e) => e.slug === "websites/create");

    let resultGroups = groups;
    if (needsModification) {
      const clonedGroups = structuredClone(groups);
      const clonedTenantsGroup = clonedGroups.find((group) => group.label === "Website Management");
      if (clonedTenantsGroup) {
        clonedTenantsGroup.entities.push({
          slug: "websites/create",
          type: "collection",
          label: "Create Websites",
        });
      }
      resultGroups = clonedGroups;
    }

    return [...resultGroups].sort((a: any, b: any) => {
      const aLabel: string = typeof a?.label === "string" ? a.label : "";
      const bLabel: string = typeof b?.label === "string" ? b.label : "";
      const aIndex = collectionOrder.indexOf(aLabel);
      const bIndex = collectionOrder.indexOf(bLabel);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });
  }, [groups]);

  return (
    <>
      {updatedGroups.map(({ entities, label }, key) => {
        return (
          <div key={key} className={`${baseClass}__group`}>
            {label && (
              <p className={`${baseClass}__group-label text-xs font-semibold uppercase opacity-60 px-2 mb-1`}>
                {typeof label === "string" ? label : ""}
              </p>
            )}
            {entities.map(({ slug, type, label }, i) => {
              const href =
                type === "collection"
                  ? `${adminRoute}/collections/${slug}`
                  : `${adminRoute}/globals/${slug}`;
              const id =
                type === "collection" ? `nav-${slug}` : `nav-global-${slug}`;
              const activeCollection = pathname === href;
              const Icon = getNavIcon(slug as string);
              const displayLabel = typeof label === "string" ? label : label.en || String(label);

              return (
                <Link
                  className={[
                    `${baseClass}__link twp flex items-center py-2 hover:bg-black hover:rounded-[4px] hover:text-white`,
                    activeCollection && `active`,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  href={href}
                  id={id}
                  key={i}
                  style={{
                    textDecoration: "none",
                    backgroundColor: activeCollection ? "black" : undefined,
                    borderRadius: activeCollection ? "4px" : undefined,
                    marginTop: "2px",
                    paddingLeft: "8px",
                    color: activeCollection ? "white" : undefined,
                  }}
                  prefetch={false}
                >
                  {activeCollection && (
                    <div className={`${baseClass}__link-indicator`} />
                  )}
                  {Icon && (
                    <Icon width={20} height={20} className={`${baseClass}__icon mr-2`} />
                  )}
                  <span className={`${baseClass}__link-label text-lg leading-0`}>
                    {displayLabel}
                  </span>
                </Link>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

