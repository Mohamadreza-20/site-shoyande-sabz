"use client";

import { useCallback } from "react";
import { clampQuantity } from "../utils";
import type { CartItem } from "../types";
import type { Product } from "@/features/products/types";

export function useCartMutations({
  itemsRef,
  commit,
}: {
  itemsRef: React.RefObject<CartItem[]>;
  commit: (next: CartItem[]) => void;
}) {
  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      const current = itemsRef.current;
      const existing = current.find((item) => item.id === product.id);
      const currentQuantity = existing?.quantity ?? 0;
      const nextQuantity = clampQuantity(currentQuantity + quantity, product.stock);

      if (nextQuantity <= currentQuantity) return false;

      const next = existing
        ? current.map((item) =>
            item.id === product.id ? { ...item, quantity: nextQuantity } : item
          )
        : [
            ...current,
            {
              id: product.id,
              title: product.title,
              image: product.image,
              category: product.category,
              priceValue: product.priceValue,
              quantity: nextQuantity,
              stock: product.stock,
            },
          ];

      commit(next);
      return true;
    },
    [itemsRef, commit]
  );

  const removeItem = useCallback(
    (id: string) => {
      commit(itemsRef.current.filter((item) => item.id !== id));
    },
    [itemsRef, commit]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      const current = itemsRef.current;
      const next =
        quantity <= 0
          ? current.filter((item) => item.id !== id)
          : current
              .map((item) =>
                item.id === id ? { ...item, quantity: clampQuantity(quantity, item.stock) } : item
              )
              .filter((item) => item.quantity > 0);
      commit(next);
    },
    [itemsRef, commit]
  );

  const clearCart = useCallback(() => commit([]), [commit]);

  return { addItem, removeItem, updateQuantity, clearCart };
}
