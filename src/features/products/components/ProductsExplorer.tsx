"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import Link from "next/link";
import MarkerLabel from "@/components/ui/MarkerLabel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/features/products/types";
import type { SortValue } from "@/features/products/product-sort";
import { useSeedProductDetailCache } from "@/features/products/hooks";
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
  fetchedAt,
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
  fetchedAt?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useSeedProductDetailCache(products, fetchedAt);

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
  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    []
  );

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
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-[60px]">
        <div className="relative overflow-hidden rounded-[32px] bg-brand-100 px-6 py-10 lg:px-14 lg:py-14">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-accent/70 lg:size-64"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-16 right-24 size-36 rounded-full bg-brand-400/20"
          />
          <div className="relative flex w-full flex-col items-start gap-4 text-left">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm font-medium text-muted"
            >
              <Link href="/" className="transition hover:text-brand-700">
                Home
              </Link>
              <span>/</span>
              <span className="font-bold text-brand-700">Products</span>
            </nav>
            <h1 className="text-[34px] leading-tight lg:text-[52px]">
              <MarkerLabel>Our products</MarkerLabel>
            </h1>
            <p className="max-w-[560px] text-[15px] leading-[1.7] text-muted lg:text-base">
              Plant-based cleaners for every corner of your home. Browse the full range, then filter
              by category or sort by price and rating.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-[60px] lg:py-14">
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
