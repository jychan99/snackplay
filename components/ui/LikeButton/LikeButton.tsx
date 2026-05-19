"use client";
import { useState } from "react";
import HeartIcon from "@/components/icon/HeartIcon";
export default function LikeButton() {
  const [checked, setChecked] = useState(false);
  function toggleHeartBtn() {
    setChecked(!checked);
  }
  return (
    <button
      type="button"
      onClick={toggleHeartBtn}
      className="absolute top-2 right-2 flex bg-white px-2 py-0.5 gap-1 rounded-box text-caption items-center "
    >
      <HeartIcon checked={checked} />3
    </button>
  );
}
