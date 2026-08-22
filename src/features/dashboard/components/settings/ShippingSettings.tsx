"use client";

import type { ReactNode } from "react";
import Toggle from "./Toggle";

type Props = {
  getBoolean: (name: string, fallback?: boolean) => boolean;
  setSetting: (name: string, value: string | boolean) => void;
};

const inputClass = "w-full rounded-xl border border-admin-line px-4 py-3 text-right text-sm text-admin-ink placeholder:text-admin-muted focus:outline-none focus:ring-2 focus:ring-admin-primary/30";
const FieldLabel = ({ children }: { children: ReactNode }) => <span className="text-sm font-semibold text-admin-ink">{children}</span>;

export default function ShippingSettings({ getBoolean, setSetting }: Props) {
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-right"><FieldLabel>هزینه ارسال پیش‌فرض</FieldLabel><input name="defaultShippingCost" type="text" defaultValue="۳۵,۰۰۰ تومان" className={inputClass} /></label>
        <label className="flex flex-col gap-2 text-right"><FieldLabel>حداقل خرید برای ارسال رایگان</FieldLabel><input name="freeShippingThreshold" type="text" defaultValue="۵۰۰,۰۰۰ تومان" className={inputClass} /></label>
        <label className="flex flex-col gap-2 text-right"><FieldLabel>زمان تحویل تهران</FieldLabel><input name="tehranDeliveryTime" type="text" defaultValue="۱ تا ۲ روز کاری" className={inputClass} /></label>
        <label className="flex flex-col gap-2 text-right"><FieldLabel>زمان تحویل سایر شهرها</FieldLabel><input name="otherDeliveryTime" type="text" defaultValue="۳ تا ۵ روز کاری" className={inputClass} /></label>
      </div>
      <Toggle
        name="freeShippingEnabled"
        label="ارسال رایگان فعال باشد"
        description="در صورت رسیدن سبد خرید به حداقل مبلغ تعیین‌شده، ارسال رایگان محاسبه شود"
        checked={getBoolean("freeShippingEnabled", true)}
        onChange={(value) => setSetting("freeShippingEnabled", value)}
      />
    </>
  );
}
