import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationLd, SITE_URL, SITE_TITLE } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TITLE} | Интернет-магазин`,
    template: "%s — ИМПУЛЬС Маркет",
  },
  description:
    "Интернет-магазин источников бесперебойного питания ИМПУЛЬС: серии Юниор, Триатлон, Боксер, Фора, Формвард, Мастер и другие. Продажа B2C и B2B, склад в Москве, доставка по России.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ИМПУЛЬС Маркет",
    title: "ИМПУЛЬС — источники бесперебойного питания",
    description:
      "Каталог ИБП ИМПУЛЬС от 0,45 кВА до 600 кВА. Склад в Москве, доставка по России, B2B и B2C.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ИМПУЛЬС — источники бесперебойного питания",
    description:
      "Каталог ИБП ИМПУЛЬС от 0,45 кВА до 600 кВА. Склад в Москве, доставка по России.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={organizationLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
