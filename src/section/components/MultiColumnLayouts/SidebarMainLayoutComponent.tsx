import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { SidebarMainLayout } from "@/section/MultiColumnLayouts";

// Type for the block data from Payload CMS
type SidebarMainLayoutBlockProps = {
  blockType: "sidebarMainLayout";
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg";
  sidebar?: any[];
  mainContent?: any[];
  className?: string;
};

export const SidebarMainLayoutComponent: React.FC<SidebarMainLayoutBlockProps> = ({
  backgroundColor = "white",
  padding = "md",
  gap = "md",
  sidebar = [],
  mainContent = [],
  className,
}) => {
  // Render each section's blocks
  const renderedContent = [
    <div key="sidebar">{sidebar && <RenderBlocks blocks={sidebar} />}</div>,
    <div key="main">{mainContent && <RenderBlocks blocks={mainContent} />}</div>,
  ];

  return (
    <SidebarMainLayout
      backgroundColor={backgroundColor}
      padding={padding}
      gap={gap}
      content={renderedContent}
      className={className}
    />
  );
};

