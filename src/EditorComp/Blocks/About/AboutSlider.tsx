// "use client"

// import { ComponentConfig } from "@measured/puck";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// export const AboutSliderBlock: ComponentConfig = {
//   label: "About with Slider",

//   fields: {
//     // Layout
//     layout: {
//       type: "radio",
//       label: "Layout",
//       options: [
//         { label: "Text Left - Slider Right", value: "text-left" },
//         { label: "Slider Left - Text Right", value: "slider-left" },
//       ],
//     },
    
//     // Text Content
//     heading: { 
//       type: "text", 
//       label: "Heading" 
//     },
//     mainParagraph: { 
//       type: "textarea", 
//       label: "Main Paragraph (Bold)" 
//     },
//     paragraphs: {
//       type: "array",
//       label: "Additional Paragraphs",
//       arrayFields: {
//         text: { type: "textarea", label: "Paragraph Text" },
//       },
//     },
    
//     // Buttons
//     buttons: {
//       type: "array",
//       label: "Action Buttons",
//       arrayFields: {
//         label: { type: "text", label: "Button Label" },
//         link: { type: "text", label: "Button Link" },
//         backgroundColor: { type: "text", label: "Background Color" },
//         textColor: { type: "text", label: "Text Color" },
//       },
//     },
    
//     // Slider Images
//     images: {
//       type: "array",
//       label: "Slider Images",
//       arrayFields: {
//         url: { type: "text", label: "Image URL" },
//         alt: { type: "text", label: "Alt Text" },
//       },
//     },
    
//     // Slider Settings
//     slidesPerView: { 
//       type: "number", 
//       label: "Slides Per View (Desktop)" 
//     },
//     slidesPerViewMobile: { 
//       type: "number", 
//       label: "Slides Per View (Mobile)" 
//     },
//     spaceBetween: { 
//       type: "number", 
//       label: "Space Between Slides (px)" 
//     },
//     imageHeight: { 
//       type: "number", 
//       label: "Image Height (px)" 
//     },
//     showNavigation: { 
//       type: "radio", 
//       label: "Show Navigation", 
//       options: [
//         { label: "Yes", value: true },
//         { label: "No", value: false },
//       ] 
//     },
//     showPagination: { 
//       type: "radio", 
//       label: "Show Pagination", 
//       options: [
//         { label: "Yes", value: true },
//         { label: "No", value: false },
//       ] 
//     },
//     autoplay: { 
//       type: "radio", 
//       label: "Autoplay", 
//       options: [
//         { label: "Yes", value: true },
//         { label: "No", value: false },
//       ] 
//     },
//     autoplayDelay: { 
//       type: "number", 
//       label: "Autoplay Delay (ms)" 
//     },
    
//     // Styling
//     backgroundColor: { 
//       type: "text", 
//       label: "Background Color" 
//     },
//     headingColor: { 
//       type: "text", 
//       label: "Heading Color" 
//     },
//     textColor: { 
//       type: "text", 
//       label: "Text Color" 
//     },
//     navigationColor: { 
//       type: "text", 
//       label: "Navigation Button Color" 
//     },
//     navigationBgColor: { 
//       type: "text", 
//       label: "Navigation Background Color" 
//     },
    
//     // Spacing
//     paddingY: { 
//       type: "number", 
//       label: "Padding Y (px)" 
//     },
//     marginTop: { 
//       type: "number", 
//       label: "Margin Top (px)" 
//     },
//     borderRadius: { 
//       type: "number", 
//       label: "Image Border Radius (px)" 
//     },
//   },

//   defaultProps: {
//     layout: "text-left",
//     heading: "O majstoru",
//     mainParagraph: "Po struci inženjer strojarstva, Karlo Ban već više od deset godina slijedi svoju strast prema čeliku i kovačkom zanatu.",
//     paragraphs: [
//       {
//         text: "U zagorskom selu Jelenjak kraj Desinića, Karlo u svojoj kovačnici svaki nož izrađuje od početka do kraja ručno, spajajući tehničko znanje i umjetničku preciznost. Kao istaknuti hrvatski majstor ('bladesmith'), u malim je serijama i po narudžbi iskovao preko 3000 noževa.",
//       },
//       {
//         text: "Njegovi kuhinjski i lovački noževi često se rade prema japanskim i skandinavskim principima: troslojno, jednostavne konstrukcije, kvalitetni visokougljični čelici bez prisustva nikla, uz majstorsko kaljenje i popuštanje čelika.",
//       },
//     ],
//     buttons: [],
//     images: [
//       {
//         url: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800",
//         alt: "Slide 1",
//       },
//       {
//         url: "https://images.unsplash.com/photo-1593007791459-dd3ae7f1d3b1?w=800",
//         alt: "Slide 2",
//       },
//       {
//         url: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800",
//         alt: "Slide 3",
//       },
//       {
//         url: "https://images.unsplash.com/photo-1593007791459-dd3ae7f1d3b1?w=800",
//         alt: "Slide 4",
//       },
//     ],
//     slidesPerView: 2,
//     slidesPerViewMobile: 1,
//     spaceBetween: 24,
//     imageHeight: 380,
//     showNavigation: true,
//     showPagination: true,
//     autoplay: false,
//     autoplayDelay: 3000,
//     backgroundColor: "#ffffff",
//     headingColor: "#18181b",
//     textColor: "#3f3f46",
//     navigationColor: "#FF7020",
//     navigationBgColor: "#EDEDED",
//     paddingY: 80,
//     marginTop: 24,
//     borderRadius: 16,
//   },

