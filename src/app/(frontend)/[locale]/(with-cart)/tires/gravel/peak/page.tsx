"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Maximize2,
} from "lucide-react";
import SimpleProductPage from "../../../about/history/SimpleProductPage";

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

/** ----------------------------------------------------------
 *  IMAGE SOURCES – yahan apni real images daal dena
 *  --------------------------------------------------------*/
const HERO_IMAGES = [
  "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png",
  "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png",
  "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png",
  "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png",
];





const SIMILAR_PRODUCTS = [
  {
    name: "Transit SUV",
    image: "https://www.goodyearbike.com/wp-content/uploads/2024/03/Transit-SUV-Angled.png",
    blurb:
      "The Transit SUV is a high-quality tire that offers trouble-free durability for heavy-duty transit over long distances.",
  },
  {
    name: "Transit Tour Plus",
    image: "https://www.goodyearbike.com/wp-content/uploads/2024/03/Transit-SUV-Angled.png",
    blurb:
      "The Transit Tour Plus is the ideal choice for riders who demand uncompromising reliability.",
  },
  {
    name: "Peak SL",
    image: "https://www.goodyearbike.com/wp-content/uploads/2024/03/Transit-SUV-Angled.png",
    blurb:
      "Born and bred for Cross-Country racing enthusiasts and professionals.",
  },
];


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
    const desktopHeaders = ["SKU", "Name", "Air Retention", "Size", "ETRTO", "Casing", "Compound", "Color", "Bead", "Weight", "E-Rating"];

    return (
        <div className="max-h-[600px] overflow-auto">
            {/* Desktop Table (Visible on md and up) */}
            <table className="min-w-full text-left text-[13px] hidden md:table">
                <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm">
                    <tr>
                        {desktopHeaders.map((h) => (
                            <th key={h} className="py-3 px-4 font-bold text-gray-700 whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {rows.map((row, idx) => (
                        <tr
                            key={row.sku}
                            className={`transition-colors hover:bg-[#FFD100] ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                        >
                            <td className="py-3 px-4 font-mono text-xs text-gray-500">{row.sku}</td>
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
                    <div key={row.sku} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm space-y-2 text-sm">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <h3 className="font-bold text-gray-900 text-base">{row.name}</h3>
                            <span className="font-mono text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded">{row.sku}</span>
                        </div>
                        {mobileColumns.map((col) => (
                            <div key={col.key} className="flex justify-between">
                                <span className="font-medium text-gray-500">{col.label}:</span>
                                <span className="text-gray-800">
                                    {row[col.key]}
                                    {col.key === 'weight' && 'g'}
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
                     <p className="text-center text-gray-500 py-4">No specific product configuration found.</p>
                )}
            </div>
        </div>
    );
};

export default function PeakProductPage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [openZoom, setOpenZoom] = useState(false);

  const next = () =>
    setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
  const prev = () =>
    setHeroIndex((i) => (i === 0 ? HERO_IMAGES.length - 1 : i - 1));

  const currentHero = HERO_IMAGES[heroIndex];

  return (
    <main className="bg-[#fff] text-[#111827]">
     <div className="md:max-w-7xl w-[90%]  mx-auto px-0 lg:px-0 pt-24 pb-10 space-y-10 lg:space-y-14">

        {/* MAIN CARD -------------------------------------------------- */}
        <section className="bg-white border-0     overflow-hidden">
          <div className="grid lg:grid-cols-[1.2fr_0.9fr] gap-0">
            {/* LEFT: GALLERY */}
            <div className="bg-gradient-to-b from-[#f9fafb] to-[#e5e7eb] border border-neutral-200 rounded-[12px]">
              <div className="flex h-full">
                {/* Thumbnails (vertical on desktop, horizontal on mobile) */}
                <div className="hidden md:flex flex-col gap-3 pt-10 pb-10 pl-6 pr-2">
                  {HERO_IMAGES.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroIndex(idx)}
                      className={`relative h-16 w-16 rounded-xl overflow-hidden border transition-all ${idx === heroIndex
                          ? "border-black shadow-[0_0_0_1px_rgba(0,0,0,0.9)]"
                          : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                    >
                      <img
                        src={src}
                        alt={`Peak tyre ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main image */}
                <div className="flex-1 flex flex-col items-center justify-center relative px-4 py-8 md:px-8 md:py-10">
                  <div className="absolute inset-6 md:inset-10 -z-10 rounded-[28px] bg-gradient-to-b from-white/80 to-white/10 shadow-[0_40px_120px_rgba(15,23,42,0.2)]" />

                  <p className="md:hidden text-xs  uppercase text-neutral-500 mb-3">
                    Gravel · Tubeless Complete
                  </p>

                  <div className="relative w-full max-w-[420px] aspect-[3/4] flex items-center justify-center">
                    <img
                      src={currentHero}
                      alt="Goodyear Peak Gravel Tyre"
                      className="h-full w-auto max-h-[520px] object-contain drop-shadow-[0_40px_80px_rgba(15,23,42,0.4)]"
                    />
                  </div>

                  {/* Arrows */}
                  <button
                    onClick={prev}
                    className="absolute left-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md border border-neutral-300 flex items-center justify-center hover:-translate-y-[55%] transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md border border-neutral-300 flex items-center justify-center hover:-translate-y-[55%] transition-all"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  {/* Dots + zoom */}
                  <div className="mt-5 flex items-center justify-between w-full max-w-lg">
                    <div className="flex gap-1.5">
                      {HERO_IMAGES.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setHeroIndex(i)}
                          className={`h-[5px] rounded-full transition-all ${i === heroIndex
                              ? "w-7 bg-black"
                              : "w-4 bg-neutral-400/50 hover:bg-neutral-600"
                            }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenZoom(true)}
                      className="inline-flex items-center gap-1 text-[11px] uppercase text-neutral-700 hover:text-black"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      Zoom
                    </button>
                  </div>

                  {/* Mobile thumbs */}
                  <div className="mt-4 flex md:hidden gap-3 overflow-x-auto pb-2 w-full">
                    {HERO_IMAGES.map((src, idx) => (
                      <button
                        key={idx}
                        onClick={() => setHeroIndex(idx)}
                        className={`flex-shrink-0 relative h-16 w-16 rounded-xl overflow-hidden border transition-all ${idx === heroIndex
                            ? "border-black shadow-[0_0_0_1px_rgba(0,0,0,0.9)]"
                            : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                      >
                        <img
                          src={src}
                          alt={`Peak ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>


              
            </div>

            {/* RIGHT: DETAILS (sticky) */}
            <div className="bg-white">
              <div className="h-full flex flex-col px-6 md:px-8 xl:px-10 py-8 lg:py-10 lg:max-h-[80vh] overflow-y-auto">
                {/* top meta */}
                <div className="space-y-2 mb-6">
                  <p className="text-[14px] uppercase text-neutral-700">
                    KGRV · WTL · PEAK
                  </p>
                  <h1 className="text-[38px] md:text-[42px] leading-none  uppercase font-bold">
                    Peak 
                  </h1>
                  <p className="text-lg leading-relaxed text-neutral-800 max-w-xl">
                    Hard hitting member of the Goodyear gravel family.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="inline-flex items-center font-bold px-3 py-1 rounded-full border border-neutral-300 text-[11px] uppercase ">
                      Gravel
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#111827] text-white text-[11px] uppercase ">
                      Tubeless Complete
                    </span>
                  </div>
                </div>

                {/* small spec list */}
                <div className="space-y-2 text-[12px] leading-relaxed text-neutral-700 mb-6">
                  <p className="font-semibold   text-[12px] text-neutral-500">

                    Category:

                    <span className="font-bold text-[12px] ms-1 text-neutral-700">
                      Gravel
                    </span>
                  </p>
                  <p className="font-semibold   text-[12px] text-neutral-500">

                    Recommended terrain:

                    <span className="font-bold text-[12px] ms-1 text-neutral-700">
                      When rugged off-road capability is priority. 
                    </span>
                  </p>
                  <p className="font-semibold  text-[12px] text-neutral-500">

                    Recommended bike:

                    <span className="font-bold text-[12px] ms-1 text-neutral-700">
                      Rugged gravel bike.
                    </span>
                  </p>
                </div>

                {/* accordions */}
                <div className="border-y border-neutral-200 py-4 space-y-1">
                  <PrettyAccordion title="Product Details" defaultOpen>
                    <div className="space-y-3 text-[16px] leading-relaxed text-neutral-800">
                      <p>
                        The hard-hitting member of the Goodyear gravel
                        family, with a tread pattern designed to excel in
                        off-road terrain, with widely spaced blocks to aid
                        grip and forward drive in wet or very loose
                        conditions.
                      </p>
                      <p>
                        The Ultimate, Tubeless Complete features a
                        Multi-compound material layer which is added to the
                        tire casing, allowing for improved air retention
                        while providing additional puncture and cut
                        protection with minimal weight increase.
                      </p>
                      <ul className="list-disc ml-5 space-y-1.5">
                        <li>Multi-compound rubber for grip and durability</li>
                        <li>Tubeless Complete construction for easy setup</li>
                        <li>Optimised profile for modern gravel rims</li>
                      </ul>
                    </div>
                  </PrettyAccordion>

                  <PrettyAccordion title="How To Buy">
                    <HowToBuyPanel />
                  </PrettyAccordion>
                </div>

                {/* bottom meta */}
                <div className="pt-4 space-y-2 text-[12px] text-neutral-700">
                  <p className="uppercase text-[11px]  text-neutral-500">
                    More about the Peak:
                  </p>
                  <button className="text-[13px] underline underline-offset-2 text-neutral-900 hover:text-black">
                    Range overview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DESCRIPTION + BIG RIDER IMAGE -------------------------------- */}
        <section className="grid lg:grid-cols-[1.05fr_1.1fr] gap-6 lg:gap-10 items-stretch">
          {/* text block */}
          <div className="bg-white border border-neutral-200 rounded-[26px] shadow-sm px-6 md:px-10 py-8 md:py-10">
            <div className="max-w-xl space-y-6 text-[16px] leading-relaxed text-neutral-800">
              <div className="space-y-3">
                <h2 className="text-[24px] font-semibold uppercase text-black">
                  Description
                </h2>
                <p >
                  The hard–hitting member of the Goodyear gravel family, with a
                  tread pattern designed to excel in off–road terrain, with
                  widely spaced blocks to aid grip and forward drive in wet or
                  very loose conditions.
                </p>
                <p>
                  The Ultimate, Tubeless Complete features a Multi–compound
                  material layer which is added to the tire casing, allowing for
                  improved air retention while providing additional puncture and
                  cut protection with minimal weight increase.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 space-y-4">
                <h3 className="text-[20px] md:text-[28px] font-medium uppercase text-black">
                  For Peak Performance
                </h3>
                <p>
                  A round profile, closely–spaced tread, and supple casing
                  contribute to Peak&apos;s low rolling resistance, while ample
                  traction and braking performance are delivered thanks to
                  siping on every knob and its multi–dimensional Dynamic:A/T
                  compound.
                </p>
                <p>Optimized for hard hitting gravel terrain.</p>
              </div>
            </div>
          </div>

          {/* lifestyle image */}
          <div className="rounded-[26px] overflow-hidden border border-neutral-200 shadow-sm bg-[#020617]">
            <img
              src="https://khfood.com/wp-content/uploads/2019/12/Image-1.jpg"
              alt="Gravel bike with Peak tyres"
              className="w-full h-full object-cover"
            />
          </div>
        </section>



        {/* RANGE OVERVIEW ACCORDIONS ----------------------------------- */}
        <section className="bg-white px-0 md:px-8 lg:px-0 py-8 md:py-10">
          <h2 className="text-[24px] font-semibold uppercase  text-black mb-1">
            Range Overview.
          </h2>
          <p className="text-[16px] text-neutral-700 max-w-xl mb-4">
            Explore sizes, technical specifications and rim pairings for the
            Peak gravel tyre range.
          </p>

          <div className="border border-neutral-200 rounded-[20px] overflow-hidden divide-y divide-neutral-200 bg-[#f9fafb]">
            <SlimAccordion title="Range Overview">
              <p className="text-[16px] text-neutral-700 leading-relaxed">
                Peak is offered in multiple widths to suit a wide variety of
                gravel frames and riding styles, from fast race-day builds to
                adventure-ready setups.
              </p>
            </SlimAccordion>

            <SlimAccordion title="Size and Specifications">
              {/* <div className="space-y-1.5 text-[16px] text-neutral-700">
                <p>700 × 40c – 120 tpi, Tubeless Complete, Dynamic:A/T</p>
                <p>700 × 45c – 120 tpi, Tubeless Complete, Dynamic:A/T</p>
                <p>650 × 50b – 120 tpi, Tubeless Complete, Dynamic:A/T</p>
              </div> */}
               <ResponsiveRangeTable rows={RANGE_ROWS} />
               <div className="max-w-3xl text-center mx-auto py-8">
               <p className="md:font-medium font-sm  text-center text-base">All published weights are +/- 7%. Specifications subject to change without notice. Tire sizing is based upon measurement of the widest point of the inflated tire at max psi after 24hrs.</p>
            </div>
            </SlimAccordion>

            <SlimAccordion title="Optimal Rim Widths">
              <p className="text-[16px] text-neutral-700">
                Designed around 21–25mm internal rim widths for balanced
                support, with full compatibility from 19–27mm.
              </p>
            </SlimAccordion>
          </div>
        </section>



        <SimpleProductPage />
      </div>

      {/* SIMPLE ZOOM OVERLAY ------------------------------------------ */}
      {openZoom && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setOpenZoom(false)}
        >
          <div
            className="relative bg-black rounded-[24px] overflow-hidden max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenZoom(false)}
              className="absolute right-4 top-4 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center text-neutral-900 hover:bg-white z-10"
            >
              ✕
            </button>
            <div className="p-4 md:p-6 flex items-center justify-center">
              <img
                src={currentHero}
                alt="Zoomed Peak tyre"
                className="w-full h-full object-contain max-h-[80vh]"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*   NICE ACCORDIONS                                                  */
/* ------------------------------------------------------------------ */

type PrettyAccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

function PrettyAccordion({
  title,
  children,
  defaultOpen,
}: PrettyAccordionProps) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3"
      >
        <span className="text-[16px] font-semibold uppercase ">
          {title}
        </span>
        {open ? (
          <Minus className="h-4 w-4 text-neutral-600" />
        ) : (
          <Plus className="h-4 w-4 text-neutral-600" />
        )}
      </button>
      {open && (
        <div className="pb-3 text-[13px] text-neutral-800">
          {children}
        </div>
      )}
    </div>
  );
}

type SlimAccordionProps = {
  title: string;
  children: React.ReactNode;
};

function SlimAccordion({ title, children }: SlimAccordionProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/80">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4"
      >
        <span className="text-[18px] font-semibold uppercase ">
          {title}
        </span>
        {open ? (
          <Minus className="h-4 w-4 text-neutral-600" />
        ) : (
          <Plus className="h-4 w-4 text-neutral-600" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 text-[13px] text-neutral-800">
          {children}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HOW TO BUY PANEL                                                   */
/* ------------------------------------------------------------------ */

function HowToBuyPanel() {
  return (
    <div className="space-y-3 text-[12px] text-neutral-800">
      <BuyRow
        region="USA"
        shopLabel="US Shop"
        dealerLabel="Dealer Locator"
      />
      <BuyRow
        region="UK"
        shopLabel="UK Shop"
        dealerLabel="Dealer Locator"
      />
      <div className="grid grid-cols-[1.1fr_2fr] gap-4 pt-1">
        <p className="uppercase  text-[11px] text-neutral-500">
          Global
        </p>
        <p className="text-[12px] text-neutral-600">
          Check with your local Goodyear distributor for availability in
          your region.
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
  return (
    <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-4 border-b border-neutral-200 pb-2.5">
      <p className="uppercase  text-[11px] text-neutral-500">
        {region}
      </p>
      <button className="text-[14px] underline underline-offset-2 text-neutral-900 hover:text-black text-left">
        <a href="#">
        {shopLabel}
        </a>
      </button>
      <button className="text-[14px] underline underline-offset-2 text-neutral-900 hover:text-black text-left">
       <a href="#">
        {dealerLabel}
       </a>
      </button>
    </div>
  );
}
