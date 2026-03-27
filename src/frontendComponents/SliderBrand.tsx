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
  { img: "assets/Image/khfoodImage/logo1.jpg", alt: "Highlow" },
  { img: "assets/Image/khfoodImage/logo2.jpg", alt: "Boosst" },
  { img: "assets/Image/khfoodImage/logo3.jpg", alt: "Emajine" },
  { img: "assets/Image/khfoodImage/logo4.jpg", alt: "BEBY.CO" },
  { img: "assets/Image/khfoodImage/logo5.jpg", alt: "GlowUP" },
  
];

const SliderBrand = () => {
  return (
    <div className="bg-white py-24 1">
      <div className="container-xl mx-auto">
        {/* ---------- Top Features ---------- */}

        {/* ---------- Bottom Brand Slider ---------- */}
        <div className="pt-8">
          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            loop={true}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              320: { slidesPerView: 3 },
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="flex items-center">
            {brands.map((brand, i) => (
              <SwiperSlide key={i}>
                <div className="flex items-center justify-center  hover:opacity-100 transition-all">
                  <img
                    src={brand.img}
                    alt={brand.alt}
                    className="h-24 object-contain"
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

