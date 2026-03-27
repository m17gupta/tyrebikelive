"use client";

import React from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { IoMdQuote } from "react-icons/io";

const testimonials = [
  {
    id: 1,
    name: "Jennifer",
    location: "From California",
    title: "Perfect Quality and Customer Service!",
    image: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2022/10/testimonial-1-1.jpg",
    message:
      "The sofa and armchairs I bought are not only beautiful but also incredibly comfortable. The colors are exactly as shown on the website, and the overall experience with Minicom has been flawless.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jessica",
    location: "From Chicago",
    title: "Great Price & Services",
    image: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2022/10/testimonial-1-1.jpg",
    message:
      "The sofa and armchairs I bought are not only beautiful but also incredibly comfortable. The colors are exactly as shown on the website, and the overall experience with Minicom has been flawless.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elizabeth",
    location: "From New York",
    title: "Amazing Quality & Details",
    image: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2022/10/testimonial-1-1.jpg",
    message:
      "The sofa and armchairs I bought are not only beautiful but also incredibly comfortable. The colors are exactly as shown on the website, and the overall experience with Minicom has been flawless.",
    rating: 5,
  },
  {
    id: 4,
    name: "Claudia",
    location: "From Seattle",
    title: "Beautiful & Comfortable Pieces",
    image: "https://goodyear.creativeconsult.co.in/wp-content/uploads/2022/10/testimonial-1-1.jpg",
    message:
      "The sofa and armchairs I bought are not only beautiful but also incredibly comfortable. The colors are exactly as shown on the website, and the overall experience with Minicom has been flawless.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-[#f5f5f7] py-20">
      <div className="md:w-[90%] w-[100%] md:ms-auto px-6">
        {/* Top heading + arrows */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-gray-400 mb-2">
              5.00 from 1230+ reviews
            </p>
            <h2 className="text-3xl md:text-[48px] font-regular uppercase text-[#111111]">
              What Customers Say
            </h2>
          </div>

          {/* Arrows (right top) */}
          <div className="flex items-center gap-5 mt-2">
            <button
              className="test-prev flex items-center justify-center text-gray-700 hover:text-black transition"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="test-next flex items-center justify-center text-gray-700 hover:text-black transition"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider */}
       {/* Slider */}
        <Swiper
  modules={[Navigation, Autoplay]}
  navigation={{ prevEl: ".test-prev", nextEl: ".test-next" }}
  autoplay={{ delay: 6000, disableOnInteraction: false }}
  loop
  spaceBetween={32}
  className="testimonials-swiper"
  breakpoints={{
    // ✅ Mobile: ONLY ONE CARD
    0: {
      slidesPerView: 1,
      spaceBetween: 16,
    },

    // Tablet: 1.5 cards
    768: {
      slidesPerView: 1.6,
      spaceBetween: 24,
    },

    // Desktop: 2+ cards
    1024: {
      slidesPerView: 2.2,
      spaceBetween: 32,
    },
  }}
>

          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-3xl shadow-sm flex flex-col h-full px-10 py-10 md:px-12 md:py-10 ">

                {/* Top row: avatar + name + quote mark */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#222222]">
                        {item.name}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* big quote mark */}
                  <div className=" text-gray-200 leading-none select-none">
             <IoMdQuote className="text-5xl md:text-7xl"/>

                  </div>
                </div>

                {/* Divider line */}
                <div className="border-t border-gray-200 mb-7" />

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#f6b500]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f6b500]" />
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-[18px] font-medium text-[#111111] mb-3">
                  {item.title}
                </h3>

                {/* Message */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.message}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;

