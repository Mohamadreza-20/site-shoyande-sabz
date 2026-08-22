import type { ProductStockStatus } from "./types";

export function getProductStockStatus(stock: number | undefined): ProductStockStatus {
  const qty = stock ?? 0;
  if (qty === 0) return "outOfStock";
  if (qty < 15) return "lowStock";
  return "inStock";
}
