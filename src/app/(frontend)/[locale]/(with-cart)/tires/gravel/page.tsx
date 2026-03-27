"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ShoppingCart,
} from "lucide-react";
import { FaPlus, FaRegWindowMinimize } from "react-icons/fa";

// ---------------- DATA & TYPES ----------------

const HERO_IMAGES = [
  "https://www.goodyearbike.com/wp-content/uploads/2023/06/Peak-MTB-Tubeless-Complete-Black.png",
  "https://www.goodyearbike.com/wp-content/uploads/2020/09/Studio-Peak-MTB-Tubeless-Complete-Tan.png",
  "https://www.goodyearbike.com/wp-content/uploads/2021/05/Peak-Mountain-Tubeless-Complete-Tan-1250px.png",
  "https://www.goodyearbike.com/wp-content/uploads/2021/05/Peak-Mountain-Tubeless-Ready-1250px.png",
];

type RangeRow = {
  sku: string;
  name: string;
  airRetention: string;
  commonSize: string;
  ertro: string;
  casing: string;
  compound: string;
  sidewall: string;
  bead: string;
  weight: string;
  rating: string;
};

const RANGE_ROWS: RangeRow[] = [
  {
    sku: "GR.001.57.584.V002.R",
    name: "Peak",
    airRetention: "Tubeless Ready",
    commonSize: "27.5x2.25",
    ertro: "57-584",
    casing: "60tpi",
    compound: "Dynamic A/T",
    sidewall: "Black",
    bead: "Folding",
    weight: "680",
    rating: "E-25",
  },
  {
    sku: "GR.001.57.622.V002.R",
    name: "Peak",
    airRetention: "Tubeless Ready",
    commonSize: "29x2.25",
    ertro: "57-622",
    casing: "60tpi",
    compound: "Dynamic A/T",
    sidewall: "Black",
    bead: "Folding",
    weight: "725",
    rating: "E-25",
  },
  {
    sku: "GR.001.61.622.V002.R",
    name: "Peak",
    airRetention: "Tubeless Ready",
    commonSize: "29x2.4",
    ertro: "61-622",
    casing: "60tpi",
    compound: "Dynamic A/T",
    sidewall: "Black",
    bead: "Folding",
    weight: "765",
    rating: "E-25",
  },
  {
    sku: "GR.001.57.584.V003.R",
    name: "Peak",
    airRetention: "Tubeless Ready",
    commonSize: "27.5x2.25",
    ertro: "57-584",
    casing: "120tpi + Sidewall Protection",
    compound: "Dynamic A/T",
    sidewall: "Black",
    bead: "Folding",
    weight: "690",
    rating: "E-25",
  },
  {
    sku: "GR.001.57.622.V003.R",
    name: "Peak",
    airRetention: "Tubeless Ready",
    commonSize: "29x2.25",
    ertro: "57-622",
    casing: "120tpi + Sidewall Protection",
    compound: "Dynamic A/T",
    sidewall: "Black",
    bead: "Folding",
    weight: "730",
    rating: "E-25",
  },
  {
    sku: "GR.001.61.622.V003.R",
    name: "Peak",
    airRetention: "Tubeless Ready",
    commonSize: "29x2.4",
    ertro: "61-622",
    casing: "120tpi + Sidewall Protection",
    compound: "Dynamic A/T",
    sidewall: "Black",
    bead: "Folding",
    weight: "770",
    rating: "E-25",
  },
  {
    sku: "GR.001.57.584.V006.R",
    name: "Peak",
    airRetention: "Tubeless Ready",
    commonSize: "27.5x2.25",
    ertro: "57-584",
    casing: "120tpi + Sidewall Protection",
    compound: "Dynamic A/T",
    sidewall: "Tan",
    bead: "Folding",
    weight: "700",
    rating: "E-25",
  },
  {
    sku: "GR.001.57.622.V006.R",
    name: "Peak",
    airRetention: "Tubeless Ready",
    commonSize: "29x2.25",
    ertro: "57-622",
    casing: "120tpi + Sidewall Protection",
    compound: "Dynamic A/T",
    sidewall: "Tan",
    bead: "Folding",
    weight: "740",
    rating: "E-25",
  },
  {
    sku: "GR.001.61.622.V006.R",
    name: "Peak",
    airRetention: "Tubeless Ready",
    commonSize: "29x2.4",
    ertro: "61-622",
    casing: "120tpi + Sidewall Protection",
    compound: "Dynamic A/T",
    sidewall: "Tan",
    bead: "Folding",
    weight: "770",
    rating: "E-25",
  },
  {
    sku: "GR.001.66.622.V003.R",
    name: "Peak",
    airRetention: "Tubeless Ready",
    commonSize: "29x2.6",
    ertro: "66-622",
    casing: "120tpi + Sidewall Protection",
    compound: "Dynamic A/T",
    sidewall: "Black",
    bead: "Folding",
    weight: "790",
    rating: "E-25",
  },
];

