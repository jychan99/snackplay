import Link from "next/link";
import Image from "next/image";
import ArrowIcon2 from "@/components/icon/PlayIcon";
import UserIcon from "@/components/icon/UserIcon";

// type Varient = "primary" | "secondary";

export default function Card({
  href,
  count,
  children,
  varient = "primary",
}: {
  href: string;
  count: number;
  children: React.ReactNode;
  varient: string;
}) {
  return (
    <Link
      href={href}
      className={`group w-[286px] shadow-m rounded-box overflow-hidden hover:shadow-l  border-t-4 border-${varient}`}
    >
      <div className="relative w-full h-[192px]">
        <Image
          src="/images/sample_img.png"
          alt="sample img"
          fill
          className="object-cover "
        />
      </div>
      <div className="flex flex-wrap items-end p-[var(--spacing-m)]">
        <h3 className="text-h4 w-full mb-4">{children}</h3>
        <p className="flex flex-1 items-center">
          <UserIcon size={24} />
          <span className="text-caption text-text-sub">{count}명 참여</span>
        </p>
        <span className="group-hover:left-1 transition relative">
          <ArrowIcon2
            className={`text-${varient}`}
            size={40}
            color={`var(--color-${varient}-light)`}
          />
        </span>
      </div>
    </Link>
  );
}
