"use client";
import Image from "next/image";

export default function NewsSection() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* TOP BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-gray-500">
            Design & Trends
          </p>
          <h2 className="text-2xl sm:text-[36px] md:text-[48px] uppercase font-regular mt-1 leading-tight">
            Welcome To The World Of Goodyear Bike.
          </h2>
        </div>

        <button className="flex items-center gap-2 text-sm font-medium uppercase hover:opacity-80 transition self-start sm:self-auto">
          VIEW ALL <span>→</span>
        </button>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT FEATURED BLOG */}
        <div>
          <div className="relative overflow-hidden rounded-2xl shadow-sm">
            <img
              src="https://www.goodyearbike.com/wp-content/uploads/2025/01/Freddie_JanSpain-1006.jpg"
              alt="Featured Blog"
              className="
                w-full
                h-[260px] sm:h-[360px] md:h-[420px] lg:h-[480px]
                object-cover
                rounded-2xl
              "
            />

            {/* Category badge */}
            <span className="absolute bottom-24 sm:bottom-28 left-4 sm:left-6 bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow">
              SOFA
            </span>

            {/* Text */}
            <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-6 right-4 text-white">
              <h3 className="text-lg sm:text-xl font-semibold leading-tight max-w-xl">
                New Trail Tires // Find Your Escape – Madeira
              </h3>
              <p className="text-xs sm:text-sm opacity-90 mt-1 line-clamp-2">
                We travelled to the MTB paradise of Maderia to enjoy the new
                Escape mountain tires. We explore not only the island, but the
                question of how to ‘pigeon hole’...
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE BLOG LIST */}
        <div className="flex flex-col gap-8">
          {/* Blog Item */}
          {[
            {
              img: "https://www.goodyearbike.com/wp-content/uploads/2025/04/Madeira_Escape-1102-Edit.jpg",
              title:
                "Welcome To The Wingfoot Alliance, Freddy Ovett",
            },
            {
              img: "https://www.goodyearbike.com/wp-content/uploads/2025/01/WangerBazin2025TeamCamp-1010.jpg",
              title:
                "Goodyear Bicycle Tires Join Forces With Team Wagner-Bazin",
            },
            {
              img: "https://www.goodyearbike.com/wp-content/uploads/2025/01/WangerBazin2025TeamCamp-1010.jpg",
              title: "Design Mistakes to Avoid in Modern Bedrooms",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5"
            >
              <img
                src={item.img}
                alt="Blog"
                className="
                  w-full sm:w-44 md:w-52
                  h-[180px] sm:h-28 md:h-32
                  object-cover
                  rounded-xl
                "
              />

              <div>
                <p className="text-xs text-gray-500">
                  BY MAIL2DEEPAKKRAI@GMAIL.COM • 15TH MAY 2025
                </p>

                <h4 className="font-medium text-[15px] sm:text-[16px]  md:text-[16px] mt-1">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  We are excited to announce a new partnership between Goodyear
                  Bicycle Tires and Pro Cycling team Wagner-Bazin WB...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

