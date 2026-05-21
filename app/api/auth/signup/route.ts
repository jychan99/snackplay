import { sql } from "@/lib/db";
import { hashPassword } from "@/lib/password";

//회원가입
export async function POST(request: Request) {
  try {
    const { id, password, nickname } = await request.json();

    // 필수 필드 검증
    if (!id || !password || !nickname) {
      return Response.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 },
      );
    }

    // 중복 체크
    const existing = await sql`
      SELECT "ID"
      FROM "USER_MAIN"
      WHERE "ID" = ${id}
    `;

    if (existing.length > 0) {
      return Response.json(
        { error: "이미 존재하는 아이디입니다." },
        { status: 409 },
      );
    }
    //비밀번호 해싱
    const hashedPassword = await hashPassword(password);
    
    // 회원가입
    const result = await sql`
      INSERT INTO "USER_MAIN" ("ID", "PASSWORD", "NICKNAME")
      VALUES (${id}, ${hashedPassword}, ${nickname})
      RETURNING "ID" as id, "PASSWORD" as password, "NICKNAME" as nickname
    `;

    return Response.json(
      { message: "회원가입 성공", user: result[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error("API /auth/signup POST 에러:", error);
    return Response.json(
      { error: "회원가입 실패", details: String(error) },
      { status: 500 },
    );
  }
}
