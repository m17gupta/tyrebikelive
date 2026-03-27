import { type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

// TODO: Replace with your real Checkout component once implemented
const CheckoutPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;
  void locale;

  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
      <p className="text-gray-500">
        Checkout functionality coming soon. Wire up your custom checkout component here.
      </p>
    </main>
  );
};
export default CheckoutPage;
