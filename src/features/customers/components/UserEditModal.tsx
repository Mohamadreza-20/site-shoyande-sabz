"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { apiErrorMessage } from "@/lib/http";
import { getFieldErrors, normalizePersianDigits } from "@/features/auth/validation";
import type { Customer } from "@/features/customers/types";
import { customerEditSchema, type CustomerEditFormValues } from "@/features/customers/lib";
import { useUpdateCustomer } from "@/features/customers/hooks";
import { roleLabel } from "@/features/auth/utils";
import { customerStatusStyles } from "@/features/customers/constants";
import { TextField } from "@/components/ui/FormField";
import Modal from "@/components/ui/Modal";
import { ModalFormActions } from "@/components/ui/ModalFormActions";

const roleOptions: CustomerEditFormValues["role"][] = ["customer", "manager", "support"];
const statusOptions: CustomerEditFormValues["status"][] = ["active", "inactive"];

function emptyForm(user: Customer): CustomerEditFormValues {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
  };
}

export default function UserEditModal({
  open,
  onClose,
  onSaved,
  user,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  user: Customer | null;
}) {
  const updateCustomer = useUpdateCustomer();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<CustomerEditFormValues>({
    defaultValues: user ? emptyForm(user) : undefined,
  });
  const role = useWatch({ control, name: "role" });
  const status = useWatch({ control, name: "status" });

  const [displayUser, setDisplayUser] = useState(user);
  if (user && user !== displayUser) setDisplayUser(user);

  useEffect(() => {
    if (open && user) {
      reset(emptyForm(user));
    }
  }, [open, user, reset]);

  async function onSubmit(values: CustomerEditFormValues) {
    if (!user) return;
    const normalizedValues: CustomerEditFormValues = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: normalizePersianDigits(values.phone.trim()),
    };
    const fieldErrors = getFieldErrors(customerEditSchema, normalizedValues);
    if (Object.keys(fieldErrors).length > 0) {
      toast.error("Please fill in the fields correctly.");
      return;
    }
    try {
      await updateCustomer.mutateAsync({
        id: user.id,
        input: {
          name: normalizedValues.name,
          email: normalizedValues.email,
          phone: normalizedValues.phone,
          role: normalizedValues.role,
          status: normalizedValues.status,
        },
      });
    } catch (error) {
      toast.error(apiErrorMessage(error));
      return;
    }
    toast.success(`${values.name.trim()}'s details were updated.`);
    onSaved();
  }

  if (!displayUser) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit user"
      description={`${displayUser.name} — ${displayUser.email}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <TextField
          label="Full name"
          type="text"
          {...register("name")}
          error={formErrors.name?.message}
        />

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={formErrors.email?.message}
          />
          <TextField
            label="Phone"
            type="text"
            {...register("phone")}
            error={formErrors.phone?.message}
          />
        </div>

        <label className="flex w-full flex-col gap-2 text-left">
          <span className="text-sm font-semibold text-admin-ink">User role</span>
          <div className="grid w-full grid-cols-3 gap-1.5 sm:gap-2">
            {roleOptions.map((option) => {
              const selected = role === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setValue("role", option, { shouldDirty: true })}
                  className={`rounded-xl border p-2 text-center text-xs font-bold transition sm:p-3 sm:text-sm ${
                    selected
                      ? "border-admin-sidebar bg-admin-sidebar text-white"
                      : "border-admin-line bg-white text-admin-muted hover:text-admin-ink"
                  }`}
                >
                  {roleLabel(option)}
                </button>
              );
            })}
          </div>
        </label>

        <label className="flex w-full flex-col gap-2 text-left">
          <span className="text-sm font-semibold text-admin-ink">Account status</span>
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
            {statusOptions.map((option) => {
              const selected = status === option;
              const style = customerStatusStyles[option];
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setValue("status", option, { shouldDirty: true })}
                  className={`rounded-xl border p-3 text-center text-sm font-bold transition ${
                    selected
                      ? "border-admin-sidebar bg-admin-sidebar text-white"
                      : `${style.border} ${style.bg} ${style.text}`
                  }`}
                >
                  {style.label}
                </button>
              );
            })}
          </div>
          {status === "inactive" && (
            <span className="text-xs text-admin-muted">
              Inactive users can no longer sign in to their account.
            </span>
          )}
        </label>

        <ModalFormActions
          onCancel={onClose}
          saving={updateCustomer.isPending}
          savingLabel="Saving..."
          submitLabel="Save changes"
        />
      </form>
    </Modal>
  );
}
