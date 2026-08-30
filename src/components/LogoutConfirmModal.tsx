"use client";

import { LogOut } from "lucide-react";
import Modal from "@/components/ui/Modal";

export default function LogoutConfirmModal({
  open,
  onClose,
  onConfirm,
  loading = false,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} title="آیا از خروج از حساب کاربری اطمینان دارید؟">
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3 rounded-2xl border border-admin-warning/30 bg-admin-warning-bg px-4 py-3">
          <LogOut className="mt-0.5 size-5 shrink-0 text-admin-accent" strokeWidth={2} />
          <p className="text-right text-sm font-semibold text-admin-ink">
            برای دسترسی دوباره باید مجدداً وارد حساب کاربری خود شوید.
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
            {loading ? "در حال خروج..." : "خروج از حساب"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