// ---------------- SUB-COMPONENTS ----------------

type PrettyAccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const PrettyAccordion: React.FC<PrettyAccordionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        className="w-full flex justify-between items-center py-4 text-left group"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-semibold text-gray-900 group-hover:text-black text-xl">
          {title}
        </span>
      <span className="text-md font-light text-gray-500 group-hover:text-black">
        {open ? <FaRegWindowMinimize /> : <FaPlus />}
      </span>
      </button>
      <div
        // Changed max-h to a larger value for smoother transition and more content
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[1000px] opacity-100 mb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-sm text-gray-600 leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

function HowToBuyPanel() {
  return (
    <div className="space-y-3">
      <BuyRow region="USA" shopLabel="US Shop" dealerLabel="Dealer Locator" />
      <BuyRow region="UK" shopLabel="UK Shop" dealerLabel="Dealer Locator" />
      <div className="grid grid-cols-2 sm:grid-cols-[1fr_2fr] gap-4 pt-2 border-t border-dashed border-gray-200 mt-2">
        <p className="uppercase text-[11px] font-bold text-neutral-500 tracking-wide">
          Global
        </p>
        <p className="text-[12px] text-neutral-600">
          Check with your local Goodyear distributor for availability in your
          region.
        </p>
      </div>
    </div>
  );
}

type BuyRowProps = {
  region: string;
  shopLabel: string;
  dealerLabel: string;
};

function BuyRow({ region, shopLabel, dealerLabel }: BuyRowProps) {
  // Adjusted grid for better mobile stacking (2-column on mobile, 3-column on small screens and up)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_1fr] gap-4 items-center">
      <p className="uppercase text-[11px] font-bold text-neutral-500 tracking-wide col-span-2 sm:col-span-1">
        {region}
      </p>
      <a
        href="#"
        className="text-[13px] font-medium text-neutral-900 hover:text-green-700 underline underline-offset-2 decoration-neutral-300 hover:decoration-green-700 transition-all"
      >
        {shopLabel}
      </a>
      <a
        href="#"
        className="text-[13px] font-medium text-neutral-900 hover:text-green-700 underline underline-offset-2 decoration-neutral-300 hover:decoration-green-700 transition-all"
      >
        {dealerLabel}
      </a>
    </div>
  );
}

