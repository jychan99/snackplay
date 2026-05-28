import Image from "next/image";
import Card from "@/components/display/Card";

export const metadata = {
  title: "게임 리스트",
};

export default function Page() {
  return (
    <section className="mb-22">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-h2">ALL GAME</h2>
          <p className="text-body-m text-text-sub">
            다양한 게임에 참여해보세요
          </p>
        </div>
      </div>
      <CardList />
    </section>
  );
}

export function CardList() {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <p className="py-40 w-full">현재 참여 가능한 게임이 없습니다.</p>
      {/* <Card href="/" count={100} variant="secondary">
        카드 타이틀
      </Card>
      <Card href="/" count={100} variant="secondary">
        카드 타이틀
      </Card>
      <Card href="/" count={100} variant="secondary">
        카드 타이틀
      </Card>
      <Card href="/" count={100} variant="secondary">
        카드 타이틀
      </Card> */}
    </div>
  );
}
