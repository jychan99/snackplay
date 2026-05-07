"use client";
import CheckIcon from "@/components/icon/CheckIcon";
import { useState } from "react";

type CheckboxProps = React.ComponentProps<"input"> & {
  label: string;
};
export default function Checkbox({ id, label }: CheckboxProps) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="relative flex items-center gap-1">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="absolute left-0 top-0 w-6 h-6 opacity-0"
      />
      <CheckIcon checked={checked} />
      <label htmlFor={id} className="text-caption">
        {label}
      </label>
    </div>
  );
}
