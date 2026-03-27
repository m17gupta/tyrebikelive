import React from "react";
import { cn } from "@/utilities/cn";

// Helper function to render nested blocks
const renderNestedBlocks = (blocks: any[]) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return blocks.map((nestedBlock: any, index: number) => {
    const { blockType } = nestedBlock;

    // Import block components dynamically or use a component map
    // For now, we'll render basic content
    if (blockType === "content" && nestedBlock.content) {
      return (
        <div key={index} className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: nestedBlock.content }} />
        </div>
      );
    }

    return (
      <div key={index} className="block">
        <pre>{JSON.stringify(nestedBlock, null, 2)}</pre>
      </div>
    );
  });
};

// Base Section Props interface
interface BaseSectionProps {
  backgroundColor?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

// Two Equal Columns Section Component
export const TwoEqualColumns: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", gap = "md", columns = [], className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className={cn("grid grid-cols-1 md:grid-cols-2", gapClasses[gap])}>
          {columns.map((column: any, index: number) => (
            <div key={index} className="flex-1">
              {column.blocks && renderNestedBlocks(column.blocks)}
              {!column.blocks && column.content && (
                <div dangerouslySetInnerHTML={{ __html: column.content }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Three Equal Columns Section Component
export const ThreeEqualColumns: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", gap = "md", columns = [], className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className={cn("grid grid-cols-1 md:grid-cols-3", gapClasses[gap])}>
          {columns.map((column: any, index: number) => (
            <div key={index} className="flex-1">
              {column.blocks && renderNestedBlocks(column.blocks)}
              {!column.blocks && column.content && (
                <div dangerouslySetInnerHTML={{ __html: column.content }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Four Equal Columns Section Component
export const FourEqualColumns: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", gap = "md", columns = [], className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4", gapClasses[gap])}>
          {columns.map((column: any, index: number) => (
            <div key={index} className="flex-1">
              {column.blocks && renderNestedBlocks(column.blocks)}
              {!column.blocks && column.content && (
                <div dangerouslySetInnerHTML={{ __html: column.content }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Offset Columns Components
export const TwoThirdsOneThird: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", gap = "md", leftColumn, rightColumn, className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className={cn("grid grid-cols-1 lg:grid-cols-3", gapClasses[gap])}>
          <div className="lg:col-span-2">
            {typeof leftColumn === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: leftColumn }} />
            ) : (
              leftColumn
            )}
          </div>
          <div className="lg:col-span-1">
            {typeof rightColumn === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: rightColumn }} />
            ) : (
              rightColumn
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const OneThirdTwoThirds: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", gap = "md", leftColumn, rightColumn, className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className={cn("grid grid-cols-1 lg:grid-cols-3", gapClasses[gap])}>
          <div className="lg:col-span-1">
            {typeof leftColumn === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: leftColumn }} />
            ) : (
              leftColumn
            )}
          </div>
          <div className="lg:col-span-2">
            {typeof rightColumn === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: rightColumn }} />
            ) : (
              rightColumn
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const OneQuarterThreeQuarters: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", gap = "md", leftColumn, rightColumn, className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className={cn("grid grid-cols-1 lg:grid-cols-4", gapClasses[gap])}>
          <div className="lg:col-span-1">
            {typeof leftColumn === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: leftColumn }} />
            ) : (
              leftColumn
            )}
          </div>
          <div className="lg:col-span-3">
            {typeof rightColumn === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: rightColumn }} />
            ) : (
              rightColumn
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ThreeQuartersOneQuarter: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", gap = "md", leftColumn, rightColumn, className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className={cn("grid grid-cols-1 lg:grid-cols-4", gapClasses[gap])}>
          <div className="lg:col-span-3">
            {typeof leftColumn === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: leftColumn }} />
            ) : (
              leftColumn
            )}
          </div>
          <div className="lg:col-span-1">
            {typeof rightColumn === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: rightColumn }} />
            ) : (
              rightColumn
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Multi-row components (simplified for now)
export const TwoRowsTwoColumns: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", items = [], className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item: any, index: number) => (
            <div key={index}>
              {typeof item.content === "string" ? (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              ) : (
                item.content
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TwoRowsThreeColumns: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", items = [], className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item: any, index: number) => (
            <div key={index}>
              {typeof item.content === "string" ? (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              ) : (
                item.content
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ThreeRowsTwoColumns: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", items = [], className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item: any, index: number) => (
            <div key={index}>
              {typeof item.content === "string" ? (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              ) : (
                item.content
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ThreeRowsThreeColumns: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", items = [], className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item: any, index: number) => (
            <div key={index}>
              {typeof item.content === "string" ? (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              ) : (
                item.content
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Complex Layout Components
export const SidebarMainLayout: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", sidebar, mainContent, className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            {typeof sidebar === "string" ? <div dangerouslySetInnerHTML={{ __html: sidebar }} /> : sidebar}
          </div>
          <div className="lg:col-span-3">
            {typeof mainContent === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: mainContent }} />
            ) : (
              mainContent
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const MainSidebarLayout: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", mainContent, sidebar, className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {typeof mainContent === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: mainContent }} />
            ) : (
              mainContent
            )}
          </div>
          <div className="lg:col-span-1">
            {typeof sidebar === "string" ? <div dangerouslySetInnerHTML={{ __html: sidebar }} /> : sidebar}
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeaderTwoColumnsLayout: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", header, leftColumn, rightColumn, className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          {typeof header === "string" ? <div dangerouslySetInnerHTML={{ __html: header }} /> : header}
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            {typeof leftColumn === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: leftColumn }} />
            ) : (
              leftColumn
            )}
          </div>
          <div>
            {typeof rightColumn === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: rightColumn }} />
            ) : (
              rightColumn
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeaderThreeColumnsLayout: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", header, columns = [], className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          {typeof header === "string" ? <div dangerouslySetInnerHTML={{ __html: header }} /> : header}
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {columns.map((column: any, index: number) => (
            <div key={index}>
              {typeof column.content === "string" ? (
                <div dangerouslySetInnerHTML={{ __html: column.content }} />
              ) : (
                column.content
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MasonryLayout: React.FC<any> = (props) => {
  const { backgroundColor = "white", padding = "md", items = [], className } = props;

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-50",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  return (
    <section className={cn(backgroundClasses[backgroundColor], paddingClasses[padding], className)}>
      <div className="container mx-auto px-4">
        <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
          {items.map((item: any, index: number) => (
            <div key={index} className="break-inside-avoid">
              {typeof item.content === "string" ? (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              ) : (
                item.content
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

