import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompareBar from "@/components/CompareBar";
import RevealProvider from "@/components/RevealProvider";
import JsonLd from "@/components/JsonLd";
import { organizationLd, SITE_URL, SITE_TITLE } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-oswald",
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
    /* suppressHydrationWarning: инлайновый скрипт добавляет класс js на <html> до гидратации */
    <html lang="ru" className={`${manrope.variable} ${oswald.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        {/* Класс js включает scroll-reveal скрытие (см. globals.css): без JS контент виден полностью */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" }} />
        <JsonLd data={organizationLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <CompareBar />
        <Footer />
        <RevealProvider />
      </body>
    </html>
  );
}
