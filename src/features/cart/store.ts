import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { Product } from "@/features/products/types";
import { parseStoredCart, STORAGE_KEY } from "./storage";
import { clampQuantity } from "./utils";
import type { CartItem } from "./types";

type CartStoreState = {
  items: CartItem[];
  hydrated: boolean;
  isSyncing: boolean;
  syncError: boolean;
};

type CartStoreActions = {
  addItem: (product: Product, quantity?: number) => boolean;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  replaceItems: (items: CartItem[]) => void;
  setSyncStatus: (status: Partial<Pick<CartStoreState, "isSyncing" | "syncError">>) => void;
};

export type CartStore = CartStoreState & CartStoreActions;

let persistenceEnabled = false;

export function enableCartPersistence() {
  persistenceEnabled = true;
}

const cartStorage: StateStorage = {
  getItem: (name) => {
    try {
      const items = parseStoredCart(window.localStorage.getItem(name));
      return JSON.stringify({ state: { items }, version: 0 });
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    if (!persistenceEnabled) return;
    try {
      const parsed = JSON.parse(value) as { state?: { items?: CartItem[] } };
      window.localStorage.setItem(name, JSON.stringify(parsed.state?.items ?? []));
    } catch {}
  },
  removeItem: (name) => {
    try {
      window.localStorage.removeItem(name);
    } catch {}
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      isSyncing: false,
      syncError: false,

      addItem: (product, quantity = 1) => {
        const current = get().items;
        const existing = current.find((item) => item.id === product.id);
        const currentQuantity = existing?.quantity ?? 0;
        const nextQuantity = clampQuantity(currentQuantity + quantity, product.stock);

        if (nextQuantity <= currentQuantity) return false;

        set({
          items: existing
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
              ],
        });
        return true;
      },

      removeItem: (id) => set({ items: get().items.filter((item) => item.id !== id) }),

      updateQuantity: (id, quantity) =>
        set({
          items:
            quantity <= 0
              ? get().items.filter((item) => item.id !== id)
              : get()
                  .items.map((item) =>
                    item.id === id
                      ? { ...item, quantity: clampQuantity(quantity, item.stock) }
                      : item
                  )
                  .filter((item) => item.quantity > 0),
        }),

      clearCart: () => set({ items: [] }),
      replaceItems: (items) => set({ items }),
      setSyncStatus: (status) => set(status),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => cartStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    }
  )
);
