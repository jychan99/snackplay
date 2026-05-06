import { sql } from "@/lib/db";

//로그인
export async function POST(request: Request) {
  try {
    const { id, password } = await request.json();

    // 필수 필드 검증
    if (!id || !password) {
      return Response.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 },
      );
    }

    //로그인
    const login = await sql`
    SELECT "ID"
        , "PASSWORD"
    FROM "USER_MAIN"
    WHERE "ID" = ${id}
    and "PASSWORD" = ${password}
    `;

    if (login.length == 0) {
      return Response.json(
        { error: "아이디 및 비밀번호가 일치하지 않습니다." },
        { status: 409 },
      );
    }

    return Response.json(
      { message: "로그인 성공", user: login[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error("API /auth/login POST 에러:", error);
    return Response.json(
      { error: "로그인 실패", details: String(error) },
      { status: 500 },
    );
  }
}
