"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getFieldErrors, normalizePersianDigits } from "@/features/auth/validation";
import { customerProfileSchema, type CustomerProfileFormValues } from "@/features/customers/lib";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { TextField } from "@/components/ui/FormField";
import Modal from "@/components/ui/Modal";
import { ModalFormActions } from "@/components/ui/ModalFormActions";

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
      toast.error("Please complete the form correctly.");
      return;
    }
    const result = await updateProfile(normalizedValues);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Your profile was updated.");
    onClose();
  }

  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose} title="Edit profile">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <TextField
          label="Full name"
          type="text"
          {...register("name")}
          error={formErrors.name?.message}
        />
        <TextField
          label="Email"
          type="email"
          {...register("email")}
          error={formErrors.email?.message}
        />
        <TextField
          label="Phone number"
          type="text"
          {...register("phone")}
          error={formErrors.phone?.message}
        />

        <ModalFormActions
          onCancel={onClose}
          saving={isSubmitting}
          savingLabel="Saving..."
          submitLabel="Save changes"
        />
      </form>
    </Modal>
  );
}
