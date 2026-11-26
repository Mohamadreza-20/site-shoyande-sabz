import { toEnglishDigits } from "@/lib/money";
import type { DiscountInput } from "@/features/discounts/types";

const CODE_PATTERN = /^[A-Za-z0-9]{3,20}$/;
const USAGE_PATTERN = /^\d+\s+of\s+(unlimited|\d+)$/i;
const MONTH_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const EXPIRY_DATE_PATTERN = new RegExp(`^(${MONTH_ABBR.join("|")})\\s+\\d{1,2},\\s+\\d{4}$`);
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const NO_EXPIRY_LABEL = "No expiry";

function parseNumber(value: string): number | null {
  const normalized = toEnglishDigits(value).replace(/[^\d.]/g, "");
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function validateDiscountInput(form: DiscountInput): string | null {
  const code = form.code.trim();
  if (!code) return "Please enter a discount code.";
  if (!CODE_PATTERN.test(code)) {
    return "The code must be 3–20 letters or numbers only.";
  }

  const rawValue = form.value.trim();
  if (!rawValue) return "Please enter the discount value.";
  const amount = parseNumber(rawValue);
  if (amount === null) return "The discount value must be a valid number.";

  if (form.type === "percent") {
    if (amount <= 0 || amount > 100) {
      return "The percentage must be between 1 and 100.";
    }
  } else if (amount <= 0) {
    return "The discount amount must be a positive number.";
  }

  const usage = form.usage.trim();
  if (usage && !USAGE_PATTERN.test(toEnglishDigits(usage))) {
    return 'Usage must look like "142 of 500" or "0 of unlimited".';
  }

  const expiry = form.expiry.trim();
  if (
    expiry &&
    expiry !== NO_EXPIRY_LABEL &&
    !EXPIRY_DATE_PATTERN.test(expiry) &&
    !ISO_DATE_PATTERN.test(expiry)
  ) {
    return 'Expiry must be a valid date, e.g. "Mar 30, 2026", or "No expiry".';
  }

  return null;
}
