"use client";

import type { Discount, DiscountInput, DiscountStatus } from "@/features/discounts/types";
import { useCreateDiscount, useUpdateDiscount } from "@/features/discounts/hooks";
import { validateDiscountInput } from "@/features/discounts/validation";
import { useEntityModalForm } from "@/lib/hooks/useEntityModalForm";
import { TextField, SelectField } from "@/components/ui/FormField";
import { ModalFormActions } from "@/components/ui/ModalFormActions";
import Modal from "@/components/ui/Modal";

const statusOptions: { value: DiscountStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "scheduled", label: "Scheduled" },
  { value: "expired", label: "Expired" },
];

function emptyForm(): DiscountInput {
  return {
    code: "",
    type: "percent",
    value: "",
    usage: "0 of unlimited",
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
    successMessage: isEdit ? "Discount code updated." : "New discount code created.",
    onSaved,
  });

  const type = watch("type");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit discount code" : "Create new discount code"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <TextField
          label="Discount code"
          type="text"
          {...register("code", { required: true })}
          placeholder="e.g. GREEN20"
        />

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <SelectField label="Discount type" {...register("type")}>
            <option value="percent">Percentage</option>
            <option value="fixed">Fixed amount</option>
          </SelectField>
          <TextField
            label="Discount value"
            type="text"
            {...register("value", { required: true })}
            placeholder={type === "percent" ? "20%" : "$5"}
          />
        </div>

        <TextField label="Usage" type="text" {...register("usage")} placeholder="e.g. 142 of 500" />

        <TextField
          label="Expiry date"
          type="text"
          {...register("expiry")}
          placeholder="e.g. Mar 30, 2027 or No expiry"
        />

        <SelectField label="Status" {...register("status")}>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </SelectField>

        <ModalFormActions
          onCancel={onClose}
          saving={saving}
          savingLabel="Saving..."
          submitLabel={isEdit ? "Save changes" : "Create code"}
        />
      </form>
    </Modal>
  );
}
