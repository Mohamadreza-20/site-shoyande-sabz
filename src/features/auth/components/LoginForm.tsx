"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { useBrowserHydration } from "@/lib/hooks/useBrowserHydration";
import { useAuth } from "../hooks/useAuth";
import { loginSchema, type LoginInput } from "../validation";
import { readSafeCallbackUrl } from "../callback-url";
import { TextField } from "@/components/ui/FormField";
import { PasswordField } from "@/components/ui/PasswordField";

const REMEMBER_KEY = "sabzineh_remembered_identifier";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  useBrowserHydration(
    () => window.localStorage.getItem(REMEMBER_KEY),
    (saved) => {
      if (!saved) return;
      setValue("identifier", saved);
      setRememberMe(true);
    }
  );

  async function onSubmit(values: LoginInput) {
    const result = await login(values.identifier, values.password);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    if (rememberMe) {
      window.localStorage.setItem(REMEMBER_KEY, values.identifier);
    } else {
      window.localStorage.removeItem(REMEMBER_KEY);
    }
    reset({ identifier: "", password: "" });
    toast.success(`خوش آمدید، ${result.user.name}!`);
    const fallback = result.user.role === "customer" ? "/" : "/dashboard";
    router.push(readSafeCallbackUrl() ?? fallback);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
      <div className="flex w-full flex-col gap-1.5 text-right">
        <p className="text-lg font-bold text-admin-ink">
          ورود به پنل مدیریت و فروشگاه
        </p>
        <p className="text-[13px] font-normal text-admin-muted">
          اگر قبلا ثبت‌نام کرده‌اید، از اینجا وارد شوید
        </p>
      </div>

      <TextField
        label="ایمیل یا شماره تلفن همراه"
        type="text"
        {...register("identifier")}
        placeholder="sohrab@sabzineh.com یا ۰۹۱۲۳۴۵۶۷۸۹"
        error={errors.identifier?.message}
      />

      <PasswordField
        label="رمز عبور"
        {...register("password")}
        placeholder="رمز عبور خود را وارد کنید"
        error={errors.password?.message}
        toggleAriaLabel="نمایش رمز عبور"
      />

      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          onClick={() =>
            toast.info("این قابلیت در نسخه نمایشی این پروژه پیاده‌سازی نشده است.")
          }
          className="cursor-pointer bg-transparent p-0 text-[13px] font-normal text-admin-primary underline"
        >
          فراموشی رمز عبور؟
        </button>
        <label className="flex items-center gap-2 text-[13px] font-normal text-admin-muted">
          من را به خاطر بسپار
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="size-4 rounded border border-admin-line accent-admin-primary"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer w-full rounded-xl bg-admin-sidebar p-3.5 text-base font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "در حال ورود..." : "ورود به حساب کاربری"}
      </button>

      <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-admin-bg p-3">
        <p className="text-[11px] font-normal text-admin-muted">
          اطلاعات شما با پروتکل‌های امنیتی محافظت می‌شود.
        </p>
        <Lock className="size-3.5 text-admin-muted" strokeWidth={2} />
      </div>

      <div className="flex w-full flex-col gap-1.5 rounded-xl border border-dashed border-admin-line p-3 text-right">
        <p className="text-[11px] font-bold text-admin-muted">
          حساب‌های نمونه برای تست هر نقش:
        </p>
        <p className="text-[11px] text-admin-muted">
          مشتری: sara@sabzineh.com / customer123
        </p>
        <p className="text-[11px] text-admin-muted">
          مدیر فروشگاه: manager@sabzineh.com / manager123
        </p>
        <p className="text-[11px] text-admin-muted">
          پشتیبانی: support@sabzineh.com / support123
        </p>
      </div>
    </form>
  );
}
