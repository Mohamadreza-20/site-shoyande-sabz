"use client";

import { useMemo } from "react";
import { Box, PackageCheck, PackageX, TrendingDown } from "lucide-react";
import { useProductStockSummary } from "@/features/products/hooks";
import { getProductStockStatus } from "@/features/products/lib";
import StatsCardsGrid from "@/components/ui/StatsCardsGrid";

export default function ProductsStats({
  initialStockSummary,
  fetchedAt,
}: {
  initialStockSummary: { stock: number }[];
  fetchedAt?: number;
}) {
  const { data: stockSummary = initialStockSummary } = useProductStockSummary(
    initialStockSummary,
    fetchedAt
  );

  const counts = useMemo(() => ({
    inStock: stockSummary.filter((p) => getProductStockStatus(p.stock) === "inStock").length,
    lowStock: stockSummary.filter((p) => getProductStockStatus(p.stock) === "lowStock").length,
    outOfStock: stockSummary.filter((p) => getProductStockStatus(p.stock) === "outOfStock").length,
  }), [stockSummary]);
  const { inStock, lowStock, outOfStock } = counts;

  const stats = [
    {
      icon: Box,
      label: "کل محصولات",
      value: `${stockSummary.length.toLocaleString("fa-IR")} عدد`,
    },
    { icon: PackageCheck, label: "موجود در انبار", value: `${inStock.toLocaleString("fa-IR")} عدد` },
    { icon: TrendingDown, label: "رو به اتمام", value: `${lowStock.toLocaleString("fa-IR")} عدد` },
    { icon: PackageX, label: "ناموجود", value: `${outOfStock.toLocaleString("fa-IR")} عدد` },
  ];

  return <StatsCardsGrid stats={stats} />;
}
