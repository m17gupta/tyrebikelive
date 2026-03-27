import { type Locale } from "@/i18n/config";
import { getFilledProducts } from "@/lib/getFilledProducts";
import { getTotal } from "@/lib/getTotal";
import { type Cart } from "@/stores/CartStore/types";

export async function POST(req: Request) {
  try {
    const { cart, locale }: { cart: Cart | undefined; locale: Locale } = (await req.json()) as {
      cart: Cart | undefined;
      locale: Locale;
    };

    if (!cart) {
      return Response.json({ status: 200 });
    }

    // TODO: Replace with your custom API call to fetch products by IDs
    // e.g. const products = await fetchProductsByIds(cart.map(p => p.id), locale);
    void locale;
    const products: Parameters<typeof getFilledProducts>[0] = [];

    const filledProducts = getFilledProducts(products, cart);
    const total = getTotal(filledProducts);

    const productsWithTotal = {
      filledProducts,
      total,
      totalQuantity: filledProducts.reduce((acc, product) => acc + (product?.quantity ?? 0), 0),
    };

    return Response.json({ status: 200, productsWithTotal });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500, message: "Internal server error" });
  }
}
