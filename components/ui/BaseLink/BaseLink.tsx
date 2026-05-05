import Link from "next/link";

type BaseLinkVariant = "primary" | "secondary" | "outline" | "danger";
type BaseLinkSize = "sm" | "md" | "lg";

type BaseLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant: BaseLinkVariant;
  icon?: React.ReactNode;
  size?: BaseLinkSize;
  children: React.ReactNode;
  href: string;
};

// 스타일
const baseStyle = `
  cursor-pointer
  flex
  justify-center
  items-center
  gap-2
  rounded-full
  transition
  
`;

const variantStyles = {
  primary:
    "bg-primary text-white hover:shadow-[0_8px_20px_0_rgba(185,7,96,0.3)]",
  secondary: "bg-secondary text-white hover:shadow-[0_10px_15px_-3px_#bfdbfe]",
  outline:
    "border border-border-sub bg-white text-black hover:shadow-[0_8px_20px_-3px_rgba(0, 0, 0, 0.5)]",
  danger: "bg-red-500 text-white",
};

const sizeStyles = {
  sm: "py-2 px-6 text-body-s",
  md: "py-4 px-8 text-button-m",
  lg: "px-8 text-base",
};

export default function BaseLink({
  variant,
  icon,
  size = "md",
  children,
  className,
  href,
  ...props
}: BaseLinkProps) {
  // 클래스 결합 로직
  const combinedClassName = [
    baseStyle,
    variantStyles[variant],
    sizeStyles[size],

    className, // 외부에서 전달된 className 합치기
  ]
    .join(" ")
    .trim();
  return (
    <Link href={href} className={combinedClassName} {...props}>
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </Link>
  );
}
