"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Product } from "@/features/products/types";
import { useCartHydration } from "../hooks/useCartHydration";
import { useCartMutations } from "../hooks/useCartMutations";
import { useCartSync } from "../sync";
import type { CartItem } from "../types";

export type { CartItem };

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isSyncing: boolean;
  syncError: boolean;
};

type CartActions = {
  addItem: (product: Product, quantity?: number) => boolean;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  syncCart: () => void;
};

const CartStateContext = createContext<CartState | null>(null);
const CartActionsContext = createContext<CartActions | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { items, hydrated, hydratedRef, itemsRef, commit } = useCartHydration();
  const { isSyncing, syncError, syncCart } = useCartSync({
    hydrated,
    hydratedRef,
    items,
    itemsRef,
    commit,
  });
  const { addItem, removeItem, updateQuantity, clearCart } = useCartMutations({
    itemsRef,
    commit,
  });

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.priceValue * i.quantity, 0),
    [items]
  );

  const stateValue = useMemo<CartState>(
    () => ({ items, totalItems, totalPrice, isSyncing, syncError }),
    [items, totalItems, totalPrice, isSyncing, syncError]
  );

  const actionsValue = useMemo<CartActions>(
    () => ({ addItem, removeItem, updateQuantity, clearCart, syncCart }),
    [addItem, removeItem, updateQuantity, clearCart, syncCart]
  );

  return (
    <CartActionsContext.Provider value={actionsValue}>
      <CartStateContext.Provider value={stateValue}>{children}</CartStateContext.Provider>
    </CartActionsContext.Provider>
  );
}

export function useCart(): CartState & CartActions {
  const state = useContext(CartStateContext);
  const actions = useContext(CartActionsContext);
  if (!state || !actions) throw new Error("useCart must be used within a CartProvider");
  return useMemo(() => ({ ...state, ...actions }), [state, actions]);
}

export function useCartState(): CartState {
  const ctx = useContext(CartStateContext);
  if (!ctx) throw new Error("useCartState must be used within a CartProvider");
  return ctx;
}

export function useCartActions(): CartActions {
  const ctx = useContext(CartActionsContext);
  if (!ctx) throw new Error("useCartActions must be used within a CartProvider");
  return ctx;
}

export { formatToman } from "../utils";
