import { z } from "zod";
import type { Customer } from "./types";

export function findAccountByIdentifier(customers: Customer[], identifier: string) {
  const trimmed = identifier.trim().toLowerCase();
  return customers.find((c) => c.email.toLowerCase() === trimmed || c.phone === identifier.trim());
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

export const customerEditSchema = z.object({
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
    .trim()
    .min(1, "Enter your phone number")
    .regex(PHONE_PATTERN, "Enter a valid phone number (e.g. +1 555 123 4567)"),
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
