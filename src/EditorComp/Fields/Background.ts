export const BackgroundImageFields = {
  "Background Image URL": {
    type: "text",
    label: "Image URL",
  },
  "Background Size": {
    type: "select",
    label: "Background Size",
    options: [
      { label: "Cover", value: "cover" },
      { label: "Contain", value: "contain" },
      { label: "Auto", value: "auto" },
      { label: "Custom", value: "custom" },
    ],
  },
  "Background Position": {
    type: "select",
    label: "Background Position",
    options: [
      { label: "Center", value: "center" },
      { label: "Top", value: "top" },
      { label: "Bottom", value: "bottom" },
      { label: "Left", value: "left" },
      { label: "Right", value: "right" },
      { label: "Top Left", value: "top left" },
      { label: "Top Right", value: "top right" },
      { label: "Bottom Left", value: "bottom left" },
      { label: "Bottom Right", value: "bottom right" },
    ],
  },
  "Background Repeat": {
    type: "select",
    label: "Background Repeat",
    options: [
      { label: "No Repeat", value: "no-repeat" },
      { label: "Repeat", value: "repeat" },
      { label: "Repeat X", value: "repeat-x" },
      { label: "Repeat Y", value: "repeat-y" },
    ],
  },
  "Background Attachment": {
    type: "select",
    label: "Background Attachment",
    options: [
      { label: "Scroll", value: "scroll" },
      { label: "Fixed", value: "fixed" },
      { label: "Local", value: "local" },
    ],
  },
};

export const BackgroundGradientFields = {
  "Gradient Type": {
    type: "radio",
    options: [
      { label: "Linear", value: "linear" },
      { label: "Radial", value: "radial" },
    ],
  },
  "Gradient Angle": {
    type: "text",
    label: "Gradient Angle (e.g., 45deg, to right)",
  },
  "Gradient Color 1": {
    type: "text",
    label: "Color 1",
  },
  "Gradient Stop 1": {
    type: "text",
    label: "Stop 1 (e.g., 0%, 20px)",
  },
  "Gradient Color 2": {
    type: "text",
    label: "Color 2",
  },
  "Gradient Stop 2": {
    type: "text",
    label: "Stop 2 (e.g., 100%, 50%)", // ✅ Changed from "Stop 1" to "Stop 2"
  },
  "Add More Colors": {
    type: "text",
    label: "Additional Colors (comma-separated: color stop, color stop)",
  },
};

export const BackgroundVideoFields = {
  "Video URL": {
    type: "text",
    label: "Video URL",
  },
  "Video Fallback Image": {
    type: "text",
    label: "Fallback Image URL",
  },
  "Video Loop": {
    type: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  "Video Muted": {
    type: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  "Video Autoplay": {
    type: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  "Video Object Fit": {
    type: "select",
    label: "Video Object Fit",
    options: [
      { label: "Cover", value: "cover" },
      { label: "Contain", value: "contain" },
      { label: "Fill", value: "fill" },
      { label: "None", value: "none" },
    ],
  },
};

