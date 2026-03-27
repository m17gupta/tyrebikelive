"use client";

import { useState } from "react";

export default function OurStory() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="w-full bg-[#f5f5f7] py-20 md:py-28">
      <div className="container-xl  mx-auto md:px-6 text-center">
        {/* Top Label */}
        <p className="text-[12px] tracking-[0.3em] uppercase text-gray-400 mb-4">
          Our Story
        </p>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-[48px] font-semibold tracking-wide text-[#111111] mb-8">
          EXPLORE MINICOM STORE
        </h2>

        {/* Paragraph 1 (Always visible) */}
        <p className="text-sm md:text-[16px] leading-relaxed text-gray-500 mb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quam
          risus lacus risus posuere quis hendrerit vestibulum ut sagittis sit
          amet tortor. Mauris mauris lectus, ornare vel erat non, imperdiet
          consectetur leo. Nulla non turpis eget ligula ullamcorper tincidunt
          eget ac orci.
        </p>

        {/* Paragraph 2 (Always visible but lighter) */}
        <p className="text-sm md:text-[16px] leading-relaxed text-gray-500 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis
          tincidunt mi at sagittis. Cras dui justo, tristique a posuere a,
          dapibus in quam. Quisque a quam euismod, interdum erat ut, commodo
          lectus.
        </p>

        {/* EXPANDABLE CONTENT */}
        {expanded && (
          <p className="text-sm md:text-[16px] leading-relaxed text-gray-500 mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            sagittis tincidunt mi at sagittis. Cras dui justo, tristique a
            posuere a, dapibus in quam. Quisque a quam euismod, interdum erat ut,
            commodo lectus. Nullam eget luctus est, sit amet viverra ligula.
            Suspendisse potenti. Vestibulum in tortor non elit congue placerat
            sit amet non risus. Maecenas lacinia euismod faucibus.
          </p>
        )}

        {/* VIEW MORE / VIEW LESS */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`mt-14 flex items-center justify-center gap-2 text-xs tracking-widest transition-all mx-auto font-semibold 
            ${expanded ? "text-[#f6b500]" : "text-gray-700"}
          `}
        >
          {expanded ? "VIEW LESS" : "VIEW MORE"}
          <span
            className={`transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}

