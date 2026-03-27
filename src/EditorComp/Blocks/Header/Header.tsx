"use client";

import { ComponentConfig } from "@measured/puck";
import { useState } from "react";

export const HeaderBlock: ComponentConfig = {
  label: "Header Section",

  /* =======================
     FIELDS
  ======================== */
  fields: {
    backgroundColor: { type: "text", label: "Background Color" },
    logoUrl: { type: "text", label: "Logo Image URL" },

    phoneText: { type: "text", label: "Phone Text" },
    phoneHref: { type: "text", label: "Phone Link" },

    cartCount: { type: "number", label: "Cart Count" },

    languages: {
      type: "array",
      label: "Languages",
      arrayFields: {
        code: { type: "text", label: "Code" },
        label: { type: "text", label: "Label" },
      },
    },

    leftNav: {
      type: "array",
      label: "Navigation Items",
      arrayFields: {
        label: { type: "text", label: "Label" },
        href: { type: "text", label: "Link" },
        children: {
          type: "array",
          label: "Dropdown Items",
          arrayFields: {
            label: { type: "text", label: "Label" },
            href: { type: "text", label: "Link" },
          },
        },
      },
    },
  },

  /* =======================
     DEFAULT PROPS
  ======================== */
  defaultProps: {
    backgroundColor: "#ffffff",
    logoUrl: "/assets/Image/logo.svg",

    phoneText: "Kontaktirajte nas",
    phoneHref: "tel:+385000000",

    cartCount: 3,

    languages: [
      { code: "hr", label: "Hr" },
      { code: "en", label: "En" },
    ],

    leftNav: [
      {
        label: "Noževi",
        children: [
          { label: "Petty", href: "/petty" },
          { label: "Gyuto", href: "/gyuto" },
          { label: "Santoku", href: "/santoku" },
          { label: "Nakiri", href: "/nakiri" },
        ],
      },
      { label: "O Noževima", href: "/category" },
      { label: "O Karlo Banu", href: "/o-karlo-banu" },
      { label: "Što drugi kažu", href: "/recenzije" },
    ],
  },

  /* =======================
     RENDER
  ======================== */
  render: ({
    backgroundColor,
    logoUrl,
    leftNav,
    phoneHref,
    phoneText,
    cartCount,
    languages,
  }) => {
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const headerStyle: React.CSSProperties = {
      width: "100%",
      backgroundColor,
      padding: "12px 0",
      position: "sticky",
      top: 0,
      zIndex: 50,
      borderBottom: "1px solid #ddd",
      fontFamily: "sans-serif",
    };

    const container: React.CSSProperties = {
      width: "90%",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    };

    const navItem: React.CSSProperties = {
      padding: "8px 10px",
      fontSize: "14px",
      fontWeight: 600,
      color: "#4F4640",
      cursor: "pointer",
      position: "relative",
    };

    const dropdown: React.CSSProperties = {
      position: "absolute",
      top: "35px",
      left: 0,
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: "6px",
      minWidth: "160px",
      padding: "8px 0",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    };

    return (
      <header style={headerStyle}>
        <div style={container}>
          {/* LEFT NAV */}
          <nav style={{ display: "flex", gap: "20px" }}>
            {leftNav?.map((item: any, idx: number) => {
              const hasChildren = item.children?.length > 0;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => hasChildren && setOpenDropdown(idx)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  style={{ position: "relative" }}
                >
                  <a
                    href={item.href || "#"}
                    style={navItem}
                    onClick={(e) => {
                      if (hasChildren) e.preventDefault();
                    }}
                  >
                    {item.label}
                    {hasChildren && " ▾"}
                  </a>

                  {/* DROPDOWN */}
                  {hasChildren && openDropdown === idx && (
                    <div style={dropdown}>
                      {item.children.map((child: any) => (
                        <a
                          key={child.label}
                          href={child.href}
                          style={{
                            display: "block",
                            padding: "8px 14px",
                            fontSize: "14px",
                            color: "#4F4640",
                          }}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* LOGO */}
          <div>
            <img src={logoUrl} alt="Logo" style={{ height: "42px" }} />
          </div>

          {/* RIGHT SIDE */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* PHONE */}
            <a
              href={phoneHref}
              style={{
                fontSize: "14px",
                color: "#4F4640",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              📞 {phoneText}
            </a>

            {/* CART */}
            <div style={{ position: "relative" }}>
              🛒
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-10px",
                    background: "#FF7020",
                    color: "#fff",
                    fontSize: "10px",
                    padding: "2px 5px",
                    borderRadius: "50%",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>

            {/* LANGUAGE */}
            <select
              style={{
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              {languages?.map((lang: any) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>
    );
  },
};

