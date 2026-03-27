import { CallToAction } from "@/blocks/CallToAction/config";
import { Content } from "@/blocks/Content/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { Archive } from "@/blocks/ArchiveBlock/config";
import { FormBlock } from "@/blocks/Form/config";
import { Carousel } from "@/blocks/Carousel/config";
import { Accordion } from "@/blocks/Accordion/config";

export const TwoThirdsOneThirdSection: Block = {
  slug: "twoThirdsOneThird",
  interfaceName: "OffsetColumns",
  labels: {
    singular: "Two Thirds - One Third Layout",
    plural: "Two Thirds - One Third Layouts",
  },
  imageURL: `<svg width="90" height="28" viewBox="0 0 90 28" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="45" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="55" y="6" width="29" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "Two Thirds One Third Layout",
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
      name: "leftColumn",
      type: "blocks",
      label: "Main Content (2/3 width)",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the main content",
      },
    },
    {
      name: "rightColumn",
      type: "blocks",
      label: "Sidebar Content (1/3 width)",
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

export const OneThirdTwoThirdsSection: Block = {
  slug: "oneThirdTwoThirds",
  interfaceName: "OffsetColumns",
  labels: {
    singular: "One Third - Two Thirds Layout",
    plural: "One Third - Two Thirds Layouts",
  },
  imageURL: `<svg width="90" height="28" viewBox="0 0 90 28" xmlns="http://www.w3.org/2000/svg"><rect x="39" y="6" width="45" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="6" y="6" width="29" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "One Third Two Thirds Layout",
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
      name: "leftColumn",
      type: "blocks",
      label: "Sidebar Content (1/3 width)",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the sidebar content",
      },
    },
    {
      name: "rightColumn",
      type: "blocks",
      label: "Main Content (2/3 width)",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the main content",
      },
    },
    {
      name: "className",
      type: "text",
      label: "Custom CSS Classes",
    },
  ],
};

export const OneQuarterThreeQuartersSection: Block = {
  slug: "oneQuarterThreeQuarters",
  interfaceName: "OffsetColumns",
  labels: {
    singular: "One Quarter - Three Quarters Layout",
    plural: "One Quarter - Three Quarters Layouts",
  },
  imageURL: `<svg width="90" height="28" viewBox="0 0 90 28" xmlns="http://www.w3.org/2000/svg"><rect x="27" y="6" width="57" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="6" y="6" width="17" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "One Quarter Three Quarters Layout",
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
      name: "leftColumn",
      type: "blocks",
      label: "Sidebar Content (1/4 width)",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the sidebar content",
      },
    },
    {
      name: "rightColumn",
      type: "blocks",
      label: "Main Content (3/4 width)",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the main content",
      },
    },
    {
      name: "className",
      type: "text",
      label: "Custom CSS Classes",
    },
  ],
};

export const ThreeQuartersOneQuarterSection: Block = {
  slug: "threeQuartersOneQuarter",
  interfaceName: "OffsetColumns",
  labels: {
    singular: "Three Quarters - One Quarter Layout",
    plural: "Three Quarters - One Quarter Layouts",
  },
  imageURL: `<svg width="90" height="28" viewBox="0 0 90 28" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="57" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect><rect x="68" y="6" width="16" height="16" fill="#D2D7E4" class="et-vb-svg-nofill"></rect></svg>`,
  imageAltText: "Three Quarters One Quarter Layout",
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
      name: "leftColumn",
      type: "blocks",
      label: "Main Content (3/4 width)",
      blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, Carousel, Accordion],
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: false,
        description: "Add one or more blocks for the main content",
      },
    },
    {
      name: "rightColumn",
      type: "blocks",
      label: "Sidebar Content (1/4 width)",
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

