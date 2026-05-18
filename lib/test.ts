export async function getAllTest() {
  let data;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/test/list`,
    );
    data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "테스트 불러오기 실패");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("네트워크 오류");
    }
  }

  return data;
}
