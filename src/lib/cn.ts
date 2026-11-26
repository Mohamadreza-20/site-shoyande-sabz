import { twMerge } from "tailwind-merge";

type ClassValue = string | number | false | null | undefined | ClassValue[];

function flatten(values: ClassValue[]): string[] {
  const out: string[] = [];
  for (const value of values) {
    if (!value && value !== 0) continue;
    if (Array.isArray(value)) out.push(...flatten(value));
    else out.push(String(value));
  }
  return out;
}

export function cn(...values: ClassValue[]): string {
  return twMerge(flatten(values).join(" "));
}
