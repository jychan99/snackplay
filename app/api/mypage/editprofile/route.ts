import { sql } from "@/lib/db";

// 프로필 정보 변경
export async function POST(request: Request) {
  try {
    const { id, nickname, password, passwordConfirm } = await request.json();

    if (!id) {
      return Response.json({ error: "아이디가 필요합니다." }, { status: 400 });
    }

    const nextNickname =
      typeof nickname === "string" && nickname.trim() !== ""
        ? nickname.trim()
        : null;

    const hasPasswordInput =
      (typeof password === "string" && password !== "") ||
      (typeof passwordConfirm === "string" && passwordConfirm !== "");

    if (hasPasswordInput && password !== passwordConfirm) {
      return Response.json(
        { error: "비밀번호 확인이 일치하지 않습니다." },
        { status: 400 },
      );
    }

    const nextPassword = hasPasswordInput ? password : null;

    const result = await sql`
      UPDATE  "USER_MAIN"
      SET
        "NICKNAME" = COALESCE(${nextNickname}, "NICKNAME"),
        "PASSWORD" = COALESCE(${nextPassword}, "PASSWORD")
      WHERE "ID" = ${id}
      RETURNING "ID" as id, "NICKNAME" as nickname
    `;

    if (result.length === 0) {
      return Response.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    return Response.json(
      { message: "프로필 변경 성공", user: result[0] },
      { status: 200 },
    );
  } catch (error) {
    console.error("API /mypage/editprofile POST 에러:", error);
    return Response.json(
      { error: "프로필 변경 실패", details: String(error) },
      { status: 500 },
    );
  }
}
