import type { MetadataRoute } from "next";
import { getAllTest } from "@/lib/actions";
import type { TEST_MAIN } from "@/types/index";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/test`, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/game`, changeFrequency: "daily", priority: 0.5 },
  ];

  const tests: TEST_MAIN[] = (await getAllTest()) ?? [];
  const testRoutes: MetadataRoute.Sitemap = tests.map((test) => ({
    url: `${baseUrl}/test/${test.testId}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...testRoutes];
}
