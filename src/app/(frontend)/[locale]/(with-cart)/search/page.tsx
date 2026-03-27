import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

import { ProductList } from "@/components/ProductList";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";

// Force dynamic rendering since search depends on search params
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type SearchPageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ search: string }>;
};

const SearchPage = async ({ params, searchParams }: SearchPageProps) => {
  const { locale } = await params;
  const { search } = await searchParams;

  setRequestLocale(locale);

  // TODO: Replace with your custom API call to search products
  // e.g. const products = search ? await searchProducts(search) : [];
  const products: never[] = [];

  const t = await getTranslations("Search");

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-gray-200 pt-24 pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {t("results")} {search}
        </h1>
      </div>
      <ProductList filteredProducts={products} title={undefined} />
    </main>
  );
};
export default SearchPage;
