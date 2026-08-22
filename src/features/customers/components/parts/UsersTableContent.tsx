
import { memo } from "react";
import { Mail, Pencil } from "lucide-react";
import type { Customer } from "@/features/customers/types";
import { customerStatusStyles } from "@/features/customers/constants";
import { roleLabel } from "@/features/auth/utils";
import { TableStateRow } from "@/components/ui/TableStateRow";

const roleBadgeStyles: Record<Customer["role"], string> = {
  customer: "bg-admin-bg border-admin-line text-admin-ink",
  manager: "bg-admin-primary/10 border-admin-primary text-admin-primary",
  support: "bg-admin-warning-bg border-admin-warning text-admin-warning",
};

const UserTableRow = memo(function UserTableRow({
  customer,
  onEdit,
}: {
  customer: Customer;
  onEdit: (customer: Customer) => void;
}) {
  const status = customerStatusStyles[customer.status];
  return (
    <tr className="border-b border-admin-line last:border-b-0">
      <td className="px-6 py-3.5">
        <div className="flex flex-col items-end gap-0.5">
          <p className="text-sm font-semibold text-admin-ink">{customer.name}</p>
          <div className="flex items-center gap-1 text-xs text-admin-muted">
            <span dir="ltr">{customer.email}</span>
            <Mail className="size-3" strokeWidth={2} />
          </div>
        </div>
      </td>
      <td dir="ltr" className="px-6 py-3.5 text-right text-sm text-admin-ink">{customer.phone}</td>
      <td className="px-6 py-3.5"><span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${roleBadgeStyles[customer.role]}`}>{roleLabel(customer.role)}</span></td>
      <td className="px-6 py-3.5 text-sm text-admin-ink">{customer.ordersCount.toLocaleString("fa-IR")} سفارش</td>
      <td className="px-6 py-3.5 text-sm font-semibold text-admin-primary">{customer.totalSpent}</td>
      <td className="px-6 py-3.5 text-[13px] text-admin-muted">{customer.joinDate}</td>
      <td className="px-6 py-3.5"><span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${status.bg} ${status.border} ${status.text}`}>{status.label}</span></td>
      <td className="px-6 py-3.5">
        <button type="button" onClick={() => onEdit(customer)} aria-label="ویرایش کاربر" className="flex size-8 items-center justify-center rounded-lg border border-admin-line text-admin-primary transition hover:bg-admin-bg">
          <Pencil className="size-4" strokeWidth={2} />
        </button>
      </td>
    </tr>
  );
});

export default function UsersTableContent({
  customers,
  isError,
  onRetry,
  onEdit,
}: {
  customers: Customer[];
  isError: boolean;
  onRetry: () => void;
  onEdit: (customer: Customer) => void;
}) {
  return (
    <div className="min-w-full overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse text-right">
        <thead>
          <tr className="border-y border-admin-line bg-admin-bg text-xs font-bold text-admin-muted">
            {['کاربر','شماره تماس','نقش','تعداد سفارشات','مجموع خرید','تاریخ عضویت','وضعیت','عملیات'].map((label) => (
              <th scope="col" key={label} className="px-6 py-3 font-bold">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => <UserTableRow key={customer.id} customer={customer} onEdit={onEdit} />)}
          {customers.length === 0 && (
            <TableStateRow
              colSpan={8}
              isError={isError}
              errorMessage="دریافت فهرست کاربران با خطا مواجه شد."
              emptyMessage="کاربری با این مشخصات پیدا نشد."
              onRetry={onRetry}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
