"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const locales = [
  { code: "en", label: "English" },
  { code: "hr", label: "Hrvatski" },
  { code: "pl", label: "Polski" },
];

export const AdminLanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Extract current locale from pathname (e.g., /admin/en/...)
  const currentLocale = pathname.split("/")[2] || "en";

  const handleLocaleChange = async (newLocale: string) => {
    if (newLocale === currentLocale) return;
    try {
      // Update the user's language preference via API
      await fetch("/api/administrators/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: newLocale }),
      });
      // Optionally update the URL
      const newPath = pathname.replace(/^\/admin\/[^/]+/, `/admin/${newLocale}`);
      router.push(newPath);
      // Reload to apply language change
      window.location.reload();
    } catch (err) {
      // fallback: just update URL
      const newPath = pathname.replace(/^\/admin\/[^/]+/, `/admin/${newLocale}`);
      router.push(newPath);
    }
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", marginLeft: "1rem" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "6px 12px",
          borderRadius: "4px",
          background: "#f3f4f6",
          border: "none",
          cursor: "pointer",
        }}
      >
        {locales.find((l) => l.code === currentLocale)?.label || "English"} ▼
      </button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            marginTop: "4px",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            zIndex: 10,
          }}
        >
          {locales.map((locale) => (
            <button
              key={locale.code}
              onClick={() => handleLocaleChange(locale.code)}
              style={{
                display: "block",
                width: "100%",
                padding: "8px 16px",
                background: locale.code === currentLocale ? "#e5e7eb" : "#fff",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontWeight: locale.code === currentLocale ? "bold" : "normal",
              }}
            >
              {locale.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};



