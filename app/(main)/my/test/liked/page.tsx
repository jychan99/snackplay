import Card from "@/components/display/Card";
import { getMyTestData } from "@/lib/test";
import { TEST_MAIN } from "@/types/index";
export const metadata = {
  title: "내가 진행한 테스트 목록",
};
export default function Page() {
  return (
    <section className="mb-22">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-h2">내가 좋아요한(데이터 맵핑 작업필요)</h2>
          <p className="text-body-m text-text-sub">내가 진행한 테스트</p>
        </div>
      </div>
      <CardList />
    </section>
  );
}

export async function CardList() {
  const testList = await getMyTestData();
  console.log(`testlist: ${testList}`);
  console.log(testList);
  const myCont = true;
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {testList.map((item: TEST_MAIN) => (
        <Card key={item.testId} data={item} variant="primary">
          카드 타이틀
        </Card>
      ))}
    </div>
  );
}
