"use client";

import { memo, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Flower2, Home as HomeIcon, Pencil, Shirt, SprayCan, Soup, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { apiErrorMessage } from "@/lib/http";
import type { CategoryWithCount } from "@/features/products/types";
import { useCategoriesWithCounts, useDeleteCategory } from "@/features/products/hooks";
import { GridStateBlock } from "@/components/ui/TableStateRow";
import { StaleDataNotice } from "@/components/ui/StaleDataNotice";

const CategoryModal = dynamic(() => import("./CategoryModal"), { ssr: false });
const ConfirmDeleteModal = dynamic(() => import("@/components/ui/ConfirmDeleteModal"), {
  ssr: false,
});

const icons = {
  spray: SprayCan,
  shirt: Shirt,
  soup: Soup,
  home: HomeIcon,
  flower: Flower2,
} as const;

const CategoryCard = memo(function CategoryCard({
  category,
  isDeleting,
  onEdit,
  onDelete,
}: {
  category: CategoryWithCount;
  isDeleting: boolean;
  onEdit: (category: CategoryWithCount) => void;
  onDelete: (category: CategoryWithCount) => void;
}) {
  const Icon = icons[category.icon];
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-admin-line bg-white p-6">
      <div className="flex items-center justify-between">
        <span className={`flex size-12 items-center justify-center rounded-xl ${category.bg}`}>
          <Icon className="size-6 text-admin-ink" strokeWidth={1.75} />
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(category)}
            aria-label="ویرایش دسته‌بندی"
            className="cursor-pointer flex size-8 items-center justify-center rounded-lg border border-admin-line text-admin-primary transition hover:bg-admin-bg"
          >
            <Pencil className="size-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(category)}
            disabled={isDeleting}
            aria-label="حذف دسته‌بندی"
            className="cursor-pointer flex size-8 items-center justify-center rounded-lg border border-admin-line text-admin-danger transition hover:bg-admin-danger-bg disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 text-right">
        <h3 className="text-base font-bold text-admin-ink">{category.title}</h3>
        <p className="text-sm text-admin-muted">
          {category.productCount.toLocaleString("fa-IR")} محصول
        </p>
      </div>
    </div>
  );
});

export default function CategoriesGrid({
  categories: initialCategories,
  fetchedAt,
}: {
  categories: CategoryWithCount[];
  fetchedAt?: number;
}) {
  const {
    data: categories = initialCategories,
    isError,
    refetch,
  } = useCategoriesWithCounts(initialCategories, fetchedAt);
  const deleteCategory = useDeleteCategory();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryWithCount | null>(null);
  const [confirmDeleteCategory, setConfirmDeleteCategory] = useState<CategoryWithCount | null>(
    null
  );

  const openAddModal = useCallback(() => {
    setEditingCategory(null);
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((category: CategoryWithCount) => {
    setEditingCategory(category);
    setModalOpen(true);
  }, []);

  const requestDelete = useCallback((category: CategoryWithCount) => {
    setConfirmDeleteCategory(category);
  }, []);

  function handleSaved() {
    setModalOpen(false);
    setEditingCategory(null);
  }

  async function handleConfirmDelete() {
    if (!confirmDeleteCategory) return;
    const category = confirmDeleteCategory;
    try {
      await deleteCategory.mutateAsync(category.id);
    } catch (error) {
      setConfirmDeleteCategory(null);
      toast.error(apiErrorMessage(error));
      return;
    }
    setConfirmDeleteCategory(null);
    toast.success(`دسته‌بندی «${category.title}» حذف شد.`);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {isError && categories.length > 0 && <StaleDataNotice onRetry={() => refetch()} />}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.length === 0 && (
          <GridStateBlock
            isError={isError}
            errorMessage="دریافت دسته‌بندی‌ها با خطا مواجه شد."
            emptyMessage="هنوز دسته‌بندی‌ای ثبت نشده است."
            onRetry={() => refetch()}
          />
        )}
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isDeleting={deleteCategory.isPending && confirmDeleteCategory?.id === category.id}
            onEdit={openEditModal}
            onDelete={requestDelete}
          />
        ))}

        <button
          type="button"
          onClick={openAddModal}
          className="cursor-pointer flex min-h-[148px] flex-col items-center justify-center gap-2 rounded-[20px] border border-dashed border-admin-line bg-white text-admin-muted transition hover:border-admin-primary hover:text-admin-primary"
        >
          <span className="text-2xl leading-none">+</span>
          <span className="text-sm font-semibold">افزودن دسته‌بندی جدید</span>
        </button>
      </div>

      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
        category={editingCategory}
      />

      <ConfirmDeleteModal
        open={confirmDeleteCategory !== null}
        onClose={() => setConfirmDeleteCategory(null)}
        onConfirm={handleConfirmDelete}
        itemLabel={confirmDeleteCategory ? `دسته‌بندی «${confirmDeleteCategory.title}»` : ""}
        loading={deleteCategory.isPending}
      />
    </div>
  );
}
