import React from "react";

type InputSize = "sm" | "md" | "lg";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  width?: InputSize;
  id: string;
  label: string;
};


const baseStyle = "w-[368px] rounded-input border border-[var(--color-border-main)] bg-white";

const sizeStyles: Record<InputSize, string> = {
  sm: "py-2 px-2 text-sm",
  md: "py-[12px] px-[25px] text-base",
  lg: "py-6 px-8 text-lg",
};

export default function Input({
  icon,
  width = "md",
  disabled = false,
  id,
  label,
  className, // 외부에서 주입받는 클래스
  ...props // placeholder, id, type은 이미 InputHTMLAttributes에 포함
}: InputProps) {
  
  // 클래스 결합 로직
  const combinedClassName = [
    baseStyle,
    sizeStyles[width],
    disabled ? "disabled:bg-[var(--color-neutral-200)] text-border-main cursor-not-allowed pointer-events-none" : "",
    className // 외부에서 전달된 className
  ].join(" ").trim();


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