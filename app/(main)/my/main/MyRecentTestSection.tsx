import ViewAllLink from "@/components/ui/ViewAllLink";
import CardHorizontal from "@/components/display/CardHorizontal";
import type { TEST_MAIN } from "@/types/index";

type MyTestProps = {
  tests: TEST_MAIN[];
};

export default function MyRecentGameSection({ tests }: MyTestProps) {
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
        {tests.map((test) => (
          <CardHorizontal
            key={test.testId}
            data={test}
            mode="result"
            variant="secondary"
          />
        ))}
      </div>
    </section>
  );
}
