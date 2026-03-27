"use client";
import React from "react";
// import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // Arrow icon ke liye

// 🆕 Swiper React components import karein
import { Swiper, SwiperSlide } from "swiper/react";

// 🆕 Swiper modules import karein (Pagination aur Autoplay ke liye)
import { Pagination, Autoplay } from "swiper/modules";

// 🆕 Swiper ki default styles import karein
import "swiper/css";
import "swiper/css/pagination";

// 🌟 Example projects - Yahaan apna data daalein
const featuredProjects = [
  {
    id: 1,
    title: "ROAD TIRES",
    image: "https://www.goodyearbike.com/wp-content/uploads/2025/08/Mallorca2023_5048_2400px.jpg", // ⚠️ Yahaan apni image ka path daalein
    slug: "/projects/shantigram-meadows",
  },
  {
    id: 2,
    title: "URBAN TIRES",
    image: "https://www.goodyearbike.com/wp-content/uploads/2024/04/Transit-Tour-Tour-Plus-1985-Edit2-Edit.jpg", // ⚠️ Yahaan apni image ka path daalein
    slug: "/projects/emerald-mandir",
  },
  {
    id: 3,
    title: "GRAVEL TIRES",
    image: "https://www.goodyearbike.com/wp-content/uploads/2025/06/Lifestyle_Connector1002.jpg", // ⚠️ Yahaan apni image ka path daalein
    slug: "/projects/emerald-mandir",
  },
  {
    id: 4,
    title: " MTB TIRES",
    image: "https://www.goodyearbike.com/wp-content/uploads/2025/03/EscapeInMaderia-1028.jpg", // ⚠️ Yahaan apni image ka path daalein
    slug: "/projects/emerald-mandir",
  },
  // Aap yahaan aur projects add kar sakte hain...
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
// ----------------------------

export default function OurProjects() {
  return (
   <section className="relative py-20 md:py-28 overflow-hidden">

  {/* === BACKGROUND IMAGE (Behind everything) === */}
  <div
    className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
    style={{
      backgroundImage:
        "radial-gradient(rgb(0 0 0 / 32%) 1px, #000000 1px)",
    }}
  ></div>

  {/* === DARK OVERLAY === */}
  <div className="absolute inset-0 z-0 bg-black/80"></div>

  {/* === PATTERN OVERLAY === */}
  <div
    className="absolute inset-0 z-0 opacity-[0.15]"
    style={{
      backgroundImage:
        "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
      backgroundSize: "6px 6px",
    }}
  ></div>

  {/* === ALL CONTENT should be above background === */}
  <motion.div
    className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={containerVariants}
  >
    <motion.h2
      className="text-2xl md:text-[48px] font-regular uppercase mb-8" variants={cardVariants}>
      Where Do You Ride?
    </motion.h2>

    <motion.div variants={cardVariants}>
      {/* ⭐ YOUR SWIPER CODE — unchanged ⭐ */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        pagination={{
          clickable: true,
          el: ".custom-project-pagination",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="pb-16"
      >
        {featuredProjects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className="relative overflow-hidden  group">

              <a href={project.slug}>
                <img
                  src={project.image}
                  className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105 "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl sm:text-xl font-regular text-white">
                    {project.title}
                  </h3>

                  <div className="flex items-center text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">See The Range</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </a>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  </motion.div>
</section>

  );
}
