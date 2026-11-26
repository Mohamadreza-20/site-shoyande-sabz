import { getProductsByIds } from "@/features/products/api";
import { logger } from "@/lib/logger";
import { useCartStore } from "./store";
import { clampQuantity, idsKeyOf } from "./utils";
import type { CartItem } from "./types";

const MIN_RESYNC_INTERVAL_MS = 15_000;

let syncedIdsKey = "";
let inFlight = false;
let pendingForce = false;
let lastSyncAt = 0;

function reconcile(
  current: CartItem[],
  requestedIds: Set<string>,
  fresh: Awaited<ReturnType<typeof getProductsByIds>>
) {
  const byId = new Map(fresh.map((product) => [product.id, product]));

  return current.flatMap((item): CartItem[] => {
    if (!requestedIds.has(item.id)) return [item];
    const product = byId.get(item.id);
    if (!product) return [];
    const quantity = clampQuantity(item.quantity, product.stock);
    if (quantity <= 0) return [];
    return [
      {
        id: product.id,
        title: product.title,
        image: product.image,
        category: product.category,
        priceValue: product.priceValue,
        quantity,
        stock: product.stock,
      },
    ];
  });
}

export function syncCart({ force = true }: { force?: boolean } = {}) {
  const store = useCartStore.getState();
  if (!store.hydrated || store.items.length === 0) return;

  if (inFlight) {
    if (force) pendingForce = true;
    return;
  }

  const requestedIds = [...new Set(store.items.map((item) => item.id))].sort();
  const requestedKey = requestedIds.join(",");
  if (!force && requestedKey === syncedIdsKey) return;

  inFlight = true;
  store.setSyncStatus({ isSyncing: true });

  getProductsByIds(requestedIds)
    .then((fresh) => {
      const state = useCartStore.getState();
      state.replaceItems(reconcile(state.items, new Set(requestedIds), fresh));
      syncedIdsKey = requestedKey;
      lastSyncAt = Date.now();
      state.setSyncStatus({ syncError: false });
    })
    .catch((error) => {
      logger.error("[cart] could not sync cart items with latest product data", error);
      useCartStore.getState().setSyncStatus({ syncError: true });
    })
    .finally(() => {
      inFlight = false;
      const state = useCartStore.getState();
      state.setSyncStatus({ isSyncing: false });

      if (pendingForce && state.items.length > 0) {
        pendingForce = false;
        syncCart({ force: true });
        return;
      }

      if (state.items.length > 0 && idsKeyOf(state.items) !== syncedIdsKey) {
        syncCart({ force: false });
      }
    });
}

export function syncCartIfStale() {
  if (Date.now() - lastSyncAt < MIN_RESYNC_INTERVAL_MS) return;
  syncCart({ force: true });
}
