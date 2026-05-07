type BadgeVariant = "primary" | "secondary";
const variantStyles = {
  primary: "bg-primary-light text-primary-dark",
  secondary: "bg-secondary-light text-secondary-dark",
};
const baseStyle = "rounded-button inline-block px-4 py-2 text-body-s";

export default function Badge({
  variant,
  children,
}: {
  variant: BadgeVariant;
  children: React.ReactNode;
}) {
  // 클래스 결합 로직
  const combinedClassName = [baseStyle, variantStyles[variant]].join(" ").trim();
  return <span className={combinedClassName}>{children}</span>;
}
