import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/features/blog/components/BlogCard";
import SmartImage from "@/components/ui/SmartImage";
import { getBlogPost, getRelatedBlogPosts } from "@/features/blog/api";
import { blogPosts } from "@/features/blog/data";

type BlogPostPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    return { title: "مقاله یافت نشد | شست‌وشو سبز" };
  }

  const title = `${post.title} | شست‌وشو سبز`;

  return {
    title,
    description: post.excerpt,
    alternates: { canonical: `/blog/article/${post.id}` },
    openGraph: {
      title,
      description: post.excerpt,
      type: "article",
      url: `/blog/article/${post.id}`,
      authors: [post.author],
      images: [{ url: post.image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(post.id, post.category, 3);

  return (
    <div className="flex min-h-screen w-full flex-col bg-brand-50">
      <Navbar />
      <main className="flex w-full flex-col">
        <section className="mx-auto w-full max-w-[860px] px-6 py-10 lg:py-14">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="cursor-pointer transition hover:text-brand-500">
              خانه
            </Link>
            <span>/</span>
            <Link href="/blog" className="cursor-pointer transition hover:text-brand-500">
              بلاگ
            </Link>
            <span>/</span>
            <span className="line-clamp-1 font-bold text-brand-700">{post.title}</span>
          </div>

          <span className="mb-4 inline-block rounded-full bg-brand-300 px-4 py-1.5 text-[13px] font-bold text-brand-500">
            {post.category}
          </span>

          <h1 className="mb-5 text-right text-[26px] font-black leading-[1.4] text-brand-700 sm:text-[34px]">
            {post.title}
          </h1>

          <div className="mb-8 flex items-center justify-end gap-5 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              {post.date}
              <CalendarDays className="size-4" strokeWidth={2} />
            </span>
            <span className="flex items-center gap-1.5">
              {post.author}
              <User className="size-4" strokeWidth={2} />
            </span>
          </div>

          <div className="relative mb-10 h-[260px] w-full overflow-hidden rounded-[32px] border border-brand-200 sm:h-[400px]">
            <SmartImage
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 860px) 100vw, 860px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col items-end gap-5 text-right">
            {post.content.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-[1.9] text-ink">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="w-full bg-brand-100">
            <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-[120px] lg:py-20">
              <h2 className="mb-8 text-right text-2xl font-black text-brand-700 lg:text-[28px]">
                مقالات مرتبط
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related) => (
                  <BlogCard key={related.id} post={related} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
