"use client";

import { Bell, Building2, CreditCard, Truck } from "lucide-react";
import SettingsTabs from "./SettingsTabs";
import SettingsTabContent from "./SettingsTabContent";
import { useSettingsTab } from "../hooks/useSettingsTab";
import { useStoreSettings } from "../hooks/useStoreSettings";
import type { SettingsTab } from "./settings/types";

const tabs: { value: SettingsTab; label: string; icon: typeof Building2 }[] = [
  { value: "general", label: "Store info", icon: Building2 },
  { value: "shipping", label: "Shipping", icon: Truck },
  { value: "payment", label: "Payments", icon: CreditCard },
  { value: "notifications", label: "Notifications", icon: Bell },
];

export default function SettingsForm() {
  const { activeTab, setActiveTab } = useSettingsTab();
  const { formRef, getBoolean, setSetting, handleSubmit } = useStoreSettings({
    restoreKey: activeTab,
  });

  return (
    <div className="flex w-full flex-col items-start gap-5 lg:flex-row">
      <SettingsTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex w-full flex-1 flex-col gap-5 rounded-[24px] border border-admin-line bg-white p-6 shadow-[0_8px_24px_rgba(15,47,34,0.05)] sm:p-8"
      >
        <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-brand-200 bg-accent-soft px-4 py-3 text-left">
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-brand-700">
            Local
          </span>
          <p className="text-xs font-medium text-brand-700">
            Changes in this section are saved in your browser.
          </p>
        </div>
        <SettingsTabContent tab={activeTab} getBoolean={getBoolean} setSetting={setSetting} />
        <div className="flex items-center justify-between gap-4 border-t border-admin-line pt-5">
          <button
            type="submit"
            className="ml-auto rounded-full bg-admin-sidebar px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
