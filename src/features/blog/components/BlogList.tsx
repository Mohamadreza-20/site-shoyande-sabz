"use client";

import { useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { BlogPost } from "../data";
import { BLOG_POSTS_PER_PAGE, paginateBlogPosts } from "../lib";
import BlogCard from "./BlogCard";
import Pagination from "@/components/Pagination";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get("page"));
  const requestedPage = Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1;

  const { items, totalPages, currentPage } = useMemo(
    () => paginateBlogPosts(posts, requestedPage, BLOG_POSTS_PER_PAGE),
    [posts, requestedPage]
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (nextPage > 1) params.set("page", String(nextPage));
      else params.delete("page");
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-brand-200 py-16 text-center">
        <p className="text-lg font-bold text-brand-700">مقاله‌ای یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
