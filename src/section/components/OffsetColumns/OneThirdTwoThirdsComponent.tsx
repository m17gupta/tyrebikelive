import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { OneThirdTwoThirds } from "@/section/OffsetColumns";

// Type for the block data from Payload CMS
type OneThirdTwoThirdsBlockProps = {
  blockType: "oneThirdTwoThirds";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  leftColumn?: any[];
  rightColumn?: any[];
  className?: string;
};

export const OneThirdTwoThirdsComponent: React.FC<OneThirdTwoThirdsBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  leftColumn = [],
  rightColumn = [],
  className,
}) => {
  return (
    <OneThirdTwoThirds
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      leftColumn={leftColumn && <RenderBlocks blocks={leftColumn} />}
      rightColumn={rightColumn && <RenderBlocks blocks={rightColumn} />}
      className={className}
    />
  );
};

