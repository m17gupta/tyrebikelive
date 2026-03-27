/* eslint-disable */
// beforeSync.ts — standalone version without @payloadcms/plugin-search
type DocToSync = {
  id?: string;
  doc?: { relationTo?: string; value?: unknown };
  slug?: string;
  meta?: {
    title?: string;
    image?: string | null;
    description?: string;
  };
  categories?: { relationTo: string; id: string; title?: string }[];
  [key: string]: unknown;
};

type BeforeSyncArgs = {
  originalDoc: any;
  searchDoc: DocToSync;
  payload?: unknown;
};

export const beforeSyncWithSearch = async ({ originalDoc, searchDoc }: BeforeSyncArgs): Promise<DocToSync> => {
  const { slug, id, categories, title, meta } = originalDoc;

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
    },
    categories: [],
  };

  if (categories && Array.isArray(categories) && categories.length > 0) {
    try {
      const mappedCategories = categories.map((category) => {
        const { id, title } = category;
        return { relationTo: "categories", id, title };
      });
      modifiedDoc.categories = mappedCategories;
    } catch (err) {
      const collection = (searchDoc.doc as any)?.relationTo;
      console.error(
        `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
      );
    }
  }

  return modifiedDoc;
};
