
import type { Product } from "@/types/product";
import type { ProductRepository } from "./product-repository";

export function createMemoryProductRepository(
  products: Product[],
): ProductRepository {
  const items = products.map((product) => ({ ...product }));

  return {
    async findAll() {
      return items.map((product) => ({ ...product }));
    },

    async findBySlug(slug) {
      const product = items.find(
        (item) => item.slug === slug,
      );

      return product ? { ...product } : null;
    },
  };
}
