import { sql } from "@/lib/db";

//테스트 생성
export async function POST(request: Request) {
  try {
    const { testTitle, testInfo, hashtag } = await request.json();

    // 필수 필드 검증
    if (!testTitle || !testInfo || !hashtag) {
      return Response.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 },
      );
    }

    // 중복 체크
    const existing = await sql`
      SELECT "TEST_TITLE"
      FROM "TEST_MAIN"
      WHERE "TEST_TITLE" = ${testTitle}
    `;

    if (existing.length > 0) {
      return Response.json(
        { error: "이미 존재하는 테스트 제목입니다." },
        { status: 409 },
      );
    }

    // 테스트 생성
    const result = await sql`
      INSERT INTO "TEST_MAIN" ("TEST_TITLE", "TEST_INFO", "HASHTAG")
      VALUES (${testTitle}, ${testInfo}, ${hashtag})
      RETURNING "TEST_TITLE" as "testTitle", "TEST_INFO" as "testInfo", "HASHTAG" as "hashtag"
    `;

    return Response.json(
      { message: "테스트 생성 성공", test: result[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error("API /auth/signup POST 에러:", error);
    return Response.json(
      { error: "테스트 생성 실패", details: String(error) },
      { status: 500 },
    );
  }
}
