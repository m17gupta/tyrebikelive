import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { TwoRowsThreeColumns } from "@/section/MultiRowColumns";

// Type for the block data from Payload CMS
type TwoRowsThreeColumnsBlockProps = {
  blockType: "twoRowsThreeColumns";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  rows?: { columns?: { blocks?: any[] }[] }[];
  className?: string;
};

export const TwoRowsThreeColumnsComponent: React.FC<TwoRowsThreeColumnsBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  rows = [],
  className,
}) => {
  // Render each row's columns
  const renderedRows = rows
    .slice(0, 2)
    .map((row) =>
      (row.columns || [])
        .slice(0, 3)
        .map((column, colIndex) => (
          <div key={colIndex}>{column.blocks && <RenderBlocks blocks={column.blocks} />}</div>
        )),
    );

  return (
    <TwoRowsThreeColumns
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      rows={renderedRows}
      className={className}
    />
  );
};

