"use client";

import type { Discount, DiscountInput, DiscountStatus } from "@/features/discounts/types";
import { useCreateDiscount, useUpdateDiscount } from "@/features/discounts/hooks";
import { validateDiscountInput } from "@/features/discounts/validation";
import { useEntityModalForm } from "@/lib/hooks/useEntityModalForm";
import { TextField, SelectField } from "@/components/ui/FormField";
import { ModalFormActions } from "@/components/ui/ModalFormActions";
import Modal from "@/components/ui/Modal";

const statusOptions: { value: DiscountStatus; label: string }[] = [
  { value: "active", label: "فعال" },
  { value: "scheduled", label: "زمان‌بندی‌شده" },
  { value: "expired", label: "منقضی‌شده" },
];

function emptyForm(): DiscountInput {
  return {
    code: "",
    type: "percent",
    value: "",
    usage: "۰ از نامحدود",
    expiry: "",
    status: "active",
  };
}

function toFormValues(discount: Discount): DiscountInput {
  return {
    code: discount.code,
    type: discount.type,
    value: discount.value,
    usage: discount.usage,
    expiry: discount.expiry,
    status: discount.status,
  };
}

export default function DiscountModal({
  open,
  onClose,
  onSaved,
  discount,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  discount: Discount | null;
}) {
  const isEdit = Boolean(discount);
  const createDiscount = useCreateDiscount();
  const updateDiscount = useUpdateDiscount();
  const saving = createDiscount.isPending || updateDiscount.isPending;

  const { register, handleSubmit, watch, onSubmit } = useEntityModalForm<DiscountInput, Discount>({
    open,
    entity: discount,
    toFormValues,
    emptyValues: emptyForm,
    validate: validateDiscountInput,
    submit: async (form) => {
      const payload: DiscountInput = { ...form, code: form.code.trim().toUpperCase() };
      if (isEdit && discount) {
        await updateDiscount.mutateAsync({ id: discount.id, input: payload });
      } else {
        await createDiscount.mutateAsync(payload);
      }
    },
    successMessage: isEdit
      ? "کد تخفیف با موفقیت ویرایش شد."
      : "کد تخفیف جدید با موفقیت ساخته شد.",
    onSaved,
  });

  const type = watch("type");

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "ویرایش کد تخفیف" : "ساخت کد تخفیف جدید"}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <TextField
          label="کد تخفیف"
          type="text"
          {...register("code", { required: true })}
          placeholder="مثال: SABZ20"
          dir="ltr"
        />

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <SelectField label="نوع تخفیف" {...register("type")}>
            <option value="percent">درصدی</option>
            <option value="fixed">مبلغ ثابت</option>
          </SelectField>
          <TextField
            label="میزان تخفیف"
            type="text"
            {...register("value", { required: true })}
            placeholder={type === "percent" ? "۲۰٪" : "۵۰,۰۰۰ تومان"}
          />
        </div>

        <TextField
          label="میزان استفاده"
          type="text"
          {...register("usage")}
          placeholder="مثال: ۱۴۲ از ۵۰۰"
        />

        <TextField
          label="تاریخ انقضا"
          type="text"
          {...register("expiry")}
          placeholder="مثال: ۳۰ اسفند ۱۴۰۴ یا بدون انقضا"
        />

        <SelectField label="وضعیت" {...register("status")}>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </SelectField>

        <ModalFormActions
          onCancel={onClose}
          saving={saving}
          savingLabel="در حال ذخیره..."
          submitLabel={isEdit ? "ذخیره تغییرات" : "ساخت کد تخفیف"}
        />
      </form>
    </Modal>
  );
}
