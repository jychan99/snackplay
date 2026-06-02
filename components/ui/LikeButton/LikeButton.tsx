"use client";
import { useState } from "react";
import HeartIcon from "@/components/icon/HeartIcon";
import { handleLike } from "@/lib/like";
// import { getIsLoggedIn } from "@/lib/auth";
type Props = {
  testId: number;
  likeCount: number;
  isLiked?: boolean;
};

export default function LikeButton({
  testId,
  likeCount,
  isLiked = false,
}: Props) {
  const [checked, setChecked] = useState(isLiked);
  const [count, setCount] = useState(likeCount);
  console.log(isLiked);
  async function toggleHeartBtn() {
    // const isLoggedIn = await getIsLoggedIn();
    const nextChecked = !checked;

    setChecked(nextChecked);

    setCount((prev) => (nextChecked ? prev + 1 : prev - 1));

    await handleLike(testId);
  }

  // 내가 클릭했는지 안했는지 아는 법?
  return (
    <button
      type="button"
      onClick={toggleHeartBtn}
      className="absolute top-2 right-2 flex bg-white px-2 py-0.5 gap-1 rounded-box text-caption items-center "
    >
      <HeartIcon checked={checked} />
      {count}
    </button>
  );
}
