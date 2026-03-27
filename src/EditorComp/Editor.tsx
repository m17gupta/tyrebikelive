"use client";

import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "./config";
import { PuckComponent } from "./Override/PuckComp";
import { Bar } from "./Override/ActionBar";
import { TabProvider } from "@/utilities/useTabChange";
import { ComponentItem } from "./Override/ComponentItems";
import { useState } from "react";

// Create a wrapper component that provides context to all overrides
function PuckWrapper({ data, mode }) {
  return (
    <TabProvider>
      <Puck
        overrides={{
          puck: () => <PuckComponent mode={mode} data={data} />,
          actionBar: ({ children, label, parentAction }) => (
            <Bar
              label={label}
              parentAction={parentAction}
              children={children}
            />
          ),
          fieldTypes: {
            object: ({ children, name, field, value, onChange }) => {
              const [isOpen, setIsOpen] = useState(false);

              return (
                <div style={{ marginBottom: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      textAlign: "left",
                      background: "#f8f9fa",
                      border: "1px solid #e0e0e0",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontWeight: 500,
                    }}
                  >
                    <span>{name}</span>
                    <span>{isOpen ? "▼" : "▶"}</span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: "12px",
                        border: "1px solid #e0e0e0",
                        borderTop: "none",
                        borderRadius: "0 0 4px 4px",
                        background: "white",
                      }}
                    >
                      {children}
                    </div>
                  )}
                </div>
              );
            },
          },
          componentItem: ({ name, children }) => <ComponentItem name={name} />,
        }}
        config={config}
        data={data && data["Page Data"] ? data["Page Data"] : {}}
      />
    </TabProvider>
  );
}

export function Editor({ mode, data }) {
  return <PuckWrapper mode={mode} data={data} />;
}

