import { describe, expect, it } from "vitest";

import { products } from "../../src/data/products";
import { createMemoryProductRepository } from "../../src/lib/catalog/repositories/memory-product-repository";

describe("MemoryProductRepository", () => {
  const repository = createMemoryProductRepository(products);

  it("возвращает все товары", async () => {
    const result = await repository.findAll();

    expect(result).toHaveLength(4);
    expect(result[0].id).toBe("demo-001");
  });

  it("находит товар по slug", async () => {
    const result = await repository.findBySlug("oil-filter");

    expect(result?.name).toBe("Масляный фильтр");
    expect(result?.sku).toBe("DEMO-FILTER-001");
  });

  it("возвращает null для неизвестного slug", async () => {
    const result = await repository.findBySlug("unknown-product");

    expect(result).toBeNull();
  });

  it("не изменяет исходный массив при получении списка", async () => {
    const originalLength = products.length;

    const result = await repository.findAll();
    result.pop();

    expect(products).toHaveLength(originalLength);
  });
});