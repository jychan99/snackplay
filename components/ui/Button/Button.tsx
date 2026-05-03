// 폰트(크기 굵기)랑 사이즈(패딩, min-width), 아이콘 추가 필요
// 타입
type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonVariant;
  icon?: React.ReactNode;
  size?: ButtonSize;
  children: React.ReactNode;
  disabled: boolean;
  onClick?: () => void;
};

// 스타일
const baseStyle = `
  flex
  justify-center
  aligns-center
  py-4
  px-8
  rounded-full
`;

const variantStyles = {
  primary:
    "bg-[var(--color-primary)] text-white hover:shadow-[0_8px_20px_0_rgba(185,7,96,0.3)]",
  secondary:
    "bg-[var(--color-secondary)] text-white hover:shadow-[0_10px_15px_-3px_#bfdbfe]",
  outline:
    "border border-[var(--color-border-sub)] bg-white text-black hover:shadow-[0_8px_20px_-3px_rgba(0, 0, 0, 0.5)]",
  danger: "bg-red-500 text-white",
};

const sizeStyles = {
  sm: "px-3 text-sm",
  md: "px-4 text-base",
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
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        `    ${baseStyle}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? `${disabledStyles[variant]} opacity-50 cursor-not-allowed pointer-events-none` : ""}`,
      ].join(" ")}
      type="button"
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
