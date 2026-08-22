"use client";

import type { ReactNode } from "react";
import Toggle from "./Toggle";

type Props = {
  getBoolean: (name: string, fallback?: boolean) => boolean;
  setSetting: (name: string, value: string | boolean) => void;
};

const inputClass = "w-full rounded-xl border border-admin-line px-4 py-3 text-right text-sm text-admin-ink placeholder:text-admin-muted focus:outline-none focus:ring-2 focus:ring-admin-primary/30";
const FieldLabel = ({ children }: { children: ReactNode }) => <span className="text-sm font-semibold text-admin-ink">{children}</span>;

export default function PaymentSettings({ getBoolean, setSetting }: Props) {
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-right"><FieldLabel>درگاه پرداخت فعال</FieldLabel><input name="paymentProvider" type="text" defaultValue="زرین‌پال" className={inputClass} /></label>
        <label className="flex flex-col gap-2 text-right"><FieldLabel>شناسه پذیرنده (Merchant ID)</FieldLabel><input name="merchantId" dir="ltr" type="text" placeholder="XXXX-XXXX-XXXX-XXXX" className={inputClass} /></label>
      </div>
      <Toggle
        name="cashOnDeliveryEnabled"
        label="پرداخت در محل فعال باشد"
        description="امکان پرداخت نقدی یا کارت‌خوان هنگام تحویل سفارش برای مشتریان تهران"
        checked={getBoolean("cashOnDeliveryEnabled")}
        onChange={(value) => setSetting("cashOnDeliveryEnabled", value)}
      />
      <Toggle
        name="installmentPaymentEnabled"
        label="پرداخت اقساطی فعال باشد"
        description="نمایش گزینه پرداخت اقساطی برای سفارش‌های بالای یک میلیون تومان"
        checked={getBoolean("installmentPaymentEnabled")}
        onChange={(value) => setSetting("installmentPaymentEnabled", value)}
      />
    </>
  );
}
