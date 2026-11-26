"use client";

import { useMemo } from "react";
import { useCartStore } from "../store";
import { syncCart } from "../sync";
import type { CartItem } from "../types";
import type { Product } from "@/features/products/types";

export type { CartItem };
export { formatPrice } from "../utils";

export type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isSyncing: boolean;
  syncError: boolean;
};

export type CartActions = {
  addItem: (product: Product, quantity?: number) => boolean;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  syncCart: () => void;
};

const selectItems = (state: { items: CartItem[] }) => state.items;
const selectTotalItems = (state: { items: CartItem[] }) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);
const selectTotalPrice = (state: { items: CartItem[] }) =>
  state.items.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);

const cartActions: CartActions = {
  addItem: (product, quantity) => useCartStore.getState().addItem(product, quantity),
  removeItem: (id) => useCartStore.getState().removeItem(id),
  updateQuantity: (id, quantity) => useCartStore.getState().updateQuantity(id, quantity),
  clearCart: () => useCartStore.getState().clearCart(),
  syncCart: () => syncCart({ force: true }),
};

export function useCartTotalItems(): number {
  return useCartStore(selectTotalItems);
}

export function useCartActions(): CartActions {
  return cartActions;
}

export function useCartState(): CartState {
  const items = useCartStore(selectItems);
  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);
  const isSyncing = useCartStore((state) => state.isSyncing);
  const syncError = useCartStore((state) => state.syncError);

  return useMemo(
    () => ({ items, totalItems, totalPrice, isSyncing, syncError }),
    [items, totalItems, totalPrice, isSyncing, syncError]
  );
}

export function useCart(): CartState & CartActions {
  const state = useCartState();
  return useMemo(() => ({ ...state, ...cartActions }), [state]);
}
