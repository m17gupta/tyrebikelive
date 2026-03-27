
"use client"

import { ComponentConfig } from "@measured/puck";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavigationOptions } from "swiper/types";

const testimonials = [
  {
    id: 1,
    name: "Marin Medak",
    text: `Apsolutna preporuka za Karla Bana! Još 2015. godine, Karlu sam povjerio izradu nekoliko noževa po mjeri. Danas, deset godina kasnije, ti su noževi još uvijek u aktivnoj upotrebi i prezadovoljan sam s njima.

Kvaliteta izrade, oštrica i samog materijala je nevjerojatna — izdržali su test vremena i intenzivno korištenje bez ikakvog kompromisa. Svaki nož bio je napravljen točno prema mojim potrebama, a ono što Karla izdvaja je njegova sposobnost da te potrebe pretoči u savršen format noža.

Ako tražite kovača koji spaja vrhunsko majstorstvo, izdržljivost i estetski užitak, Karl Ban je prava adresa.`,
    image: "/assets/Image/testimonials-img.png",
    thumbnails: [
      "/assets/Image/testimonials-img-1.png",
      "/assets/Image/testimonials-img-2.png",
    ],
  },
  {
    id: 2,
    name: "Iva Trbović",
    text: `2017. sam imala priliku isprobati Karlov nož. Trebala sam savršen poklon.

  Tražila sam hrvatsku proizvodnju, visoku kvalitetu i vizualnu privlačnost, i sve sam to pronašla u njemu. A funkcionalnost … 🤯 Samo ga pazite i njegujte i trajat će vam duže nego neki odnosi 😹`,
    image: "/assets/Image/testimonials-user-img.png",
    thumbnails: [
      "/assets/Image/user-testimonials-img.png",
      "/assets/Image/testimonials-img-1.png",
    ],
  },
  {
    id: 3,
    name: "Marko Cirimotić",
    text: `Karlov odnos prema kovini, oštrici i obliku nije samo zanatski. Svaki njegov nož, detalj, nosi njegov rukopis – spoj tradicije, osjećaj za materijal i preciznosti koja dolazi iz poštovanja prema poslu koji radi. 

On nije samo vrstan majstor; on je i visoko obrazovan čovjek, s dubokim razumijevanjem materijala, obrade i estetike. Ponosan sam što ga mogu zvati prijateljem i još ponosniji što mogu svjedočiti njegovom rastu, radu i stvaranju koje nadilazi čisti zanat.

Tko god odluči naručiti ili kupiti Karlov nož, ne kupuje samo alat – kupuje priču, trud i iskreno majstorstvo.`,
    image: "/assets/Image/testimonials-user-image1.png",
    thumbnails: [
      "/assets/Image/user-testimonials-img.png",
      "/assets/Image/testomonials-img.png",
    ],
  },
  {
    id: 4,
    name: "Bruno Kašpar",
    text: `Dugo poznanstvo od prve kupnje i želja koje sam ubrzo morao i sam izlupat u čeliku se nastavlja i dan danas. 

    Preporučujem Karlove noževe svakom tko pita za kvalitetnu oštricu bilo kakve namjene. Od kuhinjskih noževa, skandinavskih pukko dragulja, pa sve do, za one hrabre, japanskih kamisoria za old school brijačinu :)
 
    Ponosni sam vlasnik preko nekoliko uradaka sa samih početaka gospodinovog majstorstva koje i redovno s guštom koristim. `,
    image: "/assets/Image/user-testimonials-img.png",
    thumbnails: [
      "/assets/Image/testomonials-img.png",
      "/assets/Image/Marin-Medak-1.png",
    ],
  },
  {
    id: 5,
    name: "Nenad Ilić",
    text: `Noževe Karla Bana koristim godinama i mogu reći da su postali dio svakog mog kuhanja. Prvi koji sam uzeo bio je manji, deblji nož, pravi mali tenk. Reže sve, od sušene slanine i kobasica do tvrdih sireva. Čvrst, nepoderiv i nakon više godina izgleda kao prvog dana, oštar poput britve, kvalitetan bez dileme. Svaki odlazak Karlu i samo kovanje noža su posebna avantura. Nakon uspješnog posla uvijek se nešto brzinski ispeklo da se utaži glad, a nakon dobre klope neizostavna je piva ispred lokalnog dućana, legendarna 'dućanuša'.

  Kod Karla odradiš i mini tečaj ispravnog brušenja, uz savjet koji japanski kamen kupiti i gdje, naravno bez dodatnog plaćanja. Jedva čekam proširiti ovu kolekciju i dodati još koji Karlov komad, ideja već ima, samo treba vremena i pive! `,
    image: "/assets/Image/testomonials-img.png",
    thumbnails: [
      "/assets/Image/Marin-Medak-1.png",
      "/assets/Image/Marin-Medak-2.png",
    ],
  },
  {
    id: 6,
    name: "Danijel Odak",
    text: `Moje druženje s Karlom započelo je daaaavne '21, u mojoj potrazi i istraživanju djedova nauka – kovanja! Kakva slučajnost da naiđem na kovača u istom selu u kojem je i moj djed bio kovač nekad davno, a i Karlov djed! Te iste '21 mi je pomogao iskovati moj prvi nož a od te iste godine sam ponosni vlasnik njegovog Sanmai Kiritsukea, koji je u svakodnevnoj upotrebi. 
  Jedan Karlov Kiritsuke sam poslao čak u Kinu, dobrom prijatelju i velikom ljubitelju noževa koji je bio oduševljen izvedbom i kvalitetom. 😳

  Treba li dalje o kvaliteti kad oduševiš postojbinu izrade noževa! Jedva čekam sljedeće druženje i sljedećeg oštrog ljubimca.`,
    image: "/assets/Image/Marin-Medak-1.png",
    thumbnails: [
      "/assets/Image/Marin-Medak-2.png",
      "/assets/Image/Marin-Medak-3.png",
    ],
  },
];

