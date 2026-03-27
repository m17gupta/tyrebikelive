"use client";

import { ComponentConfig } from "@measured/puck";
import { useState } from "react";

export const HeroNormalBlock: ComponentConfig = {
  label: "Hero Type Normal",

  // --------------------------------------------------
  // FIELDS
  // --------------------------------------------------
  fields: {
    margin: {
      label: "Margin",
      type: "object",
      objectFields: {
        marginLeft: { type: "text" },
        marginRight: { type: "text" },
        marginTop: { type: "text" },
        marginBottom: { type: "text" },
      },
    },
    width: { type: "number", label: "Width (%)" },
    backgroundColor: { type: "text", label: "Background Color" },
    backgroundImage: { type: "text", label: "Background Image URL" },
    AboutImage: { type: "text", label: "About Image URL" },
    fontsize: { type: "number", label: "Title Font Size" },
    fontsizeContent: { type: "number", label: "Content Font Size" },
    AboutTitleSize: { type: "number", label: "About Title Size" },
    AboutTitleContent: { type: "number", label: "About Content Font Size" },
    title: { type: "text", label: "Title" },
    content: { type: "textarea", label: "Content" },
  },

  // --------------------------------------------------
  // DEFAULT PROPS
  // --------------------------------------------------
  defaultProps: {
    margin: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 0,
      marginBottom: 0,
    },
    width: 85,
    backgroundColor: "#fff",
    backgroundImage: "./assets/Image/about-image.jpg",
    fontsize: 50,
    fontsizeContent: 18,
    title: "Title",
    content: "Content",
  },

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  render: ({
    margin,
    width,
    backgroundColor,
    backgroundImage,
    fontsize,
    fontsizeContent,
    title,
    content,
  }) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
      <div
        style={{
          height: "80vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor,
        }}
      >
        <div
          style={{
            width: `${width}%`,
            margin: `${margin?.marginTop} ${margin?.marginRight} ${margin?.marginBottom} ${margin?.marginLeft}`,
          }}
        >
          <h2
            style={{
              fontSize: `${fontsize}px`,
              textAlign: "center",
            }}
          >
            {title}
          </h2>

          <p
            style={{
              fontSize: `${fontsizeContent}px`,
              textAlign: "center",
            }}
          >
            {content}
          </p>
        </div>
      </div>
    );
  },
};

