export const BorderStylesFields = {
  type: "object",
  objectFields: {
    "Border Style": {
      type: "radio",
      options: [
        { label: "All", value: "all" },
        { label: "Top", value: "top" },
        { label: "Bottom", value: "bottom" },
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
    },
    "Border Width": {
      type: "text",
      label: "Border Width",
    },
    "Border Color": {
      type: "text",
      label: "Border Color",
    },
    "Border Line Style": {
      type: "select",
      options: [
        { label: "Solid", value: "solid" },
        { label: "Dashed", value: "dashed" },
        { label: "Dotted", value: "dotted" },
        { label: "Double", value: "double" },
        { label: "None", value: "none" },
      ],
    },
    "Border Radius": {
      type: "text",
      label: "Border Radius",
    },
  },
};