//   render: ({
//     layout,
//     heading,
//     mainParagraph,
//     paragraphs,
//     buttons,
//     images,
//     slidesPerView,
//     slidesPerViewMobile,
//     spaceBetween,
//     imageHeight,
//     showNavigation,
//     showPagination,
//     autoplay,
//     autoplayDelay,
//     backgroundColor,
//     headingColor,
//     textColor,
//     navigationColor,
//     navigationBgColor,
//     paddingY,
//     marginTop,
//     borderRadius,
//   }) => {
   
//   const paginationRef = useRef<HTMLDivElement>(null);
//   const prevRef = useRef<HTMLButtonElement>(null);
//   const nextRef = useRef<HTMLButtonElement>(null);

//   return (
//     <section className="bg-white py-20 mt-6">
//       <div className="max-w-7xl md:px-0 px-6 overflow-hidden ms-auto grid grid-cols-1 md:grid-cols-[30%_70%] gap-12 items-center ">
//         {/* LEFT SIDE */}
//         <div className="space-y-6">
//           <h2 className="md:text-3xl text-2xl font-semibold text-zinc-900">O majstoru</h2>
//           <p className="text-zinc-700 md:text-[22px] text-[20px]">
//             Po struci inženjer strojarstva, Karlo Ban već više od deset godina
//             slijedi svoju strast prema čeliku i kovačkom zanatu.
//           </p>
//           <p className="text-zinc-700 text-[16px] leading-relaxed">
//             U zagorskom selu Jelenjak kraj Desinića, Karlo u svojoj kovačnici
//             svaki nož izrađuje od početka do kraja ručno, spajajući tehničko
//             znanje i umjetničku preciznost. Kao istaknuti hrvatski majstor
//             ("bladesmith"), u malim je serijama i po narudžbi iskovao preko 3000
//             noževa.
//           </p>
//           <p className="text-zinc-700 text-[16px] leading-relaxed">
//             Njegovi kuhinjski i lovački noževi često se rade prema japanskim i
//             skandinavskim principima: troslojno, jednostavne konstrukcije,
//             kvalitetni visokougljični čelici bez prisustva nikla, uz majstorsko
//             kaljenje i popuštanje čelika.
//           </p>
//         </div>

//         {/* RIGHT SIDE SLIDER */}
//         <div className="relative w-full">
//          <Swiper
//   modules={[Navigation, Pagination]}
//   spaceBetween={24}
//   slidesPerView={2}
//   loop={true}
//   speed={700}
//   onInit={(swiper) => {
//     // @ts-ignore
//     swiper.params.navigation.prevEl = prevRef.current;
//     // @ts-ignore
//     swiper.params.navigation.nextEl = nextRef.current;
//     // @ts-ignore
//     swiper.params.pagination.el = paginationRef.current;

//     swiper.navigation.init();
//     swiper.navigation.update();
//     swiper.pagination.init();
//     swiper.pagination.update();
//   }}
//   pagination={{
//     type: "fraction",
//   }}
//   breakpoints={{
//     0: {
//       slidesPerView: 1, // 👈 mobile: 1 slide
//     },
//     768: {
//       slidesPerView: 2, // 👈 tablet & up: 2 slides
//     },
//   }}
//   className="rounded-xl swiper-about"
// >
//   {images.map((src, index) => (
//     <SwiperSlide key={index}>
//       <div className="overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-all duration-500 bg-white">
//         <img
//           src={src}
//           alt={`Slide ${index + 1}`}
//           className="w-full h-[380px] object-cover rounded-2xl"
//         />
//       </div>
//     </SwiperSlide>
//   ))}
// </Swiper>


