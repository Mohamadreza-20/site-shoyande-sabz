"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Customer, CustomerListResult } from "@/features/customers/types";
import { useCustomersPage } from "@/features/customers/hooks";
import { useUrlListState } from "@/lib/hooks/useUrlListState";
import { StaleDataNotice } from "@/components/ui/StaleDataNotice";
import Pagination from "@/components/Pagination";
import UsersTableContent from "./parts/UsersTableContent";

const UserEditModal = dynamic(() => import("./UserEditModal"), { ssr: false });

function TableLoadingOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white/70 text-sm font-semibold text-admin-primary backdrop-blur-[1px]">
      Loading...
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
  const {
    search,
    setSearch,
    debouncedSearch,
    queryPage,
    page,
    setPage: handlePageChange,
    clampPage,
  } = useUrlListState();

  const { data, isError, isFetching, refetch } = useCustomersPage(
    { search: debouncedSearch, page: queryPage, pageSize },
    initialResult,
    fetchedAt
  );

  const customers = data?.customers ?? [];
  const totalPages = data?.totalPages ?? 1;
  useEffect(() => {
    if (data) clampPage(totalPages);
  }, [clampPage, data, totalPages]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Customer | null>(null);

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
        <label className="flex w-full items-center gap-2 rounded-xl border border-admin-line bg-admin-bg px-4 py-2.5 sm:w-[280px] focus-within:border-admin-primary focus-within:ring-2 focus-within:ring-admin-primary/30 transition-shadow">
          <span className="sr-only">Search name or email</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..."
            aria-label="Search users"
            className="w-full flex-1 bg-transparent text-left text-sm text-admin-ink placeholder:text-admin-muted focus:outline-none"
          />
        </label>
        <p className="text-lg font-bold text-admin-ink">Store users</p>
      </div>

      <UsersTableContent
        customers={customers}
        isError={isError}
        onRetry={() => refetch()}
        onEdit={openEditModal}
      />

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
