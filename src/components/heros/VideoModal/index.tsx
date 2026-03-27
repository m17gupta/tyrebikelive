"use client";
import { useEffect, useState } from "react";
import { X, Play } from "lucide-react";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { useHeaderTheme } from "@/providers/HeaderTheme";

import type { Page } from "@/types";

export const VideoModalHero = (props: Page["hero"]) => {
  const { links, video_backgroundColor, video_description, video_heading, video_subheading, video_url } =
    props;

  const { setHeaderTheme } = useHeaderTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setHeaderTheme("dark");
  }, [setHeaderTheme]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="relative -mt-[10.4rem] flex items-center justify-center overflow-hidden text-white"
        data-theme="dark"
        style={{
          backgroundColor: video_backgroundColor || "#000000",
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 container px-6 py-32 text-center md:py-40 lg:py-48">
          <div className="mx-auto max-w-4xl">
            {/* Heading, Subheading, Description */}
            {video_heading && (
              <h1 className="mb-4 text-4xl leading-tight font-bold md:text-6xl">{video_heading}</h1>
            )}

            {video_subheading && (
              <h2 className="mb-6 text-xl text-gray-300 md:text-2xl">{video_subheading}</h2>
            )}

            {video_description && (
              <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 md:text-xl">{video_description}</p>
            )}

            {/* Play Button */}
            {video_url && (
              <div className="mb-10">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-white/20 md:h-24 md:w-24"
                  aria-label="Play video"
                >
                  <div className="absolute inset-0 animate-ping rounded-full bg-white/20" />
                  <Play className="relative z-10 ml-1 h-8 w-8 fill-white text-white md:h-10 md:w-10" />
                </button>
              </div>
            )}

            {/* Links */}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-4">
                {links.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Decorative gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div
          className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 duration-300"
          onClick={handleModalClose}
        >
          {/* Close Button */}
          <button
            onClick={handleModalClose}
            className="group absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 md:top-8 md:right-8"
            aria-label="Close video"
          >
            <X className="h-6 w-6 text-white transition-transform duration-200 group-hover:rotate-90" />
          </button>

          {/* Video Container */}
          <div
            className="animate-in zoom-in-95 relative aspect-video w-full max-w-6xl overflow-hidden rounded-lg bg-black shadow-2xl duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {video_url ? (
              <video className="h-full w-full" controls autoPlay src={video_url}>
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="flex h-full items-center justify-center text-lg text-white">
                <p>Video source not available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

