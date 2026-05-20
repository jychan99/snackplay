//like 버튼
export async function handleLike(testId: number) {
  const res = await fetch(`/api/test/like`, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify({ testId }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
  }
}
