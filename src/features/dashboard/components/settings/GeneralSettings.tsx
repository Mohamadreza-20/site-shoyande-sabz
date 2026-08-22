"use client";

import type { ReactNode } from "react";

const inputClass = "w-full rounded-xl border border-admin-line px-4 py-3 text-right text-sm text-admin-ink placeholder:text-admin-muted focus:outline-none focus:ring-2 focus:ring-admin-primary/30";
const FieldLabel = ({ children }: { children: ReactNode }) => <span className="text-sm font-semibold text-admin-ink">{children}</span>;

export default function GeneralSettings() {
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-right"><FieldLabel>نام فروشگاه</FieldLabel><input name="storeName" type="text" defaultValue="شست‌وشو سبز" className={inputClass} /></label>
        <label className="flex flex-col gap-2 text-right"><FieldLabel>ایمیل پشتیبانی</FieldLabel><input name="supportEmail" type="email" dir="ltr" defaultValue="info@shooyande-sabz.ir" className={inputClass} /></label>
        <label className="flex flex-col gap-2 text-right"><FieldLabel>شماره تماس</FieldLabel><input name="supportPhone" dir="ltr" type="tel" defaultValue="۰۲۱-۹۱۰۰۰۰۰۰" className={inputClass} /></label>
        <label className="flex flex-col gap-2 text-right"><FieldLabel>آدرس فروشگاه</FieldLabel><input name="storeAddress" type="text" defaultValue="تهران، خیابان ولیعصر، پلاک ۱۲۰" className={inputClass} /></label>
      </div>
      <label className="flex w-full flex-col gap-2 text-right"><FieldLabel>درباره فروشگاه</FieldLabel><textarea name="storeDescription" rows={4} defaultValue="شست‌وشو سبز، تولیدکننده شوینده‌های گیاهی و ارگانیک با تعهد به سلامت خانواده و محیط زیست." className={`${inputClass} resize-none`} /></label>
    </>
  );
}
