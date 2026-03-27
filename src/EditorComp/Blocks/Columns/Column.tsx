"use client"


import { ComponentConfig } from "@measured/puck";

export const ColumnBlock: ComponentConfig = {
  label: "Column",

  fields: {
    layout: {
      type: "select",
      label: "Layout Type",
      options: [
        { label: "Flex", value: "flex" },
        { label: "Grid", value: "grid" },
      ],
    },
    gap: { type: "number", label: "Gap (px)" },
    alignItems: {
      type: "select",
      label: "Align Items (horizontal alignment)",
      options: [
        { label: "Start", value: "flex-start" },
        { label: "Center", value: "center" },
        { label: "End", value: "flex-end" },
        { label: "Stretch", value: "stretch" },
      ],
    },
    justifyContent: {
      type: "select",
      label: "Justify Content (vertical alignment)",
      options: [
        { label: "Start", value: "flex-start" },
        { label: "Center", value: "center" },
        { label: "End", value: "flex-end" },
        { label: "Space Between", value: "space-between" },
        { label: "Space Around", value: "space-around" },
        { label: "Space Evenly", value: "space-evenly" },
      ],
    },
    width: { type: "text", label: "Width (e.g., 100%, 400px)" },
    maxWidth: { type: "text", label: "Max Width (optional)" },
    height: { type: "text", label: "Height (optional)" },
    backgroundColor: { type: "text", label: "Background Color" },
    borderRadius: { type: "number", label: "Border Radius (px)" },
    padding: {
      label: "Padding",
      type: "object",
      objectFields: {
        paddingTop: { type: "number" },
        paddingBottom: { type: "number" },
        paddingLeft: { type: "number" },
        paddingRight: { type: "number" },
      },
    },
    boxShadow: { type: "text", label: "Box Shadow (optional)" },
    modules: {
      type: "slot",
      allow: ["BlurbBlock", "CarouselBlock", "AccordionBlock", "HeroBlock"]
    },
  },

  defaultProps: {
    layout: "block",
    gap: 16,
    alignItems: "stretch",
    justifyContent: "",
    width: "100%",
    maxWidth: "",
    height: "auto",
    backgroundColor: "",
    borderRadius: 0,
    boxShadow: "",
    padding: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  render: ({
    layout,
    gap,
    alignItems,
    justifyContent,
    width,
    maxWidth,
    height,
    backgroundColor,
    borderRadius,
    boxShadow,
    padding,
    modules: Modules,
    puck
  }) => {
    const style: React.CSSProperties =
      layout === "grid"
        ? {
            display: "grid",
            gridAutoFlow: "row",
            gap,
            alignItems,
            justifyContent,
            width,
            maxWidth: maxWidth || undefined,
            height,
            backgroundColor,
            borderRadius,
            boxShadow,
            paddingTop: padding?.paddingTop,
            paddingBottom: padding?.paddingBottom,
            paddingLeft: padding?.paddingLeft,
            paddingRight: padding?.paddingRight,
          }
        : {
            display: "flex",
            flexDirection: "column",
            gap,
            alignItems,
            justifyContent,
            width,
            maxWidth: maxWidth || undefined,
            height,
            backgroundColor,
            borderRadius,
            boxShadow,
            paddingTop: padding?.paddingTop,
            paddingBottom: padding?.paddingBottom,
            paddingLeft: padding?.paddingLeft,
            paddingRight: padding?.paddingRight,
          };

    return (
      <div ref={puck.dragRef} style={style}>
        <Modules />
      </div>
    );
  },
};

