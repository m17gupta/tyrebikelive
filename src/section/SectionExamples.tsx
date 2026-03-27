"use client";

import React from "react";
import {
  TwoEqualColumns,
  ThreeEqualColumns,
  FourEqualColumns,
  FiveEqualColumns,
  SixEqualColumns,
} from "./EqualColumns";
import {
  TwoThirdsOneThird,
  OneThirdTwoThirds,
  OneQuarterThreeQuarters,
  ThreeQuartersOneQuarter,
  OffsetSmallLeft,
  OffsetSmallRight,
} from "./OffsetColumns";
import {
  TwoRowsTwoColumns,
  TwoRowsThreeColumns,
  ThreeRowsTwoColumns,
  ThreeRowsThreeColumns,
  TwoRowsFourColumns,
  ThreeRowsFourColumns,
} from "./MultiRowColumns";
import {
  SidebarMainLayout,
  MainSidebarLayout,
  HeaderTwoColumnsLayout,
  HeaderThreeColumnsLayout,
  TwoColumnsFooterLayout,
  MasonryLayout,
  CenterWithSidePanels,
} from "./MultiColumnLayouts";
import ContentCard from "./ContentCard";
import ImageCard from "./ImageCard";
import TextBlock from "./TextBlock";

// Example Usage Component
const SectionExamples: React.FC = () => {
  // Sample content for demonstrations
  const sampleCards = [
    <ContentCard
      key={1}
      title="Feature Card 1"
      description="This is a sample description for the first feature card. It showcases the layout capabilities."
      variant="card"
      button={{ text: "Learn More", variant: "primary" }}
    />,
    <ContentCard
      key={2}
      title="Feature Card 2"
      description="This is a sample description for the second feature card with different styling."
      variant="featured"
      button={{ text: "Get Started", variant: "secondary" }}
    />,
    <ContentCard
      key={3}
      title="Feature Card 3"
      description="This demonstrates the third card in our layout system."
      variant="bordered"
      button={{ text: "View Details", variant: "outline" }}
    />,
    <ContentCard
      key={4}
      title="Feature Card 4"
      description="The fourth card shows additional layout possibilities."
      variant="minimal"
      button={{ text: "Explore", variant: "primary" }}
    />,
  ];

  const sampleTextBlocks = [
    <TextBlock
      key={1}
      heading="Section Title"
      subheading="This is a subheading"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      variant="default"
      size="lg"
    />,
    <TextBlock
      key={2}
      heading="Sidebar Content"
      content="This is sidebar content that complements the main content area."
      variant="accent"
      size="md"
    />,
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="space-y-16 py-8">
        {/* Example 1: Two Equal Columns */}
        <TwoEqualColumns columns={sampleCards.slice(0, 2)} backgroundColor="white" padding="lg" gap="lg" />

        {/* Example 2: Three Equal Columns */}
        <ThreeEqualColumns columns={sampleCards.slice(0, 3)} backgroundColor="gray" padding="md" gap="md" />

        {/* Example 3: Four Equal Columns */}
        <FourEqualColumns columns={sampleCards} backgroundColor="blue" padding="lg" gap="lg" />

        {/* Example 4: Offset Layout (2/3 - 1/3) */}
        <TwoThirdsOneThird
          leftColumn={sampleTextBlocks[0]}
          rightColumn={sampleTextBlocks[1]}
          backgroundColor="white"
          padding="xl"
          gap="lg"
        />

        {/* Example 5: Multi-Row Layout */}
        <TwoRowsTwoColumns
          rows={[sampleCards.slice(0, 2), sampleCards.slice(2, 4)]}
          backgroundColor="transparent"
          padding="md"
          gap="md"
        />

        {/* Example 6: Header + Two Columns */}
        <HeaderTwoColumnsLayout
          content={[
            <TextBlock
              key="header"
              heading="Section Header"
              subheading="This header spans the full width"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              variant="featured"
              size="xl"
              alignment="center"
            />,
            sampleCards[0],
            sampleCards[1],
          ]}
          backgroundColor="gray"
          padding="xl"
          gap="lg"
        />

        {/* Example 7: Sidebar Layout */}
        <SidebarMainLayout
          content={[
            <TextBlock
              key="sidebar"
              heading="Sidebar"
              content="This is the sidebar content area."
              variant="accent"
            />,
            <div key="main" className="space-y-4">
              {sampleCards.slice(0, 2)}
            </div>,
          ]}
          backgroundColor="white"
          padding="lg"
          gap="lg"
        />

        {/* Example 8: Masonry Layout */}
        <MasonryLayout
          content={[
            <ContentCard
              key="masonry-1"
              title="Masonry Card 1"
              description="Short description"
              variant="card"
            />,
            <ContentCard
              key="masonry-2"
              title="Masonry Card 2"
              description="This is a longer description that will make this card taller than others in the masonry layout."
              variant="featured"
            />,
            <ContentCard
              key="masonry-3"
              title="Masonry Card 3"
              description="Medium length description for the third card."
              variant="bordered"
            />,
            <ContentCard
              key="masonry-4"
              title="Masonry Card 4"
              description="Another description."
              variant="minimal"
            />,
          ]}
          backgroundColor="gray"
          padding="lg"
          gap="md"
        />
      </div>
    </div>
  );
};

export default SectionExamples;

