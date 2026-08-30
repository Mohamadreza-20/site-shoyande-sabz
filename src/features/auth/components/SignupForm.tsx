"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { signupSchema, type SignupInput } from "../validation";
import { readSafeCallbackUrl } from "../callback-url";
import { TextField } from "@/components/ui/FormField";
import { PasswordField } from "@/components/ui/PasswordField";

export default function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: SignupInput) {
    const result = await signup(values);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    reset({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
    toast.success(`ثبت‌نام شما با موفقیت انجام شد، ${result.user.name}!`);
    router.push(readSafeCallbackUrl() ?? "/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
      <div className="flex w-full flex-col gap-1.5 text-right">
        <p className="text-lg font-bold text-admin-ink">ایجاد حساب کاربری جدید</p>
        <p className="text-[13px] font-normal text-admin-muted">
          به خانواده دوستداران طبیعت بپیوندید و تخفیف‌های ویژه دریافت کنید
        </p>
      </div>

      <TextField
        label="نام و نام خانوادگی"
        type="text"
        {...register("name")}
        placeholder="مثال: سهراب سپهری"
        error={errors.name?.message}
      />

      <TextField
        label="پست الکترونیک (ایمیل)"
        type="email"
        {...register("email")}
        placeholder="sohrab@sabzineh.com"
        error={errors.email?.message}
      />

      <TextField
        label="شماره تلفن همراه"
        type="tel"
        {...register("phone")}
        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
        error={errors.phone?.message}
      />

      <PasswordField
        label="رمز عبور"
        {...register("password")}
        placeholder="حداقل ۶ کاراکتر"
        error={errors.password?.message}
        toggleAriaLabel="نمایش رمز عبور"
      />

      <PasswordField
        label="تکرار رمز عبور"
        {...register("confirmPassword")}
        placeholder="تکرار رمز عبور بالا"
        error={errors.confirmPassword?.message}
        toggleAriaLabel="نمایش تکرار رمز عبور"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer w-full rounded-xl bg-admin-primary p-3.5 text-base font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام در سبزینه"}
      </button>
    </form>
  );
}
