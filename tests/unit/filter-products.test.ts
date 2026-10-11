
import { describe, expect, it } from "vitest";

import { products } from "../../src/data/products";
import { filterProducts } from "../../src/lib/catalog/filter-products";

describe("filterProducts", () => {
  it("возвращает все товары без фильтров", () => {
    const result = filterProducts(products, {
      query: "",
      category: "all",
    });

    expect(result).toHaveLength(4);
  });

  it("ищет товары без учёта регистра", () => {
    const result = filterProducts(products, {
      query: "МАСЛЯНЫЙ",
      category: "all",
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Масляный фильтр");
  });

  it("игнорирует пробелы по краям запроса", () => {
    const result = filterProducts(products, {
      query: "  тормозные  ",
      category: "all",
    });

    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("brakes");
  });

  it("ищет по артикулу", () => {
    const result = filterProducts(products, {
      query: "DEMO-OIL-001",
      category: "all",
    });

    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("oils");
  });

  it("фильтрует по категории", () => {
    const result = filterProducts(products, {
      query: "",
      category: "filters",
    });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Масляный фильтр");
  });

  it("совмещает поиск и категорию", () => {
    const result = filterProducts(products, {
      query: "масляный",
      category: "filters",
    });

    expect(result).toHaveLength(1);
  });

  it("возвращает пустой массив, если совпадений нет", () => {
    const result = filterProducts(products, {
      query: "несуществующий товар",
      category: "all",
    });

    expect(result).toEqual([]);
  });

  it("не изменяет исходный массив", () => {
    const originalIds = products.map((product) => product.id);

    filterProducts(products, {
      query: "масло",
      category: "all",
    });

    expect(products.map((product) => product.id)).toEqual(
      originalIds,
    );
  });
});
