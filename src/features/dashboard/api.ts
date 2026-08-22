import { apiFetch } from "@/lib/http";
import { getProducts } from "@/features/products/api";
import { getOrders } from "@/features/orders/api";
import { getCustomers } from "@/features/customers/api";
import { buildStatCards, buildRecentSalesTrend } from "./lib";
import type { Overview, Analytics } from "./types";

export function getAnalytics() {
  return apiFetch<Analytics>("/analytics");
}

export async function getDashboardOverview(): Promise<Overview> {
  const [products, orders, customers] = await Promise.all([
    getProducts(),
    getOrders(),
    getCustomers(),
  ]);

  return {
    statCards: buildStatCards(products, orders, customers),
    weeklySales: buildRecentSalesTrend(orders),
  };
}

export type { Overview, Analytics };
