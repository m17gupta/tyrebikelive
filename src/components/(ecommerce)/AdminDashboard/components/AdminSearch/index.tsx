"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export type MockNavGroupType = {
  label: string;
  entities: {
    label: string | Record<string, string>;
    slug: string;
    type: "collection" | "global";
  }[];
};

export const AdminSearch = ({ groups }: { groups: MockNavGroupType[] }) => {
  const t = useTranslations("adminDashboard");

  return (
    <Command className="group twp relative order-3 w-full overflow-visible rounded-lg border border-b border-payload-elevation-150 bg-payload-elevation-50 text-payload-foreground shadow-md md:order-0 md:w-fit md:min-w-[450px]">
      <CommandInput
        className="border-payload-elevation-150 bg-payload-elevation-50 text-base opacity-75 placeholder:text-payload-elevation-900"
        placeholder={t("search")}
      />
      <CommandList className="w-full-border twp absolute -left-px top-full z-50 hidden h-fit max-h-[350px] -translate-y-px border-b border-l border-r border-payload-elevation-150 border-l-payload-elevation-150 border-r-payload-elevation-150 bg-payload-elevation-50 group-focus-within:block">
        <CommandEmpty>{t("searchNoResults")}</CommandEmpty>
        {groups.map((group, index) => (
          <Fragment key={`${group.label}-${index}`}>
            <CommandGroup
              key={`${group.label}-${index}`}
              heading={group.label}
              className="text-base text-payload-foreground"
            >
              {group.entities.map(({ label, slug, type }) => {
                let href = "/";
                let id: string = slug;

                if (type === "collection") {
                  href = `/admin/collections/${slug}`;
                  id = `nav-${slug}`;
                }

                if (type === "global") {
                  href = `/admin/globals/${slug}`;
                  id = `nav-global-${slug}`;
                }
                
                // Handling string directly since we are mocking translation
                const displayLabel = typeof label === 'string' ? label : label.en || String(label);

                return (
                  <CommandItem
                    asChild
                    key={`${slug}-${index}-${id}`}
                    id={id}
                    className="cursor-pointer text-base data-[selected='true']:bg-payload-elevation-150 data-[selected=true]:text-payload-foreground"
                  >
                    <Link href={href}>{displayLabel}</Link>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {index === groups.length - 1 ? null : <CommandSeparator className="bg-payload-elevation-50" />}
          </Fragment>
        ))}
      </CommandList>
    </Command>
  );
};

