export type StatCard = {
  icon: "box" | "userPlus" | "shoppingCart" | "trendingUp";
  title: string;
  value: string;
  trendPct: string;
  trendLabel: string;
};

export type Overview = {
  statCards: StatCard[];
  weeklySales: { day: string; value: number }[];
};

export type Analytics = {
  monthlyRevenue: { month: string; value: number }[];
  trafficSources: { label: string; pct: number }[];
};
