"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Order, OrderStatus } from "@/features/orders/types";
import { useOrders } from "@/features/orders/hooks";
import OrdersTableView, { orderTabs } from "./parts/OrdersTableView";

const OrderDetailsModal = dynamic(() => import("./OrderDetailsModal"), { ssr: false });

export default function OrdersFullTable({ orders: initialOrders, fetchedAt }: { orders: Order[]; fetchedAt?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: orders = initialOrders, isError, refetch } = useOrders(initialOrders, fetchedAt);
  const statusParam = searchParams.get("status");
  const activeTab: OrderStatus | "all" = orderTabs.some((tab) => tab.value === statusParam) ? (statusParam as OrderStatus) : "all";
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const filteredOrders = useMemo(() => activeTab === "all" ? orders : orders.filter((order) => order.status === activeTab), [orders, activeTab]);
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / 10));
  const pageParam = Number(searchParams.get("page"));
  const page = Number.isFinite(pageParam) && pageParam >= 1 ? Math.min(pageParam, totalPages) : 1;

  useEffect(() => {
    const rawPage = Number(searchParams.get("page"));
    if (rawPage > totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      if (totalPages > 1) params.set("page", String(totalPages)); else params.delete("page");
      router.replace(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false });
    }
  }, [searchParams, totalPages, pathname, router]);

  const handleTabChange = useCallback((value: OrderStatus | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("status"); else params.set("status", value);
    params.delete("page"); router.replace(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false });
  }, [searchParams, pathname, router]);
  const handlePageChange = useCallback((nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage > 1) params.set("page", String(nextPage)); else params.delete("page");
    router.push(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false });
  }, [searchParams, pathname, router]);

  return <>
    <OrdersTableView orders={orders} filteredOrders={filteredOrders} activeTab={activeTab} currentPage={page} totalPages={totalPages} isError={isError} onTabChange={handleTabChange} onPageChange={handlePageChange} onRetry={() => refetch()} onViewDetails={setSelectedOrder} />
    <OrderDetailsModal open={selectedOrder !== null} onClose={() => setSelectedOrder(null)} order={selectedOrder} />
  </>;
}
