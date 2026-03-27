"use client";

import React from "react";
import { cn } from "@/utilities/cn";

// Text Block Interface
interface TextBlockProps {
  heading?: string;
  subheading?: string;
  content?: string | React.ReactNode;
  alignment?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "featured" | "minimal" | "accent";
  className?: string;
  children?: React.ReactNode;
}

// Text Block Component
export const TextBlock: React.FC<TextBlockProps> = ({
  heading,
  subheading,
  content,
  alignment = "left",
  size = "md",
  variant = "default",
  className,
  children,
}) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const sizeClasses = {
    sm: {
      heading: "text-lg",
      subheading: "text-sm",
      content: "text-sm",
    },
    md: {
      heading: "text-2xl",
      subheading: "text-base",
      content: "text-base",
    },
    lg: {
      heading: "text-3xl",
      subheading: "text-lg",
      content: "text-lg",
    },
    xl: {
      heading: "text-4xl",
      subheading: "text-xl",
      content: "text-xl",
    },
  };

  const variantClasses = {
    default: {
      container: "bg-white p-6",
      heading: "text-gray-900 font-bold",
      subheading: "text-gray-600 font-medium",
      content: "text-gray-700",
    },
    featured: {
      container: "bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg",
      heading: "text-blue-900 font-bold",
      subheading: "text-blue-700 font-medium",
      content: "text-blue-800",
    },
    minimal: {
      container: "bg-transparent p-0",
      heading: "text-gray-900 font-semibold",
      subheading: "text-gray-500 font-normal",
      content: "text-gray-600",
    },
    accent: {
      container: "bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500",
      heading: "text-gray-900 font-bold",
      subheading: "text-gray-600 font-medium",
      content: "text-gray-700",
    },
  };

  return (
    <div className={cn(variantClasses[variant].container, alignmentClasses[alignment], className)}>
      {/* Heading */}
      {heading && (
        <h2 className={cn(sizeClasses[size].heading, variantClasses[variant].heading, "mb-2")}>{heading}</h2>
      )}

      {/* Subheading */}
      {subheading && (
        <h3 className={cn(sizeClasses[size].subheading, variantClasses[variant].subheading, "mb-4")}>
          {subheading}
        </h3>
      )}

      {/* Content */}
      {content && (
        <div className={cn(sizeClasses[size].content, variantClasses[variant].content, "mb-4")}>
          {typeof content === "string" ? <p>{content}</p> : content}
        </div>
      )}

      {/* Custom Children */}
      {children && (
        <div className={cn(sizeClasses[size].content, variantClasses[variant].content)}>{children}</div>
      )}
    </div>
  );
};

export default TextBlock;

