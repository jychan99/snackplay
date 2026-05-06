import React from "react";

type InputSize = "sm" | "md" | "lg";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  width?: InputSize;
  id: string;
  label: string;
};

const baseStyle =
  "w-[368px] rounded-input border border-border-main bg-white";

const sizeStyles: Record<InputSize, string> = {
  sm: "py-2 px-6 text-body-s",
  md: "py-[12px] px-[25px] text-body-m",
  lg: "py-6 px-8 text-body-l",
};

export default function Input({
  icon,
  width = "md",
  disabled = false,
  id, // 이미 포함되나 label htmlFord에도 넣어야 하기에
  label,
  className,
  ...props // placeholder, id, type은 이미 InputHTMLAttributes에 포함
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
      <label htmlFor={id}>{label}</label>
      <div className="mt-2">
        {icon && <span className="">{icon}</span>}
        <input
          id={id}
          disabled={disabled}
          className={combinedClassName}
          {...props}
        />
      </div>
    </div>
  );
}
