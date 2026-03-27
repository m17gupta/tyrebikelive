import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { OneQuarterThreeQuarters } from "@/section/OffsetColumns";

// Type for the block data from Payload CMS
type OneQuarterThreeQuartersBlockProps = {
  blockType: "oneQuarterThreeQuarters";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  leftColumn?: any[];
  rightColumn?: any[];
  className?: string;
};

export const OneQuarterThreeQuartersComponent: React.FC<OneQuarterThreeQuartersBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  leftColumn = [],
  rightColumn = [],
  className,
}) => {
  return (
    <OneQuarterThreeQuarters
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      leftColumn={leftColumn && <RenderBlocks blocks={leftColumn} />}
      rightColumn={rightColumn && <RenderBlocks blocks={rightColumn} />}
      className={className}
    />
  );
};

