import type { Metadata } from "next";

export const generateMeta = async (args: { doc: any }): Promise<Metadata> => {
  const { doc } = args;

  const title = doc?.meta?.title || doc?.title || "Bike Tyre";
  const description = doc?.meta?.description || "Bike Tyre Ecommerce";
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
};
