import ViewAllLink from "@/components/ui/ViewAllLink";
import CardHorizontal from "@/components/display/CardHorizontal";

export default function MyRecentGameSection() {
  return (
    <section>
      <div className="flex items-center justify-between  mb-6">
        <h2 className="text-h4">My Test</h2>
        <ViewAllLink
          href="/my/test"
          ariaLabel="내가 진행한 테스트 전체 보러가기"
        >
          View All
        </ViewAllLink>
      </div>
      <div className="flex flex-col gap-6">
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
  );
}
