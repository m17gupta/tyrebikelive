import { CallToAction } from "@/blocks/CallToAction/config";
import { Content } from "@/blocks/Content/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { Archive } from "@/blocks/ArchiveBlock/config";
import { FormBlock } from "@/blocks/Form/config";
import { Carousel } from "@/blocks/Carousel/config";
import { Accordion } from "@/blocks/Accordion/config";

export const SidebarMainLayoutSection: Block = {
  slug: "sidebarMainLayout",
  interfaceName: "MultiColumn",
  labels: {
    singular: "Sidebar + Main Layout",
    plural: "Sidebar + Main Layouts",
  },
  imageURL: `<svg width="90" height="28" viewBox="0 0 90 28" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="17" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="27" y="6" width="57" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "Sidebar + Main Layout",
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
      name: "sidebar",
      type: "blocks",
      label: "Sidebar Content (Left)",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the sidebar content",
      },
    },
    {
      name: "mainContent",
      type: "blocks",
      label: "Main Content Area",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the main content area",
      },
    },
    {
      name: "className",
      type: "text",
      label: "Custom CSS Classes",
    },
  ],
};

export const MainSidebarLayoutSection: Block = {
  slug: "mainSidebarLayout",
  interfaceName: "MultiColumn",
  labels: {
    singular: "Main + Sidebar Layout",
    plural: "Main + Sidebar Layouts",
  },
  imageURL: `<svg width="90" height="28" viewBox="0 0 90 28" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="57" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="67" y="6" width="17" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "Main + Sidebar Layout",
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
      name: "mainContent",
      type: "blocks",
      label: "Main Content Area",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the main content area",
      },
    },
    {
      name: "sidebar",
      type: "blocks",
      label: "Sidebar Content (Right)",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the sidebar content",
      },
    },
    {
      name: "className",
      type: "text",
      label: "Custom CSS Classes",
    },
  ],
};

export const HeaderTwoColumnsLayoutSection: Block = {
  slug: "headerTwoColumnsLayout",
  interfaceName: "MultiColumn",
  labels: {
    singular: "Header + Two Columns Layout",
    plural: "Header + Two Columns Layouts",
  },
  imageURL: `<svg width="90" height="48" viewBox="0 0 90 48" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="78" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="6" y="26" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="47" y="26" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "Header + Two Columns Layout",
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
      name: "header",
      type: "blocks",
      label: "Header Content (Full Width)",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the header content",
      },
    },
    {
      name: "leftColumn",
      type: "blocks",
      label: "Left Column Content",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the left column content",
      },
    },
    {
      name: "rightColumn",
      type: "blocks",
      label: "Right Column Content",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the right column content",
      },
    },
    {
      name: "className",
      type: "text",
      label: "Custom CSS Classes",
    },
  ],
};

export const HeaderThreeColumnsLayoutSection: Block = {
  slug: "headerThreeColumnsLayout",
  interfaceName: "MultiColumn",
  imageURL: `<svg width="90" height="48" viewBox="0 0 90 48" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="78" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="6" y="26" width="23.3333" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="33.333" y="26" width="23.3333" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="60.667" y="26" width="23.3333" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "Header + Three Columns Layout",
  labels: {
    singular: "Header + Three Columns Layout",
    plural: "Header + Three Columns Layouts",
  },
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
      name: "header",
      type: "blocks",
      label: "Header Content (Full Width)",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the header content",
      },
    },
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
            description: "Add one or more blocks for this column",
          },
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

export const MasonryLayoutSection: Block = {
  slug: "masonryLayout",
  interfaceName: "MultiColumn",
  imageURL: `<svg width="90" height="48" viewBox="0 0 90 48" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="47" y="6" width="17" height="36" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="68" y="6" width="16" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="6" y="26" width="37" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="68" y="26" width="16" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "Masonry Layout",
  labels: {
    singular: "Masonry Layout",
    plural: "Masonry Layouts",
  },
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
      name: "items",
      type: "array",
      fields: [
        {
          name: "blocks",
          type: "blocks",
          blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
          required: true,
          minRows: 1,
          admin: {
            initCollapsed: false,
            description: "Add one or more blocks for this masonry item",
          },
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

