"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fadeInUp } from "../anim";

export default function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = React.useState(0);
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

  // 👇 Add Refs for both swipers
  const mainSwiperRef = React.useRef<any>(null);
  const thumbSwiperRef = React.useRef<any>(null);

  return (
    <section className="flex flex-col items-center gap-5">
      {/* ---------- Main Image Slider ---------- */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#E2E2E2] bg-[#F3F3F3] shadow-sm"
      >
        {/* Left Arrow */}
        {/* <button
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 transition"
          onClick={() => mainSwiperRef.current?.slidePrev()}
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button> */}

        {/* Right Arrow */}
        {/* <button
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 transition"
          onClick={() => mainSwiperRef.current?.slideNext()}
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button> */}

        {/* Main Swiper */}
        <Swiper
          modules={[Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          onSlideChange={(swiper) => setActive(swiper.activeIndex)}
          className="mainSwiper"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src}
                alt={`product-${i}`}
                className="h-[500px] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* ---------- Thumbnail Gallery ---------- */}
      <div className="relative w-full max-w-3xl">
        {/* Left Arrow for Thumbs */}
        <button
          className="absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow transition hover:bg-gray-100"
          onClick={() => thumbSwiperRef.current?.slidePrev()}
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>

        {/* Right Arrow for Thumbs */}
        <button
          className="absolute top-1/2 right-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow transition hover:bg-gray-100"
          onClick={() => thumbSwiperRef.current?.slideNext()}
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>

        {/* Thumbnails Swiper */}
        <Swiper
          modules={[Thumbs, Navigation]}
          onSwiper={(swiper) => {
            setThumbsSwiper(swiper);
            thumbSwiperRef.current = swiper;
          }}
          slidesPerView={6}
          spaceBetween={10}
          watchSlidesProgress
          className="thumbSwiper"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <button
                onClick={() => {
                  setActive(i);
                  mainSwiperRef.current?.slideTo(i);
                }}
                className={`overflow-hidden rounded-lg border p-1 transition-all duration-300 ${
                  active === i ? "border-[#FF7020] ring-2 ring-[#FF7020]/30" : "border-[#E2E2E2]"
                }`}
                style={{ borderRadius: "6px" }}
              >
                <img src={src} alt={`thumb-${i}`} className="h-24 w-24 object-cover" />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

