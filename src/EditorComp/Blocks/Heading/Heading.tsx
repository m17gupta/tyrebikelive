"use client";

import { ComponentConfig } from "@measured/puck";

export const HeadingBlock: ComponentConfig = {
  fields: {
    tag: {
      type: "select",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
        { label: "H5", value: "h5" },
        { label: "H6", value: "h6" },
      ],
    },
    text: { type: "text" },
    align: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    color: { type: "text" },
    fontSize: { type: "number" },
    fontWeight: {
      type: "select",
      options: [
        { label: "Light", value: "300" },
        { label: "Normal", value: "400" },
        { label: "Medium", value: "500" },
        { label: "Bold", value: "700" },
      ],
    },

    // ✅ Use object for nested numeric fields
    margin: {
      label: "Margin",
      type: "object",
      objectFields: {
        marginLeft: { type: "number" },
        marginRight: { type: "number" },
        marginTop: { type: "number" },
        marginBottom: { type: "number" },
      },
    },
    padding: {
      label: "Padding",
      type: "object",
      objectFields: {
        paddingLeft: { type: "number" },
        paddingRight: { type: "number" },
        paddingTop: { type: "number" },
        paddingBottom: { type: "number" },
      },
    },
  },

  defaultProps: {
    tag: "h2",
    text: "This is a sample heading",
    align: "left",
    color: "red",
    fontSize: 24,
    fontWeight: "400",
    margin: {
      marginTop: 8,
      marginBottom: 8,
    },
    padding: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },

  render: ({
    tag: Tag,
    text,
    align,
    color,
    fontWeight,
    fontSize,
    margin,
    padding,
  }) => {
    const style: React.CSSProperties = {
      textAlign: align,
      color,
      fontWeight,
      fontSize,
      marginLeft: margin?.marginLeft,
      marginRight: margin?.marginRight,
      marginTop: margin?.marginTop,
      marginBottom: margin?.marginBottom,
      paddingLeft: padding?.paddingLeft,
      paddingRight: padding?.paddingRight,
      paddingTop: padding?.paddingTop,
      paddingBottom: padding?.paddingBottom,
    };

    return <Tag style={style}>{text}</Tag>;
  },
};

