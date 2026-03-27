"use client"

import { ComponentConfig } from "@measured/puck";
import { useState } from "react";

export const HeroBlock: ComponentConfig = {
  label: "Hero Section",

  fields: {
    // Text Content
    title: { 
      type: "text", 
      label: "Title" 
    },
    subtitle: { 
      type: "textarea", 
      label: "Subtitle" 
    },
    // CTA Button
    ctaLabel: { 
      type: "text", 
      label: "CTA Button Label" 
    },
    ctaLink: { 
      type: "text", 
      label: "CTA Button Link" 
    },
    
    // Video
    videoUrl: { 
      type: "text", 
      label: "Video URL" 
    },
    showPlayButton: { 
      type: "radio", 
      label: "Show Play Button", 
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ] 
    },
    
    // Background
    backgroundImage: { 
      type: "text", 
      label: "Background Image URL" 
    },
    overlayOpacity: { 
      type: "number", 
      label: "Overlay Opacity (0-1)" 
    },
    
    // Styling
    backgroundColor: { 
      type: "text", 
      label: "Fallback Background Color" 
    },
    textColor: { 
      type: "text", 
      label: "Text Color" 
    },
    ctaBackgroundColor: { 
      type: "text", 
      label: "CTA Background Color" 
    },
    ctaTextColor: { 
      type: "text", 
      label: "CTA Text Color" 
    },
    
    // Layout
    minHeight: { 
      type: "number", 
      label: "Min Height (px)" 
    },
    borderRadius: { 
      type: "number", 
      label: "Border Radius (px)" 
    },
    marginTop: { 
      type: "number", 
      label: "Margin Top (px)" 
    },
     marginLeft: { 
      type: "number", 
      label: "Margin Left (px)" 
    },
  },

  defaultProps: {
    title: "Izuzetna oštrina nadomak ruke",
    subtitle: "Autentični, 100% ručno kovani noževi, izrađeni da nadžive generacije.",
    ctaLabel: "Kuharski Noževi",
    ctaLink: "#",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    showPlayButton: true,
    backgroundImage: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b8?auto=format&fit=crop&w=1500&q=80",
    overlayOpacity: 0.4,
    backgroundColor: "#1a1a1a",
    textColor: "#ffffff",
    ctaBackgroundColor: "#FF7020",
    ctaTextColor: "#ffffff",
    minHeight: 500,
    borderRadius: 16,
    marginTop: 28,
  },

  render: ({
    title,
    subtitle,
    ctaLabel,
    ctaLink,
    videoUrl,
    showPlayButton,
    backgroundImage,
    overlayOpacity,
    backgroundColor,
    textColor,
    ctaBackgroundColor,
    ctaTextColor,
    minHeight,
    borderRadius,
    marginTop,
    marginLeft
  }) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
      <>
        <section
          style={{
            position: "relative",
            isolation: "isolate",
            marginLeft: `${marginLeft}px`,
            marginRight: "auto",
            marginTop: `${marginTop}px`,
            borderRadius: `${borderRadius}px`,
            overflow: "hidden",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            minHeight: `${minHeight}px`,
          }}
        >
          {/* Background Image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: backgroundColor,
              transition: "all 0.7s",
            }}
            aria-hidden="true"
          />
          
          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
            }}
          />

          {/* Main Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              textAlign: "center",
              paddingTop: "112px",
              paddingBottom: "64px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Play Button */}
            {showPlayButton && videoUrl && (
              <button
                onClick={() => setIsVideoOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(12px)",
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  marginBottom: "24px",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <svg
                  style={{
                    width: "16px",
                    height: "16px",
                    fill: textColor,
                    marginLeft: "4px",
                  }}
                  viewBox="0 0 384 512"
                >
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>
              </button>
            )}

            {/* Title */}
            <h1
              style={{
                color: textColor,
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                fontWeight: 500,
                lineHeight: 1.2,
                margin: 0,
                animation: "fadeInUp 0.6s ease-out",
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                style={{
                  marginTop: "16px",
                  maxWidth: "42rem",
                  color: `${textColor}e6`,
                  fontSize: "1rem",
                  fontStyle: "italic",
                  fontWeight: 500,
                  animation: "fadeInUp 0.6s ease-out 0.2s both",
                }}
              >
                {subtitle}
              </p>
            )}

            {/* CTA Button */}
            {ctaLabel && (
              <div
                style={{
                  marginTop: "48px",
                  animation: "fadeInUp 0.6s ease-out 0.4s both",
                }}
              >
                <a
                  href={ctaLink}
                  style={{
                    display: "inline-block",
                    padding: "12px 24px",
                    backgroundColor: ctaBackgroundColor,
                    color: ctaTextColor,
                    borderRadius: "9999px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${ctaBackgroundColor}e6`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = ctaBackgroundColor;
                  }}
                >
                  {ctaLabel}
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Video Modal */}
        {isVideoOpen && videoUrl && (
          <div
            onClick={() => setIsVideoOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "fadeIn 0.2s ease-out",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "48rem",
                width: "90%",
                backgroundColor: "#000",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <video
                style={{
                  width: "100%",
                  height: "auto",
                }}
                controls
                autoPlay
                src={videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </>
    );
  },
};
