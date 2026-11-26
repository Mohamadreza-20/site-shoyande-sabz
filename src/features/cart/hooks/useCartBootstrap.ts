"use client";

import { useEffect } from "react";
import { enableCartPersistence, useCartStore } from "../store";
import { STORAGE_KEY } from "../storage";
import { syncCart, syncCartIfStale } from "../sync";

export function useCartBootstrap() {
  useEffect(() => {
    let cancelled = false;

    Promise.resolve(useCartStore.persist.rehydrate()).then(() => {
      if (cancelled) return;
      enableCartPersistence();
      useCartStore.setState({ hydrated: true });
      syncCart({ force: false });
    });

    function handleStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return;
      void useCartStore.persist.rehydrate();
    }

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", syncCartIfStale);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", syncCartIfStale);
    };
  }, []);

  useEffect(
    () =>
      useCartStore.subscribe((state, prev) => {
        if (state.hydrated && state.items !== prev.items) syncCart({ force: false });
      }),
    []
  );
}
