import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { SixEqualColumns } from "@/section/EqualColumns";

// Type for the block data from Payload CMS
type SixEqualColumnsBlockProps = {
  blockType: "sixEqualColumns";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  columns?: { blocks?: any[] }[];
  className?: string;
};

export const SixEqualColumnsComponent: React.FC<SixEqualColumnsBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  columns = [],
  className,
}) => {
  // Render each column's blocks
  const renderedColumns = columns
    .slice(0, 6)
    .map((column, index) => (
      <div key={index}>{column.blocks && <RenderBlocks blocks={column.blocks} />}</div>
    ));

  return (
    <SixEqualColumns
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      columns={renderedColumns}
      className={className}
    />
  );
};

