"use client";

import { Button } from "@/components/ui/button";
import { Eye, Star } from "lucide-react";

export default function ProductHeader() {
  return (
    <div className="w-full border-b border-gray-200 pb-6">
      {/* Title and View Count */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[#3B302A]">Petty Classic 170mm</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Eye className="mr-1 h-4 w-4" />
          <span>
            <strong className="text-[#3B302A]">1,4k</strong> Viewed
          </span>
        </div>
      </div>

      {/* Price + Rating */}
      <div className="mt-4 flex items-center justify-between border-b pb-6">
        <div>
          <div className="text-[22px] font-bold text-[#FF7020]">EUR 220,00</div>
          <div className="text-xs text-[#4F4640] italic">25% VAT Included</div>
        </div>

        <div className="text-right">
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-4xl font-bold text-[#FF7020]">5.0</span>
            <span className="text-gray-500">/5</span>
          </div>
          <div className="mt-1 flex justify-end">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#FF7020] text-[#FF7020]" />
            ))}
          </div>
          <div className="mt-1 text-xs text-gray-500">223 Reviews from Petty Owners</div>
        </div>
      </div>

      {/* Add To Bag */}

      <div className="flex w-full items-center justify-between pt-1">
        <div className="mt-8 mb-6">
          <Button className="rounded-md bg-[#FF7020] px-20 py-4 text-[15px] font-semibold text-white shadow-none hover:bg-[#e25f15]">
            Add To Bag
          </Button>
        </div>

        {/* Shipping Info */}
        <div className="text-end text-sm leading-relaxed text-gray-600">
          <span className="font-medium text-[#FF7020] italic">Available immediately!</span>
          <br />
          Free <span className="font-medium text-[#FF7020]">Shipping</span> within Croatia
          <br />
          Delivery time: <strong>1–5 working days</strong>{" "}
          <span className="text-xs text-gray-500">(Shipments may differ)</span>
        </div>
      </div>
    </div>
  );
}

