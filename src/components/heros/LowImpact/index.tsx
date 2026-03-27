import RichText from "@/components/RichText";

import type { Page } from "@/types";

type LowImpactHeroType =
  | {
      children?: React.ReactNode;
      richText?: never;
    }
  | (Omit<Page["hero"], "richText"> & {
      children?: never;
      richText?: Page["hero"]["richText"];
    });

export const LowImpactHero = ({ children, richText }: LowImpactHeroType) => {
  return (
    <div className="container mt-16">
      <div className="max-w-3xl">
        {children ?? (richText && <RichText data={richText} enableGutter={false} />)}
        {!children && !richText && (
          <div
            className="py-8 text-gray-500"
            data-visual-editing="true"
            data-block-type="hero"
            data-field="hero.richText"
          >
            <h1 className="mb-4 text-3xl font-bold">Welcome to your site</h1>
            <p>This is your hero section. Add content from the admin panel.</p>
          </div>
        )}
      </div>
    </div>
  );
};

