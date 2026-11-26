"use client";

import { useCallback, useMemo, useState } from "react";
import { usePageParam } from "@/lib/hooks/usePageParam";
import dynamic from "next/dynamic";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Order, OrderStatus } from "@/features/orders/types";
import { useOrders } from "@/features/orders/hooks";
import OrdersTableView, { orderTabs } from "./parts/OrdersTableView";

const OrderDetailsModal = dynamic(() => import("./OrderDetailsModal"), { ssr: false });

export default function OrdersFullTable({
  orders: initialOrders,
  fetchedAt,
}: {
  orders: Order[];
  fetchedAt?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: orders = initialOrders, isError, refetch } = useOrders(initialOrders, fetchedAt);
  const statusParam = searchParams.get("status");
  const activeTab: OrderStatus | "all" = orderTabs.some((tab) => tab.value === statusParam)
    ? (statusParam as OrderStatus)
    : "all";
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const filteredOrders = useMemo(
    () => (activeTab === "all" ? orders : orders.filter((order) => order.status === activeTab)),
    [orders, activeTab]
  );
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / 10));
  const { page, setPage: handlePageChange } = usePageParam(totalPages);

  const handleTabChange = useCallback(
    (value: OrderStatus | "all") => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") params.delete("status");
      else params.set("status", value);
      params.delete("page");
      router.replace(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return (
    <>
      <OrdersTableView
        filteredOrders={filteredOrders}
        activeTab={activeTab}
        currentPage={page}
        totalPages={totalPages}
        isError={isError}
        onTabChange={handleTabChange}
        onPageChange={handlePageChange}
        onRetry={() => refetch()}
        onViewDetails={setSelectedOrder}
      />
      <OrderDetailsModal
        open={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </>
  );
}
