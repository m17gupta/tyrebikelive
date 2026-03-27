import { LoginPageWithoutOAuth } from "@/components/(ecommerce)/LoginPage/WithoutOAuth";
import { type Locale } from "@/i18n/config";
import { redirect } from "@/i18n/routing";
import { getCustomer } from "@/utilities/getCustomer";

export const dynamic = "force-dynamic";

const LoginPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ verified?: string }>;
}) => {
  const user = await getCustomer();
  const { locale } = await params;
  const { verified } = await searchParams;

  if (user?.id) {
    return redirect({ locale: locale, href: "/account/orders" });
  }

  // getCachedGlobal removed (Payload CMS). OAuth is not supported; always show login form.
  return <LoginPageWithoutOAuth verified={verified} />;
};
export default LoginPage;
