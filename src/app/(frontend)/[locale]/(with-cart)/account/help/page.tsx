import { setRequestLocale } from "next-intl/server";

import { ClientHelp } from "@/components/ClientPanel/Help";
import { type Locale } from "@/i18n/config";

const HelpPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ClientHelp />;
};
export default HelpPage;
