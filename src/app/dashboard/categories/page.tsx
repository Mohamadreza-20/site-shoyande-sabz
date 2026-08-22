import type { Metadata } from "next";
import Sidebar from "@/features/dashboard/components/Sidebar";
import TopHeader from "@/features/dashboard/components/TopHeader";
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
    <div className="flex min-h-screen w-full flex-col bg-admin-bg lg:flex-row">
      <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8">
        <TopHeader />
        <PageHeader
          title="دسته‌بندی محصولات"
          description={<CategoriesSummary initialCategories={categories} fetchedAt={fetchedAt} />}
        />

        <CategoriesGrid categories={categories} fetchedAt={fetchedAt} />
      </main>
      <Sidebar />
    </div>
  );
}
