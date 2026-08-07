import Card from "@/components/display/Card";
import { getPlayedTest } from "@/lib/my";
import { getIsLoggedIn } from "@/lib/auth";
import { TEST_MAIN } from "@/types/index";
import { myLikedTest } from "@/lib/mylikedtest";
export const metadata = {
  title: "내가 진행한 테스트 목록",
  description: "내가 진행한 테스트 결과를 다시 확인해보세요.",
};
export default function Page() {
  return (
    <section className="mb-22">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-h2">내가 플레이한 테스트</h1>
          <p className="text-body-m text-text-sub">
            내가 진행한 테스트의 결과를 확인해보세요
          </p>
        </div>
      </div>
      <CardList />
    </section>
  );
}

export async function CardList() {
  const isLoggedIn = await getIsLoggedIn();
  const [data, liked] = await Promise.all([
    getPlayedTest(),
    isLoggedIn ? myLikedTest() : Promise.resolve(null),
  ]);
  const testData = liked
    ? data.myTestResults.map((item: TEST_MAIN) => ({
        ...item,
        isLiked: liked.likedTests.some(
          (like: { testId: number }) => like.testId === item.testId,
        ),
      }))
    : data;
  const myCont = true;
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {testData.map((item: TEST_MAIN) => (
        <Card key={item.testId} data={item} variant="primary" myCont={true}>
          카드 타이틀
        </Card>
      ))}
    </div>
  );
}
