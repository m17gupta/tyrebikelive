"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  Truck,
  Star,
  RotateCcw,
  MessageCircle,
  CreditCard,
} from "lucide-react";

const features = [
  {
    icon: <Truck className="w-10 h-10 text-orange-500" />,
    title: "Free Delivery",
    desc: "from $40",
  },
  {
    icon: <Star className="w-10 h-10 text-orange-500" />,
    title: "Best Quality",
    desc: "Brand",
  },
  {
    icon: <RotateCcw className="w-10 h-10 text-orange-500" />,
    title: "1 Year",
    desc: "for free Return",
  },
  {
    icon: <MessageCircle className="w-10 h-10 text-orange-500" />,
    title: "Feedback",
    desc: "98% Real Data",
  },
  {
    icon: <CreditCard className="w-10 h-10 text-orange-500" />,
    title: "Payment",
    desc: "Secure",
  },
];

const brands = [
  { img: "assets/Image/brand-logo (1).svg", alt: "Highlow" },
  { img: "assets/Image/brand-logo (2).svg", alt: "Boosst" },
  { img: "assets/Image/brand-logo (3).svg", alt: "Emajine" },
  { img: "assets/Image/brand-logo (4).svg", alt: "BEBY.CO" },
  { img: "assets/Image/brand-logo (5).svg", alt: "GlowUP" },
  { img: "assets/Image/brand-logo (6).svg", alt: "Quena.io" },
  { img: "assets/Image/brand-logo (7).svg", alt: "Manthul" },
  { img: "assets/Image/brand-logo (7).svg", alt: "Manthul" },
  { img: "assets/Image/brand-logo (7).svg", alt: "Manthul" },
  { img: "assets/Image/brand-logo (7).svg", alt: "Manthul" },

];

const SliderBrand = () => {
  return (
    <div className="bg-white py-24">
    <div className="container mx-auto">
        {/* ---------- Top Features ---------- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-12" >
          {features.map((item, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center justify-center text-center border border-gray-200 rounded-lg py-10 px-6 hover:shadow-md transition-all duration-300"
              style={{borderRadius:"14px"}}
            >
              <div className=" absolute -top-8 flex items-center justify-center w-16 h-16 bg-white unded-md mb-5">
                {item.icon}
              </div>
              <h3 className="text-[20px] font-semibold text-gray-900 pb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

  
 


            {/* ---------- Bottom Brand Slider ---------- */}
            <div className="pt-8">
        <Swiper
          slidesPerView={8}
          spaceBetween={30}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="flex items-center"
        >
          {brands.map((brand, i) => (
            <SwiperSlide key={i}>
              <div className="flex items-center justify-center opacity-60 hover:opacity-100 transition-all">
                <img
                  src={brand.img}
                  alt={brand.alt}
                  className="h-8 object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
</div>
    </div>
  );
};

export default SliderBrand;

