"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getFieldErrors, normalizePersianDigits } from "@/features/auth/validation";
import { customerProfileSchema, type CustomerProfileFormValues } from "@/features/customers/lib";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { TextField } from "@/components/ui/FormField";
import Modal from "@/components/ui/Modal";

export default function EditProfileModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user, updateProfile } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<CustomerProfileFormValues>({
    defaultValues: { name: "", email: "", phone: "" },
  });

  useEffect(() => {
    if (open && user) {
      reset({ name: user.name, email: user.email, phone: user.phone });
    }
  }, [open, user, reset]);

  async function onSubmit(values: CustomerProfileFormValues) {
    const normalizedValues: CustomerProfileFormValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: normalizePersianDigits(values.phone.trim()),
    };
    const fieldErrors = getFieldErrors(customerProfileSchema, normalizedValues);
    if (Object.keys(fieldErrors).length > 0) {
      toast.error("لطفاً اطلاعات را به‌درستی تکمیل کنید.");
      return;
    }
    const result = await updateProfile(normalizedValues);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("اطلاعات حساب کاربری با موفقیت به‌روزرسانی شد.");
    onClose();
  }

  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose} title="ویرایش اطلاعات حساب کاربری">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <TextField
          label="نام و نام خانوادگی"
          type="text"
          {...register("name")}
          error={formErrors.name?.message}
        />
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

        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
