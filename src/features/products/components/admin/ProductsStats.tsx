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

  const counts = useMemo(
    () => ({
      inStock: stockSummary.filter((p) => getProductStockStatus(p.stock) === "inStock").length,
      lowStock: stockSummary.filter((p) => getProductStockStatus(p.stock) === "lowStock").length,
      outOfStock: stockSummary.filter((p) => getProductStockStatus(p.stock) === "outOfStock")
        .length,
    }),
    [stockSummary]
  );
  const { inStock, lowStock, outOfStock } = counts;

  const stats = [
    {
      icon: Box,
      label: "Total products",
      value: `${stockSummary.length.toLocaleString("en-US")}`,
    },
    {
      icon: PackageCheck,
      label: "In stock",
      value: `${inStock.toLocaleString("en-US")}`,
    },
    { icon: TrendingDown, label: "Low stock", value: `${lowStock.toLocaleString("en-US")}` },
    { icon: PackageX, label: "Out of stock", value: `${outOfStock.toLocaleString("en-US")}` },
  ];

  return <StatsCardsGrid stats={stats} />;
}
