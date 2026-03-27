import { Config, DropZone } from "@measured/puck";
import { HeadingBlock } from "./Blocks/Heading/Heading";
import { SectionBlock } from "./Blocks/Section/Section";
import { RowBlock } from "./Blocks/Row/Row";
import { ColumnBlock } from "./Blocks/Columns/Column";
import { BlurbBlock } from "./Blocks/Blurb/Blurb";
import { InfoBlurbBlock } from "./Blocks/Blurb/Blurb2";
import { FeaturedWorksBlock } from "./Blocks/FeaturedWorks/Featured";
import { AccordionBlock } from "./Blocks/Accordian/Accordian";
import { HeroBlock } from "./Blocks/Hero/Hero";
import { AboutSliderBlock } from "./Blocks/About/AboutSlider";
import { TestimonialBlock } from "./Blocks/Testimonials/Testimonials";
import { HeroNormalBlock } from "./Blocks/Hero/Hero2";
import {HeaderBlock} from "./Blocks/Header/Header";
import {TabsBlock} from "./Blocks/Tabs/Tabs"
import {FooterBlock} from "./Blocks/Footer/Footer"
import { HeroSliderBlock } from "./Blocks/Hero/Hero3";
import { TwoColumeCardBlock } from "./Blocks/TwoColumeCart/TwoColumeCart";
import { FAQSection } from "./Blocks/Accordian/FAQSection";
import { BrandSliderBlock } from "./Blocks/Brand/LogoSlider";
import { AboutNormalType } from "./Blocks/About/AboutTypeNormal";
import { PortfolioSimpleType } from "./Blocks/Portfolio/PortfolioSimple";
import { NavBar } from "./Blocks/Header/Navigation";


export const config: Config = {
  components: {
    HeadingBlock: HeadingBlock,
    SectionBlock: SectionBlock,
    RowBlock: RowBlock,
    ColumnBlock: ColumnBlock,
    BlurbBlock: BlurbBlock,
    TabsBlock:TabsBlock,
    FooterBlock:FooterBlock,
    TwoColumeCardBlock:TwoColumeCardBlock,
    HeaderBlock:HeaderBlock,
    Featured:FeaturedWorksBlock,
    InfoBlurbBlock:InfoBlurbBlock,
    // CarouselBlock: CarouselBlock,
    AccordionBlock: AccordionBlock,
    BrandSliderBlock: BrandSliderBlock,
    HeroBlock: HeroBlock,
    AboutSliderBlock: AboutSliderBlock,
    TestimonialBlock: TestimonialBlock,
    HeroNormalBlock: HeroNormalBlock,
    HeroSliderBlock: HeroSliderBlock,
    FAQSection: FAQSection,
    AboutNormalType: AboutNormalType,
    PortfolioSimpleType: PortfolioSimpleType,
    NavBar: NavBar,
  },
  categories: {
    Hero: {
      components: ["HeroNormalBlock", "HeroBlock", "HeroSliderBlock"],
    },
    About: {
      components: ["AboutNormalType", "AboutSliderBlock"],
    },
    Portfolio: {
      components: ["PortfolioSimpleType"],
    },
    "New Module": {
      components: ["HeaderBlock"]
    },
    Header: {
      components: ["NavBar"],
    },
  },

  root: {
    render: ({ children }) => (
      <div>
        <DropZone
          zone="NavBar"
          minEmptyHeight={80}
          style={{ maxHeight: 100 }}
        />
        {children}
      </div>
    ),
  },
};

