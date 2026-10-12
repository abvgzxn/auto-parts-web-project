import type { Product } from "@/types/product";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

const availabilityLabels = {
  in_stock: "В наличии",
  on_order: "Под заказ",
  out_of_stock: "Нет в наличии",
} as const;

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4 flex aspect-4/3 items-center justify-center rounded-xl bg-brand-navy/5">
        <span className="text-sm text-muted">
          Фото товара
        </span>
      </div>

      <p className="text-sm text-muted">
        {product.brand}
      </p>

      <h2 className="mt-2 text-lg font-semibold text-brand-navy">
        {product.name}
      </h2>

      <p className="mt-2 text-sm text-muted">
        Артикул: {product.sku}
      </p>

      <p className="mt-3 text-sm font-medium text-brand-navy">
        {availabilityLabels[product.availability]}
      </p>

      <div className="mt-auto pt-5">
        <p className="text-lg font-bold text-brand-navy">
          {product.priceRub !== undefined
            ? `${product.priceRub.toLocaleString("ru-RU")} ₽`
            : "Цена по запросу"}
        </p>
      </div>
      <Link
        href={`/catalog/${product.slug}`}
          aria-label={`Подробнее о товаре: ${product.name}`}
           className="mt-4 inline-flex min-h-11 items-center rounded-lg font-semibold text-brand-navy underline underline-offset-4 transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2"
          >
      Подробнее о товаре
      </Link>
    </article>
  );
}