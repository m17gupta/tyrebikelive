import { notFound } from "next/navigation";

import ProductGravelPage from "../../tires/gravel/page";

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  try {
    const { slug } = await params;
    const query = await searchParams;
    console.log("product slug:", slug, "query:", query);

    // TODO: Replace with your custom API call to fetch product by slug
    // e.g. const product = await fetchProduct(slug);
    // For now, render the gravel product page as a stub
    // Pass empty/stub data until the API is wired up
    const attributeValues = undefined;
    const image = undefined;
    const variants = undefined;

    return (
      <>
        <ProductGravelPage
          attributeValues={attributeValues}
          image={image}
          variants={variants}
        />
      </>
    );
  } catch {
    notFound();
  }
};

export default ProductPage;
