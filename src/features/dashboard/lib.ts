import { formatNumber, formatPrice, parsePriceAmount } from "@/lib/money";
import { getProductStockStatus } from "@/features/products/lib";
import type { Product } from "@/features/products/types";
import type { Order } from "@/features/orders/types";
import type { Customer } from "@/features/customers/types";
import type { StatCard } from "./types";

function trend(recent: number, older: number): string {
  if (older === 0) return recent > 0 ? "+100%" : "0%";
  const pct = Math.round(((recent - older) / older) * 100);
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${formatNumber(pct)}%`;
}

function ratio(part: number, whole: number): string {
  if (whole === 0) return "0%";
  return `${formatNumber(Math.round((part / whole) * 100))}%`;
}

export function buildStatCards(
  products: Product[],
  orders: Order[],
  customers: Customer[]
): StatCard[] {
  const mid = Math.ceil(orders.length / 2);
  const recentOrders = orders.slice(0, mid);
  const olderOrders = orders.slice(mid);

  const recentRevenue = recentOrders.reduce((sum, o) => sum + parsePriceAmount(o.amount), 0);
  const olderRevenue = olderOrders.reduce((sum, o) => sum + parsePriceAmount(o.amount), 0);
  const totalRevenue = recentRevenue + olderRevenue;

  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const inStockProducts = products.filter(
    (p) => getProductStockStatus(p.stock) !== "outOfStock"
  ).length;

  return [
    {
      icon: "box",
      title: "Total products",
      value: `${formatNumber(products.length)} items`,
      trendPct: ratio(inStockProducts, products.length),
      trendLabel: "in stock",
    },
    {
      icon: "userPlus",
      title: "Total customers",
      value: `${formatNumber(customers.length)} people`,
      trendPct: ratio(activeCustomers, customers.length),
      trendLabel: "are active",
    },
    {
      icon: "shoppingCart",
      title: "Orders placed",
      value: `${formatNumber(orders.length)} orders`,
      trendPct: trend(recentOrders.length, olderOrders.length),
      trendLabel: "vs. previous half",
    },
    {
      icon: "trendingUp",
      title: "Total order revenue",
      value: formatPrice(totalRevenue),
      trendPct: trend(recentRevenue, olderRevenue),
      trendLabel: "vs. previous half",
    },
  ];
}

export function buildRecentSalesTrend(orders: Order[]): { day: string; value: number }[] {
  const chronological = [...orders].reverse();
  const recent = chronological.slice(-7);
  return recent.map((o) => ({
    day: o.date.replace(/,.*$/, ""),
    value: parsePriceAmount(o.amount),
  }));
}
