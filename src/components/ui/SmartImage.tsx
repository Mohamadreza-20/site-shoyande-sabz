import Image, { type ImageProps } from "next/image";

type SmartImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

export default function SmartImage({ src, alt, loading, ...props }: SmartImageProps) {
  const isUnoptimized = src.startsWith("data:image/") || src.endsWith(".svg");

  return (
    <Image
      src={src}
      alt={alt}
      loading={props.priority ? undefined : loading ?? "lazy"}
      unoptimized={isUnoptimized}
      {...props}
    />
  );
}
