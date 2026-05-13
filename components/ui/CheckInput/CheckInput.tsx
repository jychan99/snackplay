"use client";
import CheckIcon from "@/components/icon/CheckIcon";
import { useState } from "react";

type CheckInputProps = React.ComponentProps<"input"> & {
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
export default function CheckInput({
  id,
  label,
  checked,
  onChange,
  ...props
}: CheckInputProps) {
  return (
    <div className="relative flex items-center gap-1">
      <input
        {...props}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="absolute left-0 top-0 w-6 h-6 opacity-0"
      />
      <CheckIcon checked={!!checked} />
      <label htmlFor={id} className="text-caption">
        {label}
      </label>
    </div>
  );
}
