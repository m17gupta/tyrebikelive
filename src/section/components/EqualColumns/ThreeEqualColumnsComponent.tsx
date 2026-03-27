import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { ThreeEqualColumns } from "@/section/EqualColumns";

// Type for the block data from Payload CMS
type ThreeEqualColumnsBlockProps = {
  blockType: "threeEqualColumns";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  leftColumn?: any[];
  centerColumn?: any[];
  rightColumn?: any[];
  className?: string;
};

export const ThreeEqualColumnsComponent: React.FC<ThreeEqualColumnsBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  leftColumn = [],
  centerColumn = [],
  rightColumn = [],
  className,
}) => {
  // Render each column's blocks
  const renderedColumns = [
    <div key="left">{leftColumn && <RenderBlocks blocks={leftColumn} />}</div>,
    <div key="center">{centerColumn && <RenderBlocks blocks={centerColumn} />}</div>,
    <div key="right">{rightColumn && <RenderBlocks blocks={rightColumn} />}</div>,
  ];

  return (
    <ThreeEqualColumns
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      columns={renderedColumns}
      className={className}
    />
  );
};

