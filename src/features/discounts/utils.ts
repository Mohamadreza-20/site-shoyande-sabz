import { toEnglishDigits } from "@/lib/money";
import type { Discount } from "./types";

function parseAmount(value: string): number {
  const normalized = toEnglishDigits(value).replace(/[^\d.]/g, "");
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : 0;
}

export function normalizeDiscountCode(value: string): string {
  return value.trim().toUpperCase();
}

export function parseDiscountAmount(discount: Discount, subtotal: number): number {
  if (subtotal <= 0 || discount.status !== "active") return 0;

  const usageMatch = toEnglishDigits(discount.usage).match(/^(\d+)\s*از\s*(نامحدود|\d+)$/);
  if (usageMatch && usageMatch[2] !== "نامحدود" && Number(usageMatch[1]) >= Number(usageMatch[2])) {
    return 0;
  }

  const value = parseAmount(discount.value);
  if (value <= 0) return 0;

  if (discount.type === "percent") {
    return Math.min(subtotal, Math.round((subtotal * value) / 100));
  }

  return Math.min(subtotal, value);
}

export function discountIsUsable(discount: Discount): boolean {
  if (discount.status !== "active") return false;
  const usageMatch = toEnglishDigits(discount.usage).match(/^(\d+)\s*از\s*(نامحدود|\d+)$/);
  return !(usageMatch && usageMatch[2] !== "نامحدود" && Number(usageMatch[1]) >= Number(usageMatch[2]));
}
