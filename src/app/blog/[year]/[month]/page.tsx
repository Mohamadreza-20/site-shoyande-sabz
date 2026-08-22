import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/features/blog/components/BlogList";
import BlogYearMonthFilter from "@/features/blog/components/BlogYearMonthFilter";
import { getBlogPosts } from "@/features/blog/api";
import { blogPosts } from "@/features/blog/data";
import {
  PERSIAN_MONTH_NAMES,
  filterBlogPostsByYearMonth,
  getAvailableBlogMonths,
  getAvailableBlogYears,
} from "@/features/blog/lib";

type BlogYearMonthPageProps = {
  params: Promise<{ year: string; month: string }>;
};

export function generateStaticParams() {
  const posts = blogPosts;
  const years = getAvailableBlogYears(posts);
  return years.flatMap((year) =>
    getAvailableBlogMonths(posts, year).map((month) => ({
      year: String(year),
      month: String(month),
    }))
  );
}

export async function generateMetadata({ params }: BlogYearMonthPageProps): Promise<Metadata> {
  const { year, month } = await params;
  const monthName = PERSIAN_MONTH_NAMES[Number(month) - 1] ?? month;
  return {
    title: `مقالات ${monthName} ${year} | بلاگ شست‌وشو سبز`,
    description: `فهرست مقالات بلاگ شست‌وشو سبز در ${monthName} ${year}.`,
  };
}

export default async function BlogYearMonthPage({ params }: BlogYearMonthPageProps) {
  const { year: yearParam, month: monthParam } = await params;
  const year = Number(yearParam);
  const month = Number(monthParam);

  const posts = await getBlogPosts();
  const years = getAvailableBlogYears(posts);

  if (!Number.isInteger(year) || !years.includes(year)) {
    notFound();
  }

  const months = getAvailableBlogMonths(posts, year);

  if (!Number.isInteger(month) || !months.includes(month)) {
    notFound();
  }

  const filteredPosts = filterBlogPostsByYearMonth(posts, year, month);
  const monthName = PERSIAN_MONTH_NAMES[month - 1];

  return (
    <div className="flex min-h-screen w-full flex-col bg-brand-50">
      <Navbar />
      <main className="flex w-full flex-col">
        <section className="w-full bg-brand-100">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-end gap-4 px-6 py-10 text-right lg:px-[120px] lg:py-12">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Link href="/" className="cursor-pointer transition hover:text-brand-500">
                خانه
              </Link>
              <span>/</span>
              <Link href="/blog" className="cursor-pointer transition hover:text-brand-500">
                بلاگ
              </Link>
              <span>/</span>
              <Link href={`/blog/${year}`} className="cursor-pointer tabular-nums transition hover:text-brand-500">
                {year.toLocaleString("fa-IR")}
              </Link>
              <span>/</span>
              <span className="font-bold text-brand-700">{monthName}</span>
            </div>
            <h1 className="text-[28px] font-black text-brand-700 lg:text-[36px]">وبلاگ خانه سبز</h1>
            <p className="max-w-[560px] text-[15px] leading-[1.7] text-muted">
              نکات، راهنماها و تجربه‌های ما درباره‌ی نظافت طبیعی، زندگی سالم و مراقبت از محیط زیست.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-[120px] lg:py-14">
          <div className="mb-8">
            <BlogYearMonthFilter
              years={years}
              months={months}
              selectedYear={year}
              selectedMonth={month}
            />
          </div>
          <Suspense fallback={null}>
            <BlogList posts={filteredPosts} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  );
}
