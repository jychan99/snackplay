import TestDetail from "./TestDetail";
import { getDetailTest } from "@/lib/test";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ test_id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { test_id } = await params;
  const res = await getDetailTest(Number(test_id));
  const info = res?.testInfo?.[0];

  if (!info) {
    return { title: "테스트 상세" };
  }

  const title = info.testTitle;
  const description =
    info.testInfo || `${info.testTitle} 테스트를 지금 시작해보세요.`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/test/${test_id}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/images/image_banner.png`;

  return {
    title,
    description,
    alternates: {
      canonical: `/test/${test_id}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function Page() {
  return <TestDetail />;
}
