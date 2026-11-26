"use client";

import FieldLabel from "./FieldLabel";
import { adminInputClass } from "@/components/ui/FormField";
import Toggle from "./Toggle";

type Props = {
  getBoolean: (name: string, fallback?: boolean) => boolean;
  setSetting: (name: string, value: string | boolean) => void;
};

export default function ShippingSettings({ getBoolean, setSetting }: Props) {
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-left">
          <FieldLabel>Default shipping cost</FieldLabel>
          <input
            name="defaultShippingCost"
            type="text"
            defaultValue="$6.00"
            className={adminInputClass}
          />
        </label>
        <label className="flex flex-col gap-2 text-left">
          <FieldLabel>Free shipping minimum</FieldLabel>
          <input
            name="freeShippingThreshold"
            type="text"
            defaultValue="$50.00"
            className={adminInputClass}
          />
        </label>
        <label className="flex flex-col gap-2 text-left">
          <FieldLabel>Local delivery time</FieldLabel>
          <input
            name="tehranDeliveryTime"
            type="text"
            defaultValue="1–2 business days"
            className={adminInputClass}
          />
        </label>
        <label className="flex flex-col gap-2 text-left">
          <FieldLabel>Delivery time, other regions</FieldLabel>
          <input
            name="otherDeliveryTime"
            type="text"
            defaultValue="3–5 business days"
            className={adminInputClass}
          />
        </label>
      </div>
      <Toggle
        name="freeShippingEnabled"
        label="Enable free shipping"
        description="Shipping is free once the cart reaches the minimum amount"
        checked={getBoolean("freeShippingEnabled", true)}
        onChange={(value) => setSetting("freeShippingEnabled", value)}
      />
    </>
  );
}
