import type { Metadata } from "next";
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
    <>
      <PageHeader
        title="مدیریت تخفیف‌ها"
        description="ساخت، ویرایش و پیگیری میزان استفاده از کدهای تخفیف فروشگاه"
      />

      <DiscountsStats initialDiscounts={discounts} fetchedAt={fetchedAt} />

      <DiscountsTable discounts={discounts} fetchedAt={fetchedAt} />
    </>
  );
}
