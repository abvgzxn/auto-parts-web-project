import type {
  Product,
  ProductCategory,
} from "@/types/product";

export type ProductFilters = {
  query: string;
  category: ProductCategory | "all";
};

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    const searchableText = [
      product.name,
      product.brand,
      product.sku,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      searchableText.includes(normalizedQuery);

    const matchesCategory =
      filters.category === "all" ||
      product.category === filters.category;

    return matchesSearch && matchesCategory;
  });
}