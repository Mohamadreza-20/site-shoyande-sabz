import type { BlogPost } from "./data";

export const BLOG_POSTS_PER_PAGE = 9;

export const PERSIAN_MONTH_NAMES = [
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
] as const;

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

function toLatinDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)));
}

export type BlogPostDate = { day: number; month: number; year: number };

export function parseBlogDate(date: string): BlogPostDate | null {
  const parts = date.trim().split(/\s+/);
  if (parts.length < 3) return null;

  const day = Number(toLatinDigits(parts[0]));
  const monthIndex = PERSIAN_MONTH_NAMES.indexOf(parts[1] as (typeof PERSIAN_MONTH_NAMES)[number]);
  const year = Number(toLatinDigits(parts[2]));

  if (Number.isNaN(day) || monthIndex === -1 || Number.isNaN(year)) return null;
  return { day, month: monthIndex + 1, year };
}

export function getAvailableBlogYears(posts: BlogPost[]): number[] {
  const years = new Set<number>();
  for (const post of posts) {
    const parsed = parseBlogDate(post.date);
    if (parsed) years.add(parsed.year);
  }
  return Array.from(years).sort((a, b) => b - a);
}

export function getAvailableBlogMonths(posts: BlogPost[], year: number): number[] {
  const months = new Set<number>();
  for (const post of posts) {
    const parsed = parseBlogDate(post.date);
    if (parsed && parsed.year === year) months.add(parsed.month);
  }
  return Array.from(months).sort((a, b) => a - b);
}

export function filterBlogPostsByYearMonth(
  posts: BlogPost[],
  year?: number,
  month?: number
): BlogPost[] {
  return posts.filter((post) => {
    const parsed = parseBlogDate(post.date);
    if (!parsed) return false;
    if (year !== undefined && parsed.year !== year) return false;
    if (month !== undefined && parsed.month !== month) return false;
    return true;
  });
}

export function paginateBlogPosts(
  posts: BlogPost[],
  page: number,
  perPage: number = BLOG_POSTS_PER_PAGE
): { items: BlogPost[]; totalPages: number; currentPage: number } {
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * perPage;
  return { items: posts.slice(start, start + perPage), totalPages, currentPage };
}
