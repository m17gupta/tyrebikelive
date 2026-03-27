"use client";

import { ComponentConfig } from "@measured/puck";
import { useState } from "react";

export const HeroSliderBlock: ComponentConfig = {
  label: "Hero Slider",

  // ----------------------------------------------
  // FIELDS
  // ----------------------------------------------
  fields: {
    height: { type: "number", label: "Height (vh)" },
    marginTop: { type: "number", label: "Margin Top (px)" },
    borderRadius: { type: "number", label: "Border Radius (px)" },

    slides: {
      type: "array",
      label: "Slides",
      arrayFields: {
        title: { type: "text", label: "Title" },
        content: { type: "textarea", label: "Content" },
        bgImage: { type: "text", label: "Background Image URL" },
        fontsize: { type: "number", label: "Title Font Size" },
        fontsizeContent: { type: "number", label: "Content Font Size" },
        width: { type: "number", label: "Content Width (%)" },
        textColor: { type: "text", label: "Text Color" },
        overlayOpacity: { type: "number", label: "Overlay Opacity (0-1)" }
      },
    },
  },

  // ----------------------------------------------
  // DEFAULT PROPS
  // ----------------------------------------------
  defaultProps: {
    height: 80,
    marginTop: 20,
    borderRadius: 0,

    slides: [
      {
        title: "Slide One Title",
        content: "Slide one description text.",
        bgImage: "https://images.unsplash.com/photo-1734526040622-a3e96b679f80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  
        fontsize: 55,
        fontsizeContent: 20,
        width: 80,
        textColor: "#ffffff",
        overlayOpacity: 0.4
      },
      {
        title: "Slide Two Title",
        content: "Slide two description text.",
        bgImage: "https://images.unsplash.com/photo-1734526040622-a3e96b679f80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        fontsize: 55,
        fontsizeContent: 20,
        width: 80,
        textColor: "#ffffff",
        overlayOpacity: 0.4
      },
    ],
  },

  // ----------------------------------------------
  // RENDER
  // ----------------------------------------------
  render: ({ height, slides, marginTop, borderRadius }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goNext = () => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const goPrev = () => {
      setCurrentIndex((prev) =>
        prev === 0 ? slides.length - 1 : prev - 1
      );
    };

    const s = slides[currentIndex];

    return (
      <section
        style={{
          position: "relative",
          height: `${height}vh`,
          marginTop: `${marginTop}px`,
          borderRadius: `${borderRadius}px`,
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* Slide Background */}
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundImage: `url(${s.bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "all 0.5s ease",
            position: "absolute",
        
            inset: 0,
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: `rgba(0,0,0,${s.overlayOpacity})`,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <h2
            style={{
              fontSize: `${s.fontsize}px`,
              color: s.textColor,
              marginBottom: "10px",
            }}
          >
            {s.title}
          </h2>

          <p
            style={{
              fontSize: `${s.fontsizeContent}px`,
              color: s.textColor,
              maxWidth: `${s.width}%`,
            }}
          >
            {s.content}
          </p>

<div
  style={{
    marginTop: "20px",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  }}
>
  <button
    style={{
      padding: "12px 28px",
      backgroundColor: "#ffffff",
      color: "#000",
      borderRadius: "6px",
      fontSize: "16px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    Learn More
  </button>

  <button
    style={{
      padding: "12px 28px",
      backgroundColor: "transparent",
      color: "#fff",
      borderRadius: "6px",
      fontSize: "16px",
      border: "2px solid #fff",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    Contact Us
  </button>
</div>
        
        </div>

        {/* Left Button */}
        <button
          onClick={goPrev}
          style={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.4)",
            border: "none",
            padding: "10px 14px",
            cursor: "pointer",
            color: "#fff",
            fontSize: "22px",
            zIndex: 20,
          }}
        >
          ❮
        </button>

        {/* Right Button */}
        <button
          onClick={goNext}
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.4)",
            border: "none",
            padding: "10px 14px",
            cursor: "pointer",
            color: "#fff",
            fontSize: "22px",
            zIndex: 20,
          }}
        >
          ❯
        </button>

        {/* Dots */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            zIndex: 20,
          }}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                background: i === currentIndex ? "#fff" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </section>
    );
  },
};

