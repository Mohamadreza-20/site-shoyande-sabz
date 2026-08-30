import { toEnglishDigits } from "@/lib/money";
import type { DiscountInput } from "@/features/discounts/types";

const CODE_PATTERN = /^[A-Za-z0-9]{3,20}$/;
const USAGE_PATTERN = /^\d+\s*از\s*(نامحدود|\d+)$/;
const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const EXPIRY_DATE_PATTERN = new RegExp(
  `^\\d{1,2}\\s+(${JALALI_MONTHS.join("|")})\\s+\\d{4}$`
);
const NO_EXPIRY_LABEL = "بدون انقضا";

function parseNumber(value: string): number | null {
  const normalized = toEnglishDigits(value).replace(/[^\d.]/g, "");
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function validateDiscountInput(form: DiscountInput): string | null {
  const code = form.code.trim();
  if (!code) return "لطفاً کد تخفیف را وارد کنید.";
  if (!CODE_PATTERN.test(code)) {
    return "کد تخفیف باید فقط شامل حروف و اعداد انگلیسی و بین ۳ تا ۲۰ کاراکتر باشد.";
  }

  const rawValue = form.value.trim();
  if (!rawValue) return "لطفاً میزان تخفیف را وارد کنید.";
  const amount = parseNumber(rawValue);
  if (amount === null) return "میزان تخفیف باید یک عدد معتبر باشد.";

  if (form.type === "percent") {
    if (amount <= 0 || amount > 100) {
      return "درصد تخفیف باید عددی بین ۱ تا ۱۰۰ باشد.";
    }
  } else if (amount <= 0) {
    return "مبلغ تخفیف باید عددی مثبت باشد.";
  }

  const usage = form.usage.trim();
  if (usage && !USAGE_PATTERN.test(toEnglishDigits(usage))) {
    return 'فرمت میزان استفاده باید مانند "۱۴۲ از ۵۰۰" یا "۰ از نامحدود" باشد.';
  }

  const expiry = form.expiry.trim();
  if (expiry && expiry !== NO_EXPIRY_LABEL && !EXPIRY_DATE_PATTERN.test(toEnglishDigits(expiry))) {
    return 'تاریخ انقضا باید معتبر باشد، مثال: "۳۰ اسفند ۱۴۰۴" یا "بدون انقضا".';
  }

  return null;
}
