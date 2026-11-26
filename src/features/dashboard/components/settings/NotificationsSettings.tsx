"use client";

import Toggle from "./Toggle";

type Props = {
  getBoolean: (name: string, fallback?: boolean) => boolean;
  setSetting: (name: string, value: string | boolean) => void;
};

export default function NotificationsSettings({ getBoolean, setSetting }: Props) {
  return (
    <>
      <Toggle
        name="newOrderNotifications"
        label="New order alerts"
        description="Email and text the store admin when a new order is placed"
        checked={getBoolean("newOrderNotifications", true)}
        onChange={(value) => setSetting("newOrderNotifications", value)}
      />
      <Toggle
        name="lowStockNotifications"
        label="Low stock alerts"
        description="Notify when a product drops below 15 units"
        checked={getBoolean("lowStockNotifications", true)}
        onChange={(value) => setSetting("lowStockNotifications", value)}
      />
      <Toggle
        name="newReviewNotifications"
        label="New review alerts"
        description="Notify when a customer reviews a product"
        checked={getBoolean("newReviewNotifications")}
        onChange={(value) => setSetting("newReviewNotifications", value)}
      />
      <Toggle
        name="adminNewsletter"
        label="Weekly admin digest"
        description="Send a store performance summary every Sunday morning"
        checked={getBoolean("adminNewsletter", true)}
        onChange={(value) => setSetting("adminNewsletter", value)}
      />
    </>
  );
}
