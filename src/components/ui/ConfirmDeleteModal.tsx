"use client";

import { AlertTriangle } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { ModalFormActions } from "@/components/ui/ModalFormActions";

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
    <Modal open={open} onClose={onClose} title="Are you sure you want to delete this?">
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3 rounded-2xl border border-admin-danger/30 bg-admin-danger-bg px-4 py-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-admin-danger" strokeWidth={2} />
          <p className="text-left text-sm font-semibold text-admin-danger">
            {itemLabel} will be deleted. This action cannot be undone.
          </p>
        </div>

        <ModalFormActions
          onCancel={onClose}
          onConfirm={onConfirm}
          saving={loading}
          savingLabel="Deleting..."
          submitLabel="Delete"
          tone="danger"
          sticky={false}
        />
      </div>
    </Modal>
  );
}
