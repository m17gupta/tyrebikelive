"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function NewsLatter() {
  const slides = [
    {
      title:
        "THE ESCAPE RANGE; EVOLVED FOR MOUNTAIN BIKING IN ITS PUREST FORM; TRAIL RIDING.",
      description:
        "Introducing 2 new trail MTB tires; Escape Inter and Escape Max. Developed to excel in a broad range of terrains and conditions found within the trail discipline.",
      button: "ABOUT ESCAPE",
    },
    {
      title: "BUILT FOR MAXIMUM CONTROL ON ROUGH TRAILS.",
      description:
        "Escape Max offers exceptional grip, stability, and durability on aggressive terrain.",
      button: "EXPLORE MAX",
    },
    {
      title: "LIGHTWEIGHT PERFORMANCE FOR SPEED AND FLOW.",
      description:
        "Escape Inter delivers fast rolling efficiency and precise handling for trail riders.",
      button: "EXPLORE INTER",
    },
  ];

  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* IMAGE (Mobile / Right Desktop) */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen lg:sticky lg:top-0 order-1 lg:order-2">
        <img
          src="https://www.goodyearbike.com/wp-content/uploads/2024/05/Z30NSW-fadeV4.png"
          className="w-full h-full object-cover"
          alt="Escape Tires"
        />
      </div>

      {/* CONTENT SLIDER */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex items-center px-6 sm:px-10 lg:px-16 text-white bg-black relative z-20 order-2 lg:order-1">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="newsletter-swiper"
      >

          {slides.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="max-w-xl">
                <h1 className="text-2xl sm:text-3xl md:text-[48px] font-regular leading-tight mb-5">
                  {item.title}
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-7">
                  {item.description}
                </p>

                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition">
                  {item.button}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

