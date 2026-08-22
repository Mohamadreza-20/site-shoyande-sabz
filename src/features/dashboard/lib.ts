import { parseTomanAmount, formatTomanAmount } from "@/lib/money";
import { getProductStockStatus } from "@/features/products/lib";
import type { Product } from "@/features/products/types";
import type { Order } from "@/features/orders/types";
import type { Customer } from "@/features/customers/types";
import type { StatCard } from "./types";

function trend(recent: number, older: number): string {
  if (older === 0) return recent > 0 ? "+۱۰۰٪" : "۰٪";
  const pct = Math.round(((recent - older) / older) * 100);
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toLocaleString("fa-IR")}٪`;
}

function ratio(part: number, whole: number): string {
  if (whole === 0) return "۰٪";
  return `${Math.round((part / whole) * 100).toLocaleString("fa-IR")}٪`;
}

export function buildStatCards(
  products: Product[],
  orders: Order[],
  customers: Customer[]
): StatCard[] {
  const mid = Math.ceil(orders.length / 2);
  const recentOrders = orders.slice(0, mid);
  const olderOrders = orders.slice(mid);

  const recentRevenue = recentOrders.reduce((sum, o) => sum + parseTomanAmount(o.amount), 0);
  const olderRevenue = olderOrders.reduce((sum, o) => sum + parseTomanAmount(o.amount), 0);
  const totalRevenue = recentRevenue + olderRevenue;

  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const inStockProducts = products.filter(
    (p) => getProductStockStatus(p.stock) !== "outOfStock"
  ).length;

  return [
    {
      icon: "box",
      title: "تعداد کل محصولات",
      value: `${products.length.toLocaleString("fa-IR")} عدد`,
      trendPct: ratio(inStockProducts, products.length),
      trendLabel: "موجود در انبار",
    },
    {
      icon: "userPlus",
      title: "کل مشتریان",
      value: `${customers.length.toLocaleString("fa-IR")} نفر`,
      trendPct: ratio(activeCustomers, customers.length),
      trendLabel: "فعال هستند",
    },
    {
      icon: "shoppingCart",
      title: "سفارشات ثبت‌شده",
      value: `${orders.length.toLocaleString("fa-IR")} سفارش`,
      trendPct: trend(recentOrders.length, olderOrders.length),
      trendLabel: "نسبت به نیمه قبل",
    },
    {
      icon: "trendingUp",
      title: "درآمد کل سفارشات",
      value: formatTomanAmount(totalRevenue),
      trendPct: trend(recentRevenue, olderRevenue),
      trendLabel: "نسبت به نیمه قبل",
    },
  ];
}

export function buildRecentSalesTrend(orders: Order[]): { day: string; value: number }[] {
  const chronological = [...orders].reverse();
  const recent = chronological.slice(-7);
  return recent.map((o) => ({
    day: o.date.split(" ").slice(0, 2).join(" "),
    value: parseTomanAmount(o.amount),
  }));
}
