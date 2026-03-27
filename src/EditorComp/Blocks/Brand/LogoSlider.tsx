"use client";

import { ComponentConfig } from "@measured/puck";

export const BrandSliderBlock: ComponentConfig = {
  label: "Brand Slider",

  // ----------------------------------------------
  // FIELDS
  // ----------------------------------------------
  fields: {
    paddingTop: { type: "number", label: "Padding Top (px)" },
    paddingBottom: { type: "number", label: "Padding Bottom (px)" },
    title: { type: "text", label: "Section Title" },
    description: { type: "textarea", label: "Description" },
    titleSize: { type: "number", label: "Title Font Size" },
    descSize: { type: "number", label: "Description Font Size" },

    logos: {
      type: "array",
      label: "Logos",
      arrayFields: {
        img: { type: "text", label: "Logo Image URL" },
        width: { type: "number", label: "Logo Size (px)" }
      }
    }
  },

  // ----------------------------------------------
  // DEFAULT PROPS
  // ----------------------------------------------
  defaultProps: {
    paddingTop: 60,
    paddingBottom: 60,
    title: "Integrated with Leading Technologies & Platforms",
    description:
      "Effortlessly connect your websites, applications, and software solutions with world-class platforms and services. Achieve seamless data synchronization, enhanced user experiences, and optimized workflows.",
    titleSize: 32,
    descSize: 16,

    logos: [
      { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png", width: 70 },
      { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png", width: 70 },
      { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png", width: 70 },
      { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png", width: 70 },
      { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png", width: 70 },
      { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png", width: 70 },
      { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png", width: 70 },
      { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png", width: 70 }
    ]
  },

  // ----------------------------------------------
  // RENDER
  // ----------------------------------------------
  render: ({
    paddingTop,
    paddingBottom,
    title,
    description,
    logos,
    titleSize,
    descSize
  }) => {
    return (
      <section
        style={{
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          width: "100%",
          textAlign: "center"
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: `${titleSize}px`,
            fontWeight: 700,
            marginBottom: "10px"
          }}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            opacity: 0.8,
            fontSize: `${descSize}px`,
            lineHeight: "26px",
            marginBottom: "50px"
          }}
        >
          {description}
        </p>

        {/* Logo Row – auto scroll animation */}
        <div
          style={{
            overflow: "hidden",
            width: "100%",
            position: "relative"
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "60px",
              alignItems: "center",
              animation: "scroll-left 18s linear infinite",
              whiteSpace: "nowrap"
            }}
          >
            {logos.concat(logos).map((l, index) => (
              <img
                key={index}
                src={l.img}
                style={{
                  width: `${l.width}px`,
                  height: `${l.width}px`,
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.15))"
                }}
              />
            ))}
          </div>
        </div>

        {/* Keyframes */}
        <style>
          {`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>
      </section>
    );
  }
};

