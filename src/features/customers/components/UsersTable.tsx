"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Customer, CustomerListResult } from "@/features/customers/types";
import { useCustomersPage } from "@/features/customers/hooks";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { StaleDataNotice } from "@/components/ui/StaleDataNotice";
import Pagination from "@/components/Pagination";
import UsersTableContent from "./parts/UsersTableContent";

const UserEditModal = dynamic(() => import("./UserEditModal"), { ssr: false });

const SEARCH_DEBOUNCE_MS = 400;

function TableLoadingOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white/70 text-sm font-semibold text-admin-primary backdrop-blur-[1px]">
      در حال دریافت اطلاعات...
    </div>
  );
}

export default function UsersTable({
  initialResult,
  pageSize,
  fetchedAt,
}: {
  initialResult: CustomerListResult;
  pageSize: number;
  fetchedAt?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);

  const pageParam = Number(searchParams.get("page"));
  const page = Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1;

  const previousSearchRef = useRef(debouncedSearch);
  const searchChanged = debouncedSearch !== previousSearchRef.current;

  useEffect(() => {
    previousSearchRef.current = debouncedSearch;
  }, [debouncedSearch]);

  const {
    data,
    isError,
    isFetching,
    refetch,
  } = useCustomersPage(
    { search: debouncedSearch, page: searchChanged ? 1 : page, pageSize },
    initialResult,
    fetchedAt
  );

  const customers = data?.customers ?? [];
  const totalPages = data?.totalPages ?? 1;

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Customer | null>(null);

  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  });

  useEffect(() => {
    const currentParams = searchParamsRef.current;
    const params = new URLSearchParams(currentParams.toString());
    const trimmed = debouncedSearch.trim();
    const currentQ = currentParams.get("q") ?? "";
    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }
    if (trimmed !== currentQ) {
      params.delete("page");
    }
    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    const currentUrl = currentParams.toString()
      ? `${pathname}?${currentParams.toString()}`
      : pathname;
    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [debouncedSearch, pathname, router]);

  useEffect(() => {
    if (page > totalPages && totalPages >= 1) {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (totalPages > 1) params.set("page", String(totalPages));
      else params.delete("page");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }
  }, [page, totalPages, pathname, router]);

  function handleSearchChange(value: string) {
    setSearch(value);
  }

  const handlePageChange = useCallback(
    (nextPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (nextPage > 1) params.set("page", String(nextPage));
      else params.delete("page");
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [searchParams, pathname, router]
  );

  const openEditModal = useCallback((user: Customer) => {
    setEditingUser(user);
    setModalOpen(true);
  }, []);

  function handleSaved() {
    setModalOpen(false);
    setEditingUser(null);
  }

  return (
    <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-3xl border border-admin-line bg-white">
      {isFetching && <TableLoadingOverlay />}
      {isError && customers.length > 0 && (
        <div className="px-6 pt-6">
          <StaleDataNotice onRetry={() => refetch()} />
        </div>
      )}
      <div className="flex flex-col-reverse items-stretch justify-between gap-3 p-6 sm:flex-row sm:items-center">
        <label className="flex w-full items-center gap-2 rounded-xl border border-admin-line bg-admin-bg px-4 py-2.5 sm:w-[280px]">
          <span className="sr-only">جستجوی نام یا ایمیل</span>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="جستجوی نام یا ایمیل..."
            dir="rtl"
            className="w-full flex-1 bg-transparent text-right text-sm text-admin-ink placeholder:text-admin-muted focus:outline-none"
          />
        </label>
        <p className="text-lg font-bold text-admin-ink">فهرست کاربران فروشگاه</p>
      </div>

      <UsersTableContent customers={customers} isError={isError} onRetry={() => refetch()} onEdit={openEditModal} />

      {totalPages > 1 && (
        <div className="border-t border-admin-line p-6">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}

      <UserEditModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
        user={editingUser}
      />
    </div>
  );
}
