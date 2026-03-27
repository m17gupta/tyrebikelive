"use client";

// Client-side script to handle visual editing for nested blocks
export const initializeVisualEditing = () => {
  // Check if we're in draft mode
  const isDraftMode = document.querySelector('[data-visual-editing="true"]');

  if (!isDraftMode) return;

  // Add click handlers for nested blocks
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const blockElement = target.closest('.nested-block-wrapper[data-visual-editing="true"]');

    if (blockElement) {
      e.preventDefault();
      e.stopPropagation();

      const blockType = blockElement.getAttribute("data-block-type");
      const blockId = blockElement.getAttribute("data-block-id");

      if (blockId && blockType) {
        // Open the admin panel for this specific block
        const adminUrl = process.env.NEXT_PUBLIC_SERVER_URL || window.location.origin;

        // For nested blocks, we'll need to navigate to the parent page and highlight the specific block
        // Since nested blocks don't have direct edit URLs, we'll edit the parent page
        let editUrl;

        // Try to determine the collection based on block type
        if (
          blockType === "story" ||
          blockType === "timeline" ||
          blockType === "values" ||
          blockType === "team" ||
          blockType === "stats" ||
          blockType === "culture" ||
          blockType === "cta" ||
          blockType === "missionVision"
        ) {
          // These are nested blocks within an aboutPage block
          // We need to edit the parent page
          editUrl = `${adminUrl}/admin/collections/pages`;
        } else {
          // For other blocks, try to edit them directly
          editUrl = `${adminUrl}/admin/collections/pages/${blockId}`;
        }

        window.open(editUrl, "_blank");
      }
    }
  });

  // Add visual feedback for hoverable elements
  const style = document.createElement("style");
  style.textContent = `
    .nested-block-wrapper[data-visual-editing="true"] {
      cursor: pointer;
    }
    
    .nested-block-wrapper[data-visual-editing="true"]:hover {
      outline: 2px dashed #3b82f6 !important;
      outline-offset: 2px;
      background-color: rgba(59, 130, 246, 0.05) !important;
      border-radius: 4px;
    }
  `;

  document.head.appendChild(style);
};

// Initialize when DOM is ready
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeVisualEditing);
  } else {
    initializeVisualEditing();
  }
}

