"use client";

import { Bell, Building2, CreditCard, Truck } from "lucide-react";
import SettingsTabs from "./SettingsTabs";
import SettingsTabContent from "./SettingsTabContent";
import { useSettingsTab } from "../hooks/useSettingsTab";
import { useStoreSettings } from "../hooks/useStoreSettings";
import type { SettingsTab } from "./settings/types";

const tabs: { value: SettingsTab; label: string; icon: typeof Building2 }[] = [
  { value: "general", label: "اطلاعات فروشگاه", icon: Building2 },
  { value: "shipping", label: "ارسال و باربری", icon: Truck },
  { value: "payment", label: "درگاه پرداخت", icon: CreditCard },
  { value: "notifications", label: "اعلان‌ها", icon: Bell },
];

export default function SettingsForm() {
  const { activeTab, setActiveTab } = useSettingsTab();
  const { formRef, getBoolean, setSetting, handleSubmit } = useStoreSettings({ restoreKey: activeTab });

  return (
    <div className="flex w-full flex-col items-start gap-5 lg:flex-row">
      <SettingsTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex w-full flex-1 flex-col gap-5 rounded-2xl border border-admin-line bg-white p-6 sm:p-8"
      >
        <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-right">
          <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-[11px] font-bold text-brand-700">محلی</span>
          <p className="text-xs font-medium text-brand-700">تغییرات این بخش در مرورگر شما ذخیره می‌شوند.</p>
        </div>
        <SettingsTabContent tab={activeTab} getBoolean={getBoolean} setSetting={setSetting} />
        <div className="flex items-center justify-between gap-4 border-t border-admin-line pt-5">
          <button
            type="submit"
            className="mr-auto cursor-pointer rounded-[10px] bg-admin-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            ذخیره تغییرات
          </button>
        </div>
      </form>
    </div>
  );
}
