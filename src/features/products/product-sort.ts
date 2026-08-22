export const sortOptions = [
  { value: "featured", label: "پیشنهادی" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
  { value: "top-rated", label: "پرفروش‌ترین" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export function isSortValue(value: string | undefined): value is SortValue {
  return sortOptions.some((option) => option.value === value);
}
