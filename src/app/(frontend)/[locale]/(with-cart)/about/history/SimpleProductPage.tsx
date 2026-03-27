"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid } from "swiper/modules"; // ✅ Grid add

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid"; // ✅ Grid CSS

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ChevronDown, Star, Eye, Shuffle } from "lucide-react";

const categories = ["All Tires", "Gravel", "Mountain", "Uncategorized"];

const products = [
  {
    id: 1,
    name: "Eagle F1R Z29 Aero",
    img: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Vector-Sport-Tubeless-Ready-Cut-1024x1024.jpg",
    soldOut: false,
  },
  {
    id: 2,
    name: "Vector Sport",
    img: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Vector-Sport-Tubeless-Ready-Cut-1024x1024.jpg",
    soldOut: true,
  },
  {
    id: 3,
    name: "Wrangler MTR",
    img: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Vector-Sport-Tubeless-Ready-Cut-1024x1024.jpg",
    soldOut: true,
  },
  {
    id: 4,
    name: "Peak",
    img: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Vector-Sport-Tubeless-Ready-Cut-1024x1024.jpg",
    soldOut: true,
  },
  {
    id: 5,
    name: "County",
    img: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Vector-Sport-Tubeless-Ready-Cut-1024x1024.jpg",
    soldOut: true,
  },
  {
    id: 6,
    name: "County 2",
    img: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Vector-Sport-Tubeless-Ready-Cut-1024x1024.jpg",
    soldOut: true,
  },
  {
    id: 7,
    name: "County 3",
    img: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Vector-Sport-Tubeless-Ready-Cut-1024x1024.jpg",
    soldOut: true,
  },
    {
    id: 8,
    name: "County 3",
    img: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Vector-Sport-Tubeless-Ready-Cut-1024x1024.jpg",
    soldOut: true,
  },
    {
    id: 9,
    name: "County 3",
    img: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Vector-Sport-Tubeless-Ready-Cut-1024x1024.jpg",
    soldOut: true,
  },
    {
    id: 10,
    name: "County 3",
    img: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Vector-Sport-Tubeless-Ready-Cut-1024x1024.jpg",
    soldOut: true,
  },
  {
    id: 11,
    name: "County 3",
    img: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Vector-Sport-Tubeless-Ready-Cut-1024x1024.jpg",
    soldOut: true,
  },
  {
    id: 12,
    name: "County 3",
    img: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Vector-Sport-Tubeless-Ready-Cut-1024x1024.jpg",
    soldOut: true,
  },
];

export default function SimpleProductPage() {
  const [open, setOpen] = useState(true);
  const [activeCat, setActiveCat] = useState("All Tires");

  return (
    <div className="w-full bg-white py-12">
      <div className="mx-auto  px-6">
        {/* Title row */}
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-2xl md:text-[28px] font-semibold  uppercase">
         Similar Products.

          </h2>
          <div className="h-px flex-1 bg-slate-300" />
        </div>

        <div className="flex flex-col gap-8 md:flex-row ">
          {/* FILTER CARD */}
          

          {/* SLIDER */}
          <div className="w-full">
          <Swiper
                modules={[Navigation, Pagination]} 
                spaceBetween={40}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}

                breakpoints={{
                    320: { slidesPerView: 1.3, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 24 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                    1440: { slidesPerView: 4, spaceBetween: 40 },
                }}

                className="best-selling-swiper custom-arrows"
                >
              {products.map((p) => (
                <SwiperSlide key={p.id} className="!h-auto">                    
                  <div className="group relative flex h-full flex-col items-center pt-10 pb-6">
                    {/* IMAGE WRAP */}
                    <div className="relative flex h-64 w-full items-center justify-center">
                      {/* SOLD OUT badge */}
                      {p.soldOut && (
                        <div className="absolute left-4 z-10 top-3 rounded-full bg-emerald-500 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                          Sold Out
                        </div>
                      )}

                      {/* tyre image */}
                      <img
                        src={p.img}
                        alt={p.name}
                        className="h-full max-h-64 w-auto object-contain transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-[1.03]"
                      />

                      {/* HOVER ICON STACK */}
                      <div className="pointer-events-none absolute right-3 top-6 flex flex-col items-center gap-3 translate-x-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        <CircleIcon>
                          <Star className="h-4 w-4 text-slate-700" />
                        </CircleIcon>
                        <CircleIcon>
                          <Eye className="h-4 w-4 text-slate-700" />
                        </CircleIcon>
                        <CircleIcon>
                          <Shuffle className="h-4 w-4 text-slate-700" />
                        </CircleIcon>
                      </div>

                      <div className="pointer-events-none absolute right-3 bottom-0 flex flex-col items-center gap-3 translate-x-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        <CircleIcon big>
                          <IoMdCheckmarkCircleOutline className="h-4 w-4 text-black" />
                        </CircleIcon>
                      </div>
                    </div>

                    {/* RATING + NAME */}
                    <div className="w-full text-start">
                      <div className="mt-3 flex items-center justify-start text-[11px]">
                        <span className="text-[14px] leading-none text-black">
                          ★★★★★
                        </span>
                        <span className="ml-1 text-[11px] text-gray-400">
                          (0)
                        </span>
                      </div>

                      <h3 className="mt-1 text-[16px] font-medium text-slate-800">
                        {p.name}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

/* small helper for round icon buttons */
function CircleIcon({   
  children,
  big,
}: {
  children: React.ReactNode;
  big?: boolean;
}) {
  return (
    <button
      className={`pointer-events-auto mx-auto flex items-center justify-center rounded-full bg-white shadow-[0_10px_25px_rgba(15,23,42,0.25)] transition-transform hover:-translate-y-0.5 ${
        big ? "h-11 w-11 bg-slate-900" : "h-9 w-9"
      }`}
    >
      {children}
    </button>
  );
}
