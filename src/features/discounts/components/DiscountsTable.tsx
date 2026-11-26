"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { apiErrorMessage } from "@/lib/http";
import type { Discount } from "@/features/discounts/types";
import { useDeleteDiscount, useDiscounts } from "@/features/discounts/hooks";
import { useDiscountsPagination } from "@/features/discounts/hooks/useDiscountsPagination";
import DiscountsTableView from "./parts/DiscountsTableView";

const DiscountModal = dynamic(() => import("./DiscountModal"), { ssr: false });
const ConfirmDeleteModal = dynamic(() => import("@/components/ui/ConfirmDeleteModal"), {
  ssr: false,
});

export default function DiscountsTable({
  discounts: initialDiscounts,
  fetchedAt,
}: {
  discounts: Discount[];
  fetchedAt?: number;
}) {
  const {
    data: discounts = initialDiscounts,
    isError,
    refetch,
  } = useDiscounts(initialDiscounts, fetchedAt);
  const deleteDiscount = useDeleteDiscount();
  const { page, totalPages, pageItems, setPage } = useDiscountsPagination(discounts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [confirmDeleteDiscount, setConfirmDeleteDiscount] = useState<Discount | null>(null);
  const openEditModal = useCallback((discount: Discount) => {
    setEditingDiscount(discount);
    setModalOpen(true);
  }, []);
  const handleSaved = useCallback(() => {
    setModalOpen(false);
    setEditingDiscount(null);
  }, []);
  const handleConfirmDelete = useCallback(async () => {
    if (!confirmDeleteDiscount) return;
    const discount = confirmDeleteDiscount;
    const toastId = toast.loading(`Deleting code "${discount.code}"...`);
    try {
      await deleteDiscount.mutateAsync(discount.id);
      toast.success(`Discount code "${discount.code}" deleted.`, { id: toastId });
    } catch (error) {
      toast.error(apiErrorMessage(error), { id: toastId });
    } finally {
      setConfirmDeleteDiscount(null);
    }
  }, [confirmDeleteDiscount, deleteDiscount]);
  const handleCopy = useCallback(async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Discount code copied.");
    } catch {
      toast.error("Couldn't copy the code.");
    }
  }, []);

  return (
    <>
      <DiscountsTableView
        discounts={pageItems}
        page={page}
        totalPages={totalPages}
        totalCount={discounts.length}
        onPageChange={setPage}
        isError={isError}
        editingCode={editingDiscount?.code}
        onAdd={() => {
          setEditingDiscount(null);
          setModalOpen(true);
        }}
        onEdit={openEditModal}
        onDelete={setConfirmDeleteDiscount}
        onCopy={handleCopy}
        onRetry={() => refetch()}
        isDeleting={(discount) =>
          deleteDiscount.isPending && confirmDeleteDiscount?.id === discount.id
        }
      />
      <DiscountModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
        discount={editingDiscount}
      />
      <ConfirmDeleteModal
        open={confirmDeleteDiscount !== null}
        onClose={() => setConfirmDeleteDiscount(null)}
        onConfirm={handleConfirmDelete}
        itemLabel={confirmDeleteDiscount ? `discount code "${confirmDeleteDiscount.code}"` : ""}
        loading={deleteDiscount.isPending}
      />
    </>
  );
}
