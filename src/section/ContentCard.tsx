"use client";

import React from "react";
import { cn } from "@/utilities/cn";
import Image from "next/image";

// Content Card Interface
interface ContentCardProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  button?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline";
  };
  variant?: "default" | "featured" | "minimal" | "image-top" | "card" | "bordered";
  className?: string;
  children?: React.ReactNode;
}

// Content Card Component
export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  image,
  imageAlt = "",
  button,
  variant = "default",
  className,
  children,
}) => {
  const variants = {
    default: "bg-white p-6",
    featured: "bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-lg p-8 shadow-lg",
    minimal: "bg-transparent p-4",
    "image-top": "bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm",
    card: "bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow",
    bordered: "bg-white border-2 border-gray-300 rounded-lg p-6",
  };

  const buttonVariants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <div className={cn(variants[variant], className)}>
      {/* Image */}
      {image && (
        <div className={cn("mb-4", variant === "image-top" ? "-m-6 mb-4" : "")}>
          <Image
            src={image}
            alt={imageAlt}
            width={400}
            height={200}
            className={cn(
              "w-full object-cover",
              variant === "image-top" ? "h-48 rounded-t-lg" : "h-32 rounded-lg",
            )}
          />
        </div>
      )}

      {/* Content */}
      <div className={cn(variant === "image-top" ? "p-6" : "")}>
        {title && (
          <h3
            className={cn(
              "mb-2 font-semibold",
              variant === "featured" ? "text-xl text-blue-900" : "text-lg text-gray-900",
            )}
          >
            {title}
          </h3>
        )}

        {description && (
          <p className={cn("mb-4 text-gray-600", variant === "featured" ? "text-blue-800" : "")}>
            {description}
          </p>
        )}

        {/* Custom Children Content */}
        {children && <div className="mb-4">{children}</div>}

        {/* Button */}
        {button && (
          <button
            onClick={button.onClick}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              buttonVariants[button.variant || "primary"],
            )}
          >
            {button.text}
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentCard;

