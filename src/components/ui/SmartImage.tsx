"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { PLACEHOLDER_IMAGE } from "@/lib/assets";

type SmartImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc?: string;
};

export default function SmartImage({
  src,
  alt,
  loading,
  fallbackSrc = PLACEHOLDER_IMAGE,
  onError,
  ...props
}: SmartImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const current = failedSrc === src ? fallbackSrc : src;
  const isUnoptimized = current.startsWith("data:image/") || current.endsWith(".svg");

  return (
    <Image
      src={current}
      alt={alt}
      loading={props.priority ? undefined : (loading ?? "lazy")}
      unoptimized={isUnoptimized}
      onError={(event) => {
        setFailedSrc(src);
        onError?.(event);
      }}
      {...props}
    />
  );
}
