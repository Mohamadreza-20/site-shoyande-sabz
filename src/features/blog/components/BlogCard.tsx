import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { formatDate } from "@/lib/money";
import type { BlogPost } from "../data";

export default function BlogCard({
  post,
  priority,
  headingAs: Heading = "h3",
}: {
  post: BlogPost;
  priority?: boolean;
  headingAs?: "h2" | "h3";
}) {
  return (
    <article className="group flex flex-col gap-4">
      <Link
        href={`/blog/article/${post.id}`}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-brand-100"
      >
        <SmartImage
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={60}
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-brand-700">
          {post.category}
        </span>
      </Link>
      <div className="flex flex-col items-start gap-2.5 px-1 text-left">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-400">
          {formatDate(post.date)}
        </span>
        <Heading className="font-display text-xl font-extrabold leading-snug text-brand-700">
          <Link href={`/blog/article/${post.id}`} className="transition hover:text-brand-400">
            {post.title}
          </Link>
        </Heading>
        <p className="line-clamp-2 text-sm leading-[1.7] text-muted">{post.excerpt}</p>
        <Link
          href={`/blog/article/${post.id}`}
          className="flex min-h-6 items-center gap-1.5 py-0.5 text-sm font-bold text-brand-700 group/link transition-colors"
        >
          Read article
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover/link:translate-x-1"
            strokeWidth={2.5}
          />
        </Link>
      </div>
    </article>
  );
}
