"use client";

import React from "react";
import { cn } from "@/utilities/cn";
import { BaseSection, BaseSectionProps } from "./BaseSection";

// Equal Columns Interface
interface EqualColumnsProps extends Omit<BaseSectionProps, "children"> {
  columns: React.ReactNode[];
  gap?: "sm" | "md" | "lg";
  children?: never;
}

// Two Equal Columns Component
export const TwoEqualColumns: React.FC<EqualColumnsProps> = ({ columns, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("grid grid-cols-1 md:grid-cols-2", gapClasses[gap])}>
        {columns.slice(0, 2).map((column, index) => (
          <div key={index} className="flex-1">
            {column}
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

// Three Equal Columns Component
export const ThreeEqualColumns: React.FC<EqualColumnsProps> = ({ columns, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", gapClasses[gap])}>
        {columns.slice(0, 3).map((column, index) => (
          <div key={index} className="flex-1">
            {column}
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

// Four Equal Columns Component
export const FourEqualColumns: React.FC<EqualColumnsProps> = ({ columns, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", gapClasses[gap])}>
        {columns.slice(0, 4).map((column, index) => (
          <div key={index} className="flex-1">
            {column}
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

// Five Equal Columns Component
export const FiveEqualColumns: React.FC<EqualColumnsProps> = ({ columns, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5", gapClasses[gap])}>
        {columns.slice(0, 5).map((column, index) => (
          <div key={index} className="flex-1">
            {column}
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

// Six Equal Columns Component
export const SixEqualColumns: React.FC<EqualColumnsProps> = ({ columns, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6", gapClasses[gap])}>
        {columns.slice(0, 6).map((column, index) => (
          <div key={index} className="flex-1">
            {column}
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

const EqualColumnsComponents = {
  TwoEqualColumns,
  ThreeEqualColumns,
  FourEqualColumns,
  FiveEqualColumns,
  SixEqualColumns,
};

export default EqualColumnsComponents;

