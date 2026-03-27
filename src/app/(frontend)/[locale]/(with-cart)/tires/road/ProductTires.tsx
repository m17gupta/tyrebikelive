"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type SeriesKey = "All" | "UHP" | "FS" | "HP" | "P";

type SizeRow = {
  airRetention: string;
  size: string;
  color: string;
};

type Product = {
  series: Exclude<SeriesKey, "All">;
  name: string;
  subtitle: string; // small text above title
  price: string;
  href: string;
  image: string;
  chips: { label: string; value: string }[];
  sizesTitle: string;
  sizes: SizeRow[];
};

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const roadTabs: { key: SeriesKey; label: string }[] = [
  { key: "All", label: "Eagle F1 SuperSport R" },
  { key: "UHP", label: "Eagle F1R" },
  { key: "FS", label: "Vector 4Seasons" },
  { key: "HP", label: "Eagle F1R Z29 Aero" },
  { key: "P", label: "Vector R" },
  { key: "P", label: "Eagle" },
  { key: "P", label: "Vector Sport" },
  { key: "P", label: "Eagle Sport" },

];

// NOTE: Replace images/links with your real ones
const products: Product[] = [
  {
    series: "UHP",
    name: "Eagle F1 SuperSport R",
    subtitle: "RACE / PURE SPEED",
    price: "$95.00 – $120.00",
    href: "/shop/eagle-f1-supersport-r",
    image:
      "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png",
    chips: [
      { label: "Air", value: "Tubeless Ready" },
      { label: "Casing", value: "120tpi" },
      { label: "Compound", value: "Dynamic UHP" },
    ],
    sizesTitle: "SIZES - EAGLE F1 SUPERSport R",
    sizes: [
      { airRetention: "Tube Type", size: "700x25", color: "Black" },
      { airRetention: "Tube Type", size: "700x28", color: "Black" },
      { airRetention: "Tube Type", size: "700x25", color: "Transparent" },
      { airRetention: "Tube Type", size: "700x28", color: "Transparent" },
      { airRetention: "Tubeless Ready", size: "700x25", color: "Black" },
      { airRetention: "Tubeless Ready", size: "700x28", color: "Black" },
      { airRetention: "Tubeless Ready", size: "700x30", color: "Black" },
      { airRetention: "Tubeless Ready", size: "700x25", color: "Transparent" },
      { airRetention: "Tubeless Ready", size: "700x28", color: "Transparent" },
      { airRetention: "Tubeless Ready", size: "700x30", color: "Transparent" },
    ],
  },
  {
    series: "UHP",
    name: "Eagle F1R",
    subtitle: "FAST ROAD / AERO",
    price: "$90.00 – $110.00",
    href: "/shop/eagle-f1r",
    image:
      "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png",
    chips: [
      { label: "Air", value: "Tubeless Ready" },
      { label: "Casing", value: "120tpi" },
      { label: "Bead", value: "Folding" },
    ],
    sizesTitle: "SIZES - EAGLE F1R",
    sizes: [
      { airRetention: "Tubeless Ready", size: "700x28", color: "Black" },
      { airRetention: "Tubeless Ready", size: "700x30", color: "Black" },
      { airRetention: "Tube Type", size: "700x28", color: "Black" },
      { airRetention: "Tube Type", size: "700x30", color: "Black" },
    ],
  },
  {
    series: "HP",
    name: "Vector 4Seasons",
    subtitle: "ALL-SEASON / ENDURANCE",
    price: "$70.00 – $95.00",
    href: "/shop/vector-4seasons",
    image:
      "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png",
    chips: [
      { label: "Grip", value: "Wet Focus" },
      { label: "Protection", value: "Enhanced" },
      { label: "Use", value: "All-Season" },
    ],
    sizesTitle: "SIZES - VECTOR 4SEASONS",
    sizes: [
      { airRetention: "Tube Type", size: "700x28", color: "Black" },
      { airRetention: "Tube Type", size: "700x32", color: "Black" },
      { airRetention: "Tubeless Ready", size: "700x32", color: "Black" },
    ],
  },
  {
    series: "FS",
    name: "Eagle F1R Z29 Aero",
    subtitle: "FITMENT SERIES",
    price: "$105.00 – $135.00",
    href: "/shop/eagle-f1r-z29-aero",
    image:
      "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png",
    chips: [
      { label: "Air", value: "Tubeless Ready" },
      { label: "Casing", value: "120tpi" },
      { label: "Focus", value: "Aero" },
    ],
    sizesTitle: "SIZES - EAGLE F1R Z29 AERO",
    sizes: [
      { airRetention: "Tubeless Ready", size: "700x29", color: "Black" },
      { airRetention: "Tube Type", size: "700x29", color: "Black" },
    ],
  },
  {
    series: "FS",
    name: "Vector R",
    subtitle: "FITMENT SERIES",
    price: "$85.00 – $110.00",
    href: "/shop/vector-r",
    image:
      "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png",
    chips: [
      { label: "Air", value: "Tubeless Ready" },
      { label: "Compound", value: "Dynamic" },
      { label: "Use", value: "Race" },
    ],
    sizesTitle: "SIZES - VECTOR R",
    sizes: [
      { airRetention: "Tubeless Ready", size: "700x28", color: "Black" },
      { airRetention: "Tubeless Ready", size: "700x30", color: "Black" },
    ],
  },
  {
    series: "HP",
    name: "Eagle",
    subtitle: "HIGH-PERFORMANCE",
    price: "$65.00 – $85.00",
    href: "/shop/eagle",
    image:
      "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png",
    chips: [
      { label: "Air", value: "Tube Type" },
      { label: "Use", value: "Training" },
      { label: "Bead", value: "Folding" },
    ],
    sizesTitle: "SIZES - EAGLE",
    sizes: [
      { airRetention: "Tube Type", size: "700x25", color: "Black" },
      { airRetention: "Tube Type", size: "700x28", color: "Black" },
    ],
  },
  {
    series: "HP",
    name: "Vector Sport",
    subtitle: "HIGH-PERFORMANCE",
    price: "$60.00 – $80.00",
    href: "/shop/vector-sport",
    image:
      "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png",
    chips: [
      { label: "Air", value: "Tube Type" },
      { label: "Grip", value: "Balanced" },
      { label: "Use", value: "Sport" },
    ],
    sizesTitle: "SIZES - VECTOR SPORT",
    sizes: [
      { airRetention: "Tube Type", size: "700x28", color: "Black" },
      { airRetention: "Tube Type", size: "700x32", color: "Black" },
    ],
  },
  {
    series: "P",
    name: "Eagle Sport",
    subtitle: "PERFORMANCE",
    price: "$45.00 – $65.00",
    href: "/shop/eagle-sport",
    image:
      "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png",
    chips: [
      { label: "Air", value: "Tube Type" },
      { label: "Use", value: "Everyday" },
      { label: "Bead", value: "Wire" },
    ],
    sizesTitle: "SIZES - EAGLE SPORT",
    sizes: [
      { airRetention: "Tube Type", size: "700x28", color: "Black" },
      { airRetention: "Tube Type", size: "700x32", color: "Black" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                  SECTION                                   */
/* -------------------------------------------------------------------------- */

export default function BrowseRoadTiresSection() {
  const [active, setActive] = useState<SeriesKey>("All");

  const filtered = useMemo(() => {
    if (active === "All") return products;
    return products.filter((p) => p.series === active);
  }, [active]);

  return (
    <section id="browse" className="bg-neutral-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-neutral-500">
              Browse
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
              Select Road Tires by Browsing the Range
            </h2>
          </div>

          {/* Tabs (from your first image content) */}
          <div className="md:flex grid grid-cols-2 gap-2 items-center">
            {roadTabs.map((t) => (
              <Pill
                key={t.key}
                text={t.label}
                active={active === t.key}
                onClick={() => setActive(t.key)}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                COMPONENTS                                  */
/* -------------------------------------------------------------------------- */

function Pill({
  text,
  active,
  onClick,
}: {
  text: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "md:h-10 h-12 px-5 rounded-full text-sm font-medium transition-all border",
        active
          ? "bg-neutral-900 text-white border-neutral-900"
          : "bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100",
      ].join(" ")}
    >
      {text}
    </button>
  );
}

function ProductCard({ p }: { p: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative rounded-[12px] border border-neutral-200 bg-white
      shadow-[0_1px_0_rgba(0,0,0,0.03)] hover:shadow-[0_18px_60px_rgba(15,23,42,0.08)]
      transition-shadow overflow-hidden"
    >
      <div className="p-8">
        {/* Series pill */}
        <span className="inline-flex items-center h-7 px-3 rounded-full text-[12px] font-semibold bg-neutral-900 text-white">
          {p.series}
        </span>

        {/* IMAGE AREA (popover limited here ONLY) */}
        <div
          className=" mt-6 flex items-center justify-center min-h-[260px]"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <img
            src={p.image}
            alt={p.name}
            className="w-[320px] max-w-full object-contain"
            loading="lazy"
          />

          {/* 🔥 POPOVER – IMAGE KE UPAR ONLY */}
          <div
            className={[
              "absolute inset-0 flex items-center justify-center z-20",
              open ? "opacity-100" : "opacity-0 pointer-events-none",
              "transition-opacity duration-200",
            ].join(" ")}
          >
            <SizesPopover
              title={p.sizesTitle}
              rows={p.sizes}
              onClose={() => setOpen(false)}
            />
          </div>

          {/* dark overlay like original */}
          <div
            className={[
              "absolute inset-0 bg-black/0 transition-colors",
              open ? "bg-black/15" : "bg-black/0",
            ].join(" ")}
          />
        </div>

        {/* TEXT CONTENT (SAFE – never covered) */}
        <p className="mt-4 text-[11px] tracking-[0.28em] uppercase text-neutral-500">
          {p.subtitle}
        </p>

        <h3 className="mt-2 text-xl font-semibold text-neutral-900">
          {p.name}
        </h3>

        <p className="mt-2 text-[15px] font-semibold text-neutral-900">
          {p.price}
        </p>

        {/* CTA ROW */}
        <div className="mt-6 flex items-center justify-between">
          <Link
            href={p.href}
            className="text-[15px] font-semibold text-neutral-900 underline underline-offset-4 cursor-pointer"
          >
            View tire →
          </Link>

          {/* Mobile click button */}
          {/* <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="h-12 w-12 rounded-full border border-neutral-200 bg-white
              flex items-center justify-center hover:bg-neutral-50"
          >
            <Plus className="h-5 w-5" />
          </button> */}
        </div>
      </div>
    </div>
  );
}


function SizesPopover({
  title,
  rows,
  onClose,
}: {
  title: string;
  rows: SizeRow[];
  onClose?: () => void;
}) {
  return (
    <div className="w-[580px] rounded-[18px] h-[100%]
      bg-neutral-950 text-white 
      border border-white/10"
    >
      <div className="px-6 pt-5 pb-4 flex justify-between items-center">
        <p className="text-[12px] tracking-[0.22em] uppercase text-white/80">
          {title}
        </p>

        {onClose && (
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center"
          >
            ✕
          </button>
        )}
      </div>

      <div className="px-4 pb-4">
        <div className="grid grid-cols-[1.3fr_0.9fr_0.8fr]
          gap-3 px-2 pb-3 text-[13px] font-semibold text-white/90"
        >
          <div>Air Retention</div>
          <div>Size</div>
          <div>Color</div>
        </div>

        <div className="max-h-[100%] overflow-auto pr-1">
          {rows.map((r, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1.3fr_0.9fr_0.8fr]
                gap-3 px-4 py-3 rounded-[12px] text-[14px]
                ${i % 2 === 0 ? "bg-white/14" : "bg-white/6"}`}
            >
              <div>{r.airRetention}</div>
              <div>{r.size}</div>
              <div>{r.color}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

