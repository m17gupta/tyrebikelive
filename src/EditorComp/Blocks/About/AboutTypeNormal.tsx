

"use client";

import { ComponentConfig } from "@measured/puck";
import { Building2, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { LuHouse } from "react-icons/lu";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const AboutNormalType: ComponentConfig = {
  label: "About Normal",

  fields: {
    ServicesTitle: {
      type: "text",
    },
    ServicesTitleSize: {
      type: "number",
    },
    ServicesTitleColor: {
      type: "text",
    },
    ServicesContentSize: {
      type: "number",
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
    cardContent: {
      type: "array",
      arrayFields: {
        cardtitle: {
          type: "text",
        },
        carddescription: {
          type: "text",
        },
        cardicon: {
          type: "select",
          options: [
            {
              label: "Layout",
              value: "layout",
            },
            {
              label: "Building",
              value: "building",
            },
            {
              label: "House",
              value: "house",
            },
          ],
        },
      },
    },
  },

  defaultProps: {
    ServicesTitle: "OUR SERVICES",
    ServicesTitleSize: 42,
    ServicesTitleColor: "#000",
    ServicesContentSize: 18,
    ServicesBg: "#fff",
    SerTitleSize: 20,
    margin: {
      marginright: "auto",
      margintop: "0",
      marginbottom: "0",
      marginleft: "auto",
    },
    cardContent: [
    ],
    width: 85,
  },

  render: ({
    ServicesTitle,
    ServicesTitleSize,
    ServicesTitleColor,
    ServicesContentSize, 
    ServicesBg,
    SerTitleSize,
    margin,
    width,
    cardContent,
  }) => {
    const icons = {
      house: <LuHouse />,
    };

    return (
      <div
        style={{
          backgroundColor: ServicesBg,
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            margin: `${margin.margintop} ${margin.marginright} ${margin.marginbottom} ${margin.marginleft}`,
          }}
        >
          {/* ⭐ TITLE comes from props */}
          <h2
            style={{
              textAlign: "center",
              fontSize: `${ServicesTitleSize}px`,
              color: ServicesTitleColor,
              fontWeight: "700",
              marginBottom: "40px",
            }}
          >
            {ServicesTitle}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "30px",
            }}
          >
            {cardContent.length>0 && cardContent.map(({ cardtitle, carddescription, cardicon },index) => {
              let IconMain: any = icons[cardicon];
              return (
                <div key={index}
                  style={{
                    backgroundColor: "#fff",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 15px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      fontSize: `${ServicesTitleSize}px`,
                      marginBottom: "20px",
                      color: "#e0b36c",
                    }}
                  >
                    {IconMain}
                  </div>
                  <h3
                    style={{
                      fontSize: `${SerTitleSize}px`,
                      fontWeight: "700",
                      paddingBottom: "10px",
                    }}
                  >
                    {cardtitle}
                  </h3>
                  <p
                    style={{
                      fontSize: `${ServicesContentSize}px`,
                      lineHeight: "28px",
                    }}
                  >
                    {carddescription}
                  </p>
                </div>
              );
            })}

{/*             
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: `${ServicesTitleSize}px`,
                  marginBottom: "20px",
                  color: "#e0b36c",
                }}
              >
                <LayoutGrid />
              </div>
              <h3
                style={{
                  fontSize: `${SerTitleSize}px`,
                  fontWeight: "700",
                  paddingBottom: "10px",
                }}
              >
                ARCHITECTURE
              </h3>
              <p
                style={{
                  fontSize: `${ServicesContentSize}px`,
                  lineHeight: "28px",
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>

        
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: `${ServicesTitleSize}px`,
                  marginBottom: "20px",
                  color: "#e0b36c",
                }}
              >
                <LuHouse />
              </div>
              <h3
                style={{
                  fontSize: `${SerTitleSize}px`,
                  fontWeight: "700",
                  paddingBottom: "10px",
                }}
              >
                INTERIOR
              </h3>
              <p
                style={{
                  fontSize: `${ServicesContentSize}px`,
                  lineHeight: "28px",
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    );
  },
};

