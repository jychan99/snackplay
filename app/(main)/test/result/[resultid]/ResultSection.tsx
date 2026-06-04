"use client";
import BaseLink from "@/components/ui/BaseLink";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Alert from "@/components/ui/Alert";
import { useState } from "react";
type resultProps = {
  result: string;
  resultdetail: string;
  resultid: number;
  testid: number;
  userid: string;
  testtitle: string;
};
type Props = {
  data: resultProps;
};

export default function ResultSection({ data }: Props) {
  const [open, setOpen] = useState(false); // alert ui
  function copyUrl() {
    window.navigator.clipboard
      .writeText(
        `${process.env.NEXT_PUBLIC_BASE_URL}/test/result/${data.resultid}`,
      )
      .then(() => {
        setOpen(true);
      });
  }
  return (
    <>
      <p className="text-caption text-primary mb-1">{data.testtitle}</p>
      {/* <p className="text-h4">당신에게 어울리는 회사는</p> */}
      <h2 className="text-h2 mb-10">{data.result}</h2>
      <div className="w-full h-50 relative mb-10">
        <Image
          className=""
          src="/images/image_banner.png"
          alt=""
          fill
          priority
        />
      </div>
      {/* <p className="text-text-sub text-body-m mb-10">
        독창적이고 섹시한 매드 지니어스
      </p> */}
      <div className="mt-2 max-h-[500px] overflow-auto text-body-m p-4 border-1 border-border-sub bg-background rounded-box mb-10">
        {data.resultdetail}
      </div>
      <hr className="my-6 border-secondary-light" />
      <div className="flex justify-center gap-3 mb-10">
        <Button variant="outline" size="sm" onClick={copyUrl}>
          공유하기
        </Button>
        <BaseLink href="/test" variant="secondary" size="sm">
          다른 테스트하러가기
        </BaseLink>
      </div>
      <BaseLink
        href={`/test/${data.testid}`}
        variant="primary"
        className="w-full"
      >
        한번 더 테스트하기
      </BaseLink>
      <Alert
        open={open}
        onOpenChange={setOpen}
        data={{
          ttl: "링크 복사 완료",
          desc: "주소가 복사되었습니다. 원하는 곳에 붙여넣기(Ctrl+V)해주세요.",
        }}
        onConfirm={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
