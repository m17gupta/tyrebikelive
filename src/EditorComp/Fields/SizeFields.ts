export const SizingFields = {
  type: "object",
  objectFields: {
    Width: {
      type: "text",
      label: "Width",
    },
    "Max Width": {
      type: "select",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
        { label: "Full", value: "full" },
        { label: "Custom", value: "custom" },
      ],
    },
    "Custom Max Width": {
      type: "text",
      label: "Custom Max Width",
    },
    "Section Alignment": {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    "Min Height": {
      type: "text",
      label: "Min Height",
    },
    Height: {
      type: "text",
      label: "Height",
    },
    "Max Height": {
      type: "text",
      label: "Max Height",
    },
  },
};

