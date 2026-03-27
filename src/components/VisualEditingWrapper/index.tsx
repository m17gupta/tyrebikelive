"use client";

import React, { useState } from "react";

interface VisualEditingWrapperProps {
  children: React.ReactNode;
  blockType: string;
  blockId?: string;
  docId?: string;
  collection?: string;
  field?: string;
  className?: string;
  isInlineEditable?: boolean;
}

export const VisualEditingWrapper: React.FC<VisualEditingWrapperProps> = ({
  children,
  blockType,
  blockId,
  docId,
  collection = "pages",
  field = "layout",
  className = "",
  isInlineEditable = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  // Check if we're in draft mode on client side
  React.useEffect(() => {
    const checkDraftMode = async () => {
      try {
        const response = await fetch("/api/draft-mode-status");
        const data: { isEnabled: boolean } = await response.json();
        setIsDraft(data.isEnabled);
      } catch (error) {
        console.log("Could not check draft mode status:", error);
      }
    };
    void checkDraftMode();
  }, []);

  const handleEdit = () => {
    if (!isDraft) return;

    const adminUrl = process.env.NEXT_PUBLIC_SERVER_URL || window.location.origin;

    // If we have a blockId, edit the specific block, otherwise edit the page
    if (blockId) {
      const editUrl = `${adminUrl}/admin/collections/${collection}/${blockId}`;
      window.open(editUrl, "_blank");
    } else {
      // For blocks without specific IDs, we'll try to edit the page's layout
      const pageEditUrl = `${adminUrl}/admin/collections/pages`;
      window.open(pageEditUrl, "_blank");
    }
  };

  const wrapperStyle = isDraft
    ? {
        position: "relative" as const,
        // Remove focus/hover outline to avoid external preview/highlight artifacts
        outline: "none",
        // keep a small transition for any subtle style changes
        transition: "all 0.2s ease-in-out",
        // cursor: isInlineEditable ? "text" : "pointer", Removed to avoid conflict with drag handles
        borderRadius: "4px",
      }
    : {};

  const labelStyle =
    isDraft && isHovered
      ? {
          position: "absolute" as const,
          top: "-12px",
          left: "0",
          backgroundColor: "#3b82f6",
          color: "white",
          padding: "4px 8px",
          fontSize: "11px",
          fontWeight: "600" as const,
          borderRadius: "4px",
          textTransform: "uppercase" as const,
          zIndex: 1000,
          pointerEvents: "none" as const,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          letterSpacing: "0.5px",
        }
      : { display: "none" };

  return (
    <div
      className={`visual-editing-block ${className}`}
      style={wrapperStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-block-type={blockType}
      data-collection={collection}
      data-field={field}
      data-block-id={blockId}
      data-doc-id={docId}
      data-visual-editing={isDraft}
      data-inline-editable={isInlineEditable}
    >
      <div style={labelStyle}>{blockType}</div>
      {children}
    </div>
  );
};

export default VisualEditingWrapper;

