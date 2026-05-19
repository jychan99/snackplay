"use client";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import ArrowIcon from "@/components/icon/ArrowIcon";
import ViewAllButton from "@/components/ui/ViewAllLink";
import ArrowIcon2 from "@/components/icon/ArrowIcon2";
import { useState } from "react";
// export const metadata = {
//   title: "테스트 상세",
// };

const questions = [
  {
    contentId: 5,
    testId: 4,
    testNumbering: 1,
    question: "zzzzzzzzzzz",
    answer1: "zzzzzz",
    answer1Scale: "",
    answer2: "zzzzzzzzz",
    answer2Scale: "",
    answer3: "zzzzzzzz",
    answer3Scale: "",
    answer4: "zzzzzzzzz",
    answer4Scale: "",
  },
  {
    contentId: 5,
    testId: 4,
    testNumbering: 1,
    question: "zzzzzzzzzzz",
    answer1: "zzzzzz",
    answer1Scale: "",
    answer2: "zzzzzzzzz",
    answer2Scale: "",
    answer3: "zzzzzzzz",
    answer3Scale: "",
    answer4: "zzzzzzzzz",
    answer4Scale: "",
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
  return (
    <>
      <div className="mb-10 text-right">
        <Badge size="sm">03/10</Badge>
        <div className="relative w-full h-3 mt-3 rounded-button bg-background overflow-hidden">
          <span className="inline-block w-[10%] bg-border-main h-full absolute left-0"></span>
        </div>
        {/* progressbar */}
      </div>
      <h2 className="text-h4 mb-10">출근룩?</h2>
      <div className="mb-10">
        <button
          type="button"
          className="group flex p-6 items-center gap-4 border-1 border-border-sub bg-background rounded-button mb-2"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-button bg-primary text-white text-body-m">
            A
          </span>
          <p className="flex-1 min-h-10 text-left"> 질문1</p>
          <div className="relative group-hover:left-1">
            <ArrowIcon width={9} height={13.6} className="text-primary" />
          </div>
        </button>
        <div className="group flex p-6 items-center gap-4 border-1 border-border-sub bg-background rounded-button">
          <span className="flex items-center justify-center w-10 h-10 rounded-button bg-primary text-white text-body-m">
            B
          </span>
          <p className="flex-1 min-h-10 text-left">일정에 따라 룩도 다르게</p>
          <div className="relative group-hover:left-1">
            <ArrowIcon width={9} height={13.6} className="text-primary " />
          </div>
        </div>
      </div>
      <hr className="my-6 border-secondary-light" />
      <PrevButton />
    </>
  );
}

export function PrevButton() {
  return (
    <button className="group flex items-center gap-1 p-[10px] text-text-sub text-body-m">
      <span className="group-hover:right-1 relative transition-all">
        <ArrowIcon2 className="text-text-sub rotate-180" size={10} />
      </span>
      이전으로 가기
    </button>
  );
}
