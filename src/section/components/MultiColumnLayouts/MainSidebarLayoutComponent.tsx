import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { MainSidebarLayout } from "@/section/MultiColumnLayouts";

// Type for the block data from Payload CMS
type MainSidebarLayoutBlockProps = {
  blockType: "mainSidebarLayout";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  mainContent?: any[];
  sidebar?: any[];
  className?: string;
};

export const MainSidebarLayoutComponent: React.FC<MainSidebarLayoutBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  mainContent = [],
  sidebar = [],
  className,
}) => {
  // Render each section's blocks
  const renderedContent = [
    <div key="main">{mainContent && <RenderBlocks blocks={mainContent} />}</div>,
    <div key="sidebar">{sidebar && <RenderBlocks blocks={sidebar} />}</div>,
  ];

  return (
    <MainSidebarLayout
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      content={renderedContent}
      className={className}
    />
  );
};

