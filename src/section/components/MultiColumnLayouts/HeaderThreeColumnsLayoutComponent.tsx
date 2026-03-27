import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { HeaderThreeColumnsLayout } from "@/section/MultiColumnLayouts";

// Type for the block data from Payload CMS
type HeaderThreeColumnsLayoutBlockProps = {
  blockType: "headerThreeColumnsLayout";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  header?: any[];
  columns?: { blocks?: any[] }[];
  className?: string;
};

export const HeaderThreeColumnsLayoutComponent: React.FC<HeaderThreeColumnsLayoutBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  header = [],
  columns = [],
  className,
}) => {
  // Render header and columns
  const renderedContent = [
    <div key="header">{header && <RenderBlocks blocks={header} />}</div>,
    ...columns
      .slice(0, 3)
      .map((column, index) => (
        <div key={`col-${index}`}>{column.blocks && <RenderBlocks blocks={column.blocks} />}</div>
      )),
  ];

  return (
    <HeaderThreeColumnsLayout
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      content={renderedContent}
      className={className}
    />
  );
};

