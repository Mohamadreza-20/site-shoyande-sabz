"use client";

import { useState } from "react";
import { Calendar, CreditCard, Package, User } from "lucide-react";
import type { Order } from "@/features/orders/types";
import { orderStatusStyles } from "@/features/orders/constants";
import Modal from "@/components/ui/Modal";

const rows: { key: keyof Order; label: string; icon: typeof User }[] = [
  { key: "customer", label: "مشتری", icon: User },
  { key: "products", label: "محصولات انتخاب شده", icon: Package },
  { key: "date", label: "تاریخ ثبت", icon: Calendar },
  { key: "amount", label: "مجموع مبلغ", icon: CreditCard },
];

export default function OrderDetailsModal({
  open,
  onClose,
  order,
}: {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}) {
  const [prevOrder, setPrevOrder] = useState(order);
  const [displayOrder, setDisplayOrder] = useState(order);
  if (order !== prevOrder) {
    setPrevOrder(order);
    if (order) setDisplayOrder(order);
  }

  if (!displayOrder) return null;

  const status = orderStatusStyles[displayOrder.status];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`جزئیات سفارش ${displayOrder.orderNumber}`}
      description="اطلاعات کامل این سفارش را در ادامه مشاهده می‌کنید."
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between rounded-2xl border border-admin-line bg-admin-bg px-4 py-3">
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${status.bg} ${status.border} ${status.text}`}
          >
            {status.label}
          </span>
          <span className="text-sm font-bold text-admin-ink">{displayOrder.orderNumber}</span>
        </div>

        <div className="flex flex-col divide-y divide-admin-line rounded-2xl border border-admin-line">
          {rows.map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex items-start justify-between gap-4 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-admin-muted">
                <Icon className="size-4" strokeWidth={2} />
                {label}
              </div>
              <p className="max-w-[65%] text-right text-sm font-semibold text-admin-ink">
                {displayOrder[key]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
