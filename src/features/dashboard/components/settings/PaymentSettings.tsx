"use client";

import FieldLabel from "./FieldLabel";
import { adminInputClass } from "@/components/ui/FormField";
import Toggle from "./Toggle";

type Props = {
  getBoolean: (name: string, fallback?: boolean) => boolean;
  setSetting: (name: string, value: string | boolean) => void;
};

export default function PaymentSettings({ getBoolean, setSetting }: Props) {
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-left">
          <FieldLabel>Active payment gateway</FieldLabel>
          <input
            name="paymentProvider"
            type="text"
            defaultValue="Stripe"
            className={adminInputClass}
          />
        </label>
        <label className="flex flex-col gap-2 text-left">
          <FieldLabel>Merchant ID</FieldLabel>
          <input
            name="merchantId"
            type="text"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            className={adminInputClass}
          />
        </label>
      </div>
      <Toggle
        name="cashOnDeliveryEnabled"
        label="Enable cash on delivery"
        description="Let local customers pay in cash or by card when the order is delivered"
        checked={getBoolean("cashOnDeliveryEnabled")}
        onChange={(value) => setSetting("cashOnDeliveryEnabled", value)}
      />
      <Toggle
        name="installmentPaymentEnabled"
        label="Enable installment payments"
        description="Show the installment option for orders above $100"
        checked={getBoolean("installmentPaymentEnabled")}
        onChange={(value) => setSetting("installmentPaymentEnabled", value)}
      />
    </>
  );
}
