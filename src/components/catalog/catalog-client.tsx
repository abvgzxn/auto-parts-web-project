"use client";

import { useState } from "react";
import type { Product, ProductCategory } from "@/types/product";
import ProductCard from "@/components/catalog/product-card";
import { filterProducts } from "@/lib/catalog/filter-products";

type CatalogClientProps = {
  products: Product[];
};

const categoryOptions: {
  value: ProductCategory | "all";
  label: string;
}[] = [
  { value: "all", label: "Все категории" },
  { value: "oils", label: "Масла" },
  { value: "filters", label: "Фильтры" },
  { value: "brakes", label: "Тормозная система" },
  { value: "suspension", label: "Подвеска" },
  { value: "other", label: "Другое" },
];

export default function CatalogClient({
  products,
}: CatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] =
  useState<ProductCategory | "all">("all");

  const filteredProducts = filterProducts(products, {
  query: searchQuery,
  category: selectedCategory,
});

  return (
    <section aria-label="Список товаров">
      <div className="mb-8">
        <label
          htmlFor="catalog-search"
          className="mb-2 block font-semibold text-brand-navy"
        >
          Поиск по каталогу
        </label>

        <input
          id="catalog-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Название, бренд или артикул"
          className="min-h-12 w-full max-w-xl rounded-lg border border-border bg-surface px-4 py-3 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        />
      </div>
      <div className="mb-6">
  <label
    htmlFor="catalog-category"
    className="mb-2 block font-semibold text-brand-navy"
  >
    Категория товаров
  </label>

    <select
     id="catalog-category"
      value={selectedCategory}
      onChange={(event) =>
       setSelectedCategory(
        event.target.value as ProductCategory | "all",
      )
      }
     className="min-h-12 w-full max-w-xl rounded-lg border border-border bg-surface px-4 py-3 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
      >
    {categoryOptions.map((category) => (
      <option key={category.value} value={category.value}>
        {category.label}
      </option>
        ))}
      </select>
      </div>
        <p
        className="mb-6 text-sm text-muted"
        role="status"
        aria-live="polite"
      >
        Найдено товаров: {filteredProducts.length}
      </p>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-border bg-surface p-6 text-muted">
          По вашему запросу товары не найдены.
        </p>
      )}
    </section>
  );
}