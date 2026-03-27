import { defaultLexical } from "@/fields/defaultLexical";
import { linkGroup } from "@/fields/linkGroup";

import { relationship } from "payload/shared";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "lowImpact",
      label: "Type",
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "High Impact",
          value: "highImpact",
        },
        {
          label: "Medium Impact",
          value: "mediumImpact",
        },
        {
          label: "Low Impact",
          value: "lowImpact",
        },
        { 
          label: "Two Column (Heading + Image)", 
          value: "twoColumn", 
        }, 
        { 
          label: "Single Column with Background", 
          value: "singleColumnBackground", 
        }, 
        { 
          label: "Video Modal Hero", 
          value: "videoModal", 
        }, 
      ],
      required: true,
    },
    {
      name: "richText",
      type: "richText",
      editor: defaultLexical,
      localized: true,
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: "media",
      type: "upload",
      admin: {
        condition: (_, { type } = {}) => ["highImpact", "mediumImpact"].includes(type as string),
      },
      relationTo: "media",
      required: true,
    },
    {
      name: "reversed",
      label: "Reverse photo and text",
      type: "checkbox",
      admin: {
        condition: (_, { type } = {}) => ["mediumImpact"].includes(type as string),
      },
      required: true,
    },
    {
      label: "Video Modal Hero",
      type: "group",
      fields: [
        { name: "video_heading", type: "text", label: "Heading" },
        { name: "video_subheading", type: "text", label: "Sub Heading" },
        { name: "video_description", type: "textarea", label: "Description" },
        { name: "video_url", type: "text", label: "Video URL", required: true },
        { name: "video_backgroundColor", type: "text", label: "Background Color" },
      ],
      admin: {
        condition: (_, { type } = {}) => type === "videoModal",
      },
    },
    {
      label: "Two Column",
      type: "group",
      fields: [
        { name: "twoCol_imagePosition", type: "select", label: "Image Position", options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ]},
        { name: "twoCol_heading", type: "text", label: "Heading" },
        { name: "twoCol_subheading", type: "text", label: "Sub Heading" },
        { name: "twoCol_description", type: "textarea", label: "Description" },
        { name: "twoCol_image", type: "relationship", relationTo: "media", required: true },
        { name: "twoCol_backgroundColor", type: "text", label: "Background Color" },
      ],
      admin: {
        condition: (_, { type } = {}) => type === "twoColumn",
      },
    },
    {
      label: "Single Column",
      type: "group",
      fields: [
        { name: "single_heading", type: "text", label: "Heading" },
        { name: "single_subheading", type: "text", label: "Sub Heading" },
        { name: "single_description", type: "textarea", label: "Description" },
        { name: "backgroundType", type: "radio", label: "Background Type", options: [
          { label: "Color", value: "color" },
          { label: "Image", value: "image" },
        ], defaultValue: "color" },
        { name: "single_backgroundColor", type: "text", label: "Background Color",
          admin: { condition: (_, { backgroundType } = {}) => backgroundType === "color" }
        },
        { name: "single_backgroundImage", type: "relationship", relationTo: "media",
          admin: { condition: (_, { backgroundType } = {}) => backgroundType === "image" }
        },
      ],
      admin: {
        condition: (_, { type } = {}) => type === "singleColumnBackground",
      },
    }
    
  ],
  label: false,
};

