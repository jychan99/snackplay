//like 클릭 토글 버튼
export async function handleLike(testId: number) {
  const res = await fetch(`/api/test/like`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ testId }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
  }
}