//           {/* ✅ Bottom Controls */}
//           <div className="flex flex-col items-center justify-center mt-8 gap-3">
//             <div className="flex items-center gap-6">
//               <button
//                 ref={prevRef}
//                 className="flex items-center justify-center md:w-36 w-24 h-10 bg-[#EDEDED] rounded-full text-[#FF7020] hover:bg-[#FFE8D9] transition-all duration-300"
//               >

//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <button
//                 ref={nextRef}
//                 className="flex items-center justify-center md:w-36 w-24 h-10 bg-[#EDEDED] rounded-full text-[#FF7020] hover:bg-[#FFE8D9] transition-all duration-300"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Pagination fraction below arrows */}
//             <div
//               ref={paginationRef}
//               className="text-[13px] text-gray-600 font-medium italic text-center"
//             ></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
//   },
// };

"use client"

import { ComponentConfig } from "@measured/puck";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const AboutSliderBlock: ComponentConfig = {
  label: "About with Slider",

  fields: {
    // Layout
    layout: {
      type: "radio",
      label: "Layout",
      options: [
        { label: "Text Left - Slider Right", value: "text-left" },
        { label: "Slider Left - Text Right", value: "slider-left" },
      ],
    },
    
    // Text Content
    heading: { 
      type: "text", 
      label: "Heading" 
    },
    mainParagraph: { 
      type: "textarea", 
      label: "Main Paragraph (Bold)" 
    },
    paragraphs: {
      type: "array",
      label: "Additional Paragraphs",
      arrayFields: {
        text: { type: "textarea", label: "Paragraph Text" },
      },
    },
    
    // Buttons
    buttons: {
      type: "array",
      label: "Action Buttons",
      arrayFields: {
        label: { type: "text", label: "Button Label" },
        link: { type: "text", label: "Button Link" },
        backgroundColor: { type: "text", label: "Background Color" },
        textColor: { type: "text", label: "Text Color" },
      },
    },
    
    // Slider Images
    images: {
      type: "array",
      label: "Slider Images",
      arrayFields: {
        url: { type: "text", label: "Image URL" },
        alt: { type: "text", label: "Alt Text" },
      },
    },
    
    // Slider Settings
    slidesPerView: { 
      type: "number", 
      label: "Slides Per View (Desktop)" 
    },
    slidesPerViewMobile: { 
      type: "number", 
      label: "Slides Per View (Mobile)" 
    },
    spaceBetween: { 
      type: "number", 
      label: "Space Between Slides (px)" 
    },
    imageHeight: { 
      type: "number", 
      label: "Image Height (px)" 
    },
    showNavigation: { 
      type: "radio", 
      label: "Show Navigation", 
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ] 
    },
    showPagination: { 
      type: "radio", 
      label: "Show Pagination", 
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ] 
    },
    autoplay: { 
      type: "radio", 
      label: "Autoplay", 
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ] 
    },
    autoplayDelay: { 
      type: "number", 
      label: "Autoplay Delay (ms)" 
    },
    
    // Styling
    backgroundColor: { 
      type: "text", 
      label: "Background Color" 
    },
    headingColor: { 
      type: "text", 
      label: "Heading Color" 
    },
    textColor: { 
      type: "text", 
      label: "Text Color" 
    },
    navigationColor: { 
      type: "text", 
      label: "Navigation Button Color" 
    },
    navigationBgColor: { 
      type: "text", 
      label: "Navigation Background Color" 
    },
    
    // Spacing
    paddingY: { 
      type: "number", 
      label: "Padding Y (px)" 
    },
    marginTop: { 
      type: "number", 
      label: "Margin Top (px)" 
    },
    borderRadius: { 
      type: "number", 
      label: "Image Border Radius (px)" 
    },
  },

  defaultProps: {
    layout: "text-left",
    heading: "O majstoru",
    mainParagraph: "Po struci inženjer strojarstva, Karlo Ban već više od deset godina slijedi svoju strast prema čeliku i kovačkom zanatu.",
    paragraphs: [
      {
        text: "U zagorskom selu Jelenjak kraj Desinića, Karlo u svojoj kovačnici svaki nož izrađuje od početka do kraja ručno, spajajući tehničko znanje i umjetničku preciznost. Kao istaknuti hrvatski majstor ('bladesmith'), u malim je serijama i po narudžbi iskovao preko 3000 noževa.",
      },
      {
        text: "Njegovi kuhinjski i lovački noževi često se rade prema japanskim i skandinavskim principima: troslojno, jednostavne konstrukcije, kvalitetni visokougljični čelici bez prisustva nikla, uz majstorsko kaljenje i popuštanje čelika.",
      },
    ],
    buttons: [],
    images: [
      {
        url: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800",
        alt: "Slide 1",
      },
      {
        url: "https://images.unsplash.com/photo-1593007791459-dd3ae7f1d3b1?w=800",
        alt: "Slide 2",
      },
      {
        url: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800",
        alt: "Slide 3",
      },
      {
        url: "https://images.unsplash.com/photo-1593007791459-dd3ae7f1d3b1?w=800",
        alt: "Slide 4",
      },
    ],
    slidesPerView: 2,
    slidesPerViewMobile: 1,
    spaceBetween: 24,
    imageHeight: 380,
    showNavigation: true,
    showPagination: true,
    autoplay: false,
    autoplayDelay: 3000,
    backgroundColor: "#ffffff",
    headingColor: "#18181b",
    textColor: "#3f3f46",
    navigationColor: "#FF7020",
    navigationBgColor: "#EDEDED",
    paddingY: 80,
    marginTop: 24,
    borderRadius: 16,
  },

  render: ({
    layout,
    heading,
    mainParagraph,
    paragraphs,
    buttons,
    images,
    slidesPerView,
    slidesPerViewMobile,
    spaceBetween,
    imageHeight,
    showNavigation,
    showPagination,
    autoplay,
    autoplayDelay,
    backgroundColor,
    headingColor,
    textColor,
    navigationColor,
    navigationBgColor,
    paddingY,
    marginTop,
    borderRadius,
  }) => {
   
  const paginationRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <style>{`
        .swiper-about {
          overflow: hidden !important;
        }
        .swiper-about .swiper-wrapper {
          display: flex !important;
        }
        .swiper-about .swiper-slide {
          flex-shrink: 0 !important;
          width: auto !important;
          height: auto !important;
        }
      `}</style>
      
      <section className="bg-white py-20 mt-6">
        <div className="max-w-7xl md:px-0 px-6 overflow-hidden ms-auto grid grid-cols-1 md:grid-cols-[30%_70%] gap-12 items-center ">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <h2 className="md:text-3xl text-2xl font-semibold text-zinc-900">O majstoru</h2>
            <p className="text-zinc-700 md:text-[22px] text-[20px]">
              Po struci inženjer strojarstva, Karlo Ban već više od deset godina
              slijedi svoju strast prema čeliku i kovačkom zanatu.
            </p>
            <p className="text-zinc-700 text-[16px] leading-relaxed">
              U zagorskom selu Jelenjak kraj Desinića, Karlo u svojoj kovačnici
              svaki nož izrađuje od početka do kraja ručno, spajajući tehničko
              znanje i umjetničku preciznost. Kao istaknuti hrvatski majstor
              ("bladesmith"), u malim je serijama i po narudžbi iskovao preko 3000
              noževa.
            </p>
            <p className="text-zinc-700 text-[16px] leading-relaxed">
              Njegovi kuhinjski i lovački noževi često se rade prema japanskim i
              skandinavskim principima: troslojno, jednostavne konstrukcije,
              kvalitetni visokougljični čelici bez prisustva nikla, uz majstorsko
              kaljenje i popuštanje čelika.
            </p>
          </div>

          {/* RIGHT SIDE SLIDER */}
          <div className="relative w-full">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={2}
              loop={true}
              speed={700}
              allowTouchMove={true}
              onInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
                // @ts-ignore
                swiper.params.pagination.el = paginationRef.current;

                swiper.navigation.init();
                swiper.navigation.update();
                swiper.pagination.init();
                swiper.pagination.update();
              }}
              pagination={{
                type: "fraction",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
              }}
              className="rounded-xl swiper-about"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-all duration-500 bg-white">
                    <img
                      src={image.url}
                      alt={image.alt || `Slide ${index + 1}`}
                      className="w-full h-[380px] object-cover rounded-2xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ✅ Bottom Controls */}
            <div className="flex flex-col items-center justify-center mt-8 gap-3">
              <div className="flex items-center gap-6">
                <button
                  ref={prevRef}
                  className="flex items-center justify-center md:w-36 w-24 h-10 bg-[#EDEDED] rounded-full text-[#FF7020] hover:bg-[#FFE8D9] transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  ref={nextRef}
                  className="flex items-center justify-center md:w-36 w-24 h-10 bg-[#EDEDED] rounded-full text-[#FF7020] hover:bg-[#FFE8D9] transition-all duration-300"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Pagination fraction below arrows */}
              <div
                ref={paginationRef}
                className="text-[13px] text-gray-600 font-medium italic text-center"
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
  },
};
