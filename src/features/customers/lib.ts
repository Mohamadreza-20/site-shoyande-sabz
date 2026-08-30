import { z } from "zod";
import type { Customer } from "./types";

export function findAccountByIdentifier(customers: Customer[], identifier: string) {
  const trimmed = identifier.trim().toLowerCase();
  return customers.find(
    (c) => c.email.toLowerCase() === trimmed || c.phone === identifier.trim()
  );
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IRAN_PHONE_PATTERN = /^09\d{9}$/;

export const customerEditSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "نام باید حداقل ۳ کاراکتر باشد")
    .max(60, "نام نمی‌تواند بیشتر از ۶۰ کاراکتر باشد"),
  email: z.string().trim().min(1, "ایمیل را وارد کنید").regex(EMAIL_PATTERN, "ایمیل معتبر نیست"),
  phone: z
    .string()
    .trim()
    .min(1, "شماره تلفن را وارد کنید")
    .regex(IRAN_PHONE_PATTERN, "شماره تلفن معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)"),
  role: z.enum(["customer", "manager", "support"]),
  status: z.enum(["active", "inactive"]),
});

export type CustomerEditFormValues = z.infer<typeof customerEditSchema>;

export const customerProfileSchema = customerEditSchema.pick({
  name: true,
  email: true,
  phone: true,
});

export type CustomerProfileFormValues = z.infer<typeof customerProfileSchema>;
