import Link from "next/link";
import Image from "next/image";
import PlayIcon from "@/components/icon/PlayIcon";
import UserIcon from "@/components/icon/UserIcon";
import BaseLink from "@/components/ui/BaseLink";
type Variant = "primary" | "secondary";

export default function Card({
  href,
  count,
  children,
  variant = "primary",
}: {
  href: string;
  count: number;
  children: React.ReactNode;
  variant: Variant;
}) {
  const myCont = false;
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
      <div className="flex flex-wrap items-end p-card bg-white">
        <h3 className="text-h4 w-full mb-4">{children}</h3>
        <p className="flex flex-1 items-center">
          <UserIcon size={24} />
          <span className="text-caption text-text-sub">{count}명 참여</span>
        </p>
        { myCont ? (
        <div className="flex gap-2 justify-end w-full">
          <BaseLink
            variant="secondary"
            href="/game"
            size="sm"
          >
            결과보기
          </BaseLink>
          <BaseLink
            variant="outline"
            href="/game"
            size="sm"
          >
            다시하기
          </BaseLink>
        </div>) :  <span className="group-hover:left-1 transition relative">
          <PlayIconByVariant variant={variant} />
        </span>}
      </div>
    </>
  )
    // 전체 클릭 카드
  if (myCont) {
    return (
      <div className={`group w-full shadow-m rounded-box overflow-hidden hover:shadow-l border-t-4 border-${variant}`}>
      {content}
    </div>
    )
  }
  return (
    <Link
      href={href}
      className={`group w-full shadow-m rounded-box overflow-hidden hover:shadow-l border-t-4 border-${variant}`}>
      {content}
    </Link>
  );
}

function PlayIconByVariant({variant}:  { variant: Variant }) {
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

