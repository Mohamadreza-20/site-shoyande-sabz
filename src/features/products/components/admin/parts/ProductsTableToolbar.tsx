"use client";

import { LayoutGrid, Plus, Search, Table2 } from "lucide-react";
import type { ProductsView } from "@/features/products/hooks/useProductsTable";

export default function ProductsTableToolbar({
  search,
  view,
  onSearchChange,
  onViewChange,
  onAdd,
}: {
  search: string;
  view: ProductsView;
  onSearchChange: (value: string) => void;
  onViewChange: (view: ProductsView) => void;
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-col-reverse items-stretch justify-between gap-3 p-6 sm:flex-row sm:items-center">
      <div className="flex w-full items-center gap-2 rounded-xl border border-admin-line bg-admin-bg px-4 py-2.5 sm:w-[280px]">
        <input type="text" value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="جستجوی محصول..." dir="rtl" className="w-full flex-1 bg-transparent text-right text-sm text-admin-ink placeholder:text-admin-muted focus:outline-none" />
        <Search className="size-4 shrink-0 text-admin-muted" strokeWidth={2} />
      </div>
      <div className="flex items-center gap-3">
        <p className="text-lg font-bold text-admin-ink">فهرست محصولات فروشگاه</p>
        <div className="flex items-center gap-1 rounded-[10px] border border-admin-line bg-admin-bg p-1">
          <button type="button" onClick={() => onViewChange("table")} aria-label="نمایش جدولی" aria-pressed={view === "table"} className={`cursor-pointer flex size-8 items-center justify-center rounded-lg transition ${view === "table" ? "bg-white text-admin-primary shadow-sm" : "text-admin-muted hover:text-admin-ink"}`}><Table2 className="size-4" strokeWidth={2} /></button>
          <button type="button" onClick={() => onViewChange("grid")} aria-label="نمایش شبکه‌ای" aria-pressed={view === "grid"} className={`cursor-pointer flex size-8 items-center justify-center rounded-lg transition ${view === "grid" ? "bg-white text-admin-primary shadow-sm" : "text-admin-muted hover:text-admin-ink"}`}><LayoutGrid className="size-4" strokeWidth={2} /></button>
        </div>
        <button type="button" onClick={onAdd} className="cursor-pointer flex items-center gap-1.5 rounded-[10px] bg-admin-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"><Plus className="size-4" strokeWidth={2.5} />افزودن محصول جدید</button>
      </div>
    </div>
  );
}
