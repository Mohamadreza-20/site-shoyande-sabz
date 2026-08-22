import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsExplorer from "@/features/products/components/ProductsExplorer";
import { getCategories, getProductCategoryCounts, getProductsFiltered } from "@/features/products/api";
import { isSortValue, type SortValue } from "@/features/products/product-sort";

export const metadata: Metadata = {
  title: "محصولات | شست‌وشو سبز",
  description:
    "همه محصولات شوینده گیاهی و ارگانیک شست‌وشو سبز را مرور، فیلتر و مرتب‌سازی کنید.",
};

const PRODUCTS_PER_PAGE = 15;

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    q?: string;
    sort?: string;
    page?: string;
  }>;
};

function normalizeCategories(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const list = Array.isArray(value) ? value : [value];
  return Array.from(new Set(list.map((v) => v.trim()).filter(Boolean)));
}

function normalizeSort(value: string | undefined): SortValue {
  return isSortValue(value) ? value : "featured";
}

function normalizePage(value: string | undefined): number {
  const parsed = parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const selectedCategories = normalizeCategories(params.category);
  const search = params.q?.trim() ?? "";
  const sort = normalizeSort(params.sort);
  const page = normalizePage(params.page);

  const [categories, categoryCounts, result] = await Promise.all([
    getCategories(),
    getProductCategoryCounts(),
    getProductsFiltered({
      categories: selectedCategories,
      search,
      sort,
      page,
      pageSize: PRODUCTS_PER_PAGE,
    }),
  ]);

  const categoryLabels = Array.from(
    new Set([...Object.keys(categoryCounts), ...categories.map((c) => c.title)])
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-brand-50">
      <Navbar />
      <main className="flex w-full flex-col">
        <Suspense fallback={null}>
          <ProductsExplorer
            products={result.products}
            totalCount={result.total}
            totalPages={result.totalPages}
            page={result.page}
            categories={categoryLabels}
            categoryCounts={categoryCounts}
            selectedCategories={selectedCategories}
            search={search}
            sort={sort}
          />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
