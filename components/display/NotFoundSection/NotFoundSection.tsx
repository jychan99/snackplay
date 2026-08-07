import BaseLink from "@/components/ui/BaseLink";
import RocketIcon from "@/components/icon/RocketIcon";
import Badge from "@/components/ui/Badge";

export default function NotFoundSection() {
  return (
    <section className="flex flex-col-reverse gap-3 md:gap-0 md:flex-row p-6 md:p-16 items-center justify-between rounded-modal bg-[linear-gradient(155deg,_#fdf2f8_0%,_#eff6ff_100%)]">
      <div>
        <Badge>404 ERROR</Badge>
        <h1 className="my-6 text-h1">
          앗, 이 페이지는
          <br />
          <b className="text-primary">사라졌거나</b> <br />
          존재하지 않아요
        </h1>
        <p className="mb-6 text-body-l">
          주소가 바뀌었거나 삭제된 페이지일 수 있어요.
          <br /> 아래에서 다른 테스트를 즐겨보세요.
        </p>
        <div className="flex flex-wrap gap-3">
          <BaseLink
            variant="secondary"
            href="/"
            icon={<RocketIcon className="text-white" size={20} />}
          >
            홈으로 가기
          </BaseLink>
          <BaseLink variant="outline" href="/test">
            테스트하러 가기
          </BaseLink>
        </div>
      </div>
    </section>
  );
}
