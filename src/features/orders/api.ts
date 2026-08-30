import { apiFetch } from "@/lib/http";
import type { Order } from "./types";

export function getOrders() {
  return apiFetch<Order[]>("/orders");
}

export function getLatestOrders(limit = 20) {
  const safeLimit = Math.max(1, Math.floor(limit) || 20);
  return apiFetch<Order[]>(`/orders?_sort=id&_order=desc&_limit=${safeLimit}`);
}

export function getOrdersByCustomerId(customerId: string) {
  return apiFetch<Order[]>(`/orders?customerId=${encodeURIComponent(customerId)}`);
}

export type { Order };
