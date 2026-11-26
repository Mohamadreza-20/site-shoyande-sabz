"use client";

import { LogOut } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { ModalFormActions } from "@/components/ui/ModalFormActions";

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
    <Modal open={open} onClose={onClose} title="Are you sure you want to sign out?">
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3 rounded-2xl border border-admin-warning/30 bg-admin-warning-bg px-4 py-3">
          <LogOut className="mt-0.5 size-5 shrink-0 text-admin-accent" strokeWidth={2} />
          <p className="text-left text-sm font-semibold text-admin-ink">
            You&apos;ll need to sign in again to get back in.
          </p>
        </div>

        <ModalFormActions
          onCancel={onClose}
          onConfirm={onConfirm}
          saving={loading}
          savingLabel="Signing out..."
          submitLabel="Sign out"
          tone="danger"
          sticky={false}
        />
      </div>
    </Modal>
  );
}
