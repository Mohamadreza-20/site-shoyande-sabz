"use client";

import GeneralSettings from "./settings/GeneralSettings";
import ShippingSettings from "./settings/ShippingSettings";
import PaymentSettings from "./settings/PaymentSettings";
import NotificationsSettings from "./settings/NotificationsSettings";
import type { SettingsTab } from "./settings/types";

type SettingsContext = {
  getBoolean: (name: string, fallback?: boolean) => boolean;
  setSetting: (name: string, value: string | boolean) => void;
};

type Props = SettingsContext & { tab: SettingsTab };

export default function SettingsTabContent({ tab, getBoolean, setSetting }: Props) {
  if (tab === "general") return <GeneralSettings />;
  if (tab === "shipping") {
    return <ShippingSettings getBoolean={getBoolean} setSetting={setSetting} />;
  }
  if (tab === "payment") {
    return <PaymentSettings getBoolean={getBoolean} setSetting={setSetting} />;
  }
  return <NotificationsSettings getBoolean={getBoolean} setSetting={setSetting} />;
}
