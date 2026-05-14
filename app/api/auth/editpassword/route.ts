import { sql } from "@/lib/db";

//비밀번호 변경
export async function POST(request: Request) {
  try {
    const { id, password } = await request.json();

    // 필수 필드 검증
    if (!password) {
      return Response.json(
        { error: "변경할 비밀번호를 입력해주세요." },
        { status: 400 },
      );
    }

    // 비밀번호 변경
    const result = await sql`
      UPDATE  "USER_MAIN"
      SET "PASSWORD" = ${password}
      WHERE "ID" = ${id}
      RETURNING "ID" as id, "PASSWORD" as password
    `;

    return Response.json(
      { message: "비밀번호 변경 성공", user: result[0] },
      { status: 200 },
    );
  } catch (error) {
    console.error("API /auth/editpassword POST 에러:", error);
    return Response.json(
      { error: "비밀번호 변경 실패", details: String(error) },
      { status: 500 },
    );
  }
}
