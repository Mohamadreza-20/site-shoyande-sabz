"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getProductsByIds } from "@/features/products/api";
import { logger } from "@/lib/logger";
import { clampQuantity, idsKeyOf } from "./utils";
import type { CartItem } from "./types";

const MIN_RESYNC_INTERVAL_MS = 15_000;

export function useCartSync({
  hydrated,
  hydratedRef,
  items,
  itemsRef,
  commit,
}: {
  hydrated: boolean;
  hydratedRef: React.RefObject<boolean>;
  items: CartItem[];
  itemsRef: React.RefObject<CartItem[]>;
  commit: (next: CartItem[]) => void;
}) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(false);

  const syncedIdsRef = useRef<string>("");
  const syncInFlightRef = useRef(false);
  const pendingForceSyncRef = useRef(false);
  const lastSyncAtRef = useRef(0);

  const runSyncRef = useRef<(currentItems: CartItem[], opts: { force: boolean }) => void>(
    () => {}
  );

  const runSync = useCallback(
    (currentItems: CartItem[], { force }: { force: boolean }) => {
      if (currentItems.length === 0) return;
      if (syncInFlightRef.current) {
        if (force) pendingForceSyncRef.current = true;
        return;
      }

      const requestedIds = [...new Set(currentItems.map((item) => item.id))].sort();
      const requestedIdsKey = requestedIds.join(",");
      if (!force && requestedIdsKey === syncedIdsRef.current) return;

      const requestedIdSet = new Set(requestedIds);
      syncInFlightRef.current = true;
      setIsSyncing(true);

      getProductsByIds(requestedIds)
        .then((freshProducts) => {
          const byId = new Map(freshProducts.map((product) => [product.id, product]));

          const next = itemsRef.current.flatMap((item) => {
            if (!requestedIdSet.has(item.id)) {
              return [item];
            }
            const fresh = byId.get(item.id);
            if (!fresh) return [];
            const quantity = clampQuantity(item.quantity, fresh.stock);
            if (quantity <= 0) return [];
            return [
              {
                id: fresh.id,
                title: fresh.title,
                image: fresh.image,
                category: fresh.category,
                priceValue: fresh.priceValue,
                quantity,
                stock: fresh.stock,
              },
            ];
          });

          commit(next);
          syncedIdsRef.current = requestedIdsKey;
          lastSyncAtRef.current = Date.now();
          setSyncError(false);
        })
        .catch((error) => {
          logger.error("[cart] could not sync cart items with latest product data", error);
          setSyncError(true);
        })
        .finally(() => {
          syncInFlightRef.current = false;
          setIsSyncing(false);

          if (pendingForceSyncRef.current && itemsRef.current.length > 0) {
            pendingForceSyncRef.current = false;
            runSyncRef.current(itemsRef.current, { force: true });
            return;
          }

          if (itemsRef.current.length > 0 && idsKeyOf(itemsRef.current) !== syncedIdsRef.current) {
            runSyncRef.current(itemsRef.current, { force: false });
          }
        });
    },
    [commit, itemsRef]
  );

  useEffect(() => {
    runSyncRef.current = runSync;
  }, [runSync]);

  useEffect(() => {
    if (!hydrated) return;
    runSync(items, { force: false });
  }, [hydrated, items, runSync]);

  const syncCart = useCallback(() => {
    if (!hydratedRef.current) return;
    if (syncInFlightRef.current) {
      pendingForceSyncRef.current = true;
      return;
    }
    runSync(itemsRef.current, { force: true });
  }, [runSync, hydratedRef, itemsRef]);

  useEffect(() => {
    function handleFocus() {
      if (!hydratedRef.current) return;
      if (Date.now() - lastSyncAtRef.current < MIN_RESYNC_INTERVAL_MS) return;
      runSync(itemsRef.current, { force: true });
    }
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [runSync, hydratedRef, itemsRef]);

  return { isSyncing, syncError, syncCart };
}
