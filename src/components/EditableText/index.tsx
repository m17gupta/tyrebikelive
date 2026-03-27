"use client";

import React from "react";

interface EditableTextProps {
  children: React.ReactNode;
  fieldPath: string;
  className?: string;
  as?: React.ElementType;
}

/**
 * Wrapper component for making text editable in visual editing mode.
 * Usage: <EditableText fieldPath="layout.0.blocks.0.heading" as="h2">Your Text</EditableText>
 */
export function EditableText({ children, fieldPath, className = "", as = "div" }: EditableTextProps) {
  const Component = as;

  return (
    <Component className={className} data-editable-field={fieldPath}>
      {children}
    </Component>
  );
}

