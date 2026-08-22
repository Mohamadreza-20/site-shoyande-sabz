import type { Metadata } from "next";
import { Suspense } from "react";
import Sidebar from "@/features/dashboard/components/Sidebar";
import TopHeader from "@/features/dashboard/components/TopHeader";
import PageHeader from "@/features/dashboard/components/PageHeader";
import SettingsForm from "@/features/dashboard/components/SettingsForm";

export const metadata: Metadata = {
  title: "تنظیمات | پنل مدیریت شست‌وشو سبز",
  description: "تنظیمات عمومی، ارسال، درگاه پرداخت و اعلان‌های فروشگاه شست‌وشو سبز.",
};

export default function AdminSettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-admin-bg lg:flex-row">
      <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8">
        <TopHeader />
        <PageHeader
          title="تنظیمات فروشگاه"
          description="مدیریت اطلاعات کلی، ارسال، پرداخت و اعلان‌های پنل مدیریت"
        />

        <Suspense fallback={null}>
          <SettingsForm />
        </Suspense>
      </main>
      <Sidebar />
    </div>
  );
}
