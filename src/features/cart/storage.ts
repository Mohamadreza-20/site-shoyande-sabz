import { z } from "zod";
import { logger } from "@/lib/logger";
import type { CartItem } from "./types";

export const STORAGE_KEY = "shooyande-sabz-cart";

const cartItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  image: z.string().min(1),
  category: z.string().min(1),
  priceValue: z.number().finite().nonnegative(),
  quantity: z.number().int().positive(),
  stock: z.number().finite().nonnegative().optional(),
});

const cartItemsSchema = z.array(cartItemSchema);

export function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    const result = cartItemsSchema.safeParse(parsed);
    if (!result.success) {
      logger.warn("[cart] discarding invalid cart data in localStorage", { error: result.error });
      return [];
    }
    return result.data;
  } catch {
    return [];
  }
}

export function readStoredCart(): CartItem[] {
  try {
    return parseStoredCart(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export function persistCart(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
  }
}
