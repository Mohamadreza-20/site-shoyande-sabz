import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MarkerLabel from "@/components/ui/MarkerLabel";
import BlogCard from "./BlogCard";
import { getBlogPosts } from "../api";

export default async function BlogSection() {
  const posts = (await getBlogPosts()).slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-[60px] lg:py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-3xl lg:text-[40px]">
          <MarkerLabel>From the journal</MarkerLabel>
        </h2>
        <Link
          href="/blog"
          className="flex min-h-6 items-center gap-1.5 py-0.5 text-sm font-bold text-brand-700 group/link transition-colors"
        >
          View all articles
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover/link:translate-x-1"
            strokeWidth={2.5}
          />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
