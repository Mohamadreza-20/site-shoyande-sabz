import SmartImage from "@/components/ui/SmartImage";

export default function ArticleImagePreview({ src }: { src: string }) {
  return (
    <div className="relative mt-1 h-36 w-full overflow-hidden rounded-2xl border border-admin-line bg-admin-bg">
      <SmartImage
        src={src}
        alt="پیش‌نمایش تصویر مقاله"
        fill
        sizes="(max-width: 768px) 100vw, 720px"
        className="object-contain"
      />
    </div>
  );
}
