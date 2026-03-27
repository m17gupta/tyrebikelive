"use client";

import React from "react";
import { cn } from "@/utilities/cn";

// Base Section Container Interface
export interface BaseSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

// Base Section Component
export const BaseSection: React.FC<BaseSectionProps> = ({
  children,
  className,
  id,
  backgroundColor = "white",
  padding = "md",
}) => {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8 px-4",
    md: "py-12 px-6",
    lg: "py-16 px-8",
    xl: "py-20 px-10",
  };

  return (
    <section id={id} className={cn("w-full", bgClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
};

export default BaseSection;

