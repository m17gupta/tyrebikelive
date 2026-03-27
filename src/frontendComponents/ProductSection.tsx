"use client";

import React from "react";

type Product = {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  img: string;
  badge?: string;   // e.g. "-11%"
};

const products: Product[] = [
  {
    id: 1,
    name: "Handwoven Decorative Storage Basket",
    price: "$8.00",
    oldPrice: "$9.00",
    img: "https://www.goodyearbike.com/wp-content/uploads/2021/03/Studio-Peak-Gravel1001.png",
    badge: "-11%",
  },
  {
    id: 2,
    name: "Cozy Wooden Sofa with Decorative Cushions",
    price: "$18.00",
    oldPrice: "$23.00",
    img: "https://www.goodyearbike.com/wp-content/uploads/2021/03/Studio-Peak-Gravel1001.png",
    badge: "-10%",
  },
  {
    id: 3,
    name: "Mid-Century Wooden Chest of Drawers",
    price: "$45.00",
    img: "https://www.goodyearbike.com/wp-content/uploads/2021/03/Studio-Peak-Gravel1001.png",
  },
  {
    id: 4,
    name: "Minimalist Wooden Nightstand",
    price: "$33.00",
    img: "https://www.goodyearbike.com/wp-content/uploads/2021/03/Studio-Peak-Gravel1001.png",
  },
  {
    id: 5,
    name: "Contemporary Textured Armchair",
    price: "$55.00",
    oldPrice: "$65.00",
    img: "https://www.goodyearbike.com/wp-content/uploads/2021/03/Studio-Peak-Gravel1001.png",
    badge: "-15%",
  },
  {
    id: 6,
    name: "Round Coffee Table with Wooden Base",
    price: "$12.50",
    img: "https://www.goodyearbike.com/wp-content/uploads/2021/03/Studio-Peak-Gravel1001.png",
  },
];

const ProductSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="container-xl mx-auto px-6">
        {/* GRID: left promo + right products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* LEFT PROMO CARD */}
          <div className="relative overflow-hidden rounded-3xl bg-black text-white h-[460px] lg:h-[670px] lg:row-span-2 lg:col-span-2">
            <img
              src="https://www.goodyearbike.com/wp-content/uploads/2024/06/Wingfoot-Shoot-1020.jpg"
              alt="Promo"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="relative flex flex-col justify-between h-full p-10">
              <div>
                <p className="text-[11px] tracking-[0.18em] uppercase text-white/70 mb-2">
                  Coffee Table Set
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold leading-snug max-w-xl ">
                  The Perfect Pairing <br /> For Relaxed Moments
                </h2>
              </div>

              <button className="mt-6 inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-3 text-[13px] font-semibold tracking-[0.16em] uppercase hover:bg-neutral-100 transition">
                Learn More
                <span className="ml-2 text-lg">↗</span>
              </button>
            </div>
          </div>

          {/* RIGHT PRODUCTS GRID */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="bg-[#f7f7f7] rounded-xl px-0 pt-0 pb-7 flex flex-col"
              >
                {/* Image + badge */}
                <div className="relative mb-4 pt-3">
                  {product.badge && (
                    <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-[#FFD100] text-[11px] font-semibold px-3 py-1 shadow-sm">
                      ⚡ {product.badge}
                    </span>
                  )}

                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-44 object-contain"
                  />
                </div>

                {/* Rating (fake stars for look) */}
                <div className="px-4">
                <div className="flex items-center text-[11px] text-[#111] mb-1">
                  <span className="text-[13px] text-yellow-500 mr-1">★★★★★</span>
                  <span className="text-gray-400">(0)</span>
                </div>

                {/* Name */}
                <h3 className="text-[14px] font-medium text-[#111] leading-snug mb-1 line-clamp-2">
                  {product.name}
                </h3>

                {/* Price row */}
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-[13px] font-semibold text-[#111]">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-[12px] text-gray-400 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
          </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

