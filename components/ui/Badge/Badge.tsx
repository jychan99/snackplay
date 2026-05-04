
type BadgeVariant = "primary" | "secondary";
const variantStyles = {
  primary: "bg-primary-light text-primary-dark",
  secondary: "bg-secondary-light text-secondary-dark"
}
const baseStyle = "rounded-button inline-block px-4 py-2"
// 클래스 결합 로직

export default function Badge({color, children} : {
  color: BadgeVariant;
  children: React.ReactNode;
}) {
  const combinedClassName = [
    baseStyle,
    variantStyles[color]].join(" ").trim();
  
  return (
    <span className={combinedClassName}>
      {children}
    </span>
  );
}