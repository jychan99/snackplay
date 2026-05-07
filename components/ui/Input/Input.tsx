import React from "react";

type InputSize = "sm" | "md" | "lg";

type InputProps = React.ComponentProps<"input"> & {
  icon?: React.ReactNode;
  width?: InputSize;
  label: string;
};

const baseStyle =
  "w-full max-w-[400px] rounded-input border border-border-main bg-white";

const sizeStyles: Record<InputSize, string> = {
  sm: "py-2 px-6 text-body-s",
  md: "py-[12px] px-[25px] text-body-m",
  lg: "py-6 px-8 text-body-l",
};

export default function Input({
  icon,
  width = "md",
  disabled = false,
  label,
  className,
  ...props // placeholder, id, type은 이미 .ComponentProps<"input">에 포함
}: InputProps) {
  // 클래스 결합 로직
  const combinedClassName = [
    baseStyle,
    sizeStyles[width],
    disabled
      ? "disabled:bg-neutral-200 text-border-main cursor-not-allowed pointer-events-none"
      : "",
    className,
  ]
    .join(" ")
    .trim();

  return (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <div className="mt-2">
        {icon && <span className="">{icon}</span>}
        <input
          {...props}
          disabled={disabled}
          className={combinedClassName}
        />
      </div>
    </div>
  );
}
