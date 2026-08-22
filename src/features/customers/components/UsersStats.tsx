"use client";

import { UserCheck, UserMinus, Users as UsersIcon, Wallet } from "lucide-react";
import type { Customer } from "@/features/customers/types";
import { useCustomers } from "@/features/customers/hooks";
import StatsCardsGrid from "@/components/ui/StatsCardsGrid";

export default function UsersStats({
  initialCustomers,
  fetchedAt,
}: {
  initialCustomers: Customer[];
  fetchedAt?: number;
}) {
  const { data: customers = initialCustomers } = useCustomers(initialCustomers, fetchedAt);

  const active = customers.filter((c) => c.status === "active").length;
  const inactive = customers.filter((c) => c.status === "inactive").length;
  const totalOrders = customers.reduce((sum, c) => sum + c.ordersCount, 0);

  const stats = [
    { icon: UsersIcon, label: "کل کاربران", value: customers.length.toLocaleString("fa-IR") },
    { icon: UserCheck, label: "کاربران فعال", value: active.toLocaleString("fa-IR") },
    { icon: UserMinus, label: "کاربران غیرفعال", value: inactive.toLocaleString("fa-IR") },
    { icon: Wallet, label: "مجموع سفارشات", value: `${totalOrders.toLocaleString("fa-IR")} سفارش` },
  ];

  return <StatsCardsGrid stats={stats} />;
}
