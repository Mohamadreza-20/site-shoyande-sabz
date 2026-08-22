"use client";

import type { SettingsTab } from "./settings/types";
import type { LucideIcon } from "lucide-react";

export default function SettingsTabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: { value: SettingsTab; label: string; icon: LucideIcon }[];
  activeTab: SettingsTab;
  onChange: (tab: SettingsTab) => void;
}) {
  return (
    <div className="flex w-full shrink-0 flex-row gap-2 overflow-x-auto rounded-2xl border border-admin-line bg-white p-2 lg:w-[240px] lg:flex-col lg:overflow-visible">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`cursor-pointer flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold transition lg:w-full ${activeTab === tab.value ? "bg-admin-primary text-white" : "text-admin-muted hover:bg-admin-bg"}`}
          >
            <Icon className="size-[18px]" strokeWidth={2} />
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
