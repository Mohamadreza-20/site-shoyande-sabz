import { fetchedAtNow } from "@/lib/http";
import type { Metadata } from "next";
import PageHeader from "@/features/dashboard/components/PageHeader";
import CategoriesGrid from "@/features/products/components/admin/CategoriesGrid";
import CategoriesSummary from "@/features/products/components/admin/CategoriesSummary";
import { getCategoriesWithCounts } from "@/features/products/api";

export const metadata: Metadata = {
  title: "Categories | Admin",
  description: "Manage the store's product categories.",
};

export default async function AdminCategoriesPage() {
  const categories = await getCategoriesWithCounts();
  const fetchedAt = fetchedAtNow();

  return (
    <>
      <PageHeader
        title="Product categories"
        description={<CategoriesSummary initialCategories={categories} fetchedAt={fetchedAt} />}
      />

      <CategoriesGrid categories={categories} fetchedAt={fetchedAt} />
    </>
  );
}
