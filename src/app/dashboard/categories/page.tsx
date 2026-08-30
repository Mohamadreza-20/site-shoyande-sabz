import type { Metadata } from "next";
import PageHeader from "@/features/dashboard/components/PageHeader";
import CategoriesGrid from "@/features/products/components/admin/CategoriesGrid";
import CategoriesSummary from "@/features/products/components/admin/CategoriesSummary";
import { getCategoriesWithCounts } from "@/features/products/api";

export const metadata: Metadata = {
  title: "دسته‌بندی‌ها | پنل مدیریت شست‌وشو سبز",
  description: "مدیریت دسته‌بندی‌های محصولات فروشگاه شست‌وشو سبز.",
};

export default async function AdminCategoriesPage() {
  const categories = await getCategoriesWithCounts();
  const fetchedAt = Date.now();

  return (
    <>
      <PageHeader
        title="دسته‌بندی محصولات"
        description={<CategoriesSummary initialCategories={categories} fetchedAt={fetchedAt} />}
      />

      <CategoriesGrid categories={categories} fetchedAt={fetchedAt} />
    </>
  );
}
