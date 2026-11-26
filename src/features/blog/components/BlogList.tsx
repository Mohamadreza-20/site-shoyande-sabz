"use client";

import { useMemo } from "react";
import { usePageParam } from "@/lib/hooks/usePageParam";
import type { BlogPost } from "../data";
import { BLOG_POSTS_PER_PAGE, paginateBlogPosts } from "../lib";
import BlogCard from "./BlogCard";
import Pagination from "@/components/Pagination";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const { page: requestedPage, setPage: handlePageChange } = usePageParam();

  const { items, totalPages, currentPage } = useMemo(
    () => paginateBlogPosts(posts, requestedPage, BLOG_POSTS_PER_PAGE),
    [posts, requestedPage]
  );

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-[28px] border border-dashed border-brand-200 py-16 text-center">
        <p className="text-lg font-bold text-brand-700">No articles found</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post, index) => (
          <BlogCard key={post.id} post={post} priority={index < 2} headingAs="h2" />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
