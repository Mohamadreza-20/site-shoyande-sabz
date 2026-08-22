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
  filterBlogPostsByYearMonth,
  getAvailableBlogMonths,
  getAvailableBlogYears,
} from "@/features/blog/lib";

type BlogYearPageProps = {
  params: Promise<{ year: string }>;
};

export function generateStaticParams() {
  const years = getAvailableBlogYears(blogPosts);
  return years.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({ params }: BlogYearPageProps): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `مقالات سال ${year} | بلاگ شست‌وشو سبز`,
    description: `فهرست مقالات بلاگ شست‌وشو سبز در سال ${year}.`,
  };
}

export default async function BlogYearPage({ params }: BlogYearPageProps) {
  const { year: yearParam } = await params;
  const year = Number(yearParam);

  const posts = await getBlogPosts();
  const years = getAvailableBlogYears(posts);

  if (!Number.isInteger(year) || !years.includes(year)) {
    notFound();
  }

  const months = getAvailableBlogMonths(posts, year);
  const filteredPosts = filterBlogPostsByYearMonth(posts, year);

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
              <span className="font-bold text-brand-700 tabular-nums">
                {year.toLocaleString("fa-IR")}
              </span>
            </div>
            <h1 className="text-[28px] font-black text-brand-700 lg:text-[36px]">وبلاگ خانه سبز</h1>
            <p className="max-w-[560px] text-[15px] leading-[1.7] text-muted">
              نکات، راهنماها و تجربه‌های ما درباره‌ی نظافت طبیعی، زندگی سالم و مراقبت از محیط زیست.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-[120px] lg:py-14">
          <div className="mb-8">
            <BlogYearMonthFilter years={years} months={months} selectedYear={year} />
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
