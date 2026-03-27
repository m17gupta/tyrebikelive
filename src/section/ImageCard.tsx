"use client";

import React from "react";
import { cn } from "@/utilities/cn";
import Image from "next/image";

// Image Card Interface
interface ImageCardProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  overlay?: boolean;
  overlayContent?: React.ReactNode;
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | "auto";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  shadow?: "none" | "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

// Image Card Component
export const ImageCard: React.FC<ImageCardProps> = ({
  src,
  alt,
  title,
  subtitle,
  overlay = false,
  overlayContent,
  aspectRatio = "auto",
  size = "md",
  rounded = "md",
  shadow = "sm",
  className,
  onClick,
}) => {
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    auto: "",
  };

  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
    xl: "w-80 h-80",
    full: "w-full h-full",
  };

  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspectRatio !== "auto" ? aspectRatioClasses[aspectRatio] : sizeClasses[size],
        roundedClasses[rounded],
        shadowClasses[shadow],
        onClick && "cursor-pointer transition-shadow hover:shadow-lg",
        className,
      )}
      onClick={onClick}
    >
      {/* Main Image */}
      <Image
        src={src}
        alt={alt}
        fill={aspectRatio !== "auto"}
        width={aspectRatio === "auto" ? 100 : undefined}
        height={aspectRatio === "auto" ?100 : undefined}
        className={cn("object-cover", aspectRatio !== "auto" ? "absolute inset-0" : "h-auto w-full")}
      />

      {/* Overlay */}
      {overlay && (
        <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black">
          {overlayContent || (
            <div className="p-4 text-center text-white">
              {title && <h3 className="mb-1 text-lg font-semibold">{title}</h3>}
              {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
            </div>
          )}
        </div>
      )}

      {/* Bottom Text (if no overlay) */}
      {!overlay && (title || subtitle) && (
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
          {title && <h3 className="mb-1 text-sm font-semibold">{title}</h3>}
          {subtitle && <p className="text-xs opacity-90">{subtitle}</p>}
        </div>
      )}
    </div>
  );
};

export default ImageCard;

