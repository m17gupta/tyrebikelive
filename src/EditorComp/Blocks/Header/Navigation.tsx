"use client"

import { ComponentConfig } from "@measured/puck";
import { useState } from "react";

// Types for the NavBar component
type NavItem = {
  label: string;
  link: string;
  hasDropdown: boolean;
  dropdownItems: Array<{
    label: string;
    link: string;
  }>;
};

type NavBarProps = {
  // Logo Settings
  logoText: string;
  logoLink: string;
  logoColor: string;
  logoFontSize: number;
  logoFontWeight: string;

  // Navigation Items
  navItems: NavItem[];

  // Nav Item Styling
  navTextColor: string;
  navHoverColor: string;
  navFontSize: number;
  navFontWeight: string;

  // CTA Button
  ctaText: string;
  ctaLink: string;
  ctaBackgroundColor: string;
  ctaTextColor: string;
  ctaHoverBackgroundColor: string;
  ctaBorderRadius: number;

  // NavBar Container Styling
  backgroundColor: string;
  height: number;
  hasShadow: boolean;
  isSticky: boolean;

  // Dropdown Styling
  dropdownBackgroundColor: string;
  dropdownTextColor: string;
  dropdownHoverBackgroundColor: string;
  dropdownBorderRadius: number;

  // Spacing
  padding: {
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;
  };
  margin: {
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
  };
};

