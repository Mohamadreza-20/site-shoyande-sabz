import { z } from "zod";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IRAN_PHONE_PATTERN = /^09\d{9}$/;

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function normalizePersianDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (char) => {
    const persianIndex = PERSIAN_DIGITS.indexOf(char);
    if (persianIndex !== -1) return String(persianIndex);
    const arabicIndex = ARABIC_DIGITS.indexOf(char);
    return arabicIndex !== -1 ? String(arabicIndex) : char;
  });
}

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "ایمیل یا شماره تلفن را وارد کنید")
    .transform((val) => normalizePersianDigits(val.trim()))
    .refine(
      (val) => EMAIL_PATTERN.test(val) || IRAN_PHONE_PATTERN.test(val),
      "ایمیل یا شماره تلفن معتبر نیست"
    ),
  password: z.string().min(1, "رمز عبور را وارد کنید"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "نام باید حداقل ۳ کاراکتر باشد")
      .max(60, "نام نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"),
    email: z
      .string()
      .trim()
      .min(1, "ایمیل را وارد کنید")
      .regex(EMAIL_PATTERN, "ایمیل معتبر نیست"),
    phone: z
      .string()
      .min(1, "شماره تلفن را وارد کنید")
      .transform((val) => normalizePersianDigits(val.trim()))
      .refine(
        (val) => IRAN_PHONE_PATTERN.test(val),
        "شماره تلفن معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)"
      ),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z.string().min(1, "تکرار رمز عبور را وارد کنید"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof signupSchema>;

export const signupApiSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "نام باید حداقل ۳ کاراکتر باشد")
    .max(60, "نام نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"),
  email: z
    .string()
    .trim()
    .min(1, "ایمیل را وارد کنید")
    .regex(EMAIL_PATTERN, "ایمیل معتبر نیست"),
  phone: z
    .string()
    .min(1, "شماره تلفن را وارد کنید")
    .transform((val) => normalizePersianDigits(val.trim()))
    .refine(
      (val) => IRAN_PHONE_PATTERN.test(val),
      "شماره تلفن معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)"
    ),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export type SignupApiInput = z.infer<typeof signupApiSchema>;

export function getFieldErrors<T>(
  schema: z.ZodType<T>,
  data: unknown
): Partial<Record<string, string>> {
  const result = schema.safeParse(data);
  if (result.success) return {};
  const errors: Partial<Record<string, string>> = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join(".") || "_root";
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
