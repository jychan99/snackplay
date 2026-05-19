import Card from "@/components/display/Card";
import { getAllTest } from "@/lib/test";
import { TEST_MAIN } from "@/types/index";
import Link from "next/link";
export const metadata = {
  title: "내가 만든 테스트 목록",
};

export default function Page() {
  return (
    <section className="mb-22">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-h2">내가 만든 테스트</h2>
          <p className="text-body-m text-text-sub">
            내가 만든 테스트를 관리하고 추가해보세요
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
      <button
        type="button"
        className={`relative group w-full shadow-m rounded-box overflow-hidden  border-t-4 flex items-center justify-center bg-text-sub text-white group`}
      >
        <span className="border-white border-1 block rounded-button  w-13 h-13 flex items-center justify-center text-h2 group-hover:rotate-180 transition">
          +
        </span>
        <span className="absolute top-[30%] group-hover:opacity-100 opacity-0 transition bg-text-main px-2 py-1">
          테스트 추가하기
        </span>
      </button>
      {testData.map((item: TEST_MAIN) => (
        <Card
          key={item.testId}
          data={item}
          variant="primary"
          myCont={true}
          mode="studio"
        >
          카드 타이틀
        </Card>
      ))}
    </div>
  );
}
