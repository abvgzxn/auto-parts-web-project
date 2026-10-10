import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";

const arimo = Arimo({
  subsets: ["latin", "cyrillic"],
  variable: "--font-arimo",
  display: "swap",
});

const title = "Wellcar — магазин автозапчастей в Калязине";
const description =
  "Автозапчасти для автомобилей в наличии и на заказ. Подбор по VIN. Большой выбор моторных масел для автомобилей, мотоциклов, квадроциклов и лодочных моторов. Магазин Wellcar в Калязине.";
const socialImage = {
  url: "/images/wellcar-og.png",
  width: 1200,
  height: 630,
  alt: "Wellcar — автозапчасти и моторные масла в Калязине",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://well-car.ru"),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: siteConfig.name,
    locale: "ru_RU",
    type: "website",
    url: siteConfig.url,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${arimo.variable} antialiased`}>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
