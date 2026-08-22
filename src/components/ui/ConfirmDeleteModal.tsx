"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "@/components/ui/Modal";

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  itemLabel,
  loading = false,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemLabel: string;
  loading?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} title="آیا از حذف اطمینان دارید؟">
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3 rounded-2xl border border-admin-danger/30 bg-admin-danger-bg px-4 py-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-admin-danger" strokeWidth={2} />
          <p className="text-right text-sm font-semibold text-admin-danger">
            {itemLabel} حذف می‌شود و این عملیات قابل بازگشت نیست.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="cursor-pointer rounded-[10px] border border-admin-line px-5 py-2.5 text-sm font-semibold text-admin-ink transition hover:bg-admin-bg disabled:cursor-not-allowed disabled:opacity-60"
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="cursor-pointer rounded-[10px] bg-admin-danger px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "در حال حذف..." : "حذف"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
