import { cookies } from "next/headers";

// 유저정보
export async function getMyInfo() {
  const cookieStore = await cookies();
  let data;
  try {
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

// 유저 변경
export async function modifyMyInfo() {}

// 내가 만든 테스트
export async function getMyTest() {
  const cookieStore = await cookies();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/test/list/mytestlist`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message || "데이터 가져오기 실패");
    }
    return data;
  } catch (error) {
    console.error("getTests 에러:", error);
  }
}

// 내가 진행한 테스트
export async function getPlayedTest() {
  const cookieStore = await cookies();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/playedtests`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data.error || "데이터 가져오기 실패");
    }
    return data;
  } catch (error) {
    console.error("getTests 에러:", error);
  }
}

// 내가 좋아요한 테스트
export async function getLikedTest() {
  const cookieStore = await cookies();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/likedtests`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data.error || "데이터 가져오기 실패");
    }
    return data;
  } catch (error) {
    console.error("getTests 에러:", error);
  }
}
