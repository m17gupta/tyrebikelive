"use client";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const testimonials = [
  {
    id: 1,
    name: "Marin Medak",
    text: `Apsolutna preporuka za Karla Bana! Još 2015. godine, Karlu sam povjerio izradu nekoliko noževa po mjeri. Danas, deset godina kasnije, ti su noževi još uvijek u aktivnoj upotrebi i prezadovoljan sam s njima.

Kvaliteta izrade, oštrica i samog materijala je nevjerojatna — izdržali su test vremena i intenzivno korištenje bez ikakvog kompromisa. Svaki nož bio je napravljen točno prema mojim potrebama, a ono što Karla izdvaja je njegova sposobnost da te potrebe pretoči u savršen format noža.

Ako tražite kovača koji spaja vrhunsko majstorstvo, izdržljivost i estetski užitak, Karl Ban je prava adresa.`,
    image: "/assets/Image/testimonials-img.png",
    thumbnails: ["/assets/Image/testimonials-img-1.png", "/assets/Image/testimonials-img-2.png"],
  },
  {
    id: 2,
    name: "Petar Novak",
    text: `Karlovi noževi su čudo! Svaki put kad ih koristim, osjećam razliku u preciznosti i balansu. Nevjerojatno iskustvo.`,
    image: "/assets/Image/testimonials-img.png",
    thumbnails: ["/assets/Image/testimonials-img-1.png", "/assets/Image/testimonials-img-2.png"],
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="relative container mx-auto px-4 py-16">
      <h3 className="mb-1 inline-block w-full border-b border-gray-200 pb-2 text-[16px] font-medium text-[#FF7020]">
        Što drugi kažu o Karlu
      </h3>
      <div className="mx-auto max-w-7xl">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex + 1)}
          className="mt-10"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="grid items-center gap-10 md:grid-cols-2">
                {/* LEFT SIDE */}
                <div>
                  <p className="text-[18px] leading-relaxed whitespace-pre-line text-[#4F4640]">
                    {item.text}
                  </p>
                  <p className="mt-6 font-semibold text-[#4F4640]">{item.name}</p>
                </div>

                {/* RIGHT SIDE */}
                <div className="relative flex flex-col items-center justify-center">
                  {/* Quote Icon */}
                  <Quote size={60} className="absolute top-0 left-1/2 -translate-x-1/2 text-gray-200" />

                  <div className="mt-12 flex items-center justify-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[300px] w-[230px] rounded-2xl object-cover shadow-md"
                    />
                    <div className="flex flex-col gap-4">
                      {item.thumbnails.map((thumb, index) => (
                        <img
                          key={index}
                          src={thumb}
                          alt="thumb"
                          className="h-[90px] w-[90px] rounded-2xl object-cover opacity-70 transition-all duration-300 hover:opacity-100"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination + Navigation */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button className="prev-btn rounded-full border border-[#EDEDED] bg-[#EDEDED] px-14 transition hover:bg-gray-100">
            <span className="text-lg text-[#FF7020]">{"<"}</span>
          </button>

          <button className="next-btn rounded-full border border-[#EDEDED] bg-[#EDEDED] px-14 transition hover:bg-gray-100">
            <span className="text-lg text-[#FF7020]">{">"}</span>
          </button>
        </div>

        <span className="mt-3 flex justify-center text-[11px] font-medium text-[#636B78] italic">
          {activeIndex} / {testimonials.length}
        </span>
      </div>
    </section>
  );
};

export default Testimonials;

