export const FlexLayoutFields = {
  "Horizontal Gap": {
    type: "text",
    label: "Horizontal Gap",
  },
  "Vertical Gap": {
    type: "text",
    label: "Vertical Gap",
  },
  "Layout Direction": {
    type: "radio",
    options: [
      { label: "Horizontal", value: "row" },
      { label: "Vertical", value: "column" },
      { label: "Horizontal Reverse", value: "row-reverse" },
      { label: "Vertical Reverse", value: "column-reverse" },
    ],
  },
  "Justify Content": {
    type: "radio",
    options: [
      { label: "Start", value: "flex-start" },
      { label: "Center", value: "center" },
      { label: "End", value: "flex-end" },
      { label: "Space Between", value: "space-between" },
      { label: "Space Around", value: "space-around" },
      { label: "Space Evenly", value: "space-evenly" },
    ],
  },
  "Align Items": {
    type: "radio",
    options: [
      { label: "Start", value: "flex-start" },
      { label: "Center", value: "center" },
      { label: "End", value: "flex-end" },
      { label: "Stretch", value: "stretch" },
    ],
  },
  "Layout Wrapping": {
    type: "radio",
    options: [
      { label: "No Wrap", value: "nowrap" },
      { label: "Wrap", value: "wrap" },
      { label: "Wrap Reverse", value: "wrap-reverse" },
    ],
  },
  "Align Content": {
    type: "radio",
    options: [
      { label: "Start", value: "flex-start" },
      { label: "Center", value: "center" },
      { label: "End", value: "flex-end" },
      { label: "Space Between", value: "space-between" },
      { label: "Space Around", value: "space-around" },
      { label: "Stretch", value: "stretch" },
    ],
  },
};
