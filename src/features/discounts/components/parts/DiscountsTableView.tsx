import { memo } from "react";
import { Copy, Pencil, Plus, Trash2 } from "lucide-react";
import type { Discount } from "@/features/discounts/types";
import { discountStatusStyles } from "@/features/discounts/constants";
import { TableStateRow } from "@/components/ui/TableStateRow";
import { StaleDataNotice } from "@/components/ui/StaleDataNotice";
import Pagination from "@/components/Pagination";
import { cn } from "@/lib/cn";

const COLUMNS = ["Code", "Value", "Usage", "Expiry", "Status", "Actions"];

type RowProps = {
  discount: Discount;
  isDeleting: boolean;
  onEdit: (discount: Discount) => void;
  onDelete: (discount: Discount) => void;
  onCopy: (code: string) => void;
};

const DiscountTableRow = memo(function DiscountTableRow({
  discount,
  isDeleting,
  onEdit,
  onDelete,
  onCopy,
}: RowProps) {
  const status = discountStatusStyles[discount.status];

  return (
    <tr className="border-b border-admin-line last:border-b-0">
      <td className="px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-admin-bg px-2.5 py-1 text-xs font-bold text-admin-ink">
            {discount.code}
          </span>
          <button
            type="button"
            onClick={() => onCopy(discount.code)}
            aria-label="Copy discount code"
            className="-m-2 flex size-10 items-center justify-center text-admin-muted transition hover:text-admin-primary"
          >
            <Copy className="size-3.5" strokeWidth={2} />
          </button>
        </div>
      </td>
      <td className="px-4 py-3.5 text-sm font-semibold text-admin-primary sm:px-6">
        {discount.value}
      </td>
      <td className="px-4 py-3.5 text-sm text-admin-ink sm:px-6">{discount.usage}</td>
      <td className="px-4 py-3.5 text-[13px] text-admin-muted sm:px-6">{discount.expiry}</td>
      <td className="px-4 py-3.5 sm:px-6">
        <span
          className={cn(
            "inline-block whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold",
            status.bg,
            status.border,
            status.text
          )}
        >
          {status.label}
        </span>
      </td>
      <td className="px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(discount)}
            aria-label="Edit discount code"
            className="flex size-8 items-center justify-center rounded-lg border border-admin-line text-admin-primary transition hover:bg-admin-bg"
          >
            <Pencil className="size-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(discount)}
            disabled={isDeleting}
            aria-label="Delete discount code"
            className="flex size-8 items-center justify-center rounded-lg border border-admin-line text-admin-danger transition hover:bg-admin-danger-bg disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 className="size-4" strokeWidth={2} />
          </button>
        </div>
      </td>
    </tr>
  );
});

type DiscountsTableViewProps = {
  discounts: Discount[];
  isError: boolean;
  editingCode?: string;
  page: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onAdd: () => void;
  onEdit: (discount: Discount) => void;
  onDelete: (discount: Discount) => void;
  onCopy: (code: string) => void;
  onRetry: () => void;
  isDeleting: (discount: Discount) => boolean;
};

export default function DiscountsTableView({
  discounts,
  isError,
  editingCode,
  page,
  totalPages,
  totalCount,
  onPageChange,
  onAdd,
  onEdit,
  onDelete,
  onCopy,
  onRetry,
  isDeleting,
}: DiscountsTableViewProps) {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-3xl border border-admin-line bg-white">
      {isError && totalCount > 0 && (
        <div className="px-4 pt-4 sm:px-6 sm:pt-6">
          <StaleDataNotice onRetry={onRetry} />
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6">
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-[10px] bg-admin-primary min-h-10 px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 sm:px-4 sm:py-2.5 sm:text-sm"
        >
          <Plus className="size-4" strokeWidth={2.5} />
          Create new discount code
        </button>
        <p className="text-base font-bold text-admin-ink sm:text-lg">
          Active and archived discount codes
          {editingCode ? ` · Editing ${editingCode}` : ""}
        </p>
      </div>

      <div
        className="w-full overflow-x-auto"
        role="region"
        aria-label="Scrollable table"
        tabIndex={0}
      >
        <table data-table="discounts" className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-y border-admin-line bg-admin-bg text-xs font-bold text-admin-muted">
              {COLUMNS.map((label) => (
                <th scope="col" key={label} className="px-4 py-3 font-bold sm:px-6">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <DiscountTableRow
                key={discount.id}
                discount={discount}
                isDeleting={isDeleting(discount)}
                onEdit={onEdit}
                onDelete={onDelete}
                onCopy={onCopy}
              />
            ))}
            {discounts.length === 0 && (
              <TableStateRow
                colSpan={6}
                isError={isError}
                errorMessage="Couldn't load discount codes."
                emptyMessage="No discount codes yet."
                onRetry={onRetry}
              />
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="border-t border-admin-line p-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            scrollOnChange={false}
          />
        </div>
      )}
    </div>
  );
}
