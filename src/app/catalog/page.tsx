import type { Metadata } from "next";
import CatalogClient from "@/components/catalog/catalog-client";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Каталог автозапчастей — демоверсия",
  description: "Учебная версия каталога Wellcar с демонстрационными товарами.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="site-container py-10 md:py-16">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted">
            Wellcar / Демонстрационный каталог
          </p>

          <h1 className="mt-3 text-3xl font-bold text-brand-navy md:text-5xl">
            Каталог автозапчастей
          </h1>

          <p className="mt-4 max-w-2xl text-muted">
            Это учебная версия каталога. Товары и статусы
            наличия приведены исключительно для демонстрации.
            Они не являются реальными предложениями магазина.
          </p>
        </header>
        <CatalogClient products={products} />
      </div>
    </main>
  );
}