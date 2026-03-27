import { ComponentConfig } from "@measured/puck";
import React from "react";

const CustomSlot = (props: any) => {
  return <span {...props} />;
};

export const RowBlock: ComponentConfig = {
  fields: {
    numColumns: {
      type: "number",
      label: "Number of columns",
      min: 1,
      max: 12,
    },
    gap: {
      label: "Gap",
      type: "number",
      min: 0,
    },
    columns: {
      type: "slot",
    },
   
  },
  defaultProps: {
    numColumns: 4,
    gap: 24,
    columns: [],
  },
  render: ({ gap, numColumns, columns: Columns }) => {
    return (
      <section>
        <Columns
          as={CustomSlot}
          disallow={["Hero", "Stats"]}
         
          style={{
            gap,
            display: "grid",
            gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
          }}
        />
      </section>
    );
  },
};



