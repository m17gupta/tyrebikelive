"use client";

import React from "react";
import { cn } from "@/utilities/cn";
import { BaseSection, BaseSectionProps } from "./BaseSection";

// Multi-Column Complex Layouts Interface
interface ComplexLayoutProps extends Omit<BaseSectionProps, "children"> {
  content: React.ReactNode[];
  gap?: "sm" | "md" | "lg";
  children?: never;
}

// Sidebar + Main Content Layout (Left Sidebar)
export const SidebarMainLayout: React.FC<ComplexLayoutProps> = ({ content, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("grid grid-cols-1 lg:grid-cols-4", gapClasses[gap])}>
        {/* Left Sidebar */}
        <div className="lg:col-span-1">{content[0]}</div>
        {/* Main Content */}
        <div className="lg:col-span-3">{content[1]}</div>
      </div>
    </BaseSection>
  );
};

// Main Content + Sidebar Layout (Right Sidebar)
export const MainSidebarLayout: React.FC<ComplexLayoutProps> = ({ content, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("grid grid-cols-1 lg:grid-cols-4", gapClasses[gap])}>
        {/* Main Content */}
        <div className="lg:col-span-3">{content[0]}</div>
        {/* Right Sidebar */}
        <div className="lg:col-span-1">{content[1]}</div>
      </div>
    </BaseSection>
  );
};

// Header + Two Columns Layout
export const HeaderTwoColumnsLayout: React.FC<ComplexLayoutProps> = ({
  content,
  gap = "md",
  ...sectionProps
}) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("space-y-6")}>
        {/* Header Section */}
        <div className="w-full">{content[0]}</div>
        {/* Two Columns Below */}
        <div className={cn("grid grid-cols-1 md:grid-cols-2", gapClasses[gap])}>
          <div>{content[1]}</div>
          <div>{content[2]}</div>
        </div>
      </div>
    </BaseSection>
  );
};

// Header + Three Columns Layout
export const HeaderThreeColumnsLayout: React.FC<ComplexLayoutProps> = ({
  content,
  gap = "md",
  ...sectionProps
}) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("space-y-6")}>
        {/* Header Section */}
        <div className="w-full">{content[0]}</div>
        {/* Three Columns Below */}
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", gapClasses[gap])}>
          <div>{content[1]}</div>
          <div>{content[2]}</div>
          <div>{content[3]}</div>
        </div>
      </div>
    </BaseSection>
  );
};

// Two Columns + Footer Layout
export const TwoColumnsFooterLayout: React.FC<ComplexLayoutProps> = ({
  content,
  gap = "md",
  ...sectionProps
}) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("space-y-6")}>
        {/* Two Columns */}
        <div className={cn("grid grid-cols-1 md:grid-cols-2", gapClasses[gap])}>
          <div>{content[0]}</div>
          <div>{content[1]}</div>
        </div>
        {/* Footer Section */}
        <div className="w-full">{content[2]}</div>
      </div>
    </BaseSection>
  );
};

// Masonry/Pinterest Style Layout
export const MasonryLayout: React.FC<ComplexLayoutProps> = ({ content, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("columns-1 md:columns-2 lg:columns-3 xl:columns-4", gapClasses[gap])}>
        {content.map((item, index) => (
          <div key={index} className="mb-4 break-inside-avoid">
            {item}
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

// Center Content with Side Panels
export const CenterWithSidePanels: React.FC<ComplexLayoutProps> = ({
  content,
  gap = "md",
  ...sectionProps
}) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("grid grid-cols-1 lg:grid-cols-5", gapClasses[gap])}>
        {/* Left Panel */}
        <div className="lg:col-span-1">{content[0]}</div>
        {/* Center Content */}
        <div className="lg:col-span-3">{content[1]}</div>
        {/* Right Panel */}
        <div className="lg:col-span-1">{content[2]}</div>
      </div>
    </BaseSection>
  );
};

const MultiColumnLayoutComponents = {
  SidebarMainLayout,
  MainSidebarLayout,
  HeaderTwoColumnsLayout,
  HeaderThreeColumnsLayout,
  TwoColumnsFooterLayout,
  MasonryLayout,
  CenterWithSidePanels,
};

export default MultiColumnLayoutComponents;

