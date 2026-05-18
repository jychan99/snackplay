import Link from "next/link";
import Image from "next/image";
import PlayIcon from "@/components/icon/PlayIcon";
import UserIcon from "@/components/icon/UserIcon";
import { TEST_MAIN } from "@/types/index";
import BaseLink from "@/components/ui/BaseLink";
type Variant = "primary" | "secondary";
type Props = React.ComponentProps<"a"> & {
  data: TEST_MAIN;
  variant: Variant;
  children?: React.ReactNode;
  myCont?: boolean;
};

export default function Card({
  data,
  variant = "primary",
  myCont = false,
  children,
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
            <BaseLink variant="secondary" href="/test" size="sm">
              결과보기
            </BaseLink>
            <BaseLink variant="outline" href="/test" size="sm">
              다시하기
            </BaseLink>
          </div>
        ) : (
          <span className="group-hover:left-1 transition relative">
            <PlayIconByVariant variant={variant} />
          </span>
        )}
      </div>
    </>
  );
  // 전체 클릭 카드
  if (myCont == true) {
    return (
      <div
        className={`group w-full shadow-m rounded-box overflow-hidden hover:shadow-l border-t-4 border-${variant}`}
      >
        {content}
      </div>
    );
  }
  return (
    <Link
      href={`/test/${data.testId}`}
      className={`group w-full shadow-m rounded-box overflow-hidden hover:shadow-l border-t-4 border-${variant}`}
    >
      {content}
    </Link>
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
