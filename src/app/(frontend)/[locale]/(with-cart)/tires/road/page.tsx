"use client";

import React, { useMemo, useState } from "react";

import { PiMountainsFill } from "react-icons/pi";

import { IoBusiness } from "react-icons/io5";
import { FaMap } from "react-icons/fa";
import ProductTires from "./ProductTires";
import Modelmap from "src/frontendComponents/Modelmap";
import SeriesSection from "src/frontendComponents/SeriesSection";
type SeriesKey = "UHP" | "FS" | "HP" | "P";

type Product = {
  name: string;
  series: SeriesKey;
  tag: string;
  price: string;
  href: string;
  img: string;
  specs: { label: string; value: string }[];
};

const TIRE_IMG =
  "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Render-Cut-Vector-R-Z30SW-1024x1024.png";

const HERO_BG =
  "https://www.goodyearbike.com/wp-content/uploads/2023/03/Goodyear-Eagle-Bicycle-tires-1002.jpg";
const HERO_RIGHT =
  "https://www.goodyearbike.com/wp-content/uploads/2025/01/WangerBazin2025TeamCamp-1011.jpg";

const EAGLE_BG =
  "https://www.goodyearbike.com/wp-content/uploads/2025/01/WangerBazin2025TeamCamp-1002.jpg";
const VECTOR_BG =
  "https://www.goodyearbike.com/wp-content/uploads/2025/01/WangerBazin2025TeamCamp-1011.jpg";

