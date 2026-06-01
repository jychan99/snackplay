import { cookies } from "next/headers";

export async function myLikedTest() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/like`, {
      headers: {
        Cookie: `authToken=${authToken}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message || "데이터 가져오기 실패");
    }
    return data;
  } catch (error) {
    console.error("getTests 에러:", error);
  }
}
