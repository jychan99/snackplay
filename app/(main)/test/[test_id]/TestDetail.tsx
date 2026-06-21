"use client";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import ArrowIcon from "@/components/icon/ArrowIcon";
import ArrowIcon2 from "@/components/icon/ArrowIcon2";
import { getDetailTest, saveDetailTest } from "@/lib/test";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TEST_INFO, TEST_CONTENT, TEST_RESULT, TEST_ANSWER_ALL } from "@/types";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/Loading";
export default function Page() {
  const [startTest, setStartTest] = useState(false);

  const params = useParams();

  const id = Number(params.test_id);

  const [infoData, setInfoData] = useState<TEST_INFO | null>(null);
  const [contData, setContData] = useState<TEST_CONTENT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailTest(id);
      setInfoData(res.testInfo[0]);
      setContData(res.testContent);
    };
    fetchData();
  }, [id]);

  return (
    <div className="box-custom mx-auto text-center">
      {startTest ? (
        <PlayTest data={contData} />
      ) : (
        <>
          <p className="text-caption text-primary mb-1">
            카테고리 또는 해시태그
          </p>
          <h2 className="text-h4 mb-10">{infoData?.testTitle}</h2>
          <div className="w-full h-50 relative mb-10">
            <Image
              className=""
              src="/images/image_banner.png"
              alt=""
              fill
              priority
            />
          </div>
          <p className="text-text-sub text-body-m mb-10">
            {infoData?.testInfo}
          </p>
          <Button className="w-full" onClick={() => setStartTest(true)}>
            테스트하기
          </Button>
        </>
      )}
    </div>
  );
}

// props는 객체로 받아와져야 하기에 interface 지정!
interface ChildProps {
  data: TEST_CONTENT[];
}

export function PlayTest({ data }: ChildProps) {
  const [num, setNum] = useState(0);
  // 프로그래스 바
  const progress = data.length > 0 ? (num / data.length) * 100 : 0;
  // console.log(data);
  // 답변 데이터
  const [answerArr, setAnswerArr] = useState<TEST_ANSWER_ALL[]>([]);
  const [result, setResult] = useState<Partial<TEST_RESULT>>({});
  const [disabled, setDisabled] = useState(true);

  // 답변 추가 이벤트
  const addAnswer = (item: TEST_ANSWER_ALL) => {
    if (!item) return;

    const filtered = answerArr.filter(
      (item2) => item2.testNumbering !== item.testNumbering,
    );

    filtered.push(item);

    // const newArr = [...answerArr, item]; // 유의하기!
    setAnswerArr(filtered);
    if (num + 1 < data.length) {
      setNum((prev) => prev + 1);
    } else {
      setDisabled(false);
      const finalResult = {
        testId: data[0].testId,
        answer: filtered,
      };

      setResult(finalResult);
      //로컬스토리지에 저장
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const submitTest = async () => {
    // 결과 도출
    setIsSubmitting(true);
    localStorage.setItem("test-result", JSON.stringify(result));
    const resultData = await saveDetailTest();
    // 페이지 이동
    if (resultData?.resultId) {
      router.push(`/test/result/${resultData.resultId}`);
    }
  };
  //뒤로가기
  const goBack = () => {
    if (num === 0) return;

    setNum((prev) => prev - 1);
    setAnswerArr((prev) => prev.slice(0, -1));
  };

  return (
    <>
      {isSubmitting && <Loading />}

      <div className="mb-10 text-right">
        <Badge size="sm">
          {num + 1 > data.length ? num : num + 1}/{data.length}
        </Badge>
        <div className="relative w-full h-3 mt-3 rounded-button bg-background overflow-hidden">
          <span
            style={{ width: `${progress}%` }}
            className="inline-block bg-border-main h-full absolute left-0 transition-all"
          />
        </div>
      </div>
      <>
        <h2 className="text-h4 mb-10">{data[num]?.question}</h2>
        <div className="mb-10">
          {data[num]?.answer
            .filter((item) => item.content)
            .map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  addAnswer({
                    testNumbering: data[num]?.testNumbering,
                    question: data[num]?.question,
                    content: item.content,
                    scale: item.scale,
                  })
                }
                type="button"
                className="group flex p-6 items-center gap-4 border-1 border-border-sub bg-background rounded-button mb-2 w-full"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-button bg-primary text-white text-body-m">
                  {index + 1}
                </span>
                <p className="flex-1  text-left">{item.content}</p>
                <div className="relative group-hover:left-1">
                  <ArrowIcon width={9} height={13.6} className="text-primary" />
                </div>
              </button>
            ))}
        </div>
      </>
      <hr className="my-6 border-secondary-light" />
      <PrevButton onClick={goBack} />
      {num + 1 == data.length && (
        <Button
          disabled={disabled}
          onClick={() => submitTest()}
          className="w-full"
        >
          결과보러 가기
        </Button>
      )}
    </>
  );
}
type ButtonProps = React.ComponentProps<"button">;
export function PrevButton({ children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className="group flex items-center gap-1 p-[10px] text-text-sub text-body-m"
    >
      <span className="group-hover:right-1 relative transition-all">
        <ArrowIcon2 className="text-text-sub rotate-180" size={10} />
      </span>
      이전으로 가기
    </button>
  );
}
