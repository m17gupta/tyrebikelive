import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { TwoThirdsOneThird } from "@/section/OffsetColumns";

// Type for the block data from Payload CMS
type TwoThirdsOneThirdBlockProps = {
  blockType: "twoThirdsOneThird";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  leftColumn?: any[];
  rightColumn?: any[];
  className?: string;
};

export const TwoThirdsOneThirdComponent: React.FC<TwoThirdsOneThirdBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  leftColumn = [],
  rightColumn = [],
  className,
}) => {
  return (
    <TwoThirdsOneThird
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      leftColumn={leftColumn && <RenderBlocks blocks={leftColumn} />}
      rightColumn={rightColumn && <RenderBlocks blocks={rightColumn} />}
      className={className}
    />
  );
};

