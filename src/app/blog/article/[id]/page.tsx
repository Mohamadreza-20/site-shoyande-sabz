import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, User } from "lucide-react";
import MarkerLabel from "@/components/ui/MarkerLabel";
import { formatDate } from "@/lib/money";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
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
    return { title: "Article not found" };
  }

  const title = post.title;

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

  const articleJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: absoluteUrl(post.image),
      author: { "@type": "Person", name: post.author },
      publisher: { "@type": "Organization", name: SITE_NAME },
      articleSection: post.category,
      inLanguage: "en-US",
      mainEntityOfPage: absoluteUrl(`/blog/article/${post.id}`),
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/article/${post.id}` },
    ]),
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <JsonLd data={articleJsonLd} />
      <Navbar />
      <main className="flex w-full flex-col">
        <article className="mx-auto w-full max-w-[860px] px-6 py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition hover:text-brand-400">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition hover:text-brand-400">
              Blog
            </Link>
            <span>/</span>
            <span className="line-clamp-1 font-bold text-brand-700">{post.title}</span>
          </nav>

          <span className="mb-4 inline-block rounded-full bg-accent px-4 py-1.5 text-[13px] font-extrabold text-brand-700">
            {post.category}
          </span>

          <h1 className="mb-5 text-left text-[30px] leading-[1.25] sm:text-[44px]">
            <MarkerLabel className="!leading-[1.5]">{post.title}</MarkerLabel>
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-5 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" strokeWidth={2} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="size-4" strokeWidth={2} />
              {post.author}
            </span>
          </div>

          <div className="relative mb-10 h-[260px] w-full overflow-hidden rounded-[32px] bg-brand-100 sm:h-[420px]">
            <SmartImage
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 860px) 100vw, 860px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col items-start gap-5 text-left">
            {post.content.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "text-[18px] font-medium leading-[1.85] text-ink"
                    : "text-[16px] leading-[1.9] text-ink/90"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="w-full bg-brand-100/70">
            <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-[60px] lg:py-20">
              <h2 className="mb-10 text-left text-3xl lg:text-[36px]">
                <MarkerLabel>Keep reading</MarkerLabel>
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
