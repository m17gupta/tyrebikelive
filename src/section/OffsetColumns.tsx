"use client";

import React from "react";
import { cn } from "@/utilities/cn";
import { BaseSection, BaseSectionProps } from "./BaseSection";

// Offset Columns Interface
interface OffsetColumnsProps extends Omit<BaseSectionProps, "children"> {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  gap?: "sm" | "md" | "lg";
  children?: never;
}

// Two Thirds - One Third Layout (2/3 - 1/3)
export const TwoThirdsOneThird: React.FC<OffsetColumnsProps> = ({
  leftColumn,
  rightColumn,
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
      <div className={cn("grid grid-cols-1 lg:grid-cols-3", gapClasses[gap])}>
        <div className="lg:col-span-2">{leftColumn}</div>
        <div className="lg:col-span-1">{rightColumn}</div>
      </div>
    </BaseSection>
  );
};

// One Third - Two Thirds Layout (1/3 - 2/3)
export const OneThirdTwoThirds: React.FC<OffsetColumnsProps> = ({
  leftColumn,
  rightColumn,
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
      <div className={cn("grid grid-cols-1 lg:grid-cols-3", gapClasses[gap])}>
        <div className="lg:col-span-1">{leftColumn}</div>
        <div className="lg:col-span-2">{rightColumn}</div>
      </div>
    </BaseSection>
  );
};

// One Quarter - Three Quarters Layout (1/4 - 3/4)
export const OneQuarterThreeQuarters: React.FC<OffsetColumnsProps> = ({
  leftColumn,
  rightColumn,
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
      <div className={cn("grid grid-cols-1 lg:grid-cols-4", gapClasses[gap])}>
        <div className="lg:col-span-1">{leftColumn}</div>
        <div className="lg:col-span-3">{rightColumn}</div>
      </div>
    </BaseSection>
  );
};

// Three Quarters - One Quarter Layout (3/4 - 1/4)
export const ThreeQuartersOneQuarter: React.FC<OffsetColumnsProps> = ({
  leftColumn,
  rightColumn,
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
      <div className={cn("grid grid-cols-1 lg:grid-cols-4", gapClasses[gap])}>
        <div className="lg:col-span-3">{leftColumn}</div>
        <div className="lg:col-span-1">{rightColumn}</div>
      </div>
    </BaseSection>
  );
};

// Offset Two Columns - Small Left, Large Right
export const OffsetSmallLeft: React.FC<OffsetColumnsProps> = ({
  leftColumn,
  rightColumn,
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
      <div className={cn("grid grid-cols-1 md:grid-cols-5", gapClasses[gap])}>
        <div className="md:col-span-2">{leftColumn}</div>
        <div className="md:col-span-3">{rightColumn}</div>
      </div>
    </BaseSection>
  );
};

// Offset Two Columns - Large Left, Small Right
export const OffsetSmallRight: React.FC<OffsetColumnsProps> = ({
  leftColumn,
  rightColumn,
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
      <div className={cn("grid grid-cols-1 md:grid-cols-5", gapClasses[gap])}>
        <div className="md:col-span-3">{leftColumn}</div>
        <div className="md:col-span-2">{rightColumn}</div>
      </div>
    </BaseSection>
  );
};

const OffsetColumnsComponents = {
  TwoThirdsOneThird,
  OneThirdTwoThirds,
  OneQuarterThreeQuarters,
  ThreeQuartersOneQuarter,
  OffsetSmallLeft,
  OffsetSmallRight,
};

export default OffsetColumnsComponents;

