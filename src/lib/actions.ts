"use server";

import { updateTag } from "next/cache";
import { CACHE_TAGS } from "./http";

export async function revalidateProductsCache() {
  updateTag(CACHE_TAGS.products);
}

export async function revalidateCategoriesCache() {
  updateTag(CACHE_TAGS.categories);
}

export async function revalidateBlogCache() {
  updateTag(CACHE_TAGS.blog);
}
