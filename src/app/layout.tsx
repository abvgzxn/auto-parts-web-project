import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/site-footer";

const arimo = Arimo({
  subsets: ["latin", "cyrillic"],
  variable: "--font-arimo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wellcar — магазин автозапчастей в Калязине",
  description:
    "Автозапчасти для автомобилей в наличии и на заказ. Подбор по VIN. Большой выбор моторных масел для автомобилей, мотоциклов, квадроциклов и лодочных моторов. Магазин Wellcar в Калязине.",
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