// Custom Component for Mobile-Friendly Table
const ResponsiveRangeTable: React.FC<{ rows: RangeRow[] }> = ({ rows }) => {
  // Columns to display on mobile (key, label)
  const mobileColumns: { key: keyof RangeRow; label: string }[] = [
    { key: "commonSize", label: "Size" },
    { key: "airRetention", label: "System" },
    { key: "casing", label: "Casing" },
    { key: "sidewall", label: "Sidewall" },
    { key: "weight", label: "Weight" },
  ];

  // All columns for desktop
  const desktopHeaders = [
    "SKU",
    "Name",
    "Air Retention",
    "Size",
    "ETRTO",
    "Casing",
    "Compound",
    "Color",
    "Bead",
    "Weight",
    "E-Rating",
  ];

  return (
    <div className="max-h-[600px] overflow-auto">
      {/* Desktop Table (Visible on md and up) */}
      <table className="min-w-full text-left text-[13px] hidden md:table">
        <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">
          <tr>
            {desktopHeaders.map((h) => (
              <th
                key={h}
                className="py-3 px-4 font-bold text-gray-700 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, idx) => (
            <tr
              key={row.sku}
              className={`transition-colors hover:bg-[#FFD100] ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
            >
              <td className="py-3 px-4 font-mono text-xs text-gray-500">
                {row.sku}
              </td>
              <td className="py-3 px-4 font-bold text-gray-900">{row.name}</td>
              <td className="py-3 px-4">{row.airRetention}</td>
              <td className="py-3 px-4">{row.commonSize}</td>
              <td className="py-3 px-4 font-mono text-xs">{row.ertro}</td>
              <td className="py-3 px-4">{row.casing}</td>
              <td className="py-3 px-4">{row.compound}</td>
              <td className="py-3 px-4">{row.sidewall}</td>
              <td className="py-3 px-4">{row.bead}</td>
              <td className="py-3 px-4 font-medium">{row.weight}g</td>
              <td className="py-3 px-4">{row.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile/Card View (Visible on screens less than md) */}
      <div className="md:hidden space-y-4 p-4">
        {rows.map((row) => (
          <div
            key={row.sku}
            className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm space-y-2 text-sm"
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">{row.name}</h3>
              <span className="font-mono text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                {row.sku}
              </span>
            </div>
            {mobileColumns.map((col) => (
              <div key={col.key} className="flex justify-between">
                <span className="font-medium text-gray-500">{col.label}:</span>
                <span className="text-gray-800">
                  {row[col.key]}
                  {col.key === "weight" && "g"}
                </span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t border-dashed border-gray-100">
              <span className="font-medium text-gray-500">E-Rating:</span>
              <span className="text-gray-800 font-bold">{row.rating}</span>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No specific product configuration found.
          </p>
        )}
      </div>
    </div>
  );
};

// ---------------- MAIN PAGE ----------------

type variantstructure = {
  id: string;
  value: string;
};

const ProductGravelPage = ({ attributeValues, image, variants }: any) => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [openZoom, setOpenZoom] = useState(false);
  const variationAttributes = useMemo(() => {
    return attributeValues.filter((d) => d.variationuse);
  }, [attributeValues]);
  const [selectvariant, setSelectedVariant] = useState<variantstructure[]>([
    {
      id: "693be9244ff24b949e6bbb7e",
      value: "tubeless-ready",
    },
    {
      id: "693be9634ff24b949e6bbd14",
      value: "black",
    },
    {
      id: "693ff6fdc9f016b519c81476",
      value: "40mm",
    },
  ]);

  const handleSelectVariants = (e: any, id: string) => {
    const copied = structuredClone(selectvariant);
    const value = e.target.value;
    const exist = copied.find((d: any) => d.id == id);
    if (exist) {
      exist["value"] = value;
      setSelectedVariant(copied);
    } else {
      const obj = {
        id: id,
        value: value,
      };
      copied.push(obj);
      setSelectedVariant(copied);
    }
  };

  console.log(selectvariant);

  // Config State
  const [airRetention, setAirRetention] = useState("");
  const [diameter, setDiameter] = useState("");
  const [width, setWidth] = useState("");
  const [sidewall, setSidewall] = useState("");
  const [qty, setQty] = useState(1);

  const next = () => setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
  const prev = () =>
    setHeroIndex((i) => (i === 0 ? HERO_IMAGES.length - 1 : i - 1));

  const currentHero = image[heroIndex];

  // Filtering the available options for demonstration purposes
  const availableDiameters = Array.from(
    new Set(RANGE_ROWS.map((r) => r.commonSize.split("x")[0]))
  );
  const availableWidths = Array.from(
    new Set(RANGE_ROWS.map((r) => r.commonSize.split("x")[1]))
  );

  // Filter the rows based on selected options to find the matching product.
  const filteredRows = RANGE_ROWS.filter((row) => {
    const [rowDiameter, rowWidth] = row.commonSize.split("x");
    return (
      (!airRetention || row.airRetention === airRetention) &&
      (!diameter || rowDiameter === diameter) &&
      (!width || rowWidth === width) &&
      (!sidewall || row.sidewall === sidewall)
    );
  });

  // Get the final price/SKU/details if all options are selected (assuming the first match is the product)
  const finalProduct =
    filteredRows.length === 1 && airRetention && diameter && width && sidewall
      ? filteredRows[0]
      : null;

  const minPrice = RANGE_ROWS.reduce((min, row) => Math.min(min, 72), 90); // Simplified price logic for example
  const maxPrice = RANGE_ROWS.reduce((max, row) => Math.max(max, 90), 72); // Simplified price logic for example
  const priceDisplay =
    minPrice === maxPrice
      ? `$${minPrice.toFixed(2)}`
      : `$${minPrice.toFixed(2)} – $${maxPrice.toFixed(2)}`;

  const currentPrice = finalProduct
    ? `$${(finalProduct.weight > "750" ? 90 : 72).toFixed(2)}`
    : priceDisplay;

  return (
    <div className="md:max-w-7xl w-[90%]  mx-auto px-0 lg:px-0 pt-[140px] md:pt-28">
      {/* Product Section */}
      <section className="bg-white relative mb-12 md:mb-20">
        <div className="lg:flex lg:items-start gap-12 relative">
          {/* LEFT: GALLERY */}
          {/* Adjusted for a better mobile-first image presentation */}
          <div className="lg:w-[55%] w-full  lg:sticky lg:top-32 lg:self-start z-10 mb-8 lg:mb-0">
            <div className="bg-gradient-to-b from-[#f9fafb] to-[#e5e7eb] border border-neutral-200 rounded-[12px] relative">
              <div className="flex h-full">
                {/* Thumbnails (Desktop) */}
                <div className="hidden md:flex flex-col gap-3 pt-10 pb-10 pl-6 pr-2">
                  {image.map(({ url, id, alt }, idx) => (
                    <button
                      key={id}
                      onClick={() => setHeroIndex(idx)}
                      className={`relative h-16 w-16 rounded-xl overflow-hidden border transition-all ${
                        idx === heroIndex
                          ? "border-black shadow-md ring-1 ring-black"
                          : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`}
                        alt={alt}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image Stage */}
                <div className="flex-1 flex flex-col items-center justify-center relative px-4 py-8 md:px-8 md:py-16 min-h-[400px] sm:min-h-[500px]">
                  <p className="md:hidden text-xs uppercase text-neutral-500 mb-3 font-bold tracking-widest">
                    MTB · Cross-Country
                  </p>

                  <div className="relative w-full max-w-[420px] aspect-[3/4] flex items-center justify-center transition-all duration-500">
                    <img
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}${currentHero.url}`}
                      alt="Product Hero"
                      className="h-full w-auto max-h-[480px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)]"
                    />
                  </div>

                  {/* Nav Arrows (Mobile/Tablet) - Hidden on full desktop to encourage using thumbnails */}
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black hover:scale-105 transition-all md:hidden"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/90 shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-black hover:scale-105 transition-all md:hidden"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  {/* Zoom Trigger */}
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                    <button
                      onClick={() => setOpenZoom(true)}
                      className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-white hover:text-black transition-colors shadow-sm"
                    >
                      <Maximize2 className="w-3 h-3" /> Zoom
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Thumbs - Moved to be outside the main image box, as is common */}
            <div className="mt-4 flex md:hidden gap-3 overflow-x-auto pb-4 px-1 scrollbar-hide justify-center">
              {image.map(({ url, id }, idx) => (
                <button
                  key={id}
                  onClick={() => setHeroIndex(idx)}
                  className={`flex-shrink-0 relative h-16 w-16 rounded-lg overflow-hidden border ${
                    idx === heroIndex
                      ? "border-black shadow-sm ring-1 ring-black/50"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`}
                    className="h-full w-full object-cover"
                    alt={`Thumbnail ${idx}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: CONFIGURATION & DETAILS */}
          <div className="lg:w-[45%]  flex flex-col pt-2 order-first lg:order-last">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black text-white">
                  New
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-green-700">
                  In Stock
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                PEAK
              </h1>
              <div className="flex items-baseline gap-3 mt-3">
                <h5 className="text-2xl font-bold text-gray-900 1">
                  {currentPrice}
                </h5>
                <p className="text-sm text-gray-500 font-medium">
                  VAT included
                </p>
              </div>
            </div>

            {/* CONFIGURATION PANEL (Made slightly sticky on mobile for immediate access to CTA) */}
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-6 md:p-0 relative  bottom-0 z-20 lg:static lg:pb-6 lg:shadow-none lg:border-none lg:bg-transparent">
              {/* Decorative accent for the sticky bar on mobile */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-t-xl lg:hidden" />

              <h2 className="text-xl font-bold text-gray-900 mb-6 hidden lg:flex items-center gap-2">
                Configure Your Tire
              </h2>
              {
                // Only show product details if a final product is selected
                finalProduct && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200 text-sm text-green-800 font-medium">
                    <span className="font-bold">Selected Product:</span>{" "}
                    {finalProduct.commonSize} | {finalProduct.airRetention} |{" "}
                    {finalProduct.sidewall} ({finalProduct.weight}g)
                  </div>
                )
              }

              {variationAttributes.map(({ attribute, sele, id }) => {
                const existedinVariant = selectvariant.find(
                  (d) => d.id == attribute.id
                );

                let val = existedinVariant ? existedinVariant.value : "";

                return (
                  <div key={id} className="mb-1">
                    <label className="text-xs font-bold uppercase text-gray-500 mb-1.5 block tracking-wide">
                      {attribute.name}
                    </label>
                    <div className="relative">
                      <select
                        name={attribute.name}
                        value={val}
                        onChange={(e) => handleSelectVariants(e, attribute.id)}
                        className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-3.5 font-medium transition-all"
                      >
                        <option value="">Select System...</option>
                        {/* Dynamically get options from data or define them */}
                        {sele.map((d, idx) => {
                          return (
                            <option key={idx} value={d}>
                              {d}
                            </option>
                          );
                        })}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg
                          className="h-4 w-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* <div className="space-y-5 lg:space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 mb-1.5 block tracking-wide">
                    Air Retention
                  </label>
                  <div className="relative">
                    <select
                      value={airRetention}
                      onChange={(e) => setAirRetention(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-3.5 font-medium transition-all"
                    >
                      <option value="">Select System...</option>
              
                      <option value="Tubeless Ready">
                        Tubeless Ready (60tpi)
                      </option>
                      <option value="Tubeless Complete">
                        Tubeless Complete™ (120tpi)
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500 mb-1.5 block tracking-wide">
                      Diameter
                    </label>
                    <div className="relative">
                      <select
                        value={diameter}
                        onChange={(e) => setDiameter(e.target.value)}
                        className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-3.5 font-medium transition-all"
                      >
                        <option value="">Select...</option>
                        {availableDiameters.map((d) => (
                          <option key={d} value={d}>
                            {d}"
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg
                          className="h-3 w-3 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500 mb-1.5 block tracking-wide">
                      Width
                    </label>
                    <div className="relative">
                      <select
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-3.5 font-medium transition-all"
                      >
                        <option value="">Select...</option>
                        {availableWidths.map((w) => (
                          <option key={w} value={w}>
                            {w}"
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg
                          className="h-3 w-3 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 mb-1.5 block tracking-wide">
                    Sidewall
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSidewall("Black")}
                      className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all ${sidewall === "Black" ? "border-black bg-gray-900 text-white shadow-md" : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"}`}
                    >
                      <span className="w-3 h-3 rounded-full bg-black border border-white"></span>
                      <span className="text-sm font-medium">Black</span>
                    </button>
                    <button
                      onClick={() => setSidewall("Tan")}
                      className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all ${sidewall === "Tan" ? "border-amber-700 bg-amber-600/90 text-white shadow-md" : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"}`}
                    >
                      <span className="w-3 h-3 rounded-full bg-amber-700/80"></span>
                      <span className="text-sm font-medium">Tan</span>
                    </button>
                  </div>
                </div>
              </div> */}

              <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
                <div className="w-24">
                  <label className="sr-only">Quantity</label>
                  <div className="relative flex items-center">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="absolute left-2 text-gray-400 hover:text-black text-lg font-bold px-1 select-none"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) =>
                        setQty(
                          Number(e.target.value) > 0
                            ? Number(e.target.value)
                            : 1
                        )
                      }
                      className="w-full text-center bg-gray-50 border border-gray-200 rounded-lg py-3 font-bold text-gray-900 focus:outline-none focus:border-black"
                    />
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="absolute right-2 text-gray-400 hover:text-black text-lg font-bold px-1 select-none"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  disabled={!airRetention || !diameter || !width || !sidewall}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm uppercase tracking-wider rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Add To Cart
                </button>
              </div>
            </div>

            <div className="border-t border-neutral-200 mt-8 mb-8 lg:mt-0 lg:mb-0 lg:border-t-0">
              <PrettyAccordion title="Product Details" defaultOpen={false}>
                <div className="space-y-4 pt-2">
                  <p>
                    A fast rolling tire for the XC competitor, and anyone who
                    wonders what’s beyond the next forest and over the next
                    Peak.
                  </p>
                  <p>
                    The Peak excels in every department: weight, rolling
                    efficiency, durability, traction and ease of use. Just as
                    likely to be seen conquering long alpine climbs as it is
                    taming the inevitable descent that follows.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-2">
                    <p className="font-semibold text-gray-900 mb-1">
                      Best For:
                    </p>
                    <p>Cross-Country, Marathon, Light Trail</p>
                  </div>
                </div>
              </PrettyAccordion>

              <PrettyAccordion title="How To Buy">
                <HowToBuyPanel />
              </PrettyAccordion>

              <PrettyAccordion title="Technical Specs">
                <ul className="list-disc pl-4 space-y-1 pt-2">
                  <li>Dynamic A/T Compound</li>
                  <li>Tubeless Complete or Ready</li>
                  <li>Folding Bead</li>
                  <li>Optimized tread spacing</li>
                  <li>
                    **Casing Options:** 60tpi or 120tpi with Sidewall Protection
                  </li>
                </ul>
              </PrettyAccordion>
            </div>

            {/* Extra space */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center hidden lg:block">
              <p className="text-sm text-gray-500 mb-2">Need help choosing?</p>
              <a href="#" className="text-sm font-bold text-black underline">
                View our Tire Finder Guide
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- RANGE OVERVIEW TABLE ---------------- */}
      <section className="bg-white border border-gray-200 rounded-[18px] shadow-sm mb-24 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
          <h2 className="text-md md:text-xl font-bold uppercase tracking-wider text-gray-900 text-center sm:text-left">
            Range Overview
          </h2>
        </div>

        {/* Using the new responsive table component */}
        <ResponsiveRangeTable rows={RANGE_ROWS} />

        <div className="max-w-3xl text-center mx-auto py-6">
          <p className="font-medium  text-center text-base">
            All published weights are +/- 7%. Specifications subject to change
            without notice. Tire sizing is based upon measurement of the widest
            point of the inflated tire at max psi after 24hrs.
          </p>
        </div>
      </section>

      {/* Zoom Modal - Added for completeness but kept basic */}
      {openZoom && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setOpenZoom(false)}
            className="absolute top-4 right-4 text-white text-3xl font-light p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            &times;
          </button>
          <div className="w-full max-w-4xl h-full max-h-[90vh] flex items-center justify-center">
            <img
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}${currentHero?.url}`}
              alt="Zoomed Product View"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Scrollbar Hide Utility Class (Tailwind CSS JIT requirement - add this to your global CSS if needed)
// @layer utilities {
//   .scrollbar-hide::-webkit-scrollbar {
//     display: none;
//   }
//   .scrollbar-hide {
//     -ms-overflow-style: none; /* IE and Edge */
//     scrollbar-width: none; /* Firefox */
//   }
// }

// Default mock data for static rendering / when no CMS data is available
const MOCK_ATTRIBUTE_VALUES = [
  {
    id: "attr-1",
    variationuse: true,
    attribute: { id: "693be9244ff24b949e6bbb7e", name: "Air Retention System" },
    sele: ["Tubeless Ready", "Tubeless Complete"],
  },
  {
    id: "attr-2",
    variationuse: true,
    attribute: { id: "693be9634ff24b949e6bbd14", name: "Sidewall Color" },
    sele: ["Black", "Tan"],
  },
  {
    id: "attr-3",
    variationuse: true,
    attribute: { id: "693ff6fdc9f016b519c81476", name: "Size" },
    sele: ["27.5x2.25", "29x2.25", "29x2.4", "29x2.6"],
  },
];

const MOCK_IMAGES = [
  {
    id: "img-1",
    url: "/media/peak-mtb-black.png",
    alt: "Peak MTB Tubeless Complete Black",
  },
  {
    id: "img-2",
    url: "/media/peak-mtb-tan.png",
    alt: "Peak MTB Tubeless Complete Tan",
  },
];

const MOCK_VARIANTS = [];

export default function GravelPage() {
  return (
    <ProductGravelPage
      attributeValues={MOCK_ATTRIBUTE_VALUES}
      image={MOCK_IMAGES}
      variants={MOCK_VARIANTS}
    />
  );
}
