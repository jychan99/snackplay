type BadgeVariant = "primary" | "secondary";
type BadgeSize = "sm" | "md" | "lg";

const sizeStyles = {
  sm: "py-1 px-3 text-caption",
  md: "px-4 py-2 text-body-s",
  lg: "px-8 text-base",
}
const variantStyles = {
  primary: "bg-primary-light text-primary-dark",
  secondary: "bg-secondary-light text-secondary-dark",
};
const baseStyle = "rounded-button inline-block ";

export default function Badge({
  variant = "primary",
  children,
  className,
  size = "md",
}: {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?:string;
  size?:BadgeSize;
}) {
  // 클래스 결합 로직
  const combinedClassName = [baseStyle, variantStyles[variant], className, sizeStyles[size]].join(" ").trim();
  return <span className={combinedClassName}>{children}</span>;
}
