import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/$/,
  ""
);
export const SITE_NAME = "Leafwash";
export const SITE_TITLE = `${SITE_NAME} | Plant-Based Cleaning Products`;
export const SITE_DESCRIPTION =
  "Plant-based, refillable cleaning products for a sparkling, healthy home. Gentle on families, tough on grease.";
export const DEFAULT_OG_IMAGE = "/images/real/hero.jpg";

export const NO_INDEX: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: { index: false, follow: false },
};

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const images = [{ url: image ?? DEFAULT_OG_IMAGE, alt: title }];
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? NO_INDEX : undefined,
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: SITE_NAME,
      locale: "en_US",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
