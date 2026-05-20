import Card from "@/components/display/Card";
import { getAllTest } from "@/lib/test";
import { TEST_MAIN } from "@/types/index";

export const metadata = {
  title: "테스트 목록",
};

export default function Page() {
  return (
    <section className="mb-22">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-h2">ALL TEST</h2>
          <p className="text-body-m text-text-sub">
            다양한 테스트에 참여해보세요
          </p>
        </div>
      </div>
      <CardList />
    </section>
  );
}

export async function CardList() {
  const testData = await getAllTest();
  console.log(testData);
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
