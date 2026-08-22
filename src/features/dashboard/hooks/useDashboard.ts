import { useQuery } from "@tanstack/react-query";
import { getAnalytics, getDashboardOverview } from "../api";
import type { Analytics, Overview } from "../types";
import { dashboardKeys } from "../queryKeys";

export function useDashboardOverview(initialData?: Overview, initialDataUpdatedAt?: number) {
  return useQuery({
    queryKey: dashboardKeys.overview,
    queryFn: getDashboardOverview,
    initialData,
    initialDataUpdatedAt,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}

export function useDashboardAnalytics(initialData?: Analytics, initialDataUpdatedAt?: number) {
  return useQuery({
    queryKey: dashboardKeys.analytics,
    queryFn: getAnalytics,
    initialData,
    initialDataUpdatedAt,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}
