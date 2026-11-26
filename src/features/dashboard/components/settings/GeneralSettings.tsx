"use client";

import FieldLabel from "./FieldLabel";
import { adminInputClass } from "@/components/ui/FormField";

export default function GeneralSettings() {
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-left">
          <FieldLabel>Store name</FieldLabel>
          <input name="storeName" type="text" defaultValue="Leafwash" className={adminInputClass} />
        </label>
        <label className="flex flex-col gap-2 text-left">
          <FieldLabel>Support email</FieldLabel>
          <input
            name="supportEmail"
            type="email"
            defaultValue="hello@greenwash.example"
            className={adminInputClass}
          />
        </label>
        <label className="flex flex-col gap-2 text-left">
          <FieldLabel>Phone number</FieldLabel>
          <input
            name="supportPhone"
            type="tel"
            defaultValue="+1 (555) 010-2040"
            className={adminInputClass}
          />
        </label>
        <label className="flex flex-col gap-2 text-left">
          <FieldLabel>Store address</FieldLabel>
          <input
            name="storeAddress"
            type="text"
            defaultValue="120 Fern Street, Portland, OR"
            className={adminInputClass}
          />
        </label>
      </div>
      <label className="flex w-full flex-col gap-2 text-left">
        <FieldLabel>About the store</FieldLabel>
        <textarea
          name="storeDescription"
          rows={4}
          defaultValue="Leafwash makes plant-based, organic cleaning products, committed to healthy families and a healthier planet."
          className={`${adminInputClass} resize-none`}
        />
      </label>
    </>
  );
}
