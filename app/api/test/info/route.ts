import { sql } from "@/lib/db";

//테스트 목록
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const testId = Number(searchParams.get("testId"));
    //const testId = params.testId;

    if (!testId) {
      return Response.json({ error: "testId가 필요합니다." }, { status: 400 });
    }

    const testInfo = await sql`
      SELECT "TEST_ID" as "testId"
            , "TEST_TITLE" as "testTitle"
            , "TEST_INFO" as "testInfo"
            , "HASHTAG" as "hashtag"
            , "LIKE" as "like"
      FROM "TEST_MAIN"
      WHERE "TEST_ID" = ${testId}
      ORDER BY "TEST_ID" DESC
    `;

    const testContent = await sql`
      SELECT "CONTENT_ID" as "contentId"
            , "TEST_ID" as "testId"
            , "TEST_NUMBERING" as "testNumbering"
            , "QUESTION" as "question"
            , "ANSWER_1" as "answer1"
            , "ANSWER_2" as "answer2"
            , "ANSWER_3" as "answer3"
            , "ANSWER_4" as "answer4"
      FROM "TEST_CONTENT"
      WHERE "TEST_ID" = ${testId}
      ORDER BY "TEST_ID" DESC
    `;

    return Response.json({ testInfo, testContent });
  } catch (error) {
    console.error("API /test GET 에러:", error);
    return Response.json(
      { error: "DB 조회 실패", details: String(error) },
      { status: 500 },
    );
  }
}
