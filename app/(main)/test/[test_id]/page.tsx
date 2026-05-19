"use client";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import ArrowIcon from "@/components/icon/ArrowIcon";
import ViewAllButton from "@/components/ui/ViewAllLink";
import ArrowIcon2 from "@/components/icon/ArrowIcon2";

import { useState, useEffect } from "react";
// export const metadata = {
//   title: "테스트 상세",
// };

const questions = [
  {
    contentId: 5,
    testId: 4,
    testNumbering: 1,
    question: "zzzzzzzzzzz",
    answer: [
      {
        content: "answer1",
        scale: "5",
      },
      {
        content: "answer2",
        scale: "3",
      },
    ],
  },
  {
    contentId: 5,
    testId: 4,
    testNumbering: 1,
    question: "zzzwdwzzzz",
    answer: [
      {
        content: "answer122",
        scale: "5",
      },
      {
        content: "answer233",
        scale: "3",
      },
    ],
  },
];
const data = {
  testTitle: "타이틀",
  testInfo: "정보",
};

export default function Page() {
  const [startTest, setStartTest] = useState(false);
  return (
    <div className="box-custom mx-auto text-center">
      {startTest ? (
        <PlayTest />
      ) : (
        <>
          <p className="text-caption text-primary mb-1">
            카테고리 또는 해시태그
          </p>
          <h2 className="text-h4 mb-10">{data.testTitle}</h2>
          <div className="w-full h-50 relative mb-10">
            <Image
              className=""
              src="/images/image_banner.png"
              alt=""
              fill
              priority
            />
          </div>
          <p className="text-text-sub text-body-m mb-10">{data.testInfo}</p>
          <Button className="w-full" onClick={() => setStartTest(true)}>
            테스트하기
          </Button>
        </>
      )}
    </div>
  );
}

export function PlayTest() {
  const [num, setNum] = useState(0);
  const [progress, setProgress] = useState((num / questions.length) * 100);

  useEffect(() => {
    setProgress((num / questions.length) * 100);
  }, [num]);

  const [arr, setArr] = useState<string[]>([]);
  const addAnswer = (item: string) => {
    console.log(num);
    if (num + 1 < questions.length) {
      setArr((prev: string[]) => {
        const newArr = [...prev, item];
        console.log(newArr);
        return newArr;
      });
      setNum((prev: number) => prev + 1);
    } else {
      // 결과 api 호출!!!!!!!
      alert("마지막!");
    }
  };
  const goBack = () => {
    if (num == 0) {
      // 작업필요
      alert("hihi");
    }
    setNum((prev: number) => prev - 1);
    setArr((prev: string[]) => prev.slice(0, -1));
  };
  return (
    <>
      <div className="mb-10 text-right">
        <Badge size="sm">
          {num + 1}/{questions.length}
        </Badge>
        <div className="relative w-full h-3 mt-3 rounded-button bg-background overflow-hidden">
          <span
            className={`inline-block w-[${progress}%] bg-border-main h-full absolute left-0`}
          ></span>
        </div>
        {/* progressbar */}
      </div>
      <>
        <h2 className="text-h4 mb-10">{questions[num].question}</h2>
        <div className="mb-10">
          {questions[num].answer.map((item, index) => (
            <button
              onClick={() => addAnswer(item.scale)}
              type="button"
              className="group flex p-6 items-center gap-4 border-1 border-border-sub bg-background rounded-button mb-2"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-button bg-primary text-white text-body-m">
                {index + 1}
              </span>
              <p className="flex-1 min-h-10 text-left"> {item.content} </p>

              <div className="relative group-hover:left-1">
                <ArrowIcon width={9} height={13.6} className="text-primary" />
              </div>
            </button>
          ))}
        </div>
      </>
      <hr className="my-6 border-secondary-light" />
      <PrevButton onClick={goBack} />
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
