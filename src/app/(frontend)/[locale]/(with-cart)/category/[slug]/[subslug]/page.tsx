import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { ProductList } from "@/components/ProductList";
import { type Locale } from "@/i18n/config";

const SubcategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ subslug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  try {
    const locale = (await getLocale()) as Locale;
    const { subslug } = await params;
    const { color, size, sortBy } = await searchParams;

    // TODO: Replace with your custom API call to fetch subcategory & products
    // e.g. const { subcategory, products } = await fetchSubcategoryData(subslug, locale, { color, size, sortBy });
    void locale;

    const colorArr = color ? color.split(",") : [];
    const sizeArr = size ? size.split(",") : [];

    // Stub: no products fetched yet — wire up your API here
    const products: never[] = [];
    const subcategoryTitle = subslug;

    return (
      <ProductList
        filteredProducts={products}
        title={subcategoryTitle}
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

export default SubcategoryPage;
