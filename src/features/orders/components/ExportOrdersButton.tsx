"use client";

import { Download } from "lucide-react";
import type { Order } from "@/features/orders/types";

function escapeCsvCell(value: string): string {
  return `"${value.replaceAll("\"", "\"\"")}"`;
}

export default function ExportOrdersButton({ orders }: { orders: Order[] }) {
  function handleExport() {
    const header = ["شناسه سفارش", "مشتری", "محصولات", "مبلغ", "وضعیت"].map(escapeCsvCell);
    const rows = orders.map((order) =>
      [order.orderNumber, order.customer, order.products, order.amount, order.status].map(escapeCsvCell)
    );
    const csv = "\uFEFF" + [header, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={orders.length === 0}
      className="cursor-pointer inline-flex items-center gap-2 rounded-[10px] border border-admin-line bg-white px-5 py-2.5 text-sm font-semibold text-admin-primary transition hover:bg-admin-bg disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download className="size-4" strokeWidth={2} />
      تهیه گزارش خروجی
    </button>
  );
}
