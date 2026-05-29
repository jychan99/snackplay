import Image from "next/image";
import ArrowIcon2 from "@/components/icon/ArrowIcon2";
import RocketIcon from "@/components/icon/RocketIcon";
import BaseLink from "@/components/ui/BaseLink";
import ViewAllLink from "@/components/ui/ViewAllLink";
import Badge from "@/components/ui/Badge";
import Card from "@/components/display/Card";
import { getPopularTest } from "@/lib/test";
import { TEST_MAIN } from "@/types";
export default function Page() {
  return (
    <div>
      <MainBanner></MainBanner>
      {/* banner */}
      {/* <section className="mb-22">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-h2">인기있는 게임</h2>
            <p className="text-body-m text-text-sub">
              가장 인기있는 게임에 참여해보세요
            </p>
          </div>
          <div className="relative -m-2.5">
            <ViewAllLink href="/game" ariaLabel="게임 하러가기">
              View All
            </ViewAllLink>
          </div>
        </div>
        <CardList variant="secondary" />
      </section> */}
      <section className="mb-22">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-h2">인기있는 테스트</h2>
            <p className="text-body-m text-text-sub">
              인기있는 다양한 테스트에 참여해보세요
            </p>
          </div>
          <div className="relative -m-2.5">
            <ViewAllLink href="/test" ariaLabel="테스트 하러가기">
              View All
            </ViewAllLink>
          </div>
        </div>
        <CardList variant="primary" />
      </section>
      {/* contents */}
    </div>
  );
}

export function MainBanner() {
  return (
    <section className="flex flex-col-reverse gap-3 md:gap-0 md:flex-row p-6 md:p-16 items-center justify-between rounded-modal bg-[linear-gradient(155deg,_#fdf2f8_0%,_#eff6ff_100%)] mb-22">
      <div className="">
        <Badge>모두 다함께 즐겨요</Badge>
        <h2 className="my-6 text-h1">
          심심하니?
          <br />
          <b className="text-primary">SnackPlay</b>에서 <br />
          게임과 테스트를 즐겨봐!
        </h2>
        <p className="mb-6 text-body-l">
          신나는 게임과 테스트를 하고 친구들과 공유해보세요
        </p>
        <div className="flex flex-wrap gap-3">
          <BaseLink
            variant="secondary"
            href="/game"
            icon={<RocketIcon className="text-white" size={20} />}
          >
            게임하러 가기
          </BaseLink>
          <BaseLink variant="outline" href="/test">
            테스트하러 가기
          </BaseLink>
        </div>
      </div>
      <div className="relative w-full max-w-[400px] md:max-w-[43%] aspect-[7/6]">
        <Image
          className="object-cover"
          src="/images/image_banner.png"
          alt=""
          fill
          priority
        />
      </div>
    </section>
  );
}

type CardListProps = {
  variant: "primary" | "secondary";
};

export async function CardList({ variant }: CardListProps) {
  const testPopularData: TEST_MAIN[] = await getPopularTest();
  testPopularData.sort((a, b) => {
    if (a.like !== b.like) {
      return b.like - a.like;
    }
    return b.testId - a.testId;
  });
  const bestData = testPopularData.slice(0, 4);
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {bestData.map((data: TEST_MAIN) => (
        <Card key={data.testId} data={data} variant={variant}>
          카드 타이틀
        </Card>
      ))}
    </div>
  );
}
