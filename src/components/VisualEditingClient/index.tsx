"use client";

import React, { useEffect } from "react";

interface VisualEditingClientProps {
  pageId?: string;
  collection?: string;
}

export function VisualEditingClient({
  pageId,
  collection = "pages",
}: VisualEditingClientProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkDraftMode = async (): Promise<boolean> => {
      try {
        const response = await fetch("/api/draft-mode-status");
        const data = await response.json();
        // console.log("Visual Editing:", data.isEnabled ? "ACTIVE" : "inactive");
        return data.isEnabled;
      } catch (error) {
        console.error("Visual Editing Error:", error);
        return false;
      }
    };

    const showToast = (message: string, type: "success" | "error") => {
      const toast = document.createElement("div");
      const bgColor = type === "success" ? "#10b981" : "#ef4444";
      toast.style.cssText = `position: fixed; top: 20px; right: 20px; background: ${bgColor}; color: white; padding: 14px 18px; border-radius: 8px; font-size: 14px; font-weight: 500; z-index: 10001; box-shadow: 0 10px 40px rgba(0,0,0,0.3);`;
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    };

    const openInlineEditor = (
      element: HTMLElement,
      blockData: {
        collection: string;
        docId: string;
        field: string;
        currentText: string;
      }
    ) => {
      const existing = document.getElementById("inline-editor-modal");
      if (existing) existing.remove();

      const overlay = document.createElement("div");
      overlay.id = "inline-editor-modal";
      overlay.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 10000; display: flex; align-items: center; justify-content: center;`;

      const modal = document.createElement("div");
      modal.innerHTML = `
        <div style="background: white; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 600px; width: 90%; display: flex; flex-direction: column;">
          <div style="padding: 20px 24px; border-bottom: 1px solid #e5e7eb; background: linear-gradient(to right, #3b82f6, #2563eb); color: white;">
            <h3 style="margin: 0; font-size: 18px; font-weight: 600;">Edit Content</h3>
            <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">${blockData.collection} › ${blockData.field}</p>
          </div>
          <div style="padding: 24px;">
            <textarea id="content-editor" style="width: 100%; min-height: 150px; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; line-height: 1.6; resize: vertical; font-family: inherit;">${blockData.currentText}</textarea>
          </div>
          <div style="padding: 16px 24px; border-top: 1px solid #e5e7eb; display: flex; gap: 12px; justify-content: flex-end; background: #f9fafb;">
            <button id="cancel-btn" style="background: white; color: #374151; border: 1px solid #d1d5db; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;">Cancel</button>
            <button id="save-btn" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;">Save Changes</button>
          </div>
        </div>
      `;

      overlay.appendChild(modal);
      const textarea =
        modal.querySelector<HTMLTextAreaElement>("#content-editor")!;
      const saveBtn = modal.querySelector<HTMLButtonElement>("#save-btn")!;
      const cancelBtn = modal.querySelector<HTMLButtonElement>("#cancel-btn")!;

      const closeModal = () => overlay.remove();

      const saveChanges = async () => {
        const newText = textarea.value.trim();
        if (newText === blockData.currentText) {
          closeModal();
          return;
        }

        element.textContent = newText;
        saveBtn.textContent = "Saving...";
        saveBtn.disabled = true;

        try {
          // Extract block information from the field path
          // Expected format: layout.0.blocks.1.heading or similar
          const fieldParts = blockData.field.split(".");

          // Parse the field path to extract layoutId, blockId, and blockType
          let layoutId: string | undefined;
          let blockId: string | undefined;
          let blockType: string | undefined;
          let actualField = blockData.field;

          // Get layout and block IDs from data attributes if available
          const blockElement = element.closest('[data-visual-editing="true"]');
          if (blockElement) {
            layoutId = blockElement.getAttribute("data-layout-id") || undefined;
            blockId = blockElement.getAttribute("data-block-id") || undefined;
            blockType =
              blockElement.getAttribute("data-block-type") || undefined;

            // Get the actual field name (without the layout/block path)
            const fieldAttr = element.getAttribute("data-editable-field");
            if (fieldAttr) {
              actualField = fieldAttr;
            }
          }

          // Prepare the update request payload
          const updatePayload: any = {
            collection: blockData.collection,
            docId: blockData.docId,
            field: actualField,
            value: newText,
          };

          // Add block-specific parameters if available
          if (blockType && blockId && layoutId) {
            updatePayload.blockType = blockType;
            updatePayload.blockId = blockId;
            updatePayload.layoutId = layoutId;
          }

          console.log("📤 Sending update request:", updatePayload);

          // Step 1: Fetch the entire page with depth=0 to get IDs only
          const fetchResponse = await fetch(
            `/api/${blockData.collection}/${blockData.docId}?depth=0&locale=en`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          if (!fetchResponse.ok) {
            throw new Error("Failed to fetch page data");
          }

          const pageData = await fetchResponse.json();
          console.log("📄 Fetched page data:", pageData);

          // Step 2: Clone the page data
          const updatedData = JSON.parse(JSON.stringify(pageData));

          // Step 3: Find layout and block based on their IDs and update the field
          if (layoutId && blockId && blockType) {
            // Find the layout block by ID
            const layoutBlock = updatedData.layout?.find(
              (lay: any) => lay.id === layoutId
            );

            if (!layoutBlock) {
              throw new Error(`Layout block not found with ID: ${layoutId}`);
            }

            console.log("✅ Found layout block:", layoutBlock);

            // Find the nested block within the layout
            const block = layoutBlock.blocks?.find(
              (b: any) => b.id === blockId && b.blockType === blockType
            );

            if (!block) {
              throw new Error(
                `Block not found with ID: ${blockId} and type: ${blockType}`
              );
            }

            console.log("✅ Found target block:", block);

            // Step 4: Update the respective field
            const fieldParts = actualField.split(".");
            let current = block;

            // Navigate to the field and update it
            for (let i = 0; i < fieldParts.length - 1; i++) {
              const part = fieldParts[i];
              if (!current[part]) {
                current[part] = {};
              }
              current = current[part];
            }

            const lastPart = fieldParts[fieldParts.length - 1];
            current[lastPart] = newText;

            console.log(`✅ Updated field: ${actualField} = "${newText}"`);
          } else {
            // Handle regular field updates (non-block fields)
            const fieldParts = actualField.split(".");
            let current = updatedData;

            for (let i = 0; i < fieldParts.length - 1; i++) {
              const part = fieldParts[i];
              if (!current[part]) {
                current[part] = {};
              }
              current = current[part];
            }

            const lastPart = fieldParts[fieldParts.length - 1];
            current[lastPart] = newText;
          }

          // Remove the 'id' field as it shouldn't be in the PATCH payload
          delete updatedData.id;

          console.log("📦 Prepared data for update:", updatedData);

          // Step 5: Save the updated data back with query parameters
          const saveResponse = await fetch(
            `/api/${blockData.collection}/${blockData.docId}?draft=true&locale=en`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(updatedData),
            }
          );

          const result = await saveResponse.json();

          if (!saveResponse.ok) {
            console.error("Save error:", result);
            throw new Error(
              String(result.error || result.message || "Save failed")
            );
          }

          console.log("✅ Successfully saved:", result);
          showToast("✅ Content saved successfully!", "success");
          closeModal();

          // Reload page to show updated content
          setTimeout(() => window.location.reload(), 800);
        } catch (error) {
          element.textContent = blockData.currentText;
          console.error("Save error:", error);
          showToast("❌ Error saving. Please try again.", "error");
          saveBtn.textContent = "Save Changes";
          saveBtn.disabled = false;
        }
      };

      cancelBtn.addEventListener("click", closeModal);
      saveBtn.addEventListener("click", saveChanges);
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
      });

      document.body.appendChild(overlay);
      setTimeout(() => textarea.focus(), 100);
    };

    const initializeVisualEditing = async () => {
      const isDraftMode = await checkDraftMode();
      if (!isDraftMode) return;

      // console.log("Visual Editing Activated");

      const style = document.createElement("style");
      style.id = "visual-editing-styles";
      style.textContent = `
        [data-visual-editing="true"] {
          position: relative;
          transition: all 0.2s ease;
        }
        [data-visual-editing="true"]:hover {
          outline: 2px dashed #3b82f6;
          outline-offset: 4px;
          background-color: rgba(59, 130, 246, 0.05);
        }
        [data-editable-text="true"] {
          position: relative;
          transition: all 0.15s ease;
          border-radius: 4px;
          cursor: text !important;
        }
        [data-editable-text="true"]:hover {
          background-color: rgba(59, 130, 246, 0.12) !important;
          outline: 2px solid #3b82f6 !important;
          outline-offset: 2px;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        [data-editable-text="true"]:hover::before {
          content: "Click to edit";
          position: absolute;
          top: -28px;
          left: 0;
          background: #3b82f6;
          color: white;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      `;
      document.head.appendChild(style);

      const setupEditableBlocks = () => {
        const blocks = document.querySelectorAll(
          '[data-visual-editing="true"]'
        );
        // console.log(`📦 Found ${blocks.length} editable blocks`);

        blocks.forEach((block) => {
          const element = block as HTMLElement;
          const docId = element.getAttribute("data-doc-id") || pageId;
          const blockFieldPath = element.getAttribute("data-field") || "layout";

          // Look for elements with explicit data-editable-field attribute
          const editableElements = element.querySelectorAll(
            "[data-editable-field]"
          );

          editableElements.forEach((editableEl) => {
            const editableElement = editableEl as HTMLElement;
            const fieldPath = editableElement.getAttribute(
              "data-editable-field"
            );

            if (!fieldPath) return;

            editableElement.setAttribute("data-editable-text", "true");

            editableElement.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();

              if (!docId) {
                showToast("❌ Cannot edit: Missing document ID", "error");
                return;
              }

              const text = editableElement.textContent?.trim() || "";
              console.log("📝 Editing field:", {
                collection,
                docId,
                field: fieldPath,
                text,
              });

              openInlineEditor(editableElement, {
                collection,
                docId,
                field: fieldPath,
                currentText: text,
              });
            });
          });

          // Fallback: Also check for standard text elements without explicit field path
          const textElements = element.querySelectorAll(
            "h1, h2, h3, h4, h5, h6, p"
          );

          textElements.forEach((textEl) => {
            const textElement = textEl as HTMLElement;

            // Skip if already marked as editable
            if (textElement.hasAttribute("data-editable-field")) return;
            if (textElement.children.length > 0) return;

            const text = textElement.textContent?.trim();
            if (!text) return;

            textElement.setAttribute("data-editable-text", "true");

            textElement.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();

              if (!docId) {
                showToast("❌ Cannot edit: Missing document ID", "error");
                return;
              }

              console.log("📝 Editing (auto-detected):", {
                collection,
                docId,
                field: blockFieldPath,
                text,
              });

              openInlineEditor(textElement, {
                collection,
                docId,
                field: `${blockFieldPath}.${textElement.tagName.toLowerCase()}`,
                currentText: text,
              });
            });
          });
        });
      };
      setupEditableBlocks();

      const observer = new MutationObserver(setupEditableBlocks);
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        style.remove();
        observer.disconnect();
      };
    };

    void initializeVisualEditing();
  }, [pageId, collection]);

  return null;
}

