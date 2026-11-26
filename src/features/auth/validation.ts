import { z } from "zod";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

export function normalizePersianDigits(value: string): string {
  return value.replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (char) => {
    const code = char.charCodeAt(0);
    return String(code >= 0x06f0 ? code - 0x06f0 : code - 0x0660);
  });
}

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Enter your email or phone number")
    .transform((val) => normalizePersianDigits(val.trim()))
    .refine(
      (val) => EMAIL_PATTERN.test(val) || PHONE_PATTERN.test(val),
      "Enter a valid email or phone number"
    ),
  password: z.string().min(1, "Enter your password"),
});

export type LoginInput = z.infer<typeof loginSchema>;

const signupFields = {
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(60, "Name must be 60 characters or fewer"),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email")
    .regex(EMAIL_PATTERN, "Enter a valid email address"),
  phone: z
    .string()
    .min(1, "Enter your phone number")
    .transform((val) => normalizePersianDigits(val.trim()))
    .refine((val) => PHONE_PATTERN.test(val), "Enter a valid phone number (e.g. +1 555 123 4567)"),
  password: z.string().min(6, "Password must be at least 6 characters"),
};

export const signupSchema = z
  .object({
    ...signupFields,
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof signupSchema>;

export const signupApiSchema = z.object(signupFields);

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
