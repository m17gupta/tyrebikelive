"use client";

import React from "react";
import { cn } from "@/utilities/cn";
import { BaseSection, BaseSectionProps } from "./BaseSection";

// Multi-Row Interface
interface MultiRowProps extends Omit<BaseSectionProps, "children"> {
  rows: React.ReactNode[][];
  gap?: "sm" | "md" | "lg";
  children?: never;
}

// Two Rows of Two Columns Each
export const TwoRowsTwoColumns: React.FC<MultiRowProps> = ({ rows, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("space-y-6")}>
        {rows.slice(0, 2).map((row, rowIndex) => (
          <div key={rowIndex} className={cn("grid grid-cols-1 md:grid-cols-2", gapClasses[gap])}>
            {row.slice(0, 2).map((column, colIndex) => (
              <div key={colIndex}>{column}</div>
            ))}
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

// Two Rows of Three Columns Each
export const TwoRowsThreeColumns: React.FC<MultiRowProps> = ({ rows, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("space-y-6")}>
        {rows.slice(0, 2).map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", gapClasses[gap])}
          >
            {row.slice(0, 3).map((column, colIndex) => (
              <div key={colIndex}>{column}</div>
            ))}
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

// Three Rows of Two Columns Each
export const ThreeRowsTwoColumns: React.FC<MultiRowProps> = ({ rows, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("space-y-6")}>
        {rows.slice(0, 3).map((row, rowIndex) => (
          <div key={rowIndex} className={cn("grid grid-cols-1 md:grid-cols-2", gapClasses[gap])}>
            {row.slice(0, 2).map((column, colIndex) => (
              <div key={colIndex}>{column}</div>
            ))}
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

// Three Rows of Three Columns Each
export const ThreeRowsThreeColumns: React.FC<MultiRowProps> = ({ rows, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("space-y-6")}>
        {rows.slice(0, 3).map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", gapClasses[gap])}
          >
            {row.slice(0, 3).map((column, colIndex) => (
              <div key={colIndex}>{column}</div>
            ))}
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

// Two Rows of Four Columns Each
export const TwoRowsFourColumns: React.FC<MultiRowProps> = ({ rows, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("space-y-6")}>
        {rows.slice(0, 2).map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", gapClasses[gap])}
          >
            {row.slice(0, 4).map((column, colIndex) => (
              <div key={colIndex}>{column}</div>
            ))}
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

// Three Rows of Four Columns Each
export const ThreeRowsFourColumns: React.FC<MultiRowProps> = ({ rows, gap = "md", ...sectionProps }) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <BaseSection {...sectionProps}>
      <div className={cn("space-y-6")}>
        {rows.slice(0, 3).map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", gapClasses[gap])}
          >
            {row.slice(0, 4).map((column, colIndex) => (
              <div key={colIndex}>{column}</div>
            ))}
          </div>
        ))}
      </div>
    </BaseSection>
  );
};

const MultiRowColumnsComponents = {
  TwoRowsTwoColumns,
  TwoRowsThreeColumns,
  ThreeRowsTwoColumns,
  ThreeRowsThreeColumns,
  TwoRowsFourColumns,
  ThreeRowsFourColumns,
};

export default MultiRowColumnsComponents;

