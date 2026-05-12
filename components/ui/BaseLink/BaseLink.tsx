import Link from "next/link";
import { getButtonClass, ButtonVariant, ButtonSize } from "../Button/button.styles";


type BaseLinkProps = React.ComponentProps<"a"> & {
  variant: ButtonVariant;
  icon?: React.ReactNode;
  size?: ButtonSize;
  href: string;
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
  return (
    <Link href={href}   className={getButtonClass({
        variant,
        size,
        className,
      })} {...props}>
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </Link>
  );
}
