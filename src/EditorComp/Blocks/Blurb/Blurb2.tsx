"use client";

import { ComponentConfig } from "@measured/puck";

export const InfoBlurbBlock: ComponentConfig = {
  label: "Card Builder",

  // ------------------------------------------------------
  // FIELDS
  // ------------------------------------------------------
  fields: {
    sectionTitle: { type: "text", label: "Section Title" },
    sectionAlign: {
      type: "select",
      label: "Section Title Align",
      options: [
        { label: "Center", value: "center" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
    },

    cards: {
      type: "array",
      label: "Cards",
      arrayFields: {
        cardBg: { type: "text", label: "Card Background (Color/Gradient)" },
        cardPadding: { type: "number", label: "Card Padding (px)" },
        cardRadius: { type: "number", label: "Card Radius (px)" },
        cardWidth: { type: "number", label: "Card Width (%)" },

        // MEDIA
        useImage: {
          type: "select",
          label: "Use Image",
          options: [
            { label: "No", value: "no" },
            { label: "Yes", value: "yes" },
          ],
        },
        imageUrl: { type: "text", label: "Image URL" },
        imageHeight: { type: "number", label: "Image Height (px)" },

        useIcon: {
          type: "select",
          label: "Use Icon",
          options: [
            { label: "No", value: "no" },
            { label: "Yes", value: "yes" },
          ],
        },
        iconValue: { type: "text", label: "Icon (Emoji or URL)" },
        iconSize: { type: "number", label: "Icon Size (px)" },

        // CONTENT
        title: { type: "text", label: "Card Title" },
        titleAlign: {
          type: "select",
          label: "Title Align",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },

        content: { type: "textarea", label: "Card Content" },
        contentAlign: {
          type: "select",
          label: "Content Align",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },

        // BUTTON
        btnText: { type: "text", label: "Button Text" },
        btnLink: { type: "text", label: "Button Link" },
        btnAlign: {
          type: "select",
          label: "Button Align",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
    },
  },

  // ------------------------------------------------------
  // DEFAULT PROPS
  // ------------------------------------------------------
  defaultProps: {
    sectionTitle: "Our Features",
    sectionAlign: "center",

    cards: [
      {
        cardBg: "#ffffff",
        cardPadding: 25,
        cardRadius: 12,
        cardWidth: 30,

        useImage: "yes",
        imageUrl:
          "https://images.unsplash.com/photo-1734526040622-a3e96b679f80?w=800",
        imageHeight: 200,

        useIcon: "yes",
        iconValue: "⚡",
        iconSize: 45,

        title: "Feature One",
        titleAlign: "center",

        content: "This is a powerful feature with a clean and modern card layout.",
        contentAlign: "center",

        btnText: "Learn More",
        btnLink: "#",
        btnAlign: "center",
      },
      {
        cardBg: "#ffffff",
        cardPadding: 25,
        cardRadius: 12,
        cardWidth: 30,
        useImage: "no",
        imageUrl: "",
        imageHeight: 0,
        useIcon: "yes",
        iconValue: "🔥",
        iconSize: 45,
        title: "Feature Two",
        titleAlign: "center",
        content: "You can fully customize the card design as per your needs.",
        contentAlign: "center",
        btnText: "Explore",
        btnLink: "#",
        btnAlign: "center",
      },
      {
        cardBg: "#ffffff",
        cardPadding: 25,
        cardRadius: 12,
        cardWidth: 30,

        useImage: "yes",
        imageUrl:
          "https://images.unsplash.com/photo-1706024676023-c1d6c8e18adb?w=800",
        imageHeight: 200,

        useIcon: "no",
        iconValue: "",
        iconSize: 0,

        title: "Feature Three",
        titleAlign: "center",

        content: "Add image only, icon only, or both. Full flexibility.",
        contentAlign: "center",

        btnText: "Read More",
        btnLink: "#",
        btnAlign: "center",
      },
    ],
  },

  // ------------------------------------------------------
  // RENDER
  // ------------------------------------------------------
  render: ({ sectionTitle, sectionAlign, cards }) => {
    return (
      <section style={{ padding: "60px 20px", width: "100%" }}>
        {/* Section Title */}
        <h2
          style={{
            textAlign: sectionAlign,
            fontSize: "42px",
            fontWeight: "700",
            marginBottom: "50px",
          }}
        >
          {sectionTitle}
        </h2>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          {cards.map((card: any, i: number) => (
            <div
              key={i}
              style={{
                width: `${card.cardWidth}%`,
                background: card.cardBg,
                padding: `${card.cardPadding}px`,
                borderRadius: `${card.cardRadius}px`,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              {/* IMAGE */}
              {card.useImage === "yes" && card.imageUrl && (
                <img
                  src={card.imageUrl}
                  style={{
                    width: "100%",
                    height: `${card.imageHeight}px`,
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "15px",
                  }}
                />
              )}

              {/* ICON */}
              {card.useIcon === "yes" && (
                <div
                  style={{
                    fontSize: `${card.iconSize}px`,
                    textAlign: "center",
                    marginBottom: "15px",
                  }}
                >
                  {card.iconValue}
                </div>
              )}

              {/* TITLE */}
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  textAlign: card.titleAlign,
                  marginBottom: "10px",
                }}
              >
                {card.title}
              </h3>

              {/* CONTENT */}
              <p
                style={{
                  fontSize: "16px",
                  opacity: 0.9,
                  textAlign: card.contentAlign,
                  lineHeight: "1.5",
                  marginBottom: "18px",
                }}
              >
                {card.content}
              </p>

              {/* BUTTON */}
              {card.btnText && (
                <div style={{ textAlign: card.btnAlign }}>
                  <a
                    href={card.btnLink}
                    style={{
                      display: "inline-block",
                      padding: "12px 24px",
                      background: "#000",
                      color: "#fff",
                      borderRadius: "8px",
                      fontSize: "15px",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    {card.btnText}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  },
};

