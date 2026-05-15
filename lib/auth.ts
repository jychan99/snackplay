import { cookies } from "next/headers";

  // 로그인 여부 체크
  export async function getIsLoggedIn() {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");
    return !!token;
  }

  // 유저 정보 가져오기
  export async function getCurrentUser() {
      const cookieStore = await cookies();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
          {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
      );
      return res.json();
  }