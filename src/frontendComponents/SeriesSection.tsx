"use client";
import React, { useState } from "react";

const products = [
  {
    id: "eagle-f1",
    label: "Eagle F1 SuperSport R",
    price: "$95.00 – $120.00",
    dec: "For the serious athlete who demands outright speed, low weight and reduced Crr above all else. The Eagle F1 SuperSport R is our fastest Road Ultra High-Performance tire.",
    btn: "LEARN MORE",
    image:
      "https://www.goodyearbike.com/wp-content/uploads/2023/03/Studio-Eagle-F1-SuperSport-R-1005.jpg",
  },
  {
    id: "eagle-f1r",
    label: "Eagle F1R",
    price: "$90.00 – $110.00",
    dec: "For riders demanding straight line speed, cornering performance and puncture resistance from one tire.",
    btn: "LEARN MORE",
    image:
      "https://www.goodyearbike.com/wp-content/uploads/2023/03/Studio-Eagle-F1-R-1002.jpg",
  },
  {
    id: "eagle-f1-speed",
    label: "Eagle F1 Speed",
    price: "$85.00 – $100.00",
    dec: "Ultra high performance with low rolling resistance and added protection to perform across all conditions.",
    btn: "LEARN MORE",
    image:
      "https://www.goodyearbike.com/wp-content/uploads/2021/02/Vector-4Seasons-1000px-1001.jpg",
  },
];

const SeriesSection = () => {
  const [activeProduct, setActiveProduct] = useState(products[0]);

  return (
    <section className="w-full">
      {/* 🔘 TABS */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {products.map((p) => {
          const isActive = activeProduct.id === p.id;

          return (
            <button
              key={p.id}
              onClick={() => setActiveProduct(p)}
              className={`
                px-3 py-3 rounded-lg border transition
                text-sm font-medium text-center
                flex items-center justify-center
                ${
                  isActive
                    ? "border-[#FFD100] bg-[#FFD100] text-black"
                    : "border-neutral-200 bg-white hover:border-neutral-400"
                }
              `}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* 🖼 IMAGE SLIDER */}
      <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] overflow-hidden rounded-xl">
        <img
          key={activeProduct.id}
          src={activeProduct.image}
          alt={activeProduct.label}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/45" />

        {/* CONTENT */}
        <div className="
          absolute inset-0
          flex items-end sm:items-center
          px-4 sm:px-8 lg:px-12
          pb-4 sm:pb-0
        ">
          <div className="max-w-xl text-white">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              {activeProduct.label}
            </h2>

            <p className="mt-2 text-xs sm:text-sm md:text-base opacity-90 leading-relaxed">
              {activeProduct.dec}
            </p>

            <button className="
              mt-4
              inline-flex items-center justify-center
              px-5 py-2.5
              text-sm font-semibold
              bg-white text-black
              rounded-md
              hover:bg-[#FFD100]
              transition
            ">
              {activeProduct.btn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeriesSection;

