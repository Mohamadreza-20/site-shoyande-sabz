import {
  apiFetch,
  apiMutate,
  generateId,
  escapeRegExp,
  resolveBase,
  throwForResponse,
  isNotFoundError,
  createNetworkError,
  CATALOG_REVALIDATE_SECONDS,
  CACHE_TAGS,
} from "@/lib/http";
import { unstable_rethrow } from "next/navigation";
import { formatTomanAmount } from "@/lib/money";
import { logger } from "@/lib/logger";
import type {
  Product,
  Category,
  CategoryWithCount,
  Review,
  ProductListQuery,
  ProductListResult,
  ProductInput,
  CategoryInput,
} from "./types";

export function getProducts() {
  return apiFetch<Product[]>("/products", {
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.products],
  });
}

export function getFeaturedProducts(limit = 4) {
  return apiFetch<Product[]>(`/products?_limit=${limit}`, {
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.products],
  });
}

export async function getRelatedProducts(
  productId: string,
  category: string,
  limit = 7
): Promise<Product[]> {
  const sameCategoryParams = new URLSearchParams({
    category,
    id_ne: productId,
    _limit: String(limit),
  });

  const sameCategory = await apiFetch<Product[]>(`/products?${sameCategoryParams}`, {
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.products],
  });

  if (sameCategory.length >= limit) return sameCategory;

  const fillParams = new URLSearchParams({
    category_ne: category,
    id_ne: productId,
    _limit: String(limit),
  });
  const otherCategory = await apiFetch<Product[]>(`/products?${fillParams}`, {
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.products],
  });

  return sameCategory.concat(otherCategory).slice(0, limit);
}

export function getProductsByIds(ids: string[]) {
  if (ids.length === 0) return Promise.resolve<Product[]>([]);
  const params = new URLSearchParams();
  ids.forEach((id) => params.append("id", id));
  return apiFetch<Product[]>(`/products?${params.toString()}`, {
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.products],
  });
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    return await apiFetch<Product>(`/products/${id}`, {
      revalidate: CATALOG_REVALIDATE_SECONDS,
      tags: [CACHE_TAGS.products],
    });
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
}

export function getProductReviews(productId: string) {
  return apiFetch<Review[]>(`/reviews?productId=${productId}`);
}

export function getCategories() {
  return apiFetch<Category[]>("/categories", {
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.categories],
  });
}

const PRODUCTS_PAGE_SIZE_DEFAULT = 15;

export async function getProductsFiltered(
  query: ProductListQuery = {}
): Promise<ProductListResult> {
  const {
    categories = [],
    search = "",
    sort = "featured",
    page = 1,
    pageSize = PRODUCTS_PAGE_SIZE_DEFAULT,
  } = query;

  const currentPage = Math.max(1, Math.floor(page) || 1);

  const params = new URLSearchParams();
  categories.forEach((category) => params.append("category", category));
  if (search.trim()) params.set("title_like", escapeRegExp(search.trim()));
  if (sort === "cheapest") {
    params.set("_sort", "priceValue");
    params.set("_order", "asc");
  } else if (sort === "expensive") {
    params.set("_sort", "priceValue");
    params.set("_order", "desc");
  } else if (sort === "top-rated") {
    params.set("_sort", "ratingValue");
    params.set("_order", "desc");
  }
  params.set("_page", String(currentPage));
  params.set("_limit", String(pageSize));

  const path = `/products?${params.toString()}`;
  const base = resolveBase();
  let res: Response;
  try {
    res = await fetch(`${base}${path}`, {
      next: { revalidate: CATALOG_REVALIDATE_SECONDS, tags: [CACHE_TAGS.products] },
    });
  } catch (error) {
    unstable_rethrow(error);
    throw createNetworkError(path, error);
  }
  if (!res.ok) throwForResponse(res, path);

  const products = (await res.json()) as Product[];
  const totalHeader = res.headers.get("X-Total-Count");
  const total = totalHeader ? parseInt(totalHeader, 10) : products.length;
  return {
    products,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    page: currentPage,
  };
}

export async function getProductCategoryCounts(): Promise<Record<string, number>> {
  const rows = await apiFetch<{ category: string }[]>("/products?_fields=category", {
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.products],
  });
  return rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.category] = (acc[row.category] ?? 0) + 1;
    return acc;
  }, {});
}

export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  const [categories, counts] = await Promise.all([getCategories(), getProductCategoryCounts()]);
  return categories.map((category) => ({
    ...category,
    productCount: counts[category.title] ?? 0,
  }));
}

export async function getProductStockSummary(): Promise<{ stock: number }[]> {
  return apiFetch<{ stock: number }[]>("/products?_fields=stock", {
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.products],
  });
}

export function createProduct(input: ProductInput) {
  const payload: Product = {
    id: generateId("p"),
    title: input.title,
    category: input.category,
    rating: "۰.۰",
    ratingValue: 0,
    reviewCount: 0,
    price: formatTomanAmount(input.priceValue),
    priceValue: input.priceValue,
    ...(input.oldPriceValue
      ? { oldPrice: formatTomanAmount(input.oldPriceValue), oldPriceValue: input.oldPriceValue }
      : {}),
    image: input.image,
    description: input.description,
    highlights: input.highlights,
    usage: input.usage,
    stock: input.stock,
  };
  return apiMutate<Product>("/products", "POST", payload);
}

export function updateProduct(id: string, input: ProductInput) {
  const payload: Partial<Product> = {
    title: input.title,
    category: input.category,
    price: formatTomanAmount(input.priceValue),
    priceValue: input.priceValue,
    oldPrice: input.oldPriceValue ? formatTomanAmount(input.oldPriceValue) : undefined,
    oldPriceValue: input.oldPriceValue,
    image: input.image,
    description: input.description,
    highlights: input.highlights,
    usage: input.usage,
    stock: input.stock,
  };
  return apiMutate<Product>(`/products/${id}`, "PATCH", payload);
}

export function deleteProduct(id: string) {
  return apiMutate<true>(`/products/${id}`, "DELETE");
}

export function createCategory(input: CategoryInput) {
  const payload: Category = { id: generateId("c"), ...input };
  return apiMutate<Category>("/categories", "POST", payload);
}

export function updateCategory(id: string, input: CategoryInput) {
  return apiMutate<Category>(`/categories/${id}`, "PATCH", input);
}

export function deleteCategory(id: string) {
  return apiMutate<true>(`/categories/${id}`, "DELETE");
}

async function recalculateProductRating(productId: string) {
  try {
    const reviews = await apiFetch<Review[]>(`/reviews?productId=${productId}`);
    const reviewCount = reviews.length;
    const average =
      reviewCount > 0 ? reviews.reduce((sum, r) => sum + r.ratingValue, 0) / reviewCount : 0;
    const rounded = Math.round(average * 10) / 10;
    await apiMutate(`/products/${productId}`, "PATCH", {
      ratingValue: rounded,
      rating: rounded.toLocaleString("fa-IR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
      reviewCount,
    });
  } catch (error) {
    logger.error("[api] could not recalculate product rating", error);
  }
}

export async function createReview(input: {
  productId: string;
  name: string;
  ratingValue: number;
  comment: string;
}): Promise<Review> {
  const review = await apiMutate<Review>("/reviews", "POST", { ...input, date: "همین حالا" });
  await recalculateProductRating(input.productId);
  return review;
}

export type { Product, Category, Review, ProductInput, CategoryInput };
