import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "demo-001",
    slug: "motor-oil-5w30",
    name: "Моторное масло 5W-30",
    brand: "Демонстрационный товар",
    sku: "DEMO-OIL-001",
    category: "oils",
    availability: "in_stock",
  },
  {
    id: "demo-002",
    slug: "oil-filter",
    name: "Масляный фильтр",
    brand: "Демонстрационный товар",
    sku: "DEMO-FILTER-001",
    category: "filters",
    availability: "on_order",
  },
  {
    id: "demo-003",
    slug: "brake-pads",
    name: "Тормозные колодки",
    brand: "Демонстрационный товар",
    sku: "DEMO-BRAKE-001",
    category: "brakes",
    availability: "in_stock",
  },
  {
    id: "demo-004",
    slug: "shock-absorber",
    name: "Амортизатор подвески",
    brand: "Демонстрационный товар",
    sku: "DEMO-SUSP-001",
    category: "suspension",
    availability: "on_order",
  },
];