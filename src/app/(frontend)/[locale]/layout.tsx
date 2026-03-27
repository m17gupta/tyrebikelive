import { GeistMono } from "geist/font/mono";

import { GeistSans } from "geist/font/sans";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import PlausibleProvider from "next-plausible";
import { type ReactNode, unstable_ViewTransition as ViewTransition } from "react";

import "../globals.css";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { Footer } from "@/components/Footer";

import { type Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { Providers } from "@/providers";
import { getServerSideURL } from "@/utilities/getURL";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { cn } from "src/utilities/cn";

import type { Metadata } from "next";



export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}) {
  const { isEnabled } = await draftMode();
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, "twp overflow-x-clip lg:overflow-y-scroll")}
      lang={locale}
      // data-thmee="light"
      // suppressHydrationWarning
    >
      <head>
        {/* <InitTheme /> */}
                <link href="/assets/img/Goodyear-Bicyle-Tires-Yellow.png" rel="icon" type="image/png" />

        <link href="/assets/img/Goodyear-Bicyle-Tires-Yellow.png" rel="icon" type="image/png" />

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Oswald:wght@200..700&display=swap" rel="stylesheet"/>

      </head>
      <body className="max-w-screen overflow-x-clip">
        {/* <ViewTransition> */}
          <Providers>
            <PlausibleProvider
              domain="ecommerce.mandala.sh"
              selfHosted={true}
              customDomain="plausible.pimento.cloud"
            />
            <NextIntlClientProvider locale={locale} messages={messages}>
              {isEnabled && <LivePreviewListener />}

              {children}
              <Footer />
            </NextIntlClientProvider>
          </Providers>
        {/* </ViewTransition> */}
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  // Override defaults to prevent the generic template description from appearing
  // in social previews. Use a single space so platforms receive a non-empty
  // value but nothing visible is shown.
  description: " ",
  openGraph: mergeOpenGraph({ description: " " }),
  twitter: {
    card: "summary_large_image",
    creator: "@payloadcms",
    description: " ",
  },
  robots: {
    index: !(process.env.NEXT_PUBLIC_ROBOTS_INDEX === "false"),
    follow: !(process.env.NEXT_PUBLIC_ROBOTS_INDEX === "false"),
  },
};
