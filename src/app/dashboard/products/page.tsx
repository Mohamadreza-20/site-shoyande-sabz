import type { Metadata } from "next";
import { Suspense } from "react";
<<<<<<< HEAD
=======
import Sidebar from "@/features/dashboard/components/Sidebar";
import TopHeader from "@/features/dashboard/components/TopHeader";
>>>>>>> origin/main
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
<<<<<<< HEAD
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
=======
    <div className="flex min-h-screen w-full flex-col bg-admin-bg lg:flex-row">
      <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-10 sm:py-8">
        <TopHeader />
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
      </main>
      <Sidebar />
    </div>
>>>>>>> origin/main
  );
}
