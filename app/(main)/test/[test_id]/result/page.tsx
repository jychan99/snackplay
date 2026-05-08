import BaseLink from "@/components/ui/BaseLink";
import Button from "@/components/ui/Button";
import Image from "next/image";

export const metadata = {
  title: "테스트 결과",
};

export default function Page() {
  
  return (
    <div className="box-custom mx-auto text-center">
      <StartTest/>
    </div>
  )
}

export function StartTest(){
  return (
    <>
      <p className="text-caption text-primary mb-1">카테고리 또는 해시태그</p>
      <p className="text-h4">
        당신에게 어울리는 회사는
      </p>
      <h2 className="text-h2 mb-10">테슬라</h2>
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
        독창적이고 섹시한 매드 지니어스
      </p>
      <div className="mt-2 max-h-[500px] overflow-auto text-body-m p-4 border-1 border-border-sub bg-background rounded-box mb-10">
        혹시 이상한 기분 안들어요? 
        어디선가 알 수 없는 마성의 아우라가 느껴지네... 냉정하고 이성적인 판단력과 확실한 결단력으로 문제를 해결하는 당신! 거대한 체스판을 보며 큰 그림을 그리고 자신의 새로운 지식과 생각을 끊임없이 재평가하며 독특하고 실행가능한 솔루션을 개발하는데 누구보다 열정적입니다.
      </div>
      <hr className="my-6 border-secondary-light"/>
      <div className="flex justify-center gap-3 mb-10">
        <Button variant="outline" size="sm">공유하기</Button>
        <BaseLink href="/"  variant="secondary" size="sm">다른 테스트하러가기</BaseLink>
      </div>
      <Button className="w-full">한번 더 테스트하기</Button>
    </>
  )
}
export function LoadingTest(){
  return (
    <div>로딩 시작</div>
  )
}
export function PlayTest(){
  return (
    <div>테스트 진행</div>
  )
}