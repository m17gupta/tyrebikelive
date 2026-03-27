export const GridLayoutFields = {
  "Horizontal Gap": {
    type: "text",
    label: "Horizontal Gap",
  },
  "Vertical Gap": {
    type: "text",
    label: "Vertical Gap",
  },
  "Column Widths": {
    type: "select",
    options: [
      { label: "Equal Width Columns", value: "equal" },
      { label: "Auto Width Columns", value: "auto" },
      { label: "Custom", value: "custom" },
    ],
  },
  "Number of Columns": {
    type: "number",
    label: "Number of Columns",
  },
  "Custom Column Template": {
    type: "text",
    label: "Custom Column Template",
  },
  "Row Heights": {
    type: "select",
    options: [
      { label: "Auto Height Rows", value: "auto" },
      { label: "Equal Height Rows", value: "equal" },
      { label: "Custom", value: "custom" },
    ],
  },
  "Number of Rows": {
    type: "text",
    label: "Number of Rows",
  },
  "Grid Auto Rows": {
    type: "text",
    label: "Grid Auto Rows",
  },
  "Grid Direction": {
    type: "radio",
    options: [
      { label: "Row", value: "row" },
      { label: "Column", value: "column" },
    ],
  },
  "Grid Density": {
    type: "radio",
    options: [
      { label: "Sparse", value: "sparse" },
      { label: "Dense", value: "dense" },
    ],
  },
  "Justify Content": {
    type: "radio",
    options: [
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" },
      { label: "Space Between", value: "space-between" },
      { label: "Space Around", value: "space-around" },
      { label: "Space Evenly", value: "space-evenly" },
    ],
  },
  "Align Items": {
    type: "radio",
    options: [
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" },
      { label: "Stretch", value: "stretch" },
    ],
  },
  "Align Content": {
    type: "radio",
    options: [
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" },
      { label: "Space Between", value: "space-between" },
      { label: "Space Around", value: "space-around" },
      { label: "Stretch", value: "stretch" },
    ],
  },
  "Justify Items": {
    type: "radio",
    options: [
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" },
      { label: "Stretch", value: "stretch" },
    ],
  },
};
