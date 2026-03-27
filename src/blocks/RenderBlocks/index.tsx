import React from "react";

export const RenderBlocks = ({ blocks }: { blocks?: any[] }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="render-blocks-stub">
      {blocks.map((block, index) => (
        <div key={index} className="block-placeholder">
          {/* Render individual blocks dynamically based on blockType */}
        </div>
      ))}
    </div>
  );
};
