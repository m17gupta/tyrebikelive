import { setRequestLocale } from "next-intl/server";

import { type Locale } from "@/i18n/config";
import { getCustomer } from "@/utilities/getCustomer";
import { Orders } from "@/components/ClientPanel/Orders";

const OrdersDataPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const user = await getCustomer();
  const { locale } = await params;
  setRequestLocale(locale);
  if (!user) return null;
  return <Orders />;
};
export default OrdersDataPage;
