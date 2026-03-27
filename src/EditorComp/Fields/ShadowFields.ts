export const BoxShadowFields = {
  type: "object",
  objectFields: {
    "Shadow Preset": {
      type: "radio",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
        { label: "Extra Large", value: "xl" },
        { label: "Inner", value: "inner" },
        { label: "Custom", value: "custom" },
      ],
    },
    "Horizontal Position": {
      type: "text",
      label: "Horizontal Position",
    },
    "Vertical Position": {
      type: "text",
      label: "Vertical Position",
    },
    "Blur Strength": {
      type: "text",
      label: "Blur Strength",
    },
    "Spread Strength": {
      type: "text",
      label: "Spread Strength",
    },
    "Shadow Color": {
      type: "text",
      label: "Shadow Color",
    },
    "Shadow Opacity": {
      type: "number",
      label: "Shadow Opacity",
    },
    "Shadow Position": {
      type: "select",
      options: [
        { label: "Outer Shadow", value: "outer" },
        { label: "Inner Shadow", value: "inner" },
      ],
    },
  },
};
