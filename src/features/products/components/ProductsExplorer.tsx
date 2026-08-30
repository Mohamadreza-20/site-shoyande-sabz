"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/features/products/types";
import type { SortValue } from "@/features/products/product-sort";
<<<<<<< HEAD
import { useSeedProductDetailCache } from "@/features/products/hooks";
=======
>>>>>>> origin/main
import ProductsFilterSidebar from "./ProductsFilterSidebar";
import ProductsToolbar from "./ProductsToolbar";
import ProductsResultsGrid from "./ProductsResultsGrid";

const SEARCH_DEBOUNCE_MS = 400;

export default function ProductsExplorer({
  products,
  totalCount,
  totalPages,
  page,
  categories,
  categoryCounts,
  selectedCategories,
  search,
  sort,
<<<<<<< HEAD
  fetchedAt,
=======
>>>>>>> origin/main
}: {
  products: Product[];
  totalCount: number;
  totalPages: number;
  page: number;
  categories: string[];
  categoryCounts: Record<string, number>;
  selectedCategories: string[];
  search: string;
  sort: SortValue;
<<<<<<< HEAD
  fetchedAt?: number;
=======
>>>>>>> origin/main
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

<<<<<<< HEAD
  useSeedProductDetailCache(products, fetchedAt);

=======
>>>>>>> origin/main
  const [searchInput, setSearchInput] = useState(search);
  const initialPageRef = useRef(page);
  const previousPageRef = useRef(page);

  useEffect(() => {
    if (previousPageRef.current === page || initialPageRef.current === page) {
      previousPageRef.current = page;
      return;
    }

    previousPageRef.current = page;
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [page]);
  const lastSyncedSearchRef = useRef(search);
  useEffect(() => {
    if (search !== lastSyncedSearchRef.current) {
      lastSyncedSearchRef.current = search;
      setSearchInput(search);
    }
  }, [search]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const pushParams = useCallback(
    (mutate: (params: URLSearchParams) => void, resetPage = true) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      if (resetPage) params.delete("page");
      const query = params.toString();
      const nextUrl = query ? `${pathname}?${query}` : pathname;
      startTransition(() => {
        if (resetPage) {
          router.replace(nextUrl, { scroll: false });
        } else {
          router.push(nextUrl, { scroll: false });
        }
      });
    },
    [searchParams, pathname, router]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        lastSyncedSearchRef.current = value.trim();
        pushParams((params) => {
          if (value.trim()) params.set("q", value.trim());
          else params.delete("q");
        });
      }, SEARCH_DEBOUNCE_MS);
    },
    [pushParams]
  );

  const toggleCategory = useCallback(
    (category: string) => {
      pushParams((params) => {
        const current = params.getAll("category");
        const next = current.includes(category)
          ? current.filter((c) => c !== category)
          : [...current, category];
        params.delete("category");
        next.forEach((c) => params.append("category", c));
      });
    },
    [pushParams]
  );

  const clearFilters = useCallback(() => {
    pushParams((params) => params.delete("category"));
  }, [pushParams]);

  const handleSortChange = useCallback(
    (value: SortValue) => {
      pushParams((params) => {
        if (value === "featured") params.delete("sort");
        else params.set("sort", value);
      });
    },
    [pushParams]
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      pushParams((params) => {
        if (nextPage > 1) params.set("page", String(nextPage));
        else params.delete("page");
      }, false);
    },
    [pushParams]
  );

  return (
    <>

      <section className="w-full bg-brand-100">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-end gap-4 px-6 py-10 text-right lg:px-[120px] lg:py-12">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="cursor-pointer transition hover:text-brand-500">
              خانه
            </Link>
            <span>/</span>
            <span className="font-bold text-brand-700">محصولات</span>
          </div>
          <h1 className="text-[28px] font-black text-brand-700 lg:text-[36px]">
            همه محصولات ارگانیک
          </h1>
          <p className="max-w-[560px] text-[15px] leading-[1.7] text-muted">
            مجموعه‌ای کامل از شوینده‌های گیاهی و طبیعی شست‌وشوی سبز را مرور کنید و بر اساس
            دسته‌بندی، قیمت و محبوبیت فیلتر کنید.
          </p>
        </div>
      </section>


      <section className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-[120px] lg:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <ProductsFilterSidebar
            allCategories={categories}
            categoryCounts={categoryCounts}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            onClearFilters={clearFilters}
            search={searchInput}
            onSearchChange={handleSearchChange}
          />

          <div className="flex w-full flex-col gap-6">
            <ProductsToolbar
              sort={sort}
              onSortChange={handleSortChange}
              resultCount={totalCount}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
            />
            <ProductsResultsGrid
              products={products}
              isEmpty={products.length === 0}
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isPending}
            />
          </div>
        </div>
      </section>
    </>
  );
}