export const NavBar: ComponentConfig<NavBarProps> = {
  label: "Navigation Bar",
  
  fields: {
    // Logo Section
    logoText: {
      type: "text",
      label: "Logo Text",
    },
    logoLink: {
      type: "text",
      label: "Logo Link",
    },
    logoColor: {
      type: "text",
      label: "Logo Color",
    },
    logoFontSize: {
      type: "number",
      label: "Logo Font Size",
    },
    logoFontWeight: {
      type: "select",
      label: "Logo Font Weight",
      options: [
        { label: "Light", value: "300" },
        { label: "Normal", value: "400" },
        { label: "Medium", value: "500" },
        { label: "Semibold", value: "600" },
        { label: "Bold", value: "700" },
      ],
    },

    // Navigation Items
    navItems: {
      type: "array",
      label: "Navigation Items",
      arrayFields: {
        label: {
          type: "text",
          label: "Label",
        },
        link: {
          type: "text",
          label: "Link",
        },
        hasDropdown: {
          type: "radio",
          label: "Has Dropdown?",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        dropdownItems: {
          type: "array",
          label: "Dropdown Items",
          arrayFields: {
            label: {
              type: "text",
              label: "Label",
            },
            link: {
              type: "text",
              label: "Link",
            },
          },
          getItemSummary: (item) => item.label || "Dropdown Item",
        },
      },
      getItemSummary: (item) => item.label || "Nav Item",
      defaultItemProps: {
        label: "Nav Item",
        link: "#",
        hasDropdown: false,
        dropdownItems: [],
      },
    },

    // Nav Item Styling
    navTextColor: {
      type: "text",
      label: "Nav Text Color",
    },
    navHoverColor: {
      type: "text",
      label: "Nav Hover Color",
    },
    navFontSize: {
      type: "number",
      label: "Nav Font Size",
    },
    navFontWeight: {
      type: "select",
      label: "Nav Font Weight",
      options: [
        { label: "Light", value: "300" },
        { label: "Normal", value: "400" },
        { label: "Medium", value: "500" },
        { label: "Semibold", value: "600" },
        { label: "Bold", value: "700" },
      ],
    },

    // CTA Button
    ctaText: {
      type: "text",
      label: "CTA Button Text",
    },
    ctaLink: {
      type: "text",
      label: "CTA Button Link",
    },
    ctaBackgroundColor: {
      type: "text",
      label: "CTA Background Color",
    },
    ctaTextColor: {
      type: "text",
      label: "CTA Text Color",
    },
    ctaHoverBackgroundColor: {
      type: "text",
      label: "CTA Hover Background",
    },
    ctaBorderRadius: {
      type: "number",
      label: "CTA Border Radius",
    },

    // NavBar Container
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    height: {
      type: "number",
      label: "NavBar Height",
    },
    hasShadow: {
      type: "radio",
      label: "Show Shadow?",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    isSticky: {
      type: "radio",
      label: "Sticky Navigation?",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },

    // Dropdown Styling
    dropdownBackgroundColor: {
      type: "text",
      label: "Dropdown Background Color",
    },
    dropdownTextColor: {
      type: "text",
      label: "Dropdown Text Color",
    },
    dropdownHoverBackgroundColor: {
      type: "text",
      label: "Dropdown Hover Background",
    },
    dropdownBorderRadius: {
      type: "number",
      label: "Dropdown Border Radius",
    },

    // Spacing
    padding: {
      label: "Padding",
      type: "object",
      objectFields: {
        paddingLeft: { type: "number", label: "Left" },
        paddingRight: { type: "number", label: "Right" },
        paddingTop: { type: "number", label: "Top" },
        paddingBottom: { type: "number", label: "Bottom" },
      },
    },
    margin: {
      label: "Margin",
      type: "object",
      objectFields: {
        marginLeft: { type: "number", label: "Left" },
        marginRight: { type: "number", label: "Right" },
        marginTop: { type: "number", label: "Top" },
        marginBottom: { type: "number", label: "Bottom" },
      },
    },
  },

  defaultProps: {
    // Logo defaults
    logoText: "MyBrand",
    logoLink: "/",
    logoColor: "#2563eb",
    logoFontSize: 24,
    logoFontWeight: "700",

    // Nav Items defaults
    navItems: [
      {
        label: "Home",
        link: "/",
        hasDropdown: false,
        dropdownItems: [],
      },
      {
        label: "Services",
        link: "#",
        hasDropdown: true,
        dropdownItems: [
          { label: "Web Design", link: "/services/web-design" },
          { label: "SEO", link: "/services/seo" },
          { label: "Marketing", link: "/services/marketing" },
        ],
      },
      {
        label: "About",
        link: "/about",
        hasDropdown: false,
        dropdownItems: [],
      },
      {
        label: "Contact",
        link: "/contact",
        hasDropdown: false,
        dropdownItems: [],
      },
    ],

    // Nav styling defaults
    navTextColor: "#374151",
    navHoverColor: "#2563eb",
    navFontSize: 16,
    navFontWeight: "400",

    // CTA defaults
    ctaText: "Get Started",
    ctaLink: "/signup",
    ctaBackgroundColor: "#2563eb",
    ctaTextColor: "#ffffff",
    ctaHoverBackgroundColor: "#1d4ed8",
    ctaBorderRadius: 6,

    // Container defaults
    backgroundColor: "#ffffff",
    height: 64,
    hasShadow: true,
    isSticky: true,

    // Dropdown defaults
    dropdownBackgroundColor: "#ffffff",
    dropdownTextColor: "#374151",
    dropdownHoverBackgroundColor: "#eff6ff",
    dropdownBorderRadius: 8,

    // Spacing defaults
    padding: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 0,
      paddingBottom: 0,
    },
    margin: {
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
    },
  },

  render: ({
    logoText,
    logoLink,
    logoColor,
    logoFontSize,
    logoFontWeight,
    navItems,
    navTextColor,
    navHoverColor,
    navFontSize,
    navFontWeight,
    ctaText,
    ctaLink,
    ctaBackgroundColor,
    ctaTextColor,
    ctaHoverBackgroundColor,
    ctaBorderRadius,
    backgroundColor,
    height,
    hasShadow,
    isSticky,
    dropdownBackgroundColor,
    dropdownTextColor,
    dropdownHoverBackgroundColor,
    dropdownBorderRadius,
    padding,
    margin,
  }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const toggleDropdown = (index: number) => {
      setOpenDropdown(openDropdown === index ? null : index);
    };

    const navContainerStyle: React.CSSProperties = {
      backgroundColor,
      height: `${height}px`,
      boxShadow: hasShadow ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" : "none",
      position: isSticky ? "sticky" : "relative",
      top: isSticky ? 0 : "auto",
      zIndex: 50,
      marginLeft: margin?.marginLeft,
      marginRight: margin?.marginRight,
      marginTop: margin?.marginTop,
      marginBottom: margin?.marginBottom,
    };

    const innerContainerStyle: React.CSSProperties = {
      maxWidth: "1280px",
      margin: "0 auto",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: padding?.paddingLeft,
      paddingRight: padding?.paddingRight,
      paddingTop: padding?.paddingTop,
      paddingBottom: padding?.paddingBottom,
    };

    const logoStyle: React.CSSProperties = {
      color: logoColor,
      fontSize: `${logoFontSize}px`,
      fontWeight: logoFontWeight,
      textDecoration: "none",
      cursor: "pointer",
    };

    const navLinkStyle: React.CSSProperties = {
      color: navTextColor,
      fontSize: `${navFontSize}px`,
      fontWeight: navFontWeight,
      padding: "8px 16px",
      textDecoration: "none",
      cursor: "pointer",
      borderRadius: "6px",
      transition: "all 0.2s",
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
    };

    const ctaButtonStyle: React.CSSProperties = {
      backgroundColor: ctaBackgroundColor,
      color: ctaTextColor,
      padding: "8px 24px",
      borderRadius: `${ctaBorderRadius}px`,
      textDecoration: "none",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
      border: "none",
      display: "inline-block",
    };

    const dropdownStyle: React.CSSProperties = {
      position: "absolute",
      top: "100%",
      left: 0,
      marginTop: "8px",
      backgroundColor: dropdownBackgroundColor,
      borderRadius: `${dropdownBorderRadius}px`,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      minWidth: "224px",
      padding: "8px 0",
      zIndex: 10,
    };

    const dropdownItemStyle: React.CSSProperties = {
      display: "block",
      padding: "8px 16px",
      color: dropdownTextColor,
      textDecoration: "none",
      fontSize: "14px",
      transition: "all 0.2s",
    };

    return (
      <nav style={navContainerStyle}>
        <div style={innerContainerStyle}>
          {/* Logo */}
          <div style={{ flexShrink: 0 }}>
            <a href={logoLink || "/"} style={logoStyle}>
              {logoText}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            className="desktop-nav"
          >
            {navItems?.map((item, index) => (
              <div key={index} style={{ position: "relative" }}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      style={{
                        ...navLinkStyle,
                        background: "none",
                        border: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = navHoverColor;
                        e.currentTarget.style.backgroundColor = "#f9fafb";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = navTextColor;
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {item.label}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdown === index && (
                      <div style={dropdownStyle}>
                        {item.dropdownItems?.map((dropItem, dropIndex) => (
                          <a
                            key={dropIndex}
                            href={dropItem.link || "#"}
                            style={dropdownItemStyle}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = dropdownHoverBackgroundColor;
                              e.currentTarget.style.color = navHoverColor;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.color = dropdownTextColor;
                            }}
                          >
                            {dropItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.link || "#"}
                    style={navLinkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = navHoverColor;
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = navTextColor;
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <a
              href={ctaLink || "#"}
              style={ctaButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ctaHoverBackgroundColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ctaBackgroundColor;
              }}
            >
              {ctaText}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              padding: "8px",
              borderRadius: "6px",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: navTextColor,
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor,
              borderTop: "1px solid #e5e7eb",
              padding: "16px",
            }}
            className="mobile-menu"
          >
            {navItems?.map((item, index) => (
              <div key={index} style={{ marginBottom: "8px" }}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(index)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px",
                        border: "none",
                        background: "none",
                        color: navTextColor,
                        fontSize: `${navFontSize}px`,
                        cursor: "pointer",
                        borderRadius: "6px",
                      }}
                    >
                      <span>{item.label}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{
                          transform: openDropdown === index ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s",
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    {openDropdown === index && (
                      <div style={{ marginLeft: "16px", marginTop: "4px" }}>
                        {item.dropdownItems?.map((dropItem, dropIndex) => (
                          <a
                            key={dropIndex}
                            href={dropItem.link || "#"}
                            style={{
                              display: "block",
                              padding: "8px 12px",
                              color: dropdownTextColor,
                              textDecoration: "none",
                              fontSize: "14px",
                              borderRadius: "6px",
                            }}
                          >
                            {dropItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.link || "#"}
                    style={{
                      display: "block",
                      padding: "12px",
                      color: navTextColor,
                      textDecoration: "none",
                      fontSize: `${navFontSize}px`,
                      borderRadius: "6px",
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <a
              href={ctaLink || "#"}
              style={{
                ...ctaButtonStyle,
                display: "block",
                textAlign: "center",
                marginTop: "12px",
              }}
            >
              {ctaText}
            </a>
          </div>
        )}

        {/* CSS for responsive behavior */}
        <style>{`
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-menu-btn {
              display: block !important;
            }
          }
        `}</style>
      </nav>
    );
  },
};
