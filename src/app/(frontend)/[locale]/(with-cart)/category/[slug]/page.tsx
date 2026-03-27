import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { ProductList } from "@/components/ProductList";
import { type Locale } from "@/i18n/config";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  try {
    const locale = (await getLocale()) as Locale;
    const { slug } = await params;
    const { color, size, sortBy } = await searchParams;

    // TODO: Replace with your custom API call to fetch category & products
    // e.g. const { category, products } = await fetchCategoryData(slug, locale, { color, size, sortBy });
    void locale;

    const colorArr = color ? color.split(",") : [];
    const sizeArr = size ? size.split(",") : [];

    // Stub: no products fetched yet — wire up your API here
    const products: never[] = [];
    const categoryTitle = slug;

    return (
      <ProductList
        filteredProducts={products}
        title={categoryTitle}
        searchParams={{
          color: colorArr,
          size: sizeArr,
          sortBy: sortBy ?? "most-popular",
        }}
      />
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
};

export default CategoryPage;
