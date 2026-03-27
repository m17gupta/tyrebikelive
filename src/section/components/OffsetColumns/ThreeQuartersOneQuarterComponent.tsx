import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { ThreeQuartersOneQuarter } from "@/section/OffsetColumns";

// Type for the block data from Payload CMS
type ThreeQuartersOneQuarterBlockProps = {
  blockType: "threeQuartersOneQuarter";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  leftColumn?: any[];
  rightColumn?: any[];
  className?: string;
};

export const ThreeQuartersOneQuarterComponent: React.FC<ThreeQuartersOneQuarterBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  leftColumn = [],
  rightColumn = [],
  className,
}) => {
  return (
    <ThreeQuartersOneQuarter
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      leftColumn={leftColumn && <RenderBlocks blocks={leftColumn} />}
      rightColumn={rightColumn && <RenderBlocks blocks={rightColumn} />}
      className={className}
    />
  );
};

