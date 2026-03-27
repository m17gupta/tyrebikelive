import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { HeaderTwoColumnsLayout } from "@/section/MultiColumnLayouts";

// Type for the block data from Payload CMS
type HeaderTwoColumnsLayoutBlockProps = {
  blockType: "headerTwoColumnsLayout";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  header?: any[];
  leftColumn?: any[];
  rightColumn?: any[];
  className?: string;
};

export const HeaderTwoColumnsLayoutComponent: React.FC<HeaderTwoColumnsLayoutBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  header = [],
  leftColumn = [],
  rightColumn = [],
  className,
}) => {
  // Render each section's blocks
  const renderedContent = [
    <div key="header">{header && <RenderBlocks blocks={header} />}</div>,
    <div key="left">{leftColumn && <RenderBlocks blocks={leftColumn} />}</div>,
    <div key="right">{rightColumn && <RenderBlocks blocks={rightColumn} />}</div>,
  ];

  return (
    <HeaderTwoColumnsLayout
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      content={renderedContent}
      className={className}
    />
  );
};

