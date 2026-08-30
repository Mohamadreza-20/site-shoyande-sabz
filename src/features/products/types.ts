export type Product = {
  id: string;
  category: string;
  title: string;
  rating: string;
  ratingValue: number;
  reviewCount: number;
  price: string;
  priceValue: number;
  oldPrice?: string;
  oldPriceValue?: number;
  image: string;
  description: string;
  highlights: string[];
  usage: string;
  stock?: number;
};

export type Category = {
  id: string;
  title: string;
  icon: "spray" | "shirt" | "soup" | "home" | "flower";
  bg: string;
};

export type CategoryWithCount = Category & { productCount: number };

export type Review = {
  id: string;
  productId: string;
  name: string;
  ratingValue: number;
  date: string;
  comment: string;
};

export type ProductStockStatus = "inStock" | "lowStock" | "outOfStock";

import type { SortValue } from "./product-sort";

export type ProductListQuery = {
  categories?: string[];
  search?: string;
  sort?: SortValue;
  page?: number;
  pageSize?: number;
};

export type ProductListResult = {
  products: Product[];
  total: number;
  totalPages: number;
  page: number;
};

export type ProductInput = {
  title: string;
  category: string;
  priceValue: number;
  oldPriceValue?: number;
  stock: number;
  image: string;
  description: string;
  usage: string;
  highlights: string[];
};

export type CategoryInput = {
  title: string;
  icon: Category["icon"];
  bg: string;
};
