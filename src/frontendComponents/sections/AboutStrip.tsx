"use client";

import React, { useState } from "react";
import { Play, Layers, Zap, Hammer, Target } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LuUsersRound } from "react-icons/lu";

const AboutSection = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const cards = [
    {
      id: 1,
      title: "O Noževima",
      features: [
        {
          icon: <LuUsersRound className="h-6 w-6 text-[#FD7839]" />,
          text: "3 Sloja čelka",
          sub: "bez prisustva nikla",
        },
        {
          icon: <LuUsersRound className="h-6 w-6 text-[#FD7839]" />,
          text: "Dugotrajna oštrina",
          sub: "& uz niski kut oštrenja",
        },
      ],
      cta: "Više o Noževima",
      image: "/assets/Image/about-img-1.png",
      overlay: "bg-gradient-to-t from-black/85 via-black/60 to-transparent",
      buttonColor: "bg-[#AD1100] hover:bg-[#E73D12]",
      video: "https://www.youtube.com/embed/tgbNymZ7vqY",
    },
    {
      id: 2,
      title: "O Majstoru",
      features: [
        {
          icon: <LuUsersRound className="h-6 w-6 text-[#7893AA]" />,
          text: "Preko 3500+ iskovanih noževa",
          sub: "uglavnom japanskih vrsta",
        },
        {
          icon: <LuUsersRound className="h-6 w-6 text-[#7893AA]" />,
          text: "Spoj struke i hobija",
          sub: "u službi visoke kvalitete",
        },
      ],
      cta: "Više o Karlu",
      image: "/assets/Image/about-img.png",
      overlay: "bg-gradient-to-t from-black/85 via-black/60 to-transparent",
      buttonColor: "bg-[#7893AA] hover:bg-[#5E6979]",
      video: "https://www.youtube.com/embed/tgbNymZ7vqY",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className="group relative h-[400px] w-full overflow-hidden rounded-2xl shadow-xl"
          >
            {/* Background Image */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className={`absolute inset-0 ${card.overlay}`}></div>

            {/* Center Play Button */}
            <button
              onClick={() => setVideoUrl(card.video)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="rounded-full bg-white/25 p-5 backdrop-blur-md transition-all hover:bg-white/35">
                <Play className="h-8 w-8 text-white" />
              </div>
            </button>

            {/* Text Content */}
            <h2 className="absolute top-6 left-6 mb-3 text-[30px] font-semibold text-white">{card.title}</h2>
            <div className="absolute right-0 bottom-0 left-0 flex flex-col justify-end px-6 pt-20 pb-5 text-white">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-8">
                  {card.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0">{f.icon}</div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[16px] font-medium">{f.text}</span>
                        <span className="mt-1 text-[12px] tracking-wide text-white italic">{f.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`${card.buttonColor} rounded-full px-6 py-2 text-[14px] font-medium text-white shadow-md`}
                >
                  {card.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Dialog */}
      <Dialog open={!!videoUrl} onOpenChange={() => setVideoUrl(null)}>
        <DialogContent className="max-w-3xl overflow-hidden rounded-xl border-none p-0">
          {videoUrl && (
            <iframe
              width="100%"
              height="400"
              src={videoUrl}
              title="Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AboutSection;