function classNames(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export default function RoadPage() {
  const [openSeries, setOpenSeries] = useState<SeriesKey | null>("UHP");

  const products: Product[] = useMemo(
    () => [
      {
        name: "Eagle F1 SuperSport R",
        series: "UHP",
        tag: "Race / Pure Speed",
        price: "$95.00 – $120.00",
        href: "/shop/eagle-f1-supersport-r",
        img: TIRE_IMG,
        specs: [
          { label: "Air", value: "Tubeless Ready" },
          { label: "Casing", value: "120tpi" },
          { label: "Compound", value: "Dynamic UHP" },
        ],
      },
      {
        name: "Eagle F1R",
        series: "UHP",
        tag: "Fast Road / Aero",
        price: "$90.00 – $110.00",
        href: "/shop/eagle-f1r",
        img: TIRE_IMG,
        specs: [
          { label: "Air", value: "Tubeless Ready" },
          { label: "Casing", value: "120tpi" },
          { label: "Bead", value: "Folding" },
        ],
      },
      {
        name: "Vector 4Seasons",
        series: "HP",
        tag: "All-Season / Endurance",
        price: "$70.00 – $95.00",
        href: "/shop/vector-4seasons",
        img: TIRE_IMG,
        specs: [
          { label: "Grip", value: "Wet Focus" },
          { label: "Protection", value: "Enhanced" },
          { label: "Use", value: "All-Season" },
        ],
      },
      {
        name: "Vector R",
        series: "FS",
        tag: "Fitment / OEM",
        price: "$65.00 – $85.00",
        href: "/shop/vector-r",
        img: TIRE_IMG,
        specs: [
          { label: "Fit", value: "Multiple Sizes" },
          { label: "Air", value: "Tubeless Ready" },
          { label: "Bead", value: "Folding" },
        ],
      },
      {
        name: "Vector Sport",
        series: "HP",
        tag: "Road / Sport",
        price: "$55.00 – $75.00",
        href: "/shop/vector-sport",
        img: TIRE_IMG,
        specs: [
          { label: "Air", value: "Tubeless Ready" },
          { label: "Casing", value: "60tpi" },
          { label: "Use", value: "Training" },
        ],
      },
      {
        name: "Eagle Sport",
        series: "P",
        tag: "Everyday Performance",
        price: "$45.00 – $60.00",
        href: "/shop/eagle-sport",
        img: TIRE_IMG,
        specs: [
          { label: "Air", value: "Tubeless Ready" },
          { label: "Durability", value: "High" },
          { label: "Use", value: "Daily" },
        ],
      },
    ],
    []
  );

  const seriesBlocks: { key: SeriesKey; title: string; desc: string }[] = [
    {
      key: "UHP",
      title: "UHP (ULTRA HIGH-PERFORMANCE)",
      desc: "Race-proven casing and compound for maximum efficiency at speed.",
    },
    {
      key: "FS",
      title: "FS (FITMENT SERIES)",
      desc: "Fitment-first options built around compatibility and availability.",
    },
    {
      key: "HP",
      title: "HP (HIGH-PERFORMANCE)",
      desc: "Fast, versatile road tires for training, endurance and everyday speed.",
    },
    {
      key: "P",
      title: "P (PERFORMANCE)",
      desc: "Reliable performance with comfort and durability balanced perfectly.",
    },
  ];

  return (
    <main className="w-full bg-white text-neutral-900">
      {/* ========================== HERO (GOODYEAR STYLE) ========================== */}
 <section className="relative w-full">
  <div
    className="relative min-h-[80vh] md:h-[90vh] w-full overflow-hidden pt-24 md:pt-20"
    style={{
      backgroundImage:
        "url(https://khfood.com/wp-content/uploads/2019/11/Screen-Shot-2019-08-17-at-4.05.34-PM@1X.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* overlays */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,209,0,0.18),transparent_40%)]" />

    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 h-full grid lg:grid-cols-2 gap-12 items-center">
      {/* LEFT CONTENT */}
      <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
        <p className="text-white/80 text-sm tracking-[0.2em] uppercase text-start">
          HOME · STORE LOCATOR 
        </p>

        <h1 className="mt-4 text-white font-medium tracking-tight leading-[1] text-5xl text-start sm:text-5xl md:text-[100px]">
          STORE 

          <span className="block text-white/90 font-black text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
            LOCATOR
          </span>
        </h1>

        <p className="mt-5 text-white/85 leading-relaxed text-sm sm:text-base md:text-lg text-start">
          A history of movement – The Eagle and Vector names are steeped in
          sporting pedigree, the Goodyear range of Road tires come with the
          technology and wealth of experience no other tire can match.
        </p>

        {/* buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-center lg:justify-start">
          <a
            href="#browse"
            className="inline-flex items-center justify-center rounded-full bg-[#FFD100] px-6 py-3 text-sm font-semibold text-black hover:brightness-95 transition"
          >
            Browse Road Tires
          </a>

          <a
            href="#modelmap"
            className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition"
          >
            Model Map
          </a>
        </div>

        {/* stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
          {[
            ["Rolling", "Fast & Efficient"],
            ["Grip", "Wet + Dry"],
            ["Protection", "Race Ready"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur"
            >
              <p className="text-white/70 text-[10px] tracking-[0.2em] uppercase">
                {k}
              </p>
              <p className="mt-2 text-white font-semibold text-sm">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT IMAGE (DESKTOP ONLY) */}
      <div className="hidden lg:block">
        <div className="relative h-[520px] w-full rounded-[28px] overflow-hidden border border-white/15 bg-white/5 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <img
            src={HERO_RIGHT}
            alt="Road ride"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <div className="rounded-2xl bg-black/35 border border-white/15 backdrop-blur px-5 py-4">
              <p className="text-white text-lg font-semibold">
                “Confidence at speed — built for riders who push.”
              </p>
              <p className="mt-1 text-white/70 text-sm tracking-wide">
                Road range overview · Goodyear Bicycle Tires
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-white" />
  </div>
</section>


      {/* ========================== MODEL MAP (DIAGRAM FEEL) ========================== */}
      <section id="modelmap" className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
          <div>
            <p className="text-sm tracking-[0.2em] uppercase text-neutral-600">
              Model Map
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
              The Goodyear Range of Road Tires
            </h2>
            <p className="mt-6 text-neutral-600 leading-relaxed">
              A quick map to help riders pick the right tire based on intent:
              race speed, endurance versatility, or daily performance.
            </p>

            <div className="mt-10 space-y-3">
              {[
                ["UHP", "Elite speed + efficiency"],
                ["FS", "Fitment-focused options"],
                ["HP", "Versatile road performance"],
                ["P", "Everyday performance"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4"
                >
                  <span className="text-xs tracking-[0.2em] uppercase text-neutral-500">
                    {k}
                  </span>
                  <span className="font-semibold text-neutral-900">{v}</span>
                </div>
              ))}
            </div>
          </div>


          <div className="rounded-[28px] border border-neutral-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.08)] overflow-hidden">
            <div className="p-8 border-b border-neutral-200 bg-neutral-50">
              <p className="text-sm tracking-[0.2em] uppercase text-neutral-500">
                Range Chart
              </p>
              <h5 className="mt-2 font-semibold text-neutral-900">
                Speed ↔ Durability (visual guide)
              </h5>
            </div>

            <div className="p-8">
              <div className="relative h-[360px] rounded-2xl bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:22px_22px] overflow-hidden">

                <ChartBar label="Eagle F1 SuperSport R" top="18%" width="92%" tone="dark" />
                <ChartBar label="Eagle F1R" top="30%" width="86%" tone="dark" />
                <ChartBar label="Vector 4Seasons" top="47%" width="74%" tone="mid" />
                <ChartBar label="Vector Sport" top="59%" width="64%" tone="mid" />
                <ChartBar label="Eagle Sport" top="72%" width="56%" tone="light" />

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>More Speed</span>
                  <span>More Durability</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-4 text-sm">
                <LegendDot label="UHP" tone="dark" />
                <LegendDot label="HP" tone="mid" />
                <LegendDot label="P" tone="light" />
                <LegendDot label="FS" tone="mid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modelmap />

      <section className="max-w-7xl mx-auto px-6 pb-20">

        {/* Top divider */}
        <div className="border-t border-neutral-200 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-10">

          {/* LEFT TITLE */}
          <div className="flex items-center gap-6">
            <h3 className="text-2xl font-bold tracking-wide uppercase">
              OTHER RANGES
            </h3>
            <div className="hidden md:block w-px h-12 bg-neutral-300"></div>
          </div>

          {/* RIGHT ITEMS */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-12">

            {/* Mountain */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-[50px] h-[46px] flex items-center justify-center rounded-full border border-neutral-300 text-xl text-neutral-600 group-hover:border-black transition">
                <PiMountainsFill className="" />

              </div>
              <div>
                <h4 className="text-md font-semibold uppercase tracking-wide">
                  Mountain
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Aggressive trail and off-road performance
                </p>
              </div>
            </div>

            {/* Urban / Trekking */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-[50px] h-[46px] flex items-center justify-center rounded-full border border-neutral-300 text-xl text-neutral-600 group-hover:border-black transition">
                <IoBusiness />

              </div>
              <div>
                 <h4 className="text-md font-semibold uppercase tracking-wide">
                  Urban / Trekking
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Comfort and durability for everyday riding
                </p>
              </div>
            </div>

            {/* Gravel */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-[50px] h-[46px] flex items-center justify-center rounded-full border border-neutral-300 text-xl text-neutral-600 group-hover:border-black transition">
                <FaMap />

              </div>
              <div>
                 <h4 className="text-md font-semibold uppercase tracking-wide">
                  Gravel
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Versatile performance across mixed terrain
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* ========================== EDITORIAL STORY: EAGLE ========================== */}
     <section className="relative py-16 md:py-24">
  {/* BACKGROUND */}
  <div className="absolute inset-0">
    <img
      src={EAGLE_BG}
      alt="Eagle story"
      className="object-cover w-full h-full"
    />
    <div className="absolute inset-0 bg-white/85" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 md:gap-14 items-center">
      
      {/* LEFT CONTENT */}
      <div>
        <p className="text-sm tracking-[0.2em] uppercase text-neutral-500">
          Technology Story
        </p>

        <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          EAGLE.
        </h2>

        <h6 className="mt-2 text-base sm:text-lg md:text-xl uppercase font-semibold text-neutral-700">
          Cutting edge technology and precision.
        </h6>

        <p className="mt-5 md:mt-6 text-sm sm:text-base text-neutral-700 leading-relaxed">
          Eagle tires are designed and built for precision, performance, and
          speed. Specific tread patterns, fabrics, and compounds prioritize low
          weight and minimize rolling resistance.
        </p>

        {/* FEATURE LIST */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Eagle F1 SuperSport R", "Confident grip in varied conditions."],
            ["Eagle F1 R", "Efficient deformation under load."],
            ["Eagle F1 R Z29 Aero", "Lower pressure, higher confidence."],
            ["Eagle Sport", "Protection without weight penalty."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="
                rounded-2xl border border-neutral-200 bg-white px-5 py-5
                shadow-sm transition
                hover:shadow-md hover:bg-[#FFD100]
              "
            >
              <h5 className="font-semibold text-sm sm:text-base">{t}</h5>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {d}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT VISUAL */}
      <div className="relative">
        <div className="relative h-[300px] sm:h-[360px] md:h-[520px] rounded-[24px] md:rounded-[28px] overflow-hidden shadow-[0_30px_120px_rgba(15,23,42,0.18)] border border-white">
          <img
            src="https://www.goodyearbike.com/wp-content/uploads/2025/06/Lifestyle_Connector1002.jpg"
            alt="Road race"
            className="object-cover w-full h-full"
          />
        </div>

        {/* OVERLAP CARD (DESKTOP ONLY) */}
        <div className="hidden md:block absolute -left-10 -bottom-10 w-[320px] rounded-[24px] border border-neutral-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
          <p className="text-xs tracking-[0.2em] uppercase text-neutral-500">
            Featured
          </p>
          <h5 className="mt-2 text-lg font-bold">Eagle F1R</h5>
          <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
            Aero-focused speed for riders who want sharp handling.
          </p>

          <a
            href="#browse"
            className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold text-black relative"
          >
            <span className="relative">
              Browse models
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
     </section>


      {/* ========================== SERIES (ACCORDION PREMIUM) ========================== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-500">
              Series
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
              Preview Road Tires by Series
            </h2>
            <p className="mt-6 text-neutral-600 leading-relaxed">
             
									UHP (Ultra High-Performance) tires represent the cutting edge in tire research, development, and production techniques, as well as the most advanced fabrics and compounds.
            </p>

             <p className="mt-6 text-neutral-600 leading-relaxed">
          FS (Fitment Series) tires utilize strategic partnerships for development of a system-based approach, where tires are developed and optimized to a rim specific fitment.
            </p>

             <p className="mt-6 text-neutral-600 leading-relaxed">
          HP (High-Performance) tires feature high-level technologies for a balance of performance and value, across a broad range of conditions.
            </p>

             <p className="mt-6 text-neutral-600 leading-relaxed">
             
							P (Performance) tires maximize value for everyday use and dependability.
            </p>
          </div>

        <div className="rounded-[22px] sm:rounded-[28px] border border-neutral-200 bg-white overflow-hidden shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
  {seriesBlocks.map((s, idx) => {
    const isOpen = openSeries === s.key;

    return (
      <div
        key={s.key}
        className={classNames(idx !== 0 && "border-t border-neutral-200")}
      >
        {/* HEADER */}
        <button
          type="button"
          onClick={() => setOpenSeries((p) => (p === s.key ? null : s.key))}
          className="
            w-full
            px-4 py-4
            sm:px-6 sm:py-5
            md:px-7 md:py-6
            flex items-start sm:items-center justify-between
            gap-4
            text-left
            hover:bg-neutral-50
            transition
          "
        >
          {/* TEXT */}
          <div className="pr-2">
            <h5 className="font-bold tracking-tight text-base sm:text-lg">
              {s.title}
            </h5>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {s.desc}
            </p>
          </div>

          {/* ICON */}
          <span
            className={classNames(
              `shrink-0 h-10 w-10 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full border flex items-center justify-center text-[28px] flex items-center  font-semibold transition
            `,
              isOpen
                ? "border-black bg-black text-white"
                : "border-neutral-300 bg-white text-neutral-700"
            )}
          >
            {isOpen ? "–" : "+"}
          </span>
        </button>

        {/* BODY */}
        {isOpen && (
          <div
            className="
              px-4 pb-5
              sm:px-6 sm:pb-6
              md:px-7 md:pb-7
            "
          >
            {/* PRODUCTS / SERIES */}
            <SeriesSection />
          </div>
        )}
      </div>
    );
  })}
</div>


        </div>
      </section>

      

      {/* ========================== VECTOR STORY STRIP ========================== */}
      {/* <section className="relative py-24 bg-neutral-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={VECTOR_BG} alt="Vector story" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-white/60">
              All-Season Endurance
            </p>
            <h2 className="mt-4 text-5xl font-semibold tracking-tight">
              VECTOR.
            </h2>
            <p className="mt-6 text-white/80 leading-relaxed">
              When conditions change, you don’t. Vector is engineered for
              endurance riding — wet grip, durability, and daily confidence.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur p-8">
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                ["All-Season", "Built for year-round conditions"],
                ["Protection", "Sidewall and tread durability"],
                ["Comfort", "Smooth ride feel at speed"],
                ["Confidence", "Grip tuned for wet roads"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5">
                  <p className="font-semibold">{t}</p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

         <section className="relative py-16 md:py-24">
  {/* BACKGROUND */}
  <div className="absolute inset-0">
    <img
      src={VECTOR_BG}
      alt="Eagle story"
      className="object-cover w-full h-full"
    />
    <div className="absolute inset-0 bg-white/85" />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 md:gap-14 items-center">
      
      {/* LEFT CONTENT */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-neutral-500">
         All-Season Endurance
        </p>

        <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
         Vector
        </h2>

        <h6 className="mt-2 text-base sm:text-lg md:text-xl uppercase font-semibold text-neutral-700">
          Vector All-Season Tires.
        </h6>

        <p className="mt-5 md:mt-6 text-sm sm:text-base text-neutral-700 leading-relaxed">
       Vector tires are designed and built for reliabily and dependability across varying conditions. A choice blend of technologies and materials mean you can rely on Vector tires when road conditions take a turn for the worse.
        </p>

        {/* FEATURE LIST */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Vector 4Seasons", "Confident grip in varied conditions."],
            ["Vector R", "Efficient deformation under load."],
            ["Vector Sport", "Lower pressure, higher confidence."],
          
          ].map(([t, d]) => (
            <div
              key={t}
              className="
                rounded-2xl border border-neutral-200 bg-white px-5 py-5
                shadow-sm transition
                hover:shadow-md hover:bg-[#FFD100]
              "
            >
              {/* <p className="font-semibold text-sm sm:text-base">{t}</p> */}
              <h5 className="font-semibold text-sm sm:text-base">{t}</h5>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {d}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT VISUAL */}
      <div className="relative">
        <div className="relative h-[300px] sm:h-[360px] md:h-[520px] rounded-[24px] md:rounded-[28px] overflow-hidden shadow-[0_30px_120px_rgba(15,23,42,0.18)] border border-white">
          <img
            src={VECTOR_BG}
            alt="Road race"
            className="object-cover w-full h-full"
          />
        </div>

        {/* OVERLAP CARD (DESKTOP ONLY) */}
        <div className="hidden md:block absolute -left-10 -bottom-10 w-[320px] rounded-[24px] border border-neutral-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
          <p className="text-xs tracking-[0.2em] uppercase text-neutral-500">
            Vector
          </p>
          <h5 className="mt-2 text-lg font-bold">Vector R</h5>
          <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
            Aero-focused speed for riders who want sharp handling.
          </p>

          <a
            href="#browse"
            className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold text-black relative"
          >
            <span className="relative">
              Browse models
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
     </section>
          

      {/* ========================== BROWSE GRID (PREMIUM CARDS) ========================== */}
      {/* <section id="browse" className="bg-neutral-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-neutral-500">
                Browse
              </p>
              <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
                Select Road Tires by Browsing the Range
              </h2>
            </div>

            <div className="flex gap-2">
              <Pill text="All" active />
              <Pill text="UHP" />
              <Pill text="FS" />
              <Pill text="HP" />
              <Pill text="P" />
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((p) => (
              <ProductCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </section> */}

      <ProductTires />
    </main>
  );
}

/* ------------------------------ small components ------------------------------ */

function Pill({ text, active }: { text: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={classNames(
        "rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition",
        active
          ? "bg-black text-white"
          : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
      )}
    >
      {text}
    </button>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <a
      href={p.href}
      className="group rounded-[28px] border border-neutral-200 bg-white shadow-sm hover:shadow-[0_30px_90px_rgba(15,23,42,0.12)] transition overflow-hidden"
    >
      <div className="relative h-[300px] bg-gradient-to-b from-neutral-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,0,0,0.10),transparent_55%)]" />
        <img src={p.img} alt={p.name} className="object-contain p-10" />
        <div className="absolute top-5 left-5 rounded-full bg-black text-white text-[11px] font-semibold px-3 py-1">
          {p.series}
        </div>
      </div>

      <div className="p-7">
        <p className="text-xs tracking-[0.2em] uppercase text-neutral-500">
          {p.tag}
        </p>
         <h3 className="mt-2 text-lg font-bold tracking-tight">{p.name}</h3>
        <p className="mt-2 text-sm font-semibold text-neutral-900">{p.price}</p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {p.specs.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-3"
            >
              <p className="text-[10px] tracking-[0.24em] uppercase text-neutral-500">
                {s.label}
              </p>
              <p className="mt-1 text-xs font-semibold text-neutral-900">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-semibold underline underline-offset-4 group-hover:text-neutral-600">
            View tire →
          </span>
          <span className="h-10 w-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition">
            +
          </span>
        </div>
      </div>
    </a>
  );
}

function MiniCard({ p }: { p: Product }) {
  return (
    <a
      href={p.href}
      className="rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 transition p-5"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 rounded-xl bg-neutral-50 border border-neutral-200 overflow-hidden">
          <img src={p.img} alt={p.name} className="object-contain p-2" />
        </div>
        <div className="min-w-0">
          <p className="text-xs tracking-[0.2em] uppercase text-neutral-500">
            {p.series}
          </p>
          <p className="font-bold truncate">{p.name}</p>
          <p className="text-sm text-neutral-600">{p.price}</p>
        </div>
      </div>
    </a>
  );
}

function ChartBar({
  label,
  top,
  width,
  tone,
}: {
  label: string;
  top: string;
  width: string;
  tone: "dark" | "mid" | "light";
}) {
  const bg =
    tone === "dark"
      ? "bg-[#1f2937]"
      : tone === "mid"
        ? "bg-[#475569]"
        : "bg-[#94a3b8]";
  return (
    <div
      className={classNames(
        "absolute left-4 right-4",
        top
      )}
      style={{ top }}
    >
      <div
        className={classNames(
          "h-10 rounded-xl flex items-center px-4 text-white text-sm font-semibold shadow-sm",
          bg
        )}
        style={{ width }}
      >
        <span className="truncate">{label}</span>
      </div>
    </div>
  );
}

function LegendDot({ label, tone }: { label: string; tone: "dark" | "mid" | "light" }) {
  const dot =
    tone === "dark"
      ? "bg-[#1f2937]"
      : tone === "mid"
        ? "bg-[#475569]"
        : "bg-[#94a3b8]";
  return (
    <div className="flex items-center gap-3">
      <span className={classNames("h-3 w-3 rounded-full", dot)} />
      <span className="text-sm text-neutral-700 font-semibold">{label}</span>
    </div>
  );
}
