import { Suspense } from "react";
import Image from "next/image";
import ArrowIcon2 from "@/components/icon/ArrowIcon2";
import RocketIcon from "@/components/icon/RocketIcon";
import BaseLink from "@/components/ui/BaseLink";
import ViewAllLink from "@/components/ui/ViewAllLink";
import Badge from "@/components/ui/Badge";
import Card from "@/components/display/Card";
import { getPopularTest } from "@/lib/actions";
import { getIsLoggedIn } from "@/lib/auth";
import { myLikedTest } from "@/lib/mylikedtest";
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
              현재 가장 인기있는 다양한 테스트에 참여해보세요
            </p>
          </div>
          <div className="relative -m-2.5">
            <ViewAllLink href="/test" ariaLabel="테스트 하러가기">
              View All
            </ViewAllLink>
          </div>
        </div>
        <Suspense fallback={<CardListSkeleton />}>
          <CardList variant="primary" />
        </Suspense>
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
        <h1 className="my-6 text-h1">
          심심하니?
          <br />
          <b className="text-primary">SnackPlay</b>에서 <br />
          테스트를 즐겨봐!
        </h1>
        <p className="mb-6 text-body-l">
          AI가 분석한 당신의 숨겨진 모습(?)을 확인해보고
          <br /> 친구들과 공유해보세요
        </p>
        <div className="flex flex-wrap gap-3">
          <BaseLink
            variant="secondary"
            href="/test"
            icon={<RocketIcon className="text-white" size={20} />}
          >
            테스트하러 가기
          </BaseLink>
          {/* <BaseLink variant="outline" href="/game">
            게임하러 가기
          </BaseLink> */}
        </div>
      </div>
      <div className="relative w-full max-w-[400px] md:max-w-[43%] aspect-[7/6]">
        <Image
          className="object-cover"
          src="/images/image_banner.webp"
          alt=""
          fill
          sizes="(min-width: 768px) 43vw, 300px"
          loading="eager" // 지연 로딩 해제 (즉시 로드)
          fetchPriority="high"
        />
      </div>
    </section>
  );
}

function CardListSkeleton() {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-full rounded-box shadow-m overflow-hidden animate-pulse"
        >
          <div className="w-full aspect-[3/2] bg-background" />
          <div className="p-card">
            <div className="h-5 w-3/4 rounded bg-background" />
            <div className="mt-3 h-3 w-1/3 rounded bg-background" />
          </div>
        </div>
      ))}
    </div>
  );
}

type CardListProps = {
  variant: "primary" | "secondary";
};

export async function CardList({ variant }: CardListProps) {
  const isLoggedIn = await getIsLoggedIn();
  const [testPopularData, liked] = await Promise.all([
    getPopularTest() as Promise<TEST_MAIN[]>,
    isLoggedIn ? myLikedTest() : Promise.resolve(null),
  ]);
  if (testPopularData) {
    testPopularData.sort((a, b) => {
      if (a.like !== b.like) {
        return b.like - a.like;
      }
      return b.testId - a.testId;
    });
  }
  const bestData = liked
    ? testPopularData.map((item) => ({
        ...item,
        isLiked: liked.likedTests.some(
          (like: { testId: number }) => like.testId === item.testId,
        ),
      }))
    : testPopularData;
  const popularData = bestData.slice(0, 4);
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {popularData.map((data: TEST_MAIN) => (
        <Card key={data.testId} data={data} variant={variant} priority />
      ))}
    </div>
  );
}
