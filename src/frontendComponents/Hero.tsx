"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full md:h-[100svh] h-[100svh] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="http://www.goodyearbike.com/wp-content/uploads/2025/06/Escape_Clip_900px-1.mp4" // better to use local video
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* CENTER OUTLINE TEXT */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          text-[48px] sm:text-[70px] md:text-[110px] lg:text-[150px]
          font-extrabold uppercase tracking-widest
          text-transparent whitespace-nowrap
        "
        style={{ WebkitTextStroke: "2px #ffffff" }}
      >
        TAKE A TRIP
      </motion.h1>

      {/* Bottom Content */}
      <div
        className="
          absolute bottom-8 sm:bottom-12 md:bottom-16
          w-full px-5 sm:px-10
          flex flex-col md:flex-row
          gap-6 md:gap-0
          justify-between items-start md:items-end
        "
      >
        {/* Left Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white max-w-lg"
        >
          <p className="uppercase tracking-widest text-xs sm:text-sm opacity-80">
            TIMELESS ARTISTRY IN EVERY PIECE
          </p>

          <h2 className="text-xl sm:text-2xl md:text-[48px]  leading-tight mt-2 sm:mt-3">
            HANDCRAFTED WOODEN <br /> COLLECTION
          </h2>
        </motion.div>

        {/* Right Button */}
        <motion.a
          href="#shop"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="
            bg-white text-black
            px-5 sm:px-6 py-2.5 sm:py-3
            rounded-md shadow font-semibold
            flex items-center gap-2
            hover:bg-gray-100 transition
            text-sm sm:text-base
          "
        >
          SHOP NOW
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}

