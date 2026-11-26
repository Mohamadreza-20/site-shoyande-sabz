import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/features/blog/components/BlogList";
import BlogHeader from "@/features/blog/components/BlogHeader";
import BlogYearMonthFilter from "@/features/blog/components/BlogYearMonthFilter";
import { getBlogPosts } from "@/features/blog/api";
import { getAvailableBlogYears } from "@/features/blog/lib";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Green housekeeping tips, natural cleaning guides and advice for caring for your family and the planet from the Leafwash team.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const years = getAvailableBlogYears(posts);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <main className="flex w-full flex-col">
        <BlogHeader crumbs={[{ label: "Blog" }]} />
        <section className="mx-auto w-full max-w-[1440px] px-6 pb-14 pt-4 lg:px-[60px]">
          <div className="mb-8">
            <BlogYearMonthFilter years={years} months={[]} />
          </div>
          <Suspense fallback={null}>
            <BlogList posts={posts} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  );
}
