import { apiFetch, apiMutate, generateId, CATALOG_REVALIDATE_SECONDS, CACHE_TAGS } from "@/lib/http";
import type { BlogPost } from "./data";
import { blogPosts } from "./data";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const dynamicPosts = await apiFetch<BlogPost[]>("/articles", {
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.blog],
  });
  return [...dynamicPosts, ...blogPosts];
}

export type ArticleInput = {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
};

export function createArticle(input: ArticleInput) {
  const payload: BlogPost = {
    id: generateId("a"),
    date: new Date().toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    title: input.title,
    excerpt: input.excerpt,
    content: input.content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    image:
      input.image.trim() ||
      "/images/catalog/blog-1.svg",
    author: input.author.trim() || "تیم شست‌وشو سبز",
    category: input.category,
  };
  return apiMutate<BlogPost>("/articles", "POST", payload);
}

export async function getBlogPost(id: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.id === id);
}

export async function getRelatedBlogPosts(
  id: string,
  category: string,
  limit = 3
): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts
    .filter((post) => post.id !== id && post.category === category)
    .concat(posts.filter((post) => post.id !== id && post.category !== category))
    .slice(0, limit);
}

export type { BlogPost };
