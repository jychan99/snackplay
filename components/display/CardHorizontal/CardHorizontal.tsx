import Link from "next/link";
import Image from "next/image";
import UserIcon from "@/components/icon/UserIcon";
import BaseLink from "@/components/ui/BaseLink";
import type { TEST_MAIN } from "@/types/index";

// ui
type Variant = "primary" | "secondary";
type Mode = "like" | "result" | "create";

type Props = {
  data: TEST_MAIN;
  variant?: Variant;
  mode: Mode;
};

export default function CardHorizontal({
  data,
  variant = "primary",
  mode,
  ...props
}: Props) {
  const variantStyle = {
    primary: "border-primary",
    secondary: "border-secondary",
  };
  return (
    <div
      className={` shadow-m rounded-box has-[a:hover]:shadow-l  border-t-4 ${variantStyle[variant]} flex items-center p-card bg-white`}
    >
      {/* a[href='/about'] */}
      <div className="flex items-center flex-1">
        <div className="relative w-[96px] h-[64px] mr-2 rounded-input overflow-hidden">
          <Image
            src="/images/sample_img.png"
            alt="sample img"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-body-m">{data.testTitle}</h3>
          <p className="flex items-center">
            <UserIcon size={20} />
            <span className="text-caption text-text-sub">
              {data.like}명 참여
            </span>
          </p>
        </div>
      </div>
      <span className="flex flex-col gap-2">
        {mode === "result" && (
          <>
            <BaseLink
              variant={variant}
              size="sm"
              href={`/test/result/${data.resultId}`}
            >
              결과보기
            </BaseLink>
            <BaseLink variant="outline" size="sm" href={`/test/${data.testId}`}>
              다시하기
            </BaseLink>
          </>
        )}
        {mode === "like" && (
          <BaseLink variant="outline" size="sm" href={`/test/${data.testId}`}>
            테스트하러 가기
          </BaseLink>
        )}
        {mode === "create" && (
          <BaseLink variant="outline" size="sm" href={`/test/${data.testId}`}>
            수정하러 가기
          </BaseLink>
        )}
      </span>
    </div>
  );
}
