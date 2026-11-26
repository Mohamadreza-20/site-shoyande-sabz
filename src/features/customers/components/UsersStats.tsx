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
    { icon: UsersIcon, label: "Total users", value: customers.length.toLocaleString("en-US") },
    { icon: UserCheck, label: "Active users", value: active.toLocaleString("en-US") },
    { icon: UserMinus, label: "Inactive users", value: inactive.toLocaleString("en-US") },
    { icon: Wallet, label: "Total orders", value: `${totalOrders.toLocaleString("en-US")} orders` },
  ];

  return <StatsCardsGrid stats={stats} />;
}
