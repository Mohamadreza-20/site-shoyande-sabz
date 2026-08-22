import type { CartItem } from "./types";

export const MAX_CART_QUANTITY = 99;

export function clampQuantity(quantity: number, stock?: number) {
  const cap = typeof stock === "number" ? Math.min(stock, MAX_CART_QUANTITY) : MAX_CART_QUANTITY;
  return Math.max(0, Math.min(quantity, cap));
}

export function idsKeyOf(items: CartItem[]) {
  return [...new Set(items.map((item) => item.id))].sort().join(",");
}

export function formatToman(value: number) {
  return `${value.toLocaleString("fa-IR")} تومان`;
}
