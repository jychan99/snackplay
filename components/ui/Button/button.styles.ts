export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

const baseStyle = `
  cursor-pointer
  flex
  justify-center
  items-center
  gap-2
  rounded-full
  transition
`;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:shadow-[0_8px_20px_0_rgba(185,7,96,0.3)]",
  secondary:
    "bg-secondary text-white hover:shadow-[0_10px_15px_-3px_#bfdbfe]",
  outline:
    "border border-border-sub bg-white text-black hover:shadow-[0_8px_20px_-3px_rgba(0,0,0,0.2)]",
  danger: "bg-red-500 text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
 sm: "py-2 px-6 text-button-m",
  md: "py-4 px-8 text-button-l",
  lg: "px-8 text-base",
};

const disabledStyles: Record<ButtonVariant, string> = {
  primary: "bg-pink-600 text-white",
  secondary: "bg-gray-100 text-black",
  outline: "border border-gray-300 text-black",
  danger: "bg-red-500 text-white",
};

export function getButtonClass({
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}) {
  return [
    baseStyle,
    variantStyles[variant],
    sizeStyles[size],
    disabled
      ? `${disabledStyles[variant]} opacity-50 cursor-not-allowed pointer-events-none`
      : "",
    className,
  ]
    .join(" ")
    .trim();
}