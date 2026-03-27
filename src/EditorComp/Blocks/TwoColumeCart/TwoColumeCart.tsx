"use client";

import { ComponentConfig } from "@measured/puck";
import { useState } from "react";

export const TwoColumeCardBlock: ComponentConfig = {
  label: "Two Colume Card",

  // ---------------------------------------------------
  // FIELDS
  // ---------------------------------------------------
  fields: {
    cards: {
      type: "array",
      label: "Cards",
      arrayFields: {
        title: { type: "text", label: "Title" },
        feature1Title: { type: "text", label: "Feature 1 Title" },
        feature1Sub: { type: "text", label: "Feature 1 Subtitle" },

        feature2Title: { type: "text", label: "Feature 2 Title" },
        feature2Sub: { type: "text", label: "Feature 2 Subtitle" },

        image: { type: "text", label: "Image URL" },
        buttonText: { type: "text", label: "Button Text" },
        buttonColor: { type: "text", label: "Button Color" },
        videoUrl: { type: "text", label: "Video URL" },
        overlayOpacity: { type: "number", label: "Overlay (0–1)" },
      },
    },
  },

  // ---------------------------------------------------
  // DEFAULT PROPS
  // ---------------------------------------------------
  defaultProps: {
    cards: [
      {
        title: "O Noževima",
        feature1Title: "3 Sloja čelka",
        feature1Sub: "bez prisustva nikla",
        feature2Title: "Dugotrajna oštrina",
        feature2Sub: "& uz niski kut oštrenja",
        image: "/assets/Image/about-img-1.png",
        buttonText: "Više o Noževima",
        buttonColor: "#AD1100",
        videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
        overlayOpacity: 0.7,
      },
      {
        title: "O Majstoru",
        feature1Title: "Preko 3500+ iskovanih noževa",
        feature1Sub: "uglavnom japanskih vrsta",
        feature2Title: "Spoj struke i hobija",
        feature2Sub: "u službi visoke kvalitete",
        image: "/assets/Image/about-img.png",
        buttonText: "Više o Karlu",
        buttonColor: "#5E6979",
        videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
        overlayOpacity: 0.7,
      },
    ],
  },

  // ---------------------------------------------------
  // RENDER
  // ---------------------------------------------------
  render: ({ cards }) => {
    const [video, setVideo] = useState<string | null>(null);

    return (
      <section
        style={{
          width: "100%",
          padding: "60px 20px",
          margin: "0 auto",
          maxWidth: "1300px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {cards.map((card: any, index: number) => (
            <div
              key={index}
              style={{
                position: "relative",
                height: "420px",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `rgba(0,0,0,${card.overlayOpacity})`,
                }}
              />

              {/* Play Button */}
              <button
                onClick={() => setVideo(card.videoUrl)}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    padding: "18px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "26px",
                      color: "#fff",
                      display: "block",
                    }}
                  >
                    ▶
                  </span>
                </div>
              </button>

              {/* Text */}
              <h2
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  color: "white",
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                {card.title}
              </h2>

              {/* Bottom Content */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                  color: "white",
                }}
              >
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>{card.feature1Title}</strong>
                    <div
                      style={{
                        fontSize: "12px",
                        opacity: 0.8,
                        marginTop: "4px",
                      }}
                    >
                      {card.feature1Sub}
                    </div>
                  </div>

                  <div>
                    <strong>{card.feature2Title}</strong>
                    <div
                      style={{
                        fontSize: "12px",
                        opacity: 0.8,
                        marginTop: "4px",
                      }}
                    >
                      {card.feature2Sub}
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button
                  style={{
                    background: card.buttonColor,
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: "30px",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* VIDEO MODAL */}
        {video && (
          <div
            onClick={() => setVideo(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div style={{ width: "80%", maxWidth: "800px" }}>
              <iframe
                width="100%"
                height="450"
                src={video}
                style={{ borderRadius: "14px" }}
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          </div>
        )}
      </section>
    );
  },
};

