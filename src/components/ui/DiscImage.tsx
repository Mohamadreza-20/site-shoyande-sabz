import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/cn";

type DiscImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  tone?: "amber" | "green" | "cream";
  priority?: boolean;
  fallbackSrc?: string;
};

const tones = {
  amber: "bg-accent",
  green: "bg-brand-400",
  cream: "bg-brand-200",
} as const;

export default function DiscImage({
  src,
  alt,
  sizes,
  className,
  tone = "amber",
  priority,
  fallbackSrc,
}: DiscImageProps) {
  return (
    <div className={cn("relative shrink-0", className)}>
      <span
        aria-hidden
        className={cn("absolute -bottom-[6%] -left-[6%] size-[46%] rounded-full", tones[tone])}
      />
      <div className="relative size-full overflow-hidden rounded-full border-[5px] border-[#f7f3e8] bg-brand-100 shadow-[0_10px_30px_rgba(15,47,34,0.18)]">
        <SmartImage
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          fallbackSrc={fallbackSrc}
          className="object-cover"
        />
      </div>
    </div>
  );
}
