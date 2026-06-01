import Card from "@/components/display/Card";
import { getLikedTest } from "@/lib/my";
import { getIsLoggedIn } from "@/lib/auth";
import { TEST_MAIN } from "@/types/index";
import { myLikedTest } from "@/lib/mylikedtest";
export const metadata = {
  title: "내가 좋아요한 테스트 목록",
};
export default async function Page() {
  return (
    <section className="mb-22">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-h2">내가 좋아요한</h2>
          <p className="text-body-m text-text-sub">내가 진행한 테스트</p>
        </div>
      </div>
      <CardList />
    </section>
  );
}

export async function CardList() {
  const data = await getLikedTest();
  const isLoggedIn = await getIsLoggedIn();
  let testData;
  if (isLoggedIn) {
    const liked = await myLikedTest();
    testData = data.likedTests.map((item: TEST_MAIN) => ({
      ...item,
      isLiked: liked.likedTests.some(
        (like: { testId: number }) => like.testId === item.testId,
      ),
    }));
  } else {
    testData = data;
  }
  const myCont = true;
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {testData.map((item: TEST_MAIN) => (
        <Card key={item.testId} data={item} variant="primary">
          카드 타이틀
        </Card>
      ))}
    </div>
  );
}
