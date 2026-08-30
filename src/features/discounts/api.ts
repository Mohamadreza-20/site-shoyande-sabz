import { apiFetch, apiMutate, generateId } from "@/lib/http";
import type { Discount, DiscountInput } from "./types";

export function getDiscounts() {
  return apiFetch<Discount[]>("/discounts");
}

export function createDiscount(input: DiscountInput) {
  const payload: Discount = { id: generateId("d"), ...input };
  return apiMutate<Discount>("/discounts", "POST", payload);
}

export function updateDiscount(id: string, input: DiscountInput) {
  return apiMutate<Discount>(`/discounts/${id}`, "PATCH", input);
}

export function deleteDiscount(id: string) {
  return apiMutate<true>(`/discounts/${id}`, "DELETE");
}

export type { Discount, DiscountInput };
