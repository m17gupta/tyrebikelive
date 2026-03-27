"use client";

import { usePuck } from "@measured/puck";
import { svgs } from "./SvgIconsObj";

export const ComponentItem = ({ name }) => {
  const { config } = usePuck();
  const { components } = config;

  // Merge SVG icons with component definitions
  const addSvgToComponents = (comps, svgIcons) => {
    const enrichedComponents = { ...comps };
    
    Object.keys(comps).forEach((key) => {
      enrichedComponents[key] = {
        ...enrichedComponents[key],
        image: svgIcons[key],
      };
    });
    
    return enrichedComponents;
  };

  const componentsWithSvgs = addSvgToComponents(components, svgs);
  const component = componentsWithSvgs[name];

  return (
    <div className="flex flex-col items-center gap-2 p-4 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
      <div className="w-12 h-12 flex items-center justify-center text-gray-700">
        {component.image}
      </div>
      <span className="text-sm font-bold text-gray-900">
        {component.label}
      </span>
    </div>
  );
};
