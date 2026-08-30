import type { Metadata } from "next";
<<<<<<< HEAD
=======
import Sidebar from "@/features/dashboard/components/Sidebar";
import TopHeader from "@/features/dashboard/components/TopHeader";
>>>>>>> origin/main
import PageHeader from "@/features/dashboard/components/PageHeader";
import DiscountsTable from "@/features/discounts/components/DiscountsTable";
import DiscountsStats from "@/features/discounts/components/DiscountsStats";
import { getDiscounts } from "@/features/discounts/api";

export const metadata: Metadata = {
  title: "تخفیف‌ها | پنل مدیریت شست‌وشو سبز",
  description: "مدیریت کدهای تخفیف و کمپین‌های فروش فروشگاه شست‌وشو سبز.",
};

export default async function AdminDiscountsPage() {
  const discounts = await getDiscounts();
  const fetchedAt = Date.now();

  return (
<<<<<<< HEAD
    <>
      <PageHeader
        title="مدیریت تخفیف‌ها"
        description="ساخت، ویرایش و پیگیری میزان استفاده از کدهای تخفیف فروشگاه"
      />

      <DiscountsStats initialDiscounts={discounts} fetchedAt={fetchedAt} />

      <DiscountsTable discounts={discounts} fetchedAt={fetchedAt} />
    </>
=======
    <div className="flex min-h-screen w-full flex-col bg-admin-bg lg:flex-row">
      <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8">
        <TopHeader />
        <PageHeader
          title="مدیریت تخفیف‌ها"
          description="ساخت، ویرایش و پیگیری میزان استفاده از کدهای تخفیف فروشگاه"
        />

        <DiscountsStats initialDiscounts={discounts} fetchedAt={fetchedAt} />

        <DiscountsTable discounts={discounts} fetchedAt={fetchedAt} />
      </main>
      <Sidebar />
    </div>
>>>>>>> origin/main
  );
}
