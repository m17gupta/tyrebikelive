"use client";

import React, { useState } from "react";
import { ChevronUp } from "lucide-react";

type SpecRow = { label: string; value: string };

export default function ProductSpecs({
  description,
  specs,
  shipping,
  returns,
}: {
  description: string;
  specs: SpecRow[];
  shipping: string;
  returns: string;
}) {
  const [openSection, setOpenSection] = useState<string | null>("desc");

  const toggleSection = (value: string) => {
    setOpenSection(openSection === value ? null : value);
  };

  return (
    <div className="text-[#2b1d13]">
      {/* Description */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection("desc")}
          className="w-full flex items-center justify-between py-3 text-[15px] font-semibold text-[#2b1d13] hover:text-[#2b1d13]/80"
        >
          <span className="text-xl text-[#4F4640]">Description</span>
          <ChevronUp
            className={`h-4 w-4 transition-transform duration-300 ${
              openSection === "desc" ? "rotate-180 text-[#FF7020]" : "rotate-0"
            }`}
          />
        </button>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            openSection === "desc"
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-sm text-gray-700 leading-relaxed pb-4">
            {description}
          </p>
        </div>
      </div>

      {/* Specifications */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection("specs")}
          className="w-full flex items-center justify-between py-3 text-[15px] font-semibold text-[#2b1d13] hover:text-[#2b1d13]/80"
        >
          <span className="text-xl ">Specifications</span>
          <ChevronUp
            className={`h-4 w-4 transition-transform duration-300 ${
              openSection === "specs" ? "rotate-180 text-[#FF7020]" : "rotate-0"
            }`}
          />
        </button>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            openSection === "specs"
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <table className="w-full text-sm border-collapse mb-3">
            <tbody>
              {specs.map((row, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-[#f6f6f6]" : "bg-white"
                  } border-t border-gray-200`}
                >
                  <td className="py-2 px-3 text-gray-700 w-1/3">{row.label}:</td>
                  <td className="py-2 px-3 text-gray-900 font-medium">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping & Returns */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection("shipping")}
          className="w-full flex items-center justify-between py-3 text-[15px] font-semibold text-[#2b1d13] hover:text-[#2b1d13]/80"
        >
          <span className="text-xl text-[#4F4640]">Shipping & Returns</span>
          <ChevronUp
            className={`h-4 w-4 transition-transform duration-300 ${
              openSection === "shipping"
                ? "rotate-180 text-[#FF7020]"
                : "rotate-0"
            }`}
          />
        </button>
        <div
          className={`transition-all duration-300 overflow-hidden ${
            openSection === "shipping"
              ? "max-h-[700px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-5 text-sm text-gray-700 leading-relaxed pb-4">
            <div>
              <h4 className="font-semibold text-base mb-1 text-[#4F4640]">
                Shipping Policy
              </h4>
              <p>{shipping}</p>
            </div>
            <div>
              <h4 className="font-semibold text-base mb-1 text-[#4F4640]">
                Return Policy
              </h4>
              <p>{returns}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

