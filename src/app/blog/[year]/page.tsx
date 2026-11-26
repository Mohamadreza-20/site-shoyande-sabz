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
    title: `Articles from ${year} | Blog`,
    description: `All Leafwash blog articles published in ${year}.`,
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
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <main className="flex w-full flex-col">
        <BlogHeader crumbs={[{ label: "Blog", href: "/blog" }, { label: String(year) }]} />
        <section className="mx-auto w-full max-w-[1440px] px-6 pb-14 pt-4 lg:px-[60px]">
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
