"use client";

import React from "react";
import Link from "next/link";

interface Product {
  id: string | number;
  title?: string;
  slug?: string;
  pricing?: { value?: number }[];
  variants?: { pricing?: { value?: number }[] }[];
}

interface ProductListProps {
  filteredProducts: Product[];
  title?: string;
  category?: unknown;
  subcategory?: unknown;
  searchParams?: {
    color?: string[];
    size?: string[];
    sortBy?: string;
  };
}

export const ProductList: React.FC<ProductListProps> = ({ filteredProducts, title }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {title && (
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
          <Link
            href="/category"
            className="mt-4 inline-block px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Browse Categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const price =
              product.variants?.[0]?.pricing?.[0]?.value ??
              product.pricing?.[0]?.value;
            return (
              <Link
                key={product.id}
                href={`/product/${product.slug ?? product.id}`}
                className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No image</span>
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-gray-800 truncate group-hover:text-orange-600 transition-colors">
                    {product.title ?? "Product"}
                  </h2>
                  {price !== undefined && (
                    <p className="mt-1 text-orange-600 font-bold">
                      ₹{price.toLocaleString()}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
