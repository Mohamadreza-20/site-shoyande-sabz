import { useQuery } from "@tanstack/react-query";
import { getLatestOrders, getOrders, getOrdersByCustomerId } from "../api";
import type { Order } from "../types";
import { orderKeys } from "../queryKeys";

export function useOrders(initialData?: Order[], initialDataUpdatedAt?: number) {
  return useQuery({
    queryKey: orderKeys.list(),
    queryFn: getOrders,
    initialData,
    initialDataUpdatedAt,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}

export function useLatestOrders(limit = 20, initialData?: Order[], initialDataUpdatedAt?: number) {
  return useQuery({
    queryKey: orderKeys.latest(limit),
    queryFn: () => getLatestOrders(limit),
    initialData,
    initialDataUpdatedAt,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}

export function useCustomerOrders(
  customerId: string | undefined,
  initialData?: Order[],
  initialDataUpdatedAt?: number
) {
  return useQuery({
    queryKey: orderKeys.byCustomer(customerId ?? ""),
    queryFn: () => getOrdersByCustomerId(customerId as string),
    initialData,
    initialDataUpdatedAt,
    enabled: Boolean(customerId),
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}
