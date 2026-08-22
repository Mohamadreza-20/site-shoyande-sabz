"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { SettingsTab } from "../components/settings/types";
import { SETTINGS_TAB_VALUES } from "../components/settings/types";

export function useSettingsTab() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const param = searchParams.get("tab");
  const activeTab: SettingsTab = SETTINGS_TAB_VALUES.includes(param as SettingsTab) ? (param as SettingsTab) : "general";

  const setActiveTab = useCallback((value: SettingsTab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "general") params.delete("tab"); else params.set("tab", value);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return { activeTab, setActiveTab };
}
