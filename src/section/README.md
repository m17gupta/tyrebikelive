# Section Layout Components

A comprehensive collection of responsive section layout components for building flexible page layouts, inspired by modern page builders.

## 🎯 Overview

This component library provides a complete set of section layouts that match common layout patterns:

- **Equal Columns** - Evenly distributed columns (2, 3, 4, 5, 6 columns)
- **Offset Columns** - Asymmetric layouts (1/3-2/3, 1/4-3/4, etc.)
- **Multi-Row Columns** - Grid layouts with multiple rows
- **Complex Layouts** - Advanced layouts (sidebar, header+columns, masonry)

## 📦 Components

### Base Components
- `BaseSection` - Foundation section wrapper
- `ContentCard` - Reusable content cards
- `ImageCard` - Image display components
- `TextBlock` - Text content blocks

### Layout Components

#### Equal Columns
```tsx
import { TwoEqualColumns, ThreeEqualColumns } from '@/section';

<TwoEqualColumns
  columns={[<ContentCard />, <ContentCard />]}
  backgroundColor="white"
  padding="lg"
  gap="md"
/>
```

#### Offset Columns
```tsx
import { TwoThirdsOneThird, OneQuarterThreeQuarters } from '@/section';

<TwoThirdsOneThird
  leftColumn={<ContentCard />}
  rightColumn={<TextBlock />}
  backgroundColor="gray"
  padding="xl"
/>
```

#### Multi-Row Layouts
```tsx
import { TwoRowsTwoColumns, ThreeRowsThreeColumns } from '@/section';

<TwoRowsTwoColumns
  rows={[
    [<ContentCard />, <ContentCard />],
    [<ContentCard />, <ContentCard />]
  ]}
  gap="lg"
/>
```

#### Complex Layouts
```tsx
import { SidebarMainLayout, HeaderTwoColumnsLayout } from '@/section';

<HeaderTwoColumnsLayout
  content={[
    <TextBlock heading="Section Header" />,
    <ContentCard />,
    <ContentCard />
  ]}
  backgroundColor="blue"
  padding="xl"
/>
```

## 🎨 Props

### Common Props (BaseSectionProps)
- `backgroundColor`: "white" | "gray" | "blue" | "transparent"
- `padding`: "none" | "sm" | "md" | "lg" | "xl"
- `className`: Custom CSS classes
- `id`: Section ID

### Layout-Specific Props
- `gap`: "sm" | "md" | "lg" - Spacing between columns
- `columns`: React.ReactNode[] - Array of column content
- `rows`: React.ReactNode[][] - Array of row arrays
- `content`: React.ReactNode[] - Array of content elements

## 📱 Responsive Behavior

All components are mobile-first responsive:

- **Mobile (< 768px)**: Single column stack
- **Tablet (768px+)**: 2-column layouts
- **Desktop (1024px+)**: Full multi-column layouts
- **Large (1280px+)**: Optimized spacing

## 🚀 Usage Examples

### Basic Two-Column Layout
```tsx
import { TwoEqualColumns, ContentCard } from '@/section';

function MyPage() {
  return (
    <TwoEqualColumns
      columns={[
        <ContentCard title="Feature 1" description="Description here" />,
        <ContentCard title="Feature 2" description="Description here" />
      ]}
      backgroundColor="white"
      padding="lg"
    />
  );
}
```

### Complex Header + Columns Layout
```tsx
import { HeaderThreeColumnsLayout, TextBlock, ContentCard } from '@/section';

function MySection() {
  return (
    <HeaderThreeColumnsLayout
      content={[
        <TextBlock 
          heading="Our Features" 
          subheading="Discover what makes us special"
          alignment="center"
        />,
        <ContentCard title="Feature 1" variant="featured" />,
        <ContentCard title="Feature 2" variant="card" />,
        <ContentCard title="Feature 3" variant="bordered" />
      ]}
      backgroundColor="gray"
      padding="xl"
      gap="lg"
    />
  );
}
```

### Masonry Layout
```tsx
import { MasonryLayout, ContentCard } from '@/section';

function Gallery() {
  return (
    <MasonryLayout
      content={[
        <ContentCard title="Card 1" description="Short content" />,
        <ContentCard title="Card 2" description="Much longer content that will make this card taller..." />,
        <ContentCard title="Card 3" description="Medium content" />,
        // ... more cards
      ]}
      backgroundColor="transparent"
      padding="lg"
    />
  );
}
```

## 🎯 Content Components

### ContentCard
Flexible card component with multiple variants:
```tsx
<ContentCard
  title="Card Title"
  description="Card description"
  image="/path/to/image.jpg"
  variant="featured" // default | featured | minimal | image-top | card | bordered
  button={{
    text: "Action",
    variant: "primary", // primary | secondary | outline
    onClick: () => {}
  }}
/>
```

### ImageCard
Specialized image display component:
```tsx
<ImageCard
  src="/image.jpg"
  alt="Description"
  title="Image Title"
  aspectRatio="square" // square | video | portrait | landscape | auto
  size="md" // sm | md | lg | xl | full
  overlay={true}
  rounded="md"
/>
```

### TextBlock
Structured text content:
```tsx
<TextBlock
  heading="Main Title"
  subheading="Subtitle"
  content="Text content or JSX"
  variant="featured" // default | featured | minimal | accent
  size="lg" // sm | md | lg | xl
  alignment="center" // left | center | right
/>
```

## 🔧 Customization

All components accept custom CSS classes via the `className` prop and can be styled using Tailwind CSS utilities.

## 📖 Examples

See `SectionExamples.tsx` for complete working examples of all layout patterns.

## 🏗️ File Structure

```
src/section/
├── BaseSection.tsx          # Foundation component
├── EqualColumns.tsx         # Equal column layouts
├── OffsetColumns.tsx        # Asymmetric layouts
├── MultiRowColumns.tsx      # Multi-row grids
├── MultiColumnLayouts.tsx   # Complex layouts
├── ContentCard.tsx          # Content card component
├── ImageCard.tsx           # Image card component
├── TextBlock.tsx           # Text block component
├── SectionExamples.tsx     # Usage examples
├── index.ts                # Export declarations
└── README.md               # This documentation
```

## 🎉 Ready to Use

All components are fully typed with TypeScript and optimized for performance with responsive design principles.