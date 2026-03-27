import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { MasonryLayout } from "@/section/MultiColumnLayouts";

// Type for the block data from Payload CMS
type MasonryLayoutBlockProps = {
  blockType: "masonryLayout";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  items?: { blocks?: any[] }[];
  className?: string;
};

export const MasonryLayoutComponent: React.FC<MasonryLayoutBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  items = [],
  className,
}) => {
  // Render each item's blocks
  const renderedContent = items.map((item, index) => (
    <div key={index}>{item.blocks && <RenderBlocks blocks={item.blocks} />}</div>
  ));

  return (
    <MasonryLayout
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      content={renderedContent}
      className={className}
    />
  );
};

