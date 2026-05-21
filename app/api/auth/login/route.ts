import { sql } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";

// 로그인
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

    const login = await sql`
      SELECT "ID" as id
           , "PASSWORD" as password
      FROM "USER_MAIN"
      WHERE "ID" = ${id}
    `;

    const user = login[0];
    const storedPassword = user?.password;
    const isLegacyPlainPassword = storedPassword === password;
    const isValidPassword =
      !!storedPassword &&
      (isLegacyPlainPassword ||
        (await verifyPassword(password, storedPassword)));

    if (!isValidPassword) {
      return Response.json(
        { error: "아이디 및 비밀번호가 일치하지 않습니다." },
        { status: 409 },
      );
    }

    if (isLegacyPlainPassword) {
      const hashedPassword = await hashPassword(password);
      await sql`
        UPDATE "USER_MAIN"
        SET "PASSWORD" = ${hashedPassword}
        WHERE "ID" = ${id}
      `;
    }

    // 토큰 생성 (간단한 방식: id + timestamp)
    const token = `${id}_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    return Response.json(
      { message: "로그인 성공", user: { id: user.id }, token },
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
