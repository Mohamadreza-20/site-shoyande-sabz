import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/features/dashboard/components/PageHeader";
import ProductsTable from "@/features/products/components/admin/ProductsTable";
import ProductsStats from "@/features/products/components/admin/ProductsStats";
import { getCategories, getProductsFiltered, getProductStockSummary } from "@/features/products/api";

export const metadata: Metadata = {
  title: "محصولات | پنل مدیریت شست‌وشو سبز",
  description: "مدیریت فهرست محصولات، موجودی و وضعیت انبار فروشگاه شست‌وشو سبز.",
};

const ADMIN_PRODUCTS_PAGE_SIZE = 12;

export default async function AdminProductsPage() {
  const [firstPage, categories, stockSummary] = await Promise.all([
    getProductsFiltered({ page: 1, pageSize: ADMIN_PRODUCTS_PAGE_SIZE }),
    getCategories(),
    getProductStockSummary(),
  ]);
  const fetchedAt = Date.now();

  return (
    <>
      <PageHeader
        title="مدیریت محصولات"
        description="فهرست کامل محصولات فروشگاه، موجودی انبار و وضعیت فروش هر کالا"
      />

      <ProductsStats initialStockSummary={stockSummary} fetchedAt={fetchedAt} />

      <Suspense fallback={null}>
        <ProductsTable
          initialResult={firstPage}
          pageSize={ADMIN_PRODUCTS_PAGE_SIZE}
          categories={categories}
          fetchedAt={fetchedAt}
        />
      </Suspense>
    </>
  );
}
