import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/features/dashboard/components/PageHeader";
import SettingsForm from "@/features/dashboard/components/SettingsForm";

export const metadata: Metadata = {
  title: "تنظیمات | پنل مدیریت شست‌وشو سبز",
  description: "تنظیمات عمومی، ارسال، درگاه پرداخت و اعلان‌های فروشگاه شست‌وشو سبز.",
};

export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader
        title="تنظیمات فروشگاه"
        description="مدیریت اطلاعات کلی، ارسال، پرداخت و اعلان‌های پنل مدیریت"
      />

      <Suspense fallback={null}>
        <SettingsForm />
      </Suspense>
    </>
  );
}
