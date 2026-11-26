export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "cheapest", label: "Price: low to high" },
  { value: "expensive", label: "Price: high to low" },
  { value: "top-rated", label: "Top rated" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];

export function isSortValue(value: string | undefined): value is SortValue {
  return sortOptions.some((option) => option.value === value);
}
