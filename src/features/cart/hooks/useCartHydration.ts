"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useBrowserHydration } from "@/lib/hooks/useBrowserHydration";
import { parseStoredCart, persistCart, readStoredCart, STORAGE_KEY } from "../storage";
import type { CartItem } from "../types";

export function useCartHydration() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const itemsRef = useRef<CartItem[]>(items);
  const hydratedRef = useRef(false);

  const commit = useCallback((next: CartItem[]) => {
    itemsRef.current = next;
    setItems(next);
  }, []);

  useBrowserHydration(readStoredCart, (stored) => {
    itemsRef.current = stored;
    hydratedRef.current = true;
    setItems(stored);
    setHydrated(true);
  });

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return;
      commit(parseStoredCart(event.newValue));
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [commit]);

  useEffect(() => {
    if (!hydrated) return;
    persistCart(items);
  }, [items, hydrated]);

  return { items, hydrated, hydratedRef, itemsRef, commit };
}