export const TestimonialBlock: ComponentConfig = {
  label: "Testimonial Section",
  
  render: () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkIsMobile();
      window.addEventListener("resize", checkIsMobile);
      setHasMounted(true);

      return () => {
        window.removeEventListener("resize", checkIsMobile);
      };
    }, []);

    return (
      <>
        <style>{`
          .testimonial-swiper {
            overflow: hidden !important;
          }
          .testimonial-swiper .swiper-wrapper {
            display: flex !important;
            transition-timing-function: ease-in-out;
          }
          .testimonial-swiper .swiper-slide {
            opacity: 1 !important;
            flex-shrink: 0 !important;
            width: 100% !important;
            height: auto !important;
            position: relative !important;
            transition-property: transform !important;
          }
        `}</style>
        
        <section className="mx-auto w-[90%] max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
          <h3 className="text-[#FF7020] text-[16px] md:text-[18px] font-medium mb-4 border-b border-gray-200 pb-3 w-full">
            Što drugi kažu o Karlu
          </h3>

        <div className="mx-auto">
          {hasMounted && (
            <Swiper
              modules={[Navigation]}
              spaceBetween={40}
              slidesPerView={1}
              loop={true}
              autoHeight={false}
              speed={500}
              allowTouchMove={true}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
              onBeforeInit={(swiper) => {
                const navigation = swiper.params.navigation as NavigationOptions;
                navigation.prevEl = ".prev-btn";
                navigation.nextEl = ".next-btn";
              }}
              navigation={{
                nextEl: ".next-btn",
                prevEl: ".prev-btn",
              }}
              className="mt-8 md:mt-10 testimonial-swiper"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* LEFT SIDE - Text Content */}
                    <div className="relative flex flex-col justify-center">
                      <p className="text-[#4F4640] text-[14px] md:text-[16px] leading-relaxed whitespace-pre-line">
                        {item.text}
                      </p>
                      <p className="mt-6 font-semibold text-[#4F4640] text-[16px]">
                        {item.name}
                      </p>
                    </div>

                    {/* RIGHT SIDE - Images */}
                    <div className="relative flex items-center justify-center md:justify-end">
                      <div className="flex items-end gap-3 md:gap-4">
                        {/* Main Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-[180px] h-[240px] md:w-[220px] md:h-[300px] lg:w-[260px] lg:h-[340px] object-cover rounded-2xl shadow-lg"
                          />
                        </div>
                        
                        {/* Thumbnail Column */}
                        <div className="flex flex-col gap-3 md:gap-4">
                          {item.thumbnails.map((thumb, index) => (
                            <img
                              key={index}
                              src={thumb}
                              alt={`${item.name} thumbnail ${index + 1}`}
                              className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] lg:w-[120px] lg:h-[120px] object-cover rounded-xl shadow-md hover:opacity-100 transition-all duration-300"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Pagination + Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8 md:mt-10">
            <button 
              className="prev-btn flex items-center justify-center w-20 md:w-32 h-10 bg-[#EDEDED] rounded-full text-[#FF7020] hover:bg-[#FFE8D9] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button 
              className="next-btn flex items-center justify-center w-20 md:w-32 h-10 bg-[#EDEDED] rounded-full text-[#FF7020] hover:bg-[#FFE8D9] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <span className="text-[#636B78] text-[12px] font-medium flex justify-center italic mt-3">
            {activeIndex} / {testimonials.length}
          </span>
        </div>
      </section>
    </>
    );
  },
};
