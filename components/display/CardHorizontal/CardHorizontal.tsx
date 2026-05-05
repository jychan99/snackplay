import Link from "next/link";
import Image from "next/image";
import UserIcon from "@/components/icon/UserIcon";
import BaseLink from "@/components/ui/BaseLink";

type Varient = "primary" | "secondary";

export default function CardHorizontal({
  href,
  count,
  children,
  varient = "primary",
}: {
  href: string;
  count: number;
  children: React.ReactNode;
  varient: Varient;
}) {
  const varientStyle = {
    primary: "border-primary",
    secondary: "border-secondary",
  };
  return (
    <div
      className={`group shadow-m rounded-box hover:shadow-l  border-t-4 ${varientStyle[varient]} flex items-center p-[var(--spacing-m)]`}
    >
      <Link href={href} className={``}>
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
      </Link>
      <span className="">
        <BaseLink variant="outline" size="sm" href="/">
          결과보기
        </BaseLink>
      </span>
    </div>
  );
}
