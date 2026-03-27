import type { Metadata } from "next";
import "../globals.scss";
import { CustomerAuthProvider } from "@/components/CustomerAuthProvider";
// Assuming I18nProvider is not currently built in the Phase 04 set or we omit it if we don't have it, but for blueprint matching:
import { I18nProvider } from "@/lib/i18n/context";

export const metadata: Metadata = {
  title: "KalpTree",
  description: "Public portal powered by KalpZero.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CustomerAuthProvider>
          {/* If I18nProvider doesn't exist, we might have a build error later, but we stick to the blueprint */}
          <I18nProvider>{children}</I18nProvider>
        </CustomerAuthProvider>
      </body>
    </html>
  );
}

