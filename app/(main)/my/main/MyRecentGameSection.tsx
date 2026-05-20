import ViewAllLink from "@/components/ui/ViewAllLink";
import CardHorizontal from "@/components/display/CardHorizontal";

export default function MyRecentGameSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-h4">My Games</h2>
        <ViewAllLink
          href="my/game"
          ariaLabel="내가 플레이 한 게임 전체 보러가기"
        >
          View All
        </ViewAllLink>
      </div>
      <div className="flex flex-col gap-6">
        {/* <CardHorizontal href="/" count={100} variant="secondary">
          네모네모로직
        </CardHorizontal>
        <CardHorizontal href="/" count={100} variant="secondary">
          얼렁뚱땅상점
        </CardHorizontal>
        <CardHorizontal href="/" count={100} variant="secondary">
          붕어빵 타이쿤
        </CardHorizontal> */}
      </div>
    </section>
  );
}
