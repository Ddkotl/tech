import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/auth", "/api", "/bookmarks", "/profile"],
    },
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  };
}
