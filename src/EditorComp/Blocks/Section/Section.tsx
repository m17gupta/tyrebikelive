"use client";

import { BackgroundGradientFields, BackgroundImageFields, BackgroundVideoFields } from "@/EditorComp/Fields/Background";
import { BorderStylesFields } from "@/EditorComp/Fields/BorderFields";
import { FlexLayoutFields } from "@/EditorComp/Fields/FlexFields";
import { GridLayoutFields } from "@/EditorComp/Fields/GridFields";
import { LinkFields } from "@/EditorComp/Fields/LinkFields";
import { BoxShadowFields } from "@/EditorComp/Fields/ShadowFields";
import { SizingFields } from "@/EditorComp/Fields/SizeFields";
import { SpacingFields } from "@/EditorComp/Fields/SpacingFields";
import { ComponentConfig } from "@measured/puck";

export const SectionBlock: ComponentConfig = {
  label: "Section",
  fields: {
    row: {
      type: "slot",
    },
  },
  resolveFields: (data, params) => {
    const layoutStyle = data.props?.Design?.Layout?.["Layout Style"] || "block";
    const backgroundType =
      data.props?.Content?.Background?.["Background Type"] || "none";
    const baseFields: any = {
      ...params.fields,
      Design: {
        type: "object",
        objectFields: {
          // Sizing Section
          Sizing: SizingFields,
          // Spacing Section
          Spacing: SpacingFields,
          // Border Styles Section
          "Border Styles": BorderStylesFields,
          // Box Shadow Section
          "Box Shadow": BoxShadowFields,
          // Layout Section
          Layout: {
            type: "object",
            objectFields: {
              "Layout Style": {
                type: "radio",
                options: [
                  { label: "Grid", value: "grid" },
                  { label: "Flex", value: "flex" },
                  { label: "Block", value: "block" },
                ],
              },
            },
          },
        },
      },
      Content: {
        type: "object",
        objectFields: {
          Link: LinkFields,
          Background: {
            type: "object",
            objectFields: {
              "Background Type": {
                type: "radio",
                options: [
                  { label: "None", value: "none" },
                  { label: "Color", value: "color" },
                  { label: "Image", value: "image" },
                  { label: "Gradient", value: "gradient" },
                  { label: "Video", value: "video" },
                ],
              },
            },
          },
        },
      },
    };

    // Add flex-specific fields
    if (layoutStyle === "flex") {
      baseFields.Design.objectFields.Layout.objectFields = {
        ...baseFields.Design.objectFields.Layout.objectFields,
        ...FlexLayoutFields,
      };
    }
    // Add grid-specific fields
    if (layoutStyle === "grid") {
      baseFields.Design.objectFields.Layout.objectFields = {
        ...baseFields.Design.objectFields.Layout.objectFields,
        ...GridLayoutFields,
      };
    }

    if (backgroundType === "color") {
      baseFields.Content.objectFields.Background.objectFields[
        "Background Color"
      ] = {
        type: "text",
        label: "Background Color",
      };
    }

     if (backgroundType === "image") {
      baseFields.Content.objectFields.Background.objectFields = {
        ...baseFields.Content.objectFields.Background.objectFields,
        ...BackgroundImageFields
      }
     }

     if (backgroundType === "gradient") {
      baseFields.Content.objectFields.Background.objectFields = {
        ...baseFields.Content.objectFields.Background.objectFields,
        ...BackgroundGradientFields
      }
     }

      if (backgroundType === "video") {
      baseFields.Content.objectFields.Background.objectFields = {
        ...baseFields.Content.objectFields.Background.objectFields,
        ...BackgroundVideoFields
      }
     }

    return baseFields;
  },

  // defaultProps: {
  //   Design: {
  //     Sizing: {
  //       Width: "100%",
  //       "Max Width": "large",
  //       "Custom Max Width": "1200px",
  //       "Section Alignment": "center",
  //       "Min Height": "auto",
  //       Height: "auto",
  //       "Max Height": "none",
  //     },
  //     Spacing: {
  //       "Margin Top": "0px",
  //       "Margin Bottom": "0px",
  //       "Margin Left": "0px",
  //       "Margin Right": "0px",
  //       "Padding Top": "40px",
  //       "Padding Bottom": "40px",
  //       "Padding Left": "20px",
  //       "Padding Right": "20px",
  //     },
  //     "Border Styles": {
  //       "Border Style": "all",
  //       "Border Width": "0px",
  //       "Border Color": "#e0e0e0",
  //       "Border Line Style": "solid",
  //       "Border Radius": "0px",
  //     },
  //     "Box Shadow": {
  //       "Shadow Preset": "none",
  //       "Horizontal Position": "0px",
  //       "Vertical Position": "0px",
  //       "Blur Strength": "0px",
  //       "Spread Strength": "0px",
  //       "Shadow Color": "#000000",
  //       "Shadow Opacity": 30,
  //       "Shadow Position": "outer",
  //     },
  //     Layout: {
  //       "Layout Style": "block",
  //       "Horizontal Gap": "0px",
  //       "Vertical Gap": "0px",
  //       "Layout Direction": "row",
  //       "Justify Content": "flex-start",
  //       "Align Items": "stretch",
  //       "Layout Wrapping": "nowrap",
  //       "Align Content": "flex-start",
  //     },
  //   },
  // },

  defaultProps: {
    Design: {
      Sizing: {
        Width: "100%",
        "Max Width": "large",
        "Custom Max Width": "1200px",
        "Section Alignment": "center",
        "Min Height": "auto",
        Height: "auto",
        "Max Height": "none",
      },
      Spacing: {
        "Margin Top": "0px",
        "Margin Bottom": "0px",
        "Margin Left": "0px",
        "Margin Right": "0px",
        "Padding Top": "40px",
        "Padding Bottom": "40px",
        "Padding Left": "20px",
        "Padding Right": "20px",
      },
      "Border Styles": {
        "Border Style": "all",
        "Border Width": "0px",
        "Border Color": "#e0e0e0",
        "Border Line Style": "solid",
        "Border Radius": "0px",
      },
      "Box Shadow": {
        "Shadow Preset": "none",
        "Horizontal Position": "0px",
        "Vertical Position": "0px",
        "Blur Strength": "0px",
        "Spread Strength": "0px",
        "Shadow Color": "#000000",
        "Shadow Opacity": 30,
        "Shadow Position": "outer",
      },
      Layout: {
        "Layout Style": "block",
      },
    },
    Content: {
      Link: {
        "Section Link URL": "",
        "Section Link Target": "_self",
      },
      Background: {
        "Background Type": "none",
        "Background Color": "#ffffff",
        "Background Image URL": "",
        "Background Size": "cover",
        "Background Position": "center",
        "Background Repeat": "no-repeat",
        "Background Attachment": "scroll",
        "Gradient Type": "linear",
        "Gradient Angle": "90deg",
        "Gradient Color 1": "#667eea",
        "Gradient Stop 1": "0%",
        "Gradient Color 2": "#764ba2",
        "Gradient Stop 2": "100%",
        "Add More Colors": "",
        "Video URL": "",
        "Video Fallback Image": "",
        "Video Loop": "yes",
        "Video Muted": "yes",
        "Video Autoplay": "yes",
        "Video Object Fit": "cover",
      },
    },
  },

  // render: ({ Design, row: Row }) => {
  //   const layoutStyle = Design?.Layout?.["Layout Style"] || "block";
  //   const sizing = Design?.Sizing || {};
  //   const spacing = Design?.Spacing || {};
  //   const borderStyles = Design?.["Border Styles"] || {};
  //   const boxShadow = Design?.["Box Shadow"] || {};

  //   // Max width mapping
  //   const maxWidthMap: Record<string, string> = {
  //     none: "none",
  //     small: "640px",
  //     medium: "768px",
  //     large: "1024px",
  //     full: "100%",
  //     custom: sizing["Custom Max Width"] || "1200px",
  //   };

  //   // Shadow preset mapping
  //   const shadowPresets: Record<string, string> = {
  //     none: "none",
  //     small: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  //     medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  //     large: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  //     xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  //     inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  //   };

  //   // Build border styles
  //   const borderWidth = borderStyles["Border Width"] || "0px";
  //   const borderColor = borderStyles["Border Color"] || "#e0e0e0";
  //   const borderLineStyle = borderStyles["Border Line Style"] || "solid";
  //   const borderValue = `${borderWidth} ${borderLineStyle} ${borderColor}`;

  //   let borderStyle: any = {};
  //   switch (borderStyles["Border Style"]) {
  //     case "all":
  //       borderStyle.border = borderValue;
  //       break;
  //     case "left":
  //       borderStyle.borderLeft = borderValue;
  //       break;
  //     case "right":
  //       borderStyle.borderRight = borderValue;
  //       break;
  //     case "top":
  //       borderStyle.borderTop = borderValue;
  //       break;
  //     case "bottom":
  //       borderStyle.borderBottom = borderValue;
  //       break;
  //   }

  //   const style: React.CSSProperties = {
  //     width: sizing["Width"] || "100%",
  //     maxWidth: maxWidthMap[sizing["Max Width"] || "large"],
  //     minHeight: sizing["Min Height"] || "auto",
  //     height: sizing["Height"] || "auto",
  //     maxHeight: sizing["Max Height"] || "none",

  //     marginTop: spacing["Margin Top"] || "0px",
  //     marginBottom: spacing["Margin Bottom"] || "0px",
  //     marginLeft: spacing["Margin Left"] || "0px",
  //     marginRight: spacing["Margin Right"] || "0px",

  //     paddingTop: spacing["Padding Top"] || "40px",
  //     paddingBottom: spacing["Padding Bottom"] || "40px",
  //     paddingLeft: spacing["Padding Left"] || "20px",
  //     paddingRight: spacing["Padding Right"] || "20px",

  //     ...borderStyle,
  //     borderRadius: borderStyles["Border Radius"] || "0px",

  //     boxSizing: "border-box",
  //     overflow: "hidden",
  //   };

  //   // Section alignment
  //   if (sizing["Section Alignment"] === "center") {
  //     style.marginLeft = "auto";
  //     style.marginRight = "auto";
  //   } else if (sizing["Section Alignment"] === "right") {
  //     style.marginLeft = "auto";
  //     style.marginRight = spacing["Margin Right"] || "0px";
  //   } else if (sizing["Section Alignment"] === "left") {
  //     // Left alignment - keep margins as specified
  //     style.marginLeft = spacing["Margin Left"] || "0px";
  //   }

  //   // Box shadow
  //   if (boxShadow["Shadow Preset"] === "custom") {
  //     const shadowColor = boxShadow["Shadow Color"] || "#000000";
  //     const opacity = (boxShadow["Shadow Opacity"] || 30) / 100;
  //     const position = boxShadow["Shadow Position"] === "inner" ? "inset" : "";
  //     const h = boxShadow["Horizontal Position"] || "0px";
  //     const v = boxShadow["Vertical Position"] || "0px";
  //     const blur = boxShadow["Blur Strength"] || "0px";
  //     const spread = boxShadow["Spread Strength"] || "0px";

  //     style.boxShadow =
  //       `${position} ${h} ${v} ${blur} ${spread} ${shadowColor}${Math.round(
  //         opacity * 255
  //       )
  //         .toString(16)
  //         .padStart(2, "0")}`.trim();
  //   } else {
  //     style.boxShadow = shadowPresets[boxShadow["Shadow Preset"] || "none"];
  //   }

  //   // Apply layout-specific styles
  //   if (layoutStyle === "flex") {
  //     style.display = "flex";
  //     style.flexDirection = Design?.Layout?.["Layout Direction"] || "row";
  //     style.justifyContent =
  //       Design?.Layout?.["Justify Content"] || "flex-start";
  //     style.alignItems = Design?.Layout?.["Align Items"] || "stretch";
  //     style.flexWrap = Design?.Layout?.["Layout Wrapping"] || "nowrap";
  //     style.alignContent = Design?.Layout?.["Align Content"] || "flex-start";
  //     style.columnGap = Design?.Layout?.["Horizontal Gap"] || "0px";
  //     style.rowGap = Design?.Layout?.["Vertical Gap"] || "0px";
  //   } else if (layoutStyle === "grid") {
  //     const columnWidths = Design?.Layout?.["Column Widths"] || "equal";
  //     const numColumns = Design?.Layout?.["Number of Columns"] || 3;
  //     const rowHeights = Design?.Layout?.["Row Heights"] || "auto";

  //     style.display = "grid";
  //     style.columnGap = Design?.Layout?.["Horizontal Gap"] || "0px";
  //     style.rowGap = Design?.Layout?.["Vertical Gap"] || "0px";

  //     // Column configuration
  //     if (columnWidths === "equal") {
  //       style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
  //     } else if (columnWidths === "auto") {
  //       style.gridTemplateColumns = `repeat(${numColumns}, auto)`;
  //     } else {
  //       style.gridTemplateColumns =
  //         Design?.Layout?.["Custom Column Template"] || "repeat(3, 1fr)";
  //     }

  //     // Row configuration
  //     if (rowHeights === "auto") {
  //       style.gridAutoRows = "auto";
  //     } else if (rowHeights === "equal") {
  //       style.gridAutoRows = "1fr";
  //     } else {
  //       style.gridTemplateRows = Design?.Layout?.["Number of Rows"] || "auto";
  //       style.gridAutoRows = Design?.Layout?.["Grid Auto Rows"] || "auto";
  //     }

  //     // Grid flow
  //     const direction = Design?.Layout?.["Grid Direction"] || "row";
  //     const density = Design?.Layout?.["Grid Density"] || "sparse";
  //     style.gridAutoFlow =
  //       density === "dense" ? `${direction} dense` : direction;

  //     // Alignment
  //     style.justifyContent = Design?.Layout?.["Justify Content"] || "start";
  //     style.alignItems = Design?.Layout?.["Align Items"] || "start";
  //     style.alignContent = Design?.Layout?.["Align Content"] || "start";
  //     style.justifyItems = Design?.Layout?.["Justify Items"] || "stretch";
  //   } else {
  //     style.display = "block";
  //   }

  //   return <section>{Row && <Row as={<div />} style={style} />}</section>;
  // },
  render: ({ Design, Content, row: Row }) => {
    const layoutStyle = Design?.Layout?.["Layout Style"] || "block";
    const sizing = Design?.Sizing || {};
    const spacing = Design?.Spacing || {};
    const borderStyles = Design?.["Border Styles"] || {};
    const boxShadow = Design?.["Box Shadow"] || {};
    const link = Content?.Link || {};
    const background = Content?.Background || {};

    // Max width mapping
    const maxWidthMap: Record<string, string> = {
      none: "none",
      small: "640px",
      medium: "768px",
      large: "1024px",
      full: "100%",
      custom: sizing["Custom Max Width"] || "1200px",
    };

    // Shadow preset mapping
    const shadowPresets: Record<string, string> = {
      none: "none",
      small: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      large: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    };

    // Build border styles
    const borderWidth = borderStyles["Border Width"] || "0px";
    const borderColor = borderStyles["Border Color"] || "#e0e0e0";
    const borderLineStyle = borderStyles["Border Line Style"] || "solid";
    const borderValue = `${borderWidth} ${borderLineStyle} ${borderColor}`;

    let borderStyle: any = {};
    switch (borderStyles["Border Style"]) {
      case "all":
        borderStyle.border = borderValue;
        break;
      case "left":
        borderStyle.borderLeft = borderValue;
        break;
      case "right":
        borderStyle.borderRight = borderValue;
        break;
      case "top":
        borderStyle.borderTop = borderValue;
        break;
      case "bottom":
        borderStyle.borderBottom = borderValue;
        break;
    }

    const style: React.CSSProperties = {
      width: sizing["Width"] || "100%",
      maxWidth: maxWidthMap[sizing["Max Width"] || "large"],
      minHeight: sizing["Min Height"] || "auto",
      height: sizing["Height"] || "auto",
      maxHeight: sizing["Max Height"] || "none",

      marginTop: spacing["Margin Top"] || "0px",
      marginBottom: spacing["Margin Bottom"] || "0px",
      marginLeft: spacing["Margin Left"] || "0px",
      marginRight: spacing["Margin Right"] || "0px",

      paddingTop: spacing["Padding Top"] || "40px",
      paddingBottom: spacing["Padding Bottom"] || "40px",
      paddingLeft: spacing["Padding Left"] || "20px",
      paddingRight: spacing["Padding Right"] || "20px",

      ...borderStyle,
      borderRadius: borderStyles["Border Radius"] || "0px",

      boxSizing: "border-box",
      overflow: "hidden",
      position: "relative",
    };

    // Apply background based on type
    const backgroundType = background["Background Type"] || "none";
    
    if (backgroundType === "color") {
      style.backgroundColor = background["Background Color"] || "#ffffff";
    } else if (backgroundType === "image") {
      style.backgroundImage = `url(${background["Background Image URL"]})`;
      style.backgroundSize = background["Background Size"] || "cover";
      style.backgroundPosition = background["Background Position"] || "center";
      style.backgroundRepeat = background["Background Repeat"] || "no-repeat";
      style.backgroundAttachment = background["Background Attachment"] || "scroll";
    } else if (backgroundType === "gradient") {
      const gradientType = background["Gradient Type"] || "linear";
      const angle = background["Gradient Angle"] || "90deg";
      const color1 = background["Gradient Color 1"] || "#667eea";
      const stop1 = background["Gradient Stop 1"] || "0%";
      const color2 = background["Gradient Color 2"] || "#764ba2";
      const stop2 = background["Gradient Stop 2"] || "100%";
      const additionalColors = background["Add More Colors"] || "";
      
      let gradientString = `${color1} ${stop1}, ${color2} ${stop2}`;
      if (additionalColors) {
        gradientString += `, ${additionalColors}`;
      }
      
      if (gradientType === "linear") {
        style.backgroundImage = `linear-gradient(${angle}, ${gradientString})`;
      } else {
        style.backgroundImage = `radial-gradient(circle, ${gradientString})`;
      }
    }

    // Section alignment
    if (sizing["Section Alignment"] === "center") {
      style.marginLeft = "auto";
      style.marginRight = "auto";
    } else if (sizing["Section Alignment"] === "right") {
      style.marginLeft = "auto";
      style.marginRight = spacing["Margin Right"] || "0px";
    } else if (sizing["Section Alignment"] === "left") {
      // Left alignment - keep margins as specified
      style.marginLeft = spacing["Margin Left"] || "0px";
    }

    // Box shadow
    if (boxShadow["Shadow Preset"] === "custom") {
      const shadowColor = boxShadow["Shadow Color"] || "#000000";
      const opacity = (boxShadow["Shadow Opacity"] || 30) / 100;
      const position = boxShadow["Shadow Position"] === "inner" ? "inset" : "";
      const h = boxShadow["Horizontal Position"] || "0px";
      const v = boxShadow["Vertical Position"] || "0px";
      const blur = boxShadow["Blur Strength"] || "0px";
      const spread = boxShadow["Spread Strength"] || "0px";

      style.boxShadow = `${position} ${h} ${v} ${blur} ${spread} ${shadowColor}${Math.round(
        opacity * 255
      )
        .toString(16)
        .padStart(2, "0")}`.trim();
    } else {
      style.boxShadow = shadowPresets[boxShadow["Shadow Preset"] || "none"];
    }

    // Apply layout-specific styles
    if (layoutStyle === "flex") {
      style.display = "flex";
      style.flexDirection = Design?.Layout?.["Layout Direction"] || "row";
      style.justifyContent =
        Design?.Layout?.["Justify Content"] || "flex-start";
      style.alignItems = Design?.Layout?.["Align Items"] || "stretch";
      style.flexWrap = Design?.Layout?.["Layout Wrapping"] || "nowrap";
      style.alignContent = Design?.Layout?.["Align Content"] || "flex-start";
      style.columnGap = Design?.Layout?.["Horizontal Gap"] || "0px";
      style.rowGap = Design?.Layout?.["Vertical Gap"] || "0px";
    } else if (layoutStyle === "grid") {
      const columnWidths = Design?.Layout?.["Column Widths"] || "equal";
      const numColumns = Design?.Layout?.["Number of Columns"] || 3;
      const rowHeights = Design?.Layout?.["Row Heights"] || "auto";

      style.display = "grid";
      style.columnGap = Design?.Layout?.["Horizontal Gap"] || "0px";
      style.rowGap = Design?.Layout?.["Vertical Gap"] || "0px";

      // Column configuration
      if (columnWidths === "equal") {
        style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
      } else if (columnWidths === "auto") {
        style.gridTemplateColumns = `repeat(${numColumns}, auto)`;
      } else {
        style.gridTemplateColumns =
          Design?.Layout?.["Custom Column Template"] || "repeat(3, 1fr)";
      }

      // Row configuration
      if (rowHeights === "auto") {
        style.gridAutoRows = "auto";
      } else if (rowHeights === "equal") {
        style.gridAutoRows = "1fr";
      } else {
        style.gridTemplateRows = Design?.Layout?.["Number of Rows"] || "auto";
        style.gridAutoRows = Design?.Layout?.["Grid Auto Rows"] || "auto";
      }

      // Grid flow
      const direction = Design?.Layout?.["Grid Direction"] || "row";
      const density = Design?.Layout?.["Grid Density"] || "sparse";
      style.gridAutoFlow =
        density === "dense" ? `${direction} dense` : direction;

      // Alignment
      style.justifyContent = Design?.Layout?.["Justify Content"] || "start";
      style.alignItems = Design?.Layout?.["Align Items"] || "start";
      style.alignContent = Design?.Layout?.["Align Content"] || "start";
      style.justifyItems = Design?.Layout?.["Justify Items"] || "stretch";
    } else {
      style.display = "block";
    }

    return (
      <section>
        {backgroundType === "video" && background["Video URL"] && (
          <video
            autoPlay={background["Video Autoplay"] === "yes"}
            loop={background["Video Loop"] === "yes"}
            muted={background["Video Muted"] === "yes"}
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: background["Video Object Fit"] || "cover",
              zIndex: 0,
            }}
          >
            <source src={background["Video URL"]} type="video/mp4" />
            {background["Video Fallback Image"] && (
              <img
                src={background["Video Fallback Image"]}
                alt="Video fallback"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: background["Video Object Fit"] || "cover",
                }}
              />
            )}
          </video>
        )}
        {link["Section Link URL"] ? (
          <a
            href={link["Section Link URL"]}
            target={link["Section Link Target"] || "_self"}
            rel={link["Section Link Target"] === "_blank" ? "noopener noreferrer" : undefined}
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            {Row && <Row as={<div />} style={{ ...style, position: "relative", zIndex: 1 }} />}
          </a>
        ) : (
          Row && <Row as={<div />} style={{ ...style, position: "relative", zIndex: 1 }} />
        )}
      </section>
    );
  },
};

