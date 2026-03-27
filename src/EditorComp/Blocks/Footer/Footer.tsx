"use client";

import { ComponentConfig } from "@measured/puck";
import { FaHeadset } from "react-icons/fa";

export const FooterBlock: ComponentConfig = {
  label: "Footer Section",

  fields: {
    bgColor: { type: "text", label: "Background Color" },
    textColor: { type: "text", label: "Text Color" },
    alignment: {
      type: "radio",
      label: "Text Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },

    brandText: { type: "textarea", label: "Brand Description" },

    quickLinks: {
      type: "array",
      label: "Quick Links",
      arrayFields: {
        label: { type: "text", label: "Label" },
        href: { type: "text", label: "URL" },
      },
    },

    customerLinks: {
      type: "array",
      label: "Customer Links",
      arrayFields: {
        label: { type: "text", label: "Label" },
        href: { type: "text", label: "URL" },
      },
    },

    contactText: { type: "textarea", label: "Contact Text" },
    contactPhone: { type: "text", label: "Phone Number" },
  },

  defaultProps: {
    bgColor: "#ffffff",
    textColor: "#4F4640",
    alignment: "left",

    brandText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

    quickLinks: [
      { label: "About us", href: "#" },
      { label: "Contact us", href: "#" },
      { label: "Products", href: "#" },
      { label: "Login", href: "#" },
      { label: "Sign Up", href: "#" },
    ],

    customerLinks: [
      { label: "My Account", href: "#" },
      { label: "Orders", href: "#" },
      { label: "Tracking List", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "My Cart", href: "#" },
    ],

    contactText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    contactPhone: "+123 456 789",
  },

  render: ({
    bgColor,
    textColor,
    alignment,
    brandText,
    quickLinks,
    customerLinks,
    contactText,
    contactPhone,
  }) => {
    return (
      <footer
        style={{
          backgroundColor: bgColor,
          color: textColor,
          padding: "40px 20px",
          width: "100%",
          textAlign: alignment as any,
        }}
      >
        {/* TOP SECTION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "30px",
          }}
        >
          {/* BRAND */}
          <div>
            <img
              src="https://media.istockphoto.com/id/1316590411/vector/m-logo-design.jpg?s=2048x2048&w=is&k=20&c=LDO3YRucFANdIiovOmKQgMA7ZYAyr5EgwHY9vIaJ89k="
              alt="Footer logo"
              style={{ width: "80px" }}
            />
            <p style={{ marginTop: "10px", opacity: 0.7 }}>{brandText}</p>
            
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 style={{ fontSize: "18px", fontWeight: "700" }}>Quick Links</h4>
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {quickLinks.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  style={{
                    color: textColor,
                    textDecoration: "none",
                    opacity: 0.8,
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* CUSTOMER LINKS */}
          <div>
            <h4 style={{ fontSize: "18px", fontWeight: "700" }}>Customer Area</h4>
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {customerLinks.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  style={{
                    color: textColor,
                    textDecoration: "none",
                    opacity: 0.8,
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 style={{ fontSize: "18px", fontWeight: "700" }}>Contact</h4>
            <p style={{ marginTop: "10px", opacity: 0.8 }}>{contactText}</p>

          

            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
              <FaHeadset style={{ width: "40px", height: "40px", color: "#8D8D8D" }} />
              <div>
                <div style={{ fontSize: "12px", color: "#888" }}>Need help?</div>
                <a
                  href={`tel:${contactPhone}`}
                  style={{ color: "#FF7020", fontWeight: "600" }}
                >
                  {contactPhone}
                </a>
              </div>
            </div>

            <a
              href="#"
              style={{
                marginTop: "15px",
                display: "inline-block",
                border: "1px solid #3D7BD8",
                padding: "8px 20px",
                borderRadius: "12px",
                color: "#3D7BD8",
                fontWeight: "600",
              }}
            >
              LIVE CHAT
            </a>

              <div  
              style={{marginTop:"12px", display:"flex", alignItems:"center", gap:"10px"}}
              >
             
              <img src="https://karlo-ban.vercel.app/assets/appStore-BJX4GR1Q.png" alt="apple store" className="w-1/2"></img>
              <img src="https://karlo-ban.vercel.app/assets/googlePlay-BI-b2K-y.png" alt="google store" className="w-1/2"></img>

            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#ccc",
            margin: "30px 0",
            opacity: 0.4,
          }}
        />

        {/* BOTTOM */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            fontSize: "14px",
          }}
        >
          <div>© All Rights Reserved</div>
          <div style={{ display: "flex", gap: "20px" }}>
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>PAYPAL</span>
            <span>BITCOIN</span>
          </div>
        </div>
      </footer>
    );
  },
};

