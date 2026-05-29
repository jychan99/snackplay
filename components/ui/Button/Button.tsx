import { getButtonClass, ButtonVariant, ButtonSize } from "./button.styles";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  variant = "primary",
  icon,
  size = "md",
  disabled,
  children,
  className,
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClass({
        variant,
        size,
        disabled,
        className,
      })}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
