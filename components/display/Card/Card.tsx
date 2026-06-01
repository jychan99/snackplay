import Link from "next/link";
import Image from "next/image";
import PlayIcon from "@/components/icon/PlayIcon";
import UserIcon from "@/components/icon/UserIcon";
import { TEST_MAIN } from "@/types/index";
import BaseLink from "@/components/ui/BaseLink";
import LikeButton from "@/components/ui/LikeButton/LikeButton";
import { EditTestDialog } from "@/components/test/EditTestDialog";
import Button from "@/components/ui/Button";

type Variant = "primary" | "secondary";
type Mode = "studio" | "result";
type Props = React.ComponentProps<"a"> & {
  data: TEST_MAIN; // 데이터
  variant: Variant; // 색상
  myCont?: boolean; // 내가 실행한, 내가 만든, 내가 좋아요한 테스트 리스트 중 1개 (버튼 있음)
  mode?: Mode; // mycont 중 분류
};

export default function Card({
  data,
  variant = "primary",
  myCont = false,
  mode = "result",
  ...props
}: Props) {
  const content = (
    <>
      <div className="relative w-full aspect-[3/2] ">
        <Image
          src="/images/sample_img.png"
          alt="sample img"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-wrap items-end p-card">
        <h3 className="text-h4 w-full mb-4">{data.testTitle}</h3>
        <p className="flex flex-1 items-center">
          <UserIcon size={24} />
          <span className="text-caption text-text-sub">2명 참여</span>
        </p>
        {myCont ? (
          <div className="flex gap-2 justify-end w-full">
            {mode == "studio" && (
              <EditTestDialog testId={data.testId}>
                <Button type="button" variant="outline" size="sm">
                  수정하기
                </Button>
              </EditTestDialog>
            )}
            {mode === "result" && (
              <>
                <BaseLink
                  variant="secondary"
                  href={`/test/${data.testId}/result`}
                  size="sm"
                >
                  결과보기
                </BaseLink>
                <BaseLink
                  variant="outline"
                  href={`/test/${data.testId}`}
                  size="sm"
                >
                  다시하기
                </BaseLink>
              </>
            )}
          </div>
        ) : (
          <span className="group-hover:left-1 transition relative">
            <PlayIconByVariant variant={variant} />
          </span>
        )}
      </div>
    </>
  );

  // 버튼 있는 카드 (내가 실행한 테스트 리스트, 내가 만든 테스트 리스트, 내가 좋아요한 테스트 리스트)
  if (myCont == true) {
    return (
      <div
        className={`relative group w-full shadow-m rounded-box overflow-hidden hover:shadow-l border-t-4 border-${variant}`}
      >
        {content}

        <LikeButton
          testId={data.testId}
          likeCount={data.like}
          isLiked={data.isLiked}
        />
      </div>
    );
  }
  // 버튼 없는 카드 (전체 테스트 리스트)
  return (
    <div
      className={`relative group w-full shadow-m rounded-box overflow-hidden hover:shadow-l border-t-4 border-${variant}`}
    >
      <Link href={`/test/${data.testId}`} className={``}>
        {content}
      </Link>
      <LikeButton
        testId={data.testId}
        likeCount={data.like}
        isLiked={data.isLiked}
      />
    </div>
  );
}

function PlayIconByVariant({ variant }: { variant: Variant }) {
  const isPrimary = variant === "primary";
  return (
    <PlayIcon
      className={isPrimary ? "text-primary" : "text-secondary"}
      size={40}
      color={
        isPrimary
          ? "var(--color-primary-light)" /*svg엔 값이 넘어가야하기 때문에!*/
          : "var(--color-secondary-light)"
      }
    />
  );
}
