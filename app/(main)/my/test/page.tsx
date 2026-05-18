import Card from "@/components/display/Card";

export const metadata = {
  title: "나의 테스트",
};
export default function Page() {
  return (
    <section className="mb-22">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-h2">MY TEST</h2>
          <p className="text-body-m text-text-sub">내가 진행한 테스트</p>
        </div>
      </div>
      <CardList />
    </section>
  );
}

export async function getMyTestData() {
  try {
    const res = await fetch("http://localhost:3000/api/test/list/mytestlist", {
      method: "GET",
      // body: "",
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message || "데이터 가져오기 실패");
    }
    return data;
  } catch (error) {
    console.error("getTests 에러:", error);
  }
}

export async function CardList() {
  const testList = await getMyTestData();
  console.log(`testlist: ${testList}`);
  console.log(`${testList}`);
  const myCont = true;
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Card href="/" count={100} myCont={myCont}>
        카드 타이틀
      </Card>
      <Card href="/" count={100} myCont={myCont}>
        카드 타이틀
      </Card>
      <Card href="/" count={100} myCont={myCont}>
        카드 타이틀
      </Card>
      <Card href="/" count={100} myCont={myCont}>
        카드 타이틀
      </Card>
    </div>
  );
}
