"use client";

import { ComponentConfig } from "@measured/puck";
import { useState } from "react";

export const FAQSection: ComponentConfig = {
  label: "FAQ Section",

  fields: {
    // LEFT SIDE FIELDS
    leftTitle: { type: "text", label: "Left Title" },
    leftTitleSize: { type: "number", label: "Left Title Font Size" },
    leftDescription: { type: "textarea", label: "Left Description" },
    leftDescSize: { type: "number", label: "Description Font Size" },
    buttonText: { type: "text", label: "Button Text" },
    buttonBg: { type: "text", label: "Button Background" },
    buttonColor: { type: "text", label: "Button Text Color" },

    gap: { type: "number", label: "Left/Right Gap (px)" },

    // FAQ ITEM FIELDS
    itemBg: { type: "text", label: "Item Background Color" },
    itemRadius: { type: "number", label: "Item Border Radius (px)" },
    questionSize: { type: "number", label: "Question Font Size" },
    questionColor: { type: "text", label: "Question Color" },
    answerSize: { type: "number", label: "Answer Font Size" },
    answerColor: { type: "text", label: "Answer Color" },

    // LIST OF FAQ ITEMS
    items: {
      type: "array",
      label: "FAQ Items",
      arrayFields: {
        question: { type: "text", label: "Question" },
        answer: { type: "textarea", label: "Answer" },
      },
    },
  },

  defaultProps: {
    leftTitle: "FAQs",
    leftTitleSize: 36,
    leftDescription:
      "Can’t find an answer to your question? Feel free to contact us, we’ll help you asap.",
    leftDescSize: 16,
    buttonText: "Contact us",
    buttonBg: "#8DD439",
    buttonColor: "#111",

    gap: 40,

    itemBg: "rgba(141,212,57,0.15)",
    itemRadius: 12,
    questionSize: 18,
    questionColor: "#000",
    answerSize: 15,
    answerColor: "#333",

    items: [
      {
        question: "Where is your company based, and who do you serve?",
        answer: "We work globally with clients from many regions...",
      },
      {
        question: "How do you ensure smooth communication with UK/US clients?",
        answer: "We maintain consistent communication channels...",
      },
      {
        question: "What services do you offer?",
        answer: "We provide web development, design, branding...",
      },
      {
        question: "Do you sign NDAs and ensure data security?",
        answer: "Yes, we sign NDAs and follow strict security protocols.",
      },
      {
        question: "How can I start a project with you?",
        answer: "You can contact us anytime and we will guide you.",
      },
    ],
  },

  render: ({
    leftTitle,
    leftTitleSize,
    leftDescription,
    leftDescSize,
    buttonText,
    buttonBg,
    buttonColor,
    gap,

    itemBg,
    itemRadius,
    questionSize,
    questionColor,
    answerSize,
    answerColor,

    items,
  }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: `${gap}px`,
          width: "100%",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ width: "35%" }}>
          <h2
            style={{
              fontSize: `${leftTitleSize}px`,
              fontWeight: "700",
              marginBottom: "20px",
              color: "#111",
            }}
          >
            {leftTitle}
          </h2>

          <p
            style={{
              fontSize: `${leftDescSize}px`,
              color: "#333",
              lineHeight: "26px",
              marginBottom: "25px",
            }}
          >
            {leftDescription}
          </p>

          <button
            style={{
              backgroundColor: buttonBg,
              color: buttonColor,
              padding: "12px 26px",
              borderRadius: "10px",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {buttonText}
          </button>
        </div>

        {/* RIGHT SIDE ACCORDION */}
        <div
          style={{
            width: "55%",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                style={{
                  background: itemBg,
                  padding: "18px 22px",
                  borderRadius: `${itemRadius}px`,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: `${questionSize}px`,
                      color: questionColor,
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    {item.question}
                  </p>

                  <span
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                    }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </div>

                {isOpen && (
                  <p
                    style={{
                      marginTop: "12px",
                      fontSize: `${answerSize}px`,
                      lineHeight: "24px",
                      color: answerColor,
                    }}
                  >
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};

