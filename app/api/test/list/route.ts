import { sql } from "@/lib/db";

//테스트 목록
export async function GET() {
  try {
    const games = await sql`
      SELECT "TEST_ID" as "testId"
            , "TEST_TITLE" as "testTitle"
            , "TEST_INFO" as "testInfo"
            , "HASHTAG" as "hashtag"
            , "LIKE" as "like"
      FROM "TEST_MAIN"
      ORDER BY "TEST_ID" DESC
    `;

    return Response.json(games);
  } catch (error) {
    console.error("API /test GET 에러:", error);
    return Response.json(
      { error: "DB 조회 실패", details: String(error) },
      { status: 500 },
    );
  }
}
