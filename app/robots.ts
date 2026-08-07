import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/login",
        "/signup",
        "/password",
        "/my",
        "/studio",
        "/testpage",
        "/publishing",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
