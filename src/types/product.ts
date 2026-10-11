export type ProductAvailability =
  | "in_stock"
  | "on_order"
  | "out_of_stock";

export type ProductCategory =
  | "oils"
  | "filters"
  | "brakes"
  | "suspension"
  | "other";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  sku: string;
  category: ProductCategory;
  description?: string;
  imageUrl?: string;
  priceRub?: number;
  availability: ProductAvailability;
}