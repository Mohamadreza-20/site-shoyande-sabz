import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogCard from "./BlogCard";
import { getBlogPosts } from "../api";

export default async function BlogSection() {
  const posts = (await getBlogPosts()).slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-[120px] lg:py-20">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/blog"
          className="cursor-pointer flex items-center gap-1.5 text-sm font-bold text-brand-500 transition hover:text-brand-700"
        >
          <ArrowLeft className="size-4" strokeWidth={2.5} />
          مشاهده همه مقالات
        </Link>
        <h2 className="text-right text-2xl font-black text-brand-700 lg:text-[28px]">
          آخرین نوشته‌های خانه سبز ما
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
