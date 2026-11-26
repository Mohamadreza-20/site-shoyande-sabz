import type { BlogPost } from "./data";

export const BLOG_POSTS_PER_PAGE = 9;

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

type BlogPostDate = { day: number; month: number; year: number };

function parseBlogDate(date: string): BlogPostDate | null {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(date);
  if (iso) return { year: Number(iso[1]), month: Number(iso[2]), day: Number(iso[3]) };
  return { year: parsed.getFullYear(), month: parsed.getMonth() + 1, day: parsed.getDate() };
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
