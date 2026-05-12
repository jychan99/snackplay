
import { getButtonClass, ButtonVariant, ButtonSize } from "./button.styles";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
};

export default function Button({
  variant = "primary",
  icon,
  size = "md",
  disabled,
  children,
  className,
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
      disabled={disabled}
      type="button"
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}