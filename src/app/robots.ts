import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shooyande-sabz.example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/account", "/api", "/auth", "/cart"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
