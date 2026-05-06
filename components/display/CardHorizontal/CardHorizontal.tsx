import Link from "next/link";
import Image from "next/image";
import UserIcon from "@/components/icon/UserIcon";
import BaseLink from "@/components/ui/BaseLink";

type Variant = "primary" | "secondary";

export default function CardHorizontal({
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
  const variantStyle = {
    primary: "border-primary",
    secondary: "border-secondary",
  };
  return (
    <div
      className={` shadow-m rounded-box has-[a:hover]:shadow-l  border-t-4 ${variantStyle[variant]} flex items-center p-card`}
    >
      {/* a[href='/about'] */}
      <div className="flex items-center">
        <div className="relative w-[96px] h-[64px] mr-2 rounded-input overflow-hidden">
          <Image
            src="/images/sample_img.png"
            alt="sample img"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-body-m">{children}</h3>
          <p className="flex items-center">
            <UserIcon size={20} />
            <span className="text-caption text-text-sub">{count}명 참여</span>
          </p>
        </div>
      </div>
      <span className="flex flex-col gap-2">
        <BaseLink variant={variant} size="sm" href="/">
          결과보기
        </BaseLink>
        <BaseLink variant="outline" size="sm" href="/">
          다시하기
        </BaseLink>
      </span>
    </div>
  );
}
