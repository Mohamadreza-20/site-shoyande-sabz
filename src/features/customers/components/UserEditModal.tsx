"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<CustomerEditFormValues>({
    defaultValues: user ? emptyForm(user) : undefined,
  });
  const role = watch("role");
  const status = watch("status");

  const [displayUser, setDisplayUser] = useState(user);
  useEffect(() => {
    if (user) setDisplayUser(user);
  }, [user]);

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
      toast.error("لطفاً اطلاعات را به‌درستی تکمیل کنید.");
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
    toast.success(`اطلاعات ${values.name.trim()} با موفقیت به‌روزرسانی شد.`);
    onSaved();
  }

  if (!displayUser) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="ویرایش کاربر"
      description={`${displayUser.name} — ${displayUser.email}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <TextField
          label="نام و نام خانوادگی"
          type="text"
          {...register("name")}
          error={formErrors.name?.message}
        />

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <TextField
            label="ایمیل"
            type="email"
            dir="ltr"
            {...register("email")}
            error={formErrors.email?.message}
          />
          <TextField
            label="شماره تماس"
            type="text"
            dir="ltr"
            {...register("phone")}
            error={formErrors.phone?.message}
          />
        </div>

        <label className="flex w-full flex-col gap-2 text-right">
          <span className="text-sm font-semibold text-admin-ink">نقش کاربر</span>
          <div className="grid w-full grid-cols-3 gap-2">
            {roleOptions.map((option) => {
              const selected = role === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setValue("role", option, { shouldDirty: true })}
                  className={`cursor-pointer rounded-xl border p-3 text-center text-sm font-bold transition ${
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

        <label className="flex w-full flex-col gap-2 text-right">
          <span className="text-sm font-semibold text-admin-ink">وضعیت حساب</span>
          <div className="grid w-full grid-cols-2 gap-2">
            {statusOptions.map((option) => {
              const selected = status === option;
              const style = customerStatusStyles[option];
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setValue("status", option, { shouldDirty: true })}
                  className={`cursor-pointer rounded-xl border p-3 text-center text-sm font-bold transition ${
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
              کاربران غیرفعال دیگر امکان ورود به حساب کاربری خود را نخواهند داشت.
            </span>
          )}
        </label>

        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-admin-line px-5 py-2.5 text-sm font-semibold text-admin-ink transition hover:bg-admin-bg"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={updateCustomer.isPending}
            className="cursor-pointer rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updateCustomer.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
