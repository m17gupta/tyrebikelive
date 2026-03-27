"use client";

import React, { useState, useEffect } from "react";
import { X, Edit3, Settings, Eye, EyeOff, Plus, Save } from "lucide-react";

interface VisualEditingToolbarProps {
  pageId?: string;
  pageSlug?: string;
}

export const VisualEditingToolbar: React.FC<VisualEditingToolbarProps> = ({ pageId, pageSlug }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkDraftMode = async () => {
      try {
        const response = await fetch("/api/draft-mode-status");
        const data: { isEnabled: boolean } = await response.json();
        setIsDraft(data.isEnabled);
        setIsVisible(data.isEnabled);

        // Show helpful message when entering visual edit mode
        if (data.isEnabled && !sessionStorage.getItem("visual-edit-guide-shown")) {
          setTimeout(() => {
            const guide = document.createElement("div");
            guide.style.cssText = `
              position: fixed;
              top: 80px;
              right: 20px;
              background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
              color: white;
              padding: 20px;
              border-radius: 12px;
              z-index: 10001;
              box-shadow: 0 8px 32px rgba(0,0,0,0.2);
              max-width: 320px;
              font-size: 14px;
              line-height: 1.5;
              animation: fadeInScale 0.3s ease-out;
            `;
            guide.innerHTML = `
              <div style="display: flex; align-items: start; gap: 12px;">
                <span style="font-size: 24px;">✨</span>
                <div>
                  <h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">Visual Editing Active!</h4>
                  <p style="margin: 0 0 12px; opacity: 0.9;">Hover over content to edit:</p>
                  <ul style="margin: 0 0 16px; padding-left: 16px; opacity: 0.9;">
                    <li>Hover over text to see edit button</li>
                    <li>Click edit button for inline editing</li>
                    <li>Blue outlines show editable areas</li>
                  </ul>
                  <button id="guide-close" style="
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    cursor: pointer;
                    float: right;
                  ">Got it!</button>
                </div>
              </div>
            `;
            document.body.appendChild(guide);

            guide.querySelector("#guide-close")?.addEventListener("click", () => {
              guide.remove();
              sessionStorage.setItem("visual-edit-guide-shown", "true");
            });

            setTimeout(() => {
              if (guide.parentNode) {
                guide.remove();
                sessionStorage.setItem("visual-edit-guide-shown", "true");
              }
            }, 8000);
          }, 1000);
        }
      } catch (error) {
        console.log("Could not check draft mode status:", error);
      }
    };
    void checkDraftMode();
  }, []);

  const handleExitPreview = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/exit-preview");
      window.location.reload();
    } catch (error) {
      console.error("Failed to exit preview:", error);
    }
    setIsLoading(false);
  };

  const handleOpenAdmin = () => {
    const adminUrl = process.env.NEXT_PUBLIC_SERVER_URL || window.location.origin;
    const editUrl = pageId
      ? `${adminUrl}/admin/collections/pages/${pageId}`
      : `${adminUrl}/admin/collections/pages`;

    window.open(editUrl, "_blank");
  };

  const handleAddBlock = () => {
    // This would typically open a modal or sidebar to add blocks
    console.log("Add block functionality would go here");
  };

  const handleSave = () => {
    // This would save the current page
    console.log("Save functionality would go here");
  };

  if (!isVisible || !isDraft) {
    return null;
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-[9999] flex items-center gap-1 rounded-lg border border-gray-300 bg-white shadow-xl backdrop-blur-sm">
        {/* Preview Mode Indicator */}
        <div className="flex items-center gap-2 rounded-l-lg border-r border-gray-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600">
          <Eye size={14} className="text-blue-500" />
          <div className="flex flex-col">
            <span>Visual Edit Mode</span>
            {pageSlug && <span className="text-gray-500">/{pageSlug}</span>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center">
          <button
            onClick={handleOpenAdmin}
            className="p-2 text-gray-600 transition-all hover:scale-105 hover:bg-gray-100 hover:text-blue-600"
            title="Edit in Admin Panel"
          >
            <Edit3 size={16} />
          </button>

          <button
            onClick={handleAddBlock}
            className="p-2 text-gray-600 transition-all hover:scale-105 hover:bg-gray-100 hover:text-green-600"
            title="Add New Block"
          >
            <Plus size={16} />
          </button>

          <button
            onClick={handleSave}
            className="p-2 text-gray-600 transition-all hover:scale-105 hover:bg-gray-100 hover:text-purple-600"
            title="Save Changes"
          >
            <Save size={16} />
          </button>

          {/* Divider */}
          <div className="mx-1 h-6 w-px bg-gray-200" />

          <button
            onClick={handleExitPreview}
            disabled={isLoading}
            className="rounded-r-lg p-2 text-gray-600 transition-all hover:scale-105 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            title="Exit Visual Edit Mode"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-red-500" />
            ) : (
              <EyeOff size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Visual Editing Guide */}
      <div className="fixed top-20 right-4 z-[9998] max-w-sm rounded-lg border border-gray-200 bg-white p-4 text-sm shadow-lg">
        <div className="flex items-start gap-2">
          <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
          <div>
            <p className="mb-1 font-medium text-gray-800">Visual Edit Mode Active</p>
            <p className="text-xs text-gray-600">
              Hover over content blocks to see edit options. Click the "Edit" button to modify content in the
              admin panel.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisualEditingToolbar;

