import { cookies } from "next/headers";

// 유저정보
export async function getMyInfo() {
  let data;
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage`, {
      headers: {
        Cookie: `authToken=${authToken}`,
      },
    });
    data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
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
