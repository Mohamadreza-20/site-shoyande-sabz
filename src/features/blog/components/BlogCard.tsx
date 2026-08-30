import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import type { BlogPost } from "../data";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-brand-200 bg-white">
      <Link href={`/blog/article/${post.id}`} className="cursor-pointer relative block h-[200px] w-full">
        <SmartImage
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={60}
          className="object-cover"
        />
      </Link>
      <div className="flex flex-col items-end gap-3 p-5 text-right">
        <span className="text-xs text-brand-500">{post.date}</span>
        <h3 className="text-lg font-bold text-brand-700">
          <Link href={`/blog/article/${post.id}`} className="cursor-pointer transition hover:text-brand-500">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[13px] leading-[1.6] text-muted">{post.excerpt}</p>
        <Link
          href={`/blog/article/${post.id}`}
          className="cursor-pointer flex items-center gap-1 text-[13px] font-bold text-brand-500 transition hover:text-brand-700"
        >
          <ArrowLeft className="size-3.5" strokeWidth={2.5} />
          مطالعه مقاله
        </Link>
      </div>
    </article>
  );
}
