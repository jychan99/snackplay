import { getResult } from "@/lib/test";
import ResultSection from "./ResultSection";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    resultid: string;
  }>;
};
type resultProps = {
  result: string;
  resultdetail: string;
  resultid: number;
  testid: number;
  userid: string;
  testtitle: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { resultid } = await params;
  const result: resultProps = await getResult(resultid);

  if (!result) {
    return { title: "테스트 결과" };
  }

  const title = `${result.testtitle} - ${result.result}`;
  const description =
    result.resultdetail?.slice(0, 100) ||
    `${result.testtitle} 테스트 결과를 확인해보세요.`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/test/result/${resultid}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/images/image_banner.png`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
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

export default async function Page({ params }: Props) {
  const { resultid } = await params;
  const result: resultProps = await getResult(resultid);
  if (!result) {
    notFound();
  }
  return (
    <div className="box-custom mx-auto text-center">
      <ResultSection data={result} />
    </div>
  );
}

export function LoadingTest() {
  return (
    <div role="status" aria-live="polite">
      <div className="relative w-90 h-3 mb-2 rounded-button bg-border-sub">
        <span className="absolute left-0 h-full w-0 rounded-button bg-gradient bg-linear-to-r from-primary via-[#7c52aa] to-secondary animate-grow-width"></span>
      </div>
      <span>
        테스트를 확인중입니다.
        <br />
        곧 결과가 나올 예정이니
        <br />
        잠시만 기다려 주세요.
      </span>
    </div>
  );
}
