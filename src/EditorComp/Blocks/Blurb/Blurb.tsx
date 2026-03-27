"use client"


import { ComponentConfig } from "@measured/puck";

export const BlurbBlock: ComponentConfig = {
  label: "Blurb",

  fields: {
    // --- Content Fields ---
    icon: { type: "text", label: "Icon (Lucide name or emoji)" },
    imageUrl: { type: "text", label: "Image URL (optional)" },
    heading: { type: "slot", allow: ["HeadingBlock"] },
    subtext: { type: "slot", allow: ["HeadingBlock"] },
    paragraph: { type: "slot", allow: ["HeadingBlock"] },

    // --- Style Fields ---
    align: {
      type: "select",
      label: "Text Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    backgroundColor: { type: "text", label: "Background Color" },
    textColor: { type: "text", label: "Text Color" },
    borderRadius: { type: "number", label: "Border Radius (px)" },
    shadow: { type: "text", label: "Box Shadow (CSS value)" },
    padding: {
      type: "object",
      label: "Padding",
      objectFields: {
        top: { type: "number" },
        bottom: { type: "number" },
        left: { type: "number" },
        right: { type: "number" },
      },
    },
  },

  defaultProps: {
    icon: "💡",
    imageUrl: "",
    align: "center",
    backgroundColor: "#ffffff",
    textColor: "#222222",
    borderRadius: 16,
    shadow: "0 4px 10px rgba(0,0,0,0.08)",
    padding: { top: 32, bottom: 32, left: 24, right: 24 },
  },

  render: ({
    icon,
    imageUrl,
    heading: Heading,
    subtext: Subtext,
    paragraph: Paragraph,
    buttonLabel,
    buttonLink,
    align,
    backgroundColor,
    textColor,
    borderRadius,
    shadow,
    padding,
  }) => {
    const style: React.CSSProperties = {
      backgroundColor,
      color: textColor,
      borderRadius,
      boxShadow: shadow,
      textAlign: align,
      paddingTop: padding?.top,
      paddingBottom: padding?.bottom,
      paddingLeft: padding?.left,
      paddingRight: padding?.right,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    };

    const cardHover: React.CSSProperties = {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    };

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          padding: "2rem",
          backgroundColor: "#f9fafb",
          borderRadius: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          maxWidth: "900px",
          margin: "2rem auto",
        }}
      >
        <div
          style={{
            flex: "0 0 250px",
            overflow: "hidden",
            borderRadius: "0.75rem",
          }}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww"
            alt="Profile avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div style={{ flex: "1" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#111827",
                margin: 0,
              }}
            >
              <Heading />
            </h2>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <p
              style={{
                fontSize: "1rem",
                color: "#6b7280",
                fontWeight: "500",
                margin: 0,
              }}
            >
              <Subtext />
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: "1rem",
                color: "#374151",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              <Paragraph />
            </p>
          </div>
        </div>
      </div>
    );
  },
};

