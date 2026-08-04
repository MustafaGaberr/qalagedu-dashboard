import type { Metadata } from "next";
import { Cairo, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { TooltipProvider } from "@/components/ui/tooltip";
import { brandConfig } from "@/config/brand";
import { getTextDirection, type AppLocale } from "@/i18n/locales";

import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(brandConfig.url),
  title: {
    default: brandConfig.dashboardName,
    template: `%s | ${brandConfig.dashboardName}`,
  },
  description: brandConfig.description,
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await getLocale()) as AppLocale;
  const messages = await getMessages();
  const direction = getTextDirection(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${cairo.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full">
        <NextIntlClientProvider messages={messages}>
          <TooltipProvider>{children}</TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
