import { CallToAction } from "@/blocks/CallToAction/config";
import { Content } from "@/blocks/Content/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { Archive } from "@/blocks/ArchiveBlock/config";
import { FormBlock } from "@/blocks/Form/config";
import { Carousel } from "@/blocks/Carousel/config";
import { Accordion } from "@/blocks/Accordion/config";

export const TwoRowsTwoColumnsSection: Block = {
  slug: "twoRowsTwoColumns",
  interfaceName: "MultiRow",
  labels: {
    singular: "Two Rows - Two Columns Grid",
    plural: "Two Rows - Two Columns Grids",
  },
  // imageURL: `<svg width="90" height="48" viewBox="0 0 90 48" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="47" y="6" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="6" y="26" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="47" y="26" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "Two Rows Two Columns Grid",
  fields: [
    {
      name: "backgroundColor",
      type: "select",
      defaultValue: "white",
      options: [
        { label: "White", value: "white" },
        { label: "Gray", value: "gray" },
        { label: "Blue", value: "blue" },
        { label: "Transparent", value: "transparent" },
      ],
    },
    {
      name: "padding",
      type: "select",
      defaultValue: "md",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    {
      name: "gap",
      type: "select",
      defaultValue: "md",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    {
      name: "rows",
      type: "array",
      minRows: 2,
      maxRows: 2,
      fields: [
        {
          name: "columns",
          type: "array",
          minRows: 2,
          maxRows: 2,
          fields: [
            {
              name: "blocks",
              type: "blocks",
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
              required: true,
              minRows: 1,
              admin: {
                initCollapsed: false,
                description: "Add one or more blocks for this cell",
              },
            },
          ],
        },
      ],
    },
    {
      name: "className",
      type: "text",
      label: "Custom CSS Classes",
    },
  ],
};

export const TwoRowsThreeColumnsSection: Block = {
  slug: "twoRowsThreeColumns",
  interfaceName: "MultiRow",
  labels: {
    singular: "Two Rows - Three Columns Grid",
    plural: "Two Rows - Three Columns Grids",
  },
  imageURL: `<svg width="90" height="48" viewBox="0 0 90 48" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="23" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="33" y="6" width="24" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="61" y="6" width="23" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="6" y="26" width="23" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="33" y="26" width="24" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="61" y="26" width="23" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "Two Rows Three Columns Grid",
  fields: [
    {
      name: "backgroundColor",
      type: "select",
      defaultValue: "white",
      options: [
        { label: "White", value: "white" },
        { label: "Gray", value: "gray" },
        { label: "Blue", value: "blue" },
        { label: "Transparent", value: "transparent" },
      ],
    },
    {
      name: "padding",
      type: "select",
      defaultValue: "md",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    {
      name: "gap",
      type: "select",
      defaultValue: "md",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    {
      name: "rows",
      type: "array",
      minRows: 2,
      maxRows: 2,
      fields: [
        {
          name: "columns",
          type: "array",
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: "blocks",
              type: "blocks",
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
              required: true,
              minRows: 1,
              admin: {
                initCollapsed: false,
                description: "Add one or more blocks for this cell",
              },
            },
          ],
        },
      ],
    },
    {
      name: "className",
      type: "text",
      label: "Custom CSS Classes",
    },
  ],
};

export const ThreeRowsTwoColumnsSection: Block = {
  slug: "threeRowsTwoColumns",
  interfaceName: "MultiRow",
  labels: {
    singular: "Three Rows - Two Columns Grid",
    plural: "Three Rows - Two Columns Grids",
  },
  // imageURL: `<svg width="90" height="68" viewBox="0 0 90 68" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="47" y="6" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="6" y="26" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="47" y="26" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="6" y="46" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="47" y="46" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "Three Rows Two Columns Grid",
  fields: [
    {
      name: "backgroundColor",
      type: "select",
      defaultValue: "white",
      options: [
        { label: "White", value: "white" },
        { label: "Gray", value: "gray" },
        { label: "Blue", value: "blue" },
        { label: "Transparent", value: "transparent" },
      ],
    },
    {
      name: "padding",
      type: "select",
      defaultValue: "md",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    {
      name: "gap",
      type: "select",
      defaultValue: "md",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    {
      name: "rows",
      type: "array",
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: "columns",
          type: "array",
          minRows: 2,
          maxRows: 2,
          fields: [
            {
              name: "blocks",
              type: "blocks",
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
              required: true,
              minRows: 1,
              admin: {
                initCollapsed: false,
                description: "Add one or more blocks for this cell",
              },
            },
          ],
        },
      ],
    },
    {
      name: "className",
      type: "text",
      label: "Custom CSS Classes",
    },
  ],
};

export const ThreeRowsThreeColumnsSection: Block = {
  slug: "threeRowsThreeColumns",
  interfaceName: "MultiRow",
  labels: {
    singular: "Three Rows - Three Columns Grid",
    plural: "Three Rows - Three Columns Grids",
  },
  imageURL: `<svg width="90" height="68" viewBox="0 0 90 68" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="23" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="33" y="6" width="24" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="61" y="6" width="23" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="6" y="26" width="23" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="33" y="26" width="24" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="61" y="26" width="23" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="6" y="46" width="23" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="33" y="46" width="24" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="61" y="46" width="23" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "Three Rows Three Columns Grid",
  fields: [
    {
      name: "backgroundColor",
      type: "select",
      defaultValue: "white",
      options: [
        { label: "White", value: "white" },
        { label: "Gray", value: "gray" },
        { label: "Blue", value: "blue" },
        { label: "Transparent", value: "transparent" },
      ],
    },
    {
      name: "padding",
      type: "select",
      defaultValue: "md",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    {
      name: "gap",
      type: "select",
      defaultValue: "md",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    {
      name: "rows",
      type: "array",
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: "columns",
          type: "array",
          minRows: 3,
          maxRows: 3,
          fields: [
            {
              name: "blocks",
              type: "blocks",
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
              required: true,
              minRows: 1,
              admin: {
                initCollapsed: false,
                description: "Add one or more blocks for this cell",
              },
            },
          ],
        },
      ],
    },
    {
      name: "className",
      type: "text",
      label: "Custom CSS Classes",
    },
  ],
};

