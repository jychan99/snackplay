import { getResult } from "@/lib/test";
import ResultSection from "./ResultSection";
export const metadata = {
  title: "테스트 결과",
};

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

export default async function Page({ params }: Props) {
  const { resultid } = await params;
  const result: resultProps = await getResult(resultid);
  console.log(result);
  if (!result) {
    return <div>데이터 없음</div>;
  }
  return (
    <div className="box-custom mx-auto text-center">
      <ResultSection data={result} />
    </div>
  );
}

export function LoadingTest() {
  return (
    <>
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
    </>
  );
}
