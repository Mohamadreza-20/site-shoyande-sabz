const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

export function toEnglishDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (d) => String(persianDigits.indexOf(d)));
}

export function parseTomanAmount(amount: string): number {
  const digitsOnly = toEnglishDigits(amount).replace(/[^\d]/g, "");
  return digitsOnly ? parseInt(digitsOnly, 10) : 0;
}

export function formatTomanAmount(value: number): string {
  return `${value.toLocaleString("fa-IR")} تومان`;
}
