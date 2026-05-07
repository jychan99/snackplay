// 폰트(크기 굵기)랑 사이즈(패딩, min-width), 아이콘 추가 필요
// 타입
type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ComponentProps<"button"> & {
  variant: ButtonVariant;
  icon?: React.ReactNode;
  size?: ButtonSize;
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
    "border border-border-sub bg-white text-black hover:shadow-[0_8px_20px_-3px_rgba(0,0,0,0.2)]",
  danger: "bg-red-500 text-white",
};

const sizeStyles = {
  sm: "py-2 px-6 text-button-m",
  md: "py-4 px-8 text-button-l",
  lg: "px-8 text-base",
};

const disabledStyles = {
  primary: "bg-pink-600 text-white",
  secondary: "bg-gray-100 text-black",
  outline: "border border-gray-300 text-black",
  danger: "bg-red-500 text-white",
};
export default function Button({
  variant,
  icon,
  size = "md",
  disabled = false,
  children,
  className,
  ...props
}: ButtonProps) {
  // 클래스 결합 로직
  const combinedClassName = [
    baseStyle,
    variantStyles[variant],
    sizeStyles[size],
    disabled
      ? `${disabledStyles[variant]} opacity-50 cursor-not-allowed pointer-events-none`
      : "",
    className, // 외부에서 전달된 className 합치기
  ]
    .join(" ")
    .trim();

  return (
    <button className={combinedClassName} type="button" {...props}>
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
