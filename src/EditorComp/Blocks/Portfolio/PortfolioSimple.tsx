"use client";

import { ComponentConfig } from "@measured/puck";
import { LuHouse } from "react-icons/lu";


export const PortfolioSimpleType: ComponentConfig = {
  label: "Portfolio Simple Type",

  fields: {
    AboutTitleContent: {
      type: "text",
    },
    AboutTitleSize: {
      type: "number",
    },
    AboutDescription: {
        type: "text"
    },

    AboutImage: {
      type: "text",
    },
    backgroundColor: {
       type: "text",
    },
    margin: {
      type: "object",
      objectFields: {
        marginleft: {
          type: "text",
        },
        marginright: {
          type: "text",
        },
        margintop: {
          type: "text",
        },
        marginbottom: {
          type: "text",
        },
      },
    },
    width: {
      type: "number",
    },
  },

  defaultProps: {
    AboutTitleContent: "OUR PORTFOLIO",
    AboutTitleSize: 42,
    AboutImage: "https://images.unsplash.com/photo-1756698159641-744faaed219f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D", 
    margin: {
      marginright: "auto",
      margintop: "0",
      marginbottom: "0",
      marginleft: "auto",
    },
    width: 85,
    backgroundColor: "#fff",
    AboutDescription: "This is Description"
  },

  render: ({
    margin,
    width,
    backgroundColor,
    AboutTitleSize,
    AboutTitleContent,
    AboutImage,
    AboutDescription
  }) => {
    
    return (
      <div
        style={{
          backgroundColor: backgroundColor,
        }}>
        <div
          style={{
            width: `${width}%`,
            margin: `${margin.margintop} ${margin.marginright} ${margin.marginbottom} ${margin.marginleft}`,
          }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              alignItems: "center",
              paddingTop: "40px",
              paddingBottom: "40px",
            }}>
            <div>
              <h2
                style={{
                  fontSize: `${AboutTitleSize}px`,
                  fontWeight: "700",
                }}>
               {AboutTitleContent}
              </h2>
              <p
                style={{
                  fontSize: `${AboutTitleContent}px`,
                  fontWeight: "500",
                }}>
                {AboutDescription}
              </p>
            </div>
 
            <div>
              <img
                src={AboutImage}
                alt="About Image"
                style={{
                  borderRadius: "6px",
                }}></img>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

