"use client"

import { ComponentConfig } from "@measured/puck";
import { useState } from "react";

export const AccordionBlock: ComponentConfig = {
  label: "Accordion",

  fields: {
    items: {
      type: "array",
      label: "Accordion Items",
      arrayFields: {
        title: { type: "text", label: "Title" },
        content: { type: "textarea", label: "Content" },
      },
    },
    defaultOpenIndex: { type: "number", label: "Default Open Index (0-based)" },
    allowMultiple: { type: "radio", label: "Allow Multiple Open", options: [
        {label: "True",
            value: true
        },
        {label: "False",
            value: false
        },
    ] },
    backgroundColor: { type: "text", label: "Background Color" },
    textColor: { type: "text", label: "Text Color" },
    borderColor: { type: "text", label: "Border Color" },
    borderRadius: { type: "number", label: "Border Radius (px)" },
  },

  defaultProps: {
    items: [
      {
        title: "What is Puck?",
        content:
          "Puck is a visual editor for React that lets you build and edit page layouts dynamically with structured content blocks.",
      },
      {
        title: "Can I use it with my CMS?",
        content:
          "Yes! You can integrate Puck with Payload CMS, Sanity, Strapi, or any other headless CMS easily.",
      },
      {
        title: "Is it customizable?",
        content:
          "Absolutely. You can define your own React components, fields, and styling inside your Puck configuration.",
      },
    ],
    defaultOpenIndex: 0,
    allowMultiple: false,
    backgroundColor: "#ffffff",
    textColor: "#111827",
    borderColor: "#e5e7eb",
    borderRadius: 8,
  },

  render: ({
    items,
    defaultOpenIndex,
    allowMultiple,
    backgroundColor,
    textColor,
    borderColor,
    borderRadius,
  }) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>(
      defaultOpenIndex !== undefined ? [defaultOpenIndex] : []
    );

    const toggleItem = (index: number) => {
      setOpenIndexes((prev) => {
        const isOpen = prev.includes(index);
        if (allowMultiple) {
          return isOpen
            ? prev.filter((i) => i !== index)
            : [...prev, index];
        } else {
          return isOpen ? [] : [index];
        }
      });
    };

    return (
      <div
        style={{
          backgroundColor,
          color: textColor,
          borderRadius,
          border: `1px solid ${borderColor}`,
          overflow: "hidden",
        }}
      >
        {items.map((item, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div
              key={index}
              style={{
                borderBottom:
                  index !== items.length - 1
                    ? `1px solid ${borderColor}`
                    : "none",
              }}
            >
              <button
                onClick={() => toggleItem(index)}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  textAlign: "left",
                  fontSize: 16,
                  fontWeight: 600,
                  border: "none",
                  background: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span>{item.title}</span>
                <span
                  style={{
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    fontSize: 18,
                  }}
                >
                  ▶
                </span>
              </button>

              <div
                style={{
                  maxHeight: isOpen ? "500px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                  padding: isOpen ? "0 20px 16px 20px" : "0 20px",
                  opacity: isOpen ? 1 : 0,
                  transitionProperty: "max-height, opacity, padding",
                  transitionDuration: "0.4s",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.6,
                    fontSize: 14,
                    color: textColor,
                  }}
                >
                  {item.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

