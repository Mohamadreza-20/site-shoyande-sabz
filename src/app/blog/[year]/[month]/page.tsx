import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/features/blog/components/BlogList";
import BlogHeader from "@/features/blog/components/BlogHeader";
import BlogYearMonthFilter from "@/features/blog/components/BlogYearMonthFilter";
import { getBlogPosts } from "@/features/blog/api";
import { blogPosts } from "@/features/blog/data";
import {
  MONTH_NAMES,
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
  const monthName = MONTH_NAMES[Number(month) - 1] ?? month;
  return {
    title: `Articles from ${monthName} ${year} | Blog`,
    description: `All Leafwash blog articles published in ${monthName} ${year}.`,
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
  const monthName = MONTH_NAMES[month - 1];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <main className="flex w-full flex-col">
        <BlogHeader
          crumbs={[
            { label: "Blog", href: "/blog" },
            { label: String(year), href: `/blog/${year}` },
            { label: monthName },
          ]}
        />
        <section className="mx-auto w-full max-w-[1440px] px-6 pb-14 pt-4 lg:px-[60px]">
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
