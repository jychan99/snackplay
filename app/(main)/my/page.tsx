import Image from "next/image";
import Button from "@/components/ui/Button"
import BaseLink from "@/components/ui/BaseLink"
import ViewAllLink from "@/components/ui/ViewAllLink"
import Badge from "@/components/ui/Badge"
import CardHorizontal from "@/components/display/CardHorizontal"
import CameraIcon from "@/components/icon/CameraIcon"

export const metadata = {
  title: "마이페이지",
};

export default function Page() {
  return (
    <div>
      <section className="flex flex-col sm:flex-row items-center box-custom mb-10">
        <h2 className="sr-only">my info</h2>
        <div>
        <div className="relative">
          <div className="relative w-[152px] h-[152px] border-4 overflow-hidden rounded-button padding-0.5">
            <Image
              className="object-cover"
              src="/images/image_banner.png"
              alt=""
              fill
              priority
            />
          </div>
          <button className="absolute bottom-0 right-0 w-10 h-10 rounded-button border-2 flex items-center justify-center bg-primary border-white shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2)]">
           <span className="sr-only">내 이미지 변경</span>
           <CameraIcon size={24}/>
          </button>
        </div>
        </div>
        <div className="flex-1 mt-4 sm:ml-10 mb-4 sm:mb-0 sm:mt-0 text-center sm:text-left">
          <h3 className="text-h2">여기는 닉네임이 들어갈거라구요오옹</h3>
          <p className="text-body-m text-text-sub ">여기는 아이디가 들어갑니다.</p>
          <div className="flex gap-2 mt-6 justify-center sm:justify-start">
            <Badge variant="primary">뱃지</Badge>
            <Badge variant="secondary">뱃지</Badge>
          </div>
        </div>
        {/* <div>
          <div>
            <label htmlFor=""></label>
            <input type="text" />
          </div>
        </div> */}
        <Button variant="primary" size="sm">수정하기</Button>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10 ">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-h4">My Games</h2>
            <ViewAllLink href="my/game" ariaLabel="내가 플레이 한 게임 전체 보러가기">
              View All
            </ViewAllLink>
          </div>
          <div>
            <CardHorizontal className="mb-6" href="/" count={100} variant="secondary">
              네모네모로직
            </CardHorizontal>
            <CardHorizontal href="/" count={100} variant="secondary">
              얼렁뚱땅상점
            </CardHorizontal>
            <CardHorizontal href="/" count={100} variant="secondary">
              붕어빵 타이쿤
            </CardHorizontal>
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-h4">My Test</h2>
            <ViewAllLink href="/my/test" ariaLabel="내가 진행한 테스트 전체 보러가기">
              View All
            </ViewAllLink>
          </div>
          <div>
            <CardHorizontal href="/" count={100} variant="primary">
              슈의 라면가게
            </CardHorizontal>
            <CardHorizontal href="/" count={100} variant="primary">
              틀린그림찾기
            </CardHorizontal>
            <CardHorizontal href="/" count={100} variant="primary">
              죽림고수 - 추억의 한게임플래시
            </CardHorizontal>
          </div>
        </section>
      </div>
    </div>
  )
}