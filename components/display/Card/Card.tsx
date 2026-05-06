import Link from "next/link";
import Image from "next/image";
import PlayIcon from "@/components/icon/PlayIcon";
import UserIcon from "@/components/icon/UserIcon";

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
  return (
    <Link
      href={href}
      className={`group w-full shadow-m rounded-box overflow-hidden hover:shadow-l border-t-4 border-${variant}`}
    >
      <div className="relative w-full aspect-[3/2] ">
        <Image
          src="/images/sample_img.png"
          alt="sample img"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-wrap items-end p-card">
        <h3 className="text-h4 w-full mb-4">{children}</h3>
        <p className="flex flex-1 items-center">
          <UserIcon size={24} />
          <span className="text-caption text-text-sub">{count}명 참여</span>
        </p>
        <span className="group-hover:left-1 transition relative">
          <PlayIconByVariant variant={variant} />
        </span>
      </div>
    </Link>
  );
}

function PlayIconByVariant({ variant }: Variant) {
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