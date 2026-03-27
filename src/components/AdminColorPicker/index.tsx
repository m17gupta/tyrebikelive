"use client";

import { ColorPicker } from "../ui/colorPicker";

// AdminColorPicker — standalone version without @payloadcms/ui
// Used as a simple color picker field with external value/onChange
export const AdminColorPicker = ({
  path,
  value,
  onChange,
  label,
}: {
  path?: string;
  value?: string;
  onChange?: (color: string) => void;
  label?: string;
}) => {
  return (
    <div className="flex flex-col gap-[5px]">
      {label && <label className="text-sm font-medium">{label}</label>}
      <ColorPicker
        color={typeof value === "string" ? value : ""}
        onChange={onChange ?? (() => {})}
        className="w-full"
      />
    </div>
  );
};
