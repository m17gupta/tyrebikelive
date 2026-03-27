"use client";

import { ComponentConfig } from "@measured/puck";
import React, { CSSProperties } from "react";

export const FeaturedWorksBlock: ComponentConfig = {
  label: "Featured Works Section",

  // -------------------------------------------
  // FIELDS
  // -------------------------------------------
  fields: {
    margin: {
      label: "Margin",
      type: "object",
      objectFields: {
        marginLeft: { type: "text" },
        marginRight: { type: "text" },
        marginTop: { type: "text" },
        marginBottom: { type: "text" },
      },
    },

    width: { type: "number", label: "Width (%)" },
    backgroundColor: { type: "text", label: "Background Color" },

    sectionTitle: { type: "text", label: "Section Title" },

    project1Tag: { type: "text", label: "Project 1 Tags" },
    project1Title: { type: "text", label: "Project 1 Title" },
    project1Sub: { type: "text", label: "Project 1 Subtitle" },
    project1Image: { type: "text", label: "Project 1 Image URL" },
    project1Button: { type: "text", label: "Project 1 Button Text" },

    project2Tag: { type: "text", label: "Project 2 Tags" },
    project2Title: { type: "text", label: "Project 2 Title" },
    project2Sub: { type: "text", label: "Project 2 Subtitle" },
    project2Image: { type: "text", label: "Project 2 Image URL" },
    project2Button: { type: "text", label: "Project 2 Button Text" },
  },

  // -------------------------------------------
  // DEFAULT PROPS
  // -------------------------------------------
  defaultProps: {
    margin: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "0",
      marginBottom: "0",
    },
    width: 85,
    backgroundColor: "#1e1e1e",

    sectionTitle: "OUR FEATURED WORKS",

    project1Tag: "HOUSES  DESIGN  SKYSCRAPPER",
    project1Title: "MAKRA TOWER",
    project1Sub: "JALGAON",
    project1Image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    project1Button: "View Project →",

    project2Tag: "INTERIOR  MINIMALISM  ELEGANCE",
    project2Title: "ZOPE'S RESIDENCE",
    project2Sub: "LOWER PAREL, MUMBAI",
    project2Image:
      "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
    project2Button: "View Project →",
  },

  // -------------------------------------------
  // RENDER
  // -------------------------------------------
  render: ({
    margin,
    width,
    backgroundColor,
    sectionTitle,

    project1Tag,
    project1Title,
    project1Sub,
    project1Image,
    project1Button,

    project2Tag,
    project2Title,
    project2Sub,
    project2Image,
    project2Button,
  }) => {
    const section: CSSProperties = {
      width: "100%",
      padding: "80px 0",
      backgroundColor,
      color: "#fff",
      fontFamily: "sans-serif",
    };

    const container: CSSProperties = {
      width: `${width}%`,
      margin: `${margin.marginTop} ${margin.marginRight} ${margin.marginBottom} ${margin.marginLeft}`,
    };

    const title: CSSProperties = {
      textAlign: "center",
      fontSize: "35px",
      letterSpacing: "2px",
      marginBottom: "60px",
      fontWeight: 700,
    };

    const row: CSSProperties = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "80px",
      flexWrap: "wrap",
    };

    const textBox: CSSProperties = {
      width: "45%",
    };

    const tag: CSSProperties = {
      color: "#c5c5c5",
      letterSpacing: "2px",
      fontSize: "12px",
      marginBottom: "15px",
      textTransform: "uppercase",
    };

    const pTitle: CSSProperties = {
      fontSize: "40px",
      fontWeight: 700,
    };

    const pSub: CSSProperties = {
      fontSize: "20px",
      color: "#9b9b9b",
      marginTop: "5px",
      fontWeight: 300,
    };

    const btn: CSSProperties = {
      marginTop: "30px",
      padding: "12px 25px",
      border: "1px solid #fff",
      background: "transparent",
      color: "#fff",
      fontSize: "14px",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
    };

    const imgBox: CSSProperties = {
      width: "50%",
    };

    const imgStyle: CSSProperties = {
      width: "100%",
      height: "auto",
      border: "1px solid #555",
    };

    return (
      <section style={section}>
        <div style={container}>
          <h2 style={title}>{sectionTitle}</h2>

          {/* PROJECT 1 */}
          <div style={row}>
            <div style={textBox}>
              <div style={tag}>{project1Tag}</div>
              <h3 style={pTitle}>{project1Title}</h3>
              <div style={pSub}>{project1Sub}</div>
              <button style={btn}>{project1Button}</button>
            </div>

            <div style={imgBox}>
              <img src={project1Image} alt="project 1" style={imgStyle} />
            </div>
          </div>

          {/* PROJECT 2 */}
          <div style={{ ...row, flexDirection: "row-reverse" }}>
            <div style={textBox}>
              <div style={tag}>{project2Tag}</div>
              <h3 style={pTitle}>{project2Title}</h3>
              <div style={pSub}>{project2Sub}</div>
              <button style={btn}>{project2Button}</button>
            </div>

            <div style={imgBox}>
              <img src={project2Image} alt="project 2" style={imgStyle} />
            </div>
          </div>
        </div>
      </section>
    );
  },
};

