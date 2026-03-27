import React from "react";
// Equal Columns
import {
  TwoEqualColumnsComponent,
  ThreeEqualColumnsComponent,
  FourEqualColumnsComponent,
  FiveEqualColumnsComponent,
  SixEqualColumnsComponent,
} from "./components/EqualColumns";
// Offset Columns
import {
  TwoThirdsOneThirdComponent,
  OneThirdTwoThirdsComponent,
  OneQuarterThreeQuartersComponent,
  ThreeQuartersOneQuarterComponent,
} from "./components/OffsetColumns";
// Multi-Column Layouts
import {
  SidebarMainLayoutComponent,
  MainSidebarLayoutComponent,
  HeaderTwoColumnsLayoutComponent,
  HeaderThreeColumnsLayoutComponent,
  MasonryLayoutComponent,
} from "./components/MultiColumnLayouts";
// Multi-Row Columns
import {
  TwoRowsTwoColumnsComponent,
  TwoRowsThreeColumnsComponent,
  ThreeRowsTwoColumnsComponent,
  ThreeRowsThreeColumnsComponent,
} from "./components/MultiRowColumns";

type SectionProps = Record<string, any>;

const componentMap = {
  // Equal Columns
  twoEqualColumns: TwoEqualColumnsComponent,
  threeEqualColumns: ThreeEqualColumnsComponent,
  fourEqualColumns: FourEqualColumnsComponent,
  fiveEqualColumns: FiveEqualColumnsComponent,
  sixEqualColumns: SixEqualColumnsComponent,
  // Offset Columns
  twoThirdsOneThird: TwoThirdsOneThirdComponent,
  oneThirdTwoThirds: OneThirdTwoThirdsComponent,
  oneQuarterThreeQuarters: OneQuarterThreeQuartersComponent,
  threeQuartersOneQuarter: ThreeQuartersOneQuarterComponent,
  // Multi-Column Layouts
  // sidebarMainLayout: SidebarMainLayoutComponent,
  // mainSidebarLayout: MainSidebarLayoutComponent,
  // headerTwoColumnsLayout: HeaderTwoColumnsLayoutComponent,
  // headerThreeColumnsLayout: HeaderThreeColumnsLayoutComponent,
  // masonryLayout: MasonryLayoutComponent,
  // // Multi-Row Columns
  // twoRowsTwoColumns: TwoRowsTwoColumnsComponent,
  // twoRowsThreeColumns: TwoRowsThreeColumnsComponent,
  // threeRowsTwoColumns: ThreeRowsTwoColumnsComponent,
  // threeRowsThreeColumns: ThreeRowsThreeColumnsComponent,
};

export const RenderSections: React.FC<{ sections: SectionProps[] }> = ({ sections }) => {
  return (
    <div className="sections">
      {sections?.map((section, index) => {
        const { blockType, ...blockProps } = section;
        const SectionComponent = componentMap[blockType as keyof typeof componentMap];
           console.log(`Rendering section of type: ${blockType}`);
        if (!SectionComponent) {
          console.warn(`No component found for section type: ${blockType}`);
          return null;
        }

        return <SectionComponent key={index} {...(blockProps as any)} />;
      })}
    </div>
  );
};

export default RenderSections;

