import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { productRepository } from "@/lib/catalog/repositories";
import Link from "next/link";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const products = await productRepository.findAll();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

const product = await productRepository.findBySlug(slug);

  if (!product) {
    return {
      title: "Товар не найден",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.name} — демоверсия Wellcar`,
    robots: { index: false, follow: false },
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

const product = await productRepository.findBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="site-container py-10 md:py-16">
      <Link
       href="/catalog"
         className="mb-6 inline-flex min-h-11 items-center font-medium text-brand-navy underline underline-offset-4"
        >
       ← Вернуться в каталог
      </Link>
      <p className="mb-4 text-sm text-muted">
        Wellcar / Демонстрационный каталог
      </p>

      <h1 className="text-3xl font-bold text-brand-navy md:text-5xl">
        {product.name}
      </h1>

      <p className="mt-6 text-muted">
        Производитель: {product.brand}
      </p>

      <p className="mt-2 text-muted">
        Артикул: {product.sku}
      </p>

      <p className="mt-6 text-lg font-semibold text-brand-navy">
        {product.priceRub !== undefined
          ? `${product.priceRub.toLocaleString("ru-RU")} ₽`
          : "Цена по запросу"}
      </p>

      <p className="mt-6 rounded-xl border border-border p-4 text-sm text-muted">
        Демонстрационная страница. Информация о товаре
        не является предложением магазина.
      </p>
    </main>
  );
}