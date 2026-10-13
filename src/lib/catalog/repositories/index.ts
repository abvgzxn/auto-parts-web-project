import { products } from "@/data/products";
import { createMemoryProductRepository } from "./memory-product-repository";

export const productRepository =
  createMemoryProductRepository(products);