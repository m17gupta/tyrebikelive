"use client";

import { Maximize2 } from "lucide-react";

const Aboutus = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* ================= LEFT COLUMN ================= */}
          <div className="grid gap-6">
            {/* TOP IMAGE */}
            <div className="relative rounded-[20px] overflow-hidden">
              {/* Floating Text */}
              <div
                className="
                  absolute z-10
                  left-4 bottom-4
                  sm:left-6 sm:bottom-6
                  max-w-[240px] sm:max-w-[280px]
                "
              >
                <p className="uppercase text-[10px] tracking-[0.22em] text-slate-400">
                  Step to buy – simple & hassle-free
                </p>
                <h2 className="text-[20px] sm:text-[24px] md:text-[28px] leading-tight font-medium  text-black">
                  Elegant living
                  <br />
                  room lamps
                </h2>
              </div>

              {/* Image */}
              <img
                src="https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Group-6356900-1.png"
                alt="Feature product"
                className="
                  w-full
                  h-[260px] sm:h-[320px] md:h-[380px]
                  object-cover
                  transition-transform duration-500 hover:scale-105
                "
              />

              {/* Floating Button */}
              <div className="absolute bottom-0 right-0 bg-white p-1.5  ">
                <button
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-full bg-[#f0f0f0]
                    hover:bg-[#fdc402]
                    transition-all duration-300
                  "
                >
                  <Maximize2 className="w-4 h-4 text-slate-800" />
                </button>
              </div>
            </div>

            {/* BOTTOM IMAGES */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-[20px]">
                <img
                  src="https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Wrangler-Spain-2024-1028.jpg"
                  alt="Gallery 1"
                  className="
                    w-full
                    h-[160px] sm:h-[200px] md:h-[260px]
                    object-cover
                    transition-transform duration-500 hover:scale-105
                  "
                />
              </div>

              <div className="relative overflow-hidden rounded-[20px]">
                <img
                  src="https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Wrangler-Spain-2024-1024.jpg"
                  alt="Gallery 2"
                  className="
                    w-full
                    h-[160px] sm:h-[200px] md:h-[260px]
                    object-cover
                    transition-transform duration-500 hover:scale-105
                  "
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT BIG IMAGE ================= */}
          <div className="relative overflow-hidden rounded-[20px]">
            <img
              src="https://goodyear.creativeconsult.co.in/wp-content/uploads/2025/11/Lifestyle_Connector1002.jpg"
              alt="Lifestyle"
              className="
                w-full
                h-[260px] sm:h-[360px] lg:h-full
                object-cover
                transition-transform duration-700 hover:scale-105
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;

