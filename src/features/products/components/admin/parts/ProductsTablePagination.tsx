"use client";

import Pagination from "@/components/Pagination";

export default function ProductsTablePagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (page: number) => void }) {
  if (totalPages <= 1) return null;
  return <div className="border-t border-admin-line p-6"><Pagination currentPage={page} totalPages={totalPages} onPageChange={onChange} /></div>;
}
