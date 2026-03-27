import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { TwoEqualColumns } from "@/section/EqualColumns";

// Type for the block data from Payload CMS
type TwoEqualColumnsBlockProps = {
  blockType: "twoEqualColumns";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  leftColumn?: any[];
  rightColumn?: any[];
  className?: string;
};

export const TwoEqualColumnsComponent: React.FC<TwoEqualColumnsBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  leftColumn = [],
  rightColumn = [],
  className,
}) => {
  // Render each column's blocks
  const renderedColumns = [
    <div key="left">{leftColumn && <RenderBlocks blocks={leftColumn} />}</div>,
    <div key="right">
      {rightColumn && <RenderBlocks blocks={rightColumn} />}
    </div>,
  ];

  return (
    <TwoEqualColumns
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      columns={renderedColumns}
      className={className}
    />
  );
};

