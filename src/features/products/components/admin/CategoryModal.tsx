"use client";

import type { Category, CategoryInput } from "@/features/products/types";
import { useCreateCategory, useUpdateCategory } from "@/features/products/hooks";
import { useEntityModalForm } from "@/lib/hooks/useEntityModalForm";
import { ModalFormActions } from "@/components/ui/ModalFormActions";
import Modal from "@/components/ui/Modal";
import CategoryFormFields, { bgOptions } from "./parts/CategoryFormFields";

function emptyForm(): CategoryInput { return { title: "", icon: "spray", bg: bgOptions[0] }; }
function toFormValues(category: Category): CategoryInput { return { title: category.title, icon: category.icon, bg: category.bg }; }

export default function CategoryModal({ open, onClose, onSaved, category }: { open: boolean; onClose: () => void; onSaved: () => void; category: Category | null }) {
  const isEdit = Boolean(category);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const saving = createCategory.isPending || updateCategory.isPending;
  const { register, handleSubmit, watch, setValue, onSubmit } = useEntityModalForm<CategoryInput, Category>({
    open, entity: category, toFormValues, emptyValues: emptyForm,
    validate: (form) => (!form.title.trim() ? "لطفاً عنوان دسته‌بندی را وارد کنید." : null),
    submit: async (form) => {
      if (isEdit && category) await updateCategory.mutateAsync({ id: category.id, input: form });
      else await createCategory.mutateAsync(form);
    },
    successMessage: isEdit ? "دسته‌بندی با موفقیت ویرایش شد." : "دسته‌بندی جدید با موفقیت افزوده شد.",
    onSaved,
  });
  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <CategoryFormFields register={register} watch={watch} setValue={setValue} />
        <ModalFormActions onCancel={onClose} saving={saving} savingLabel="در حال ذخیره..." submitLabel={isEdit ? "ذخیره تغییرات" : "افزودن دسته‌بندی"} />
      </form>
    </Modal>
  );
}
