import { sql } from "@/lib/db";

//결과조회
export async function GET(
  request: Request,
  { params }: { params: Promise<{ resultid: string }> }
) {
  try {
    const { resultid } = await params;
    const resultId = Number(resultid);

    const selectResult = await sql`
      SELECT A."TEST_ID" as testId
            , A."RESULT_ID" as resultId
            , A."USER_ID" as userId
            , B."TEST_TITLE" as testTitle
            , A."RESULT" as result
            , A."RESULT_DETAIL" as resultDetail
        FROM "TEST_RESULT" A
        JOIN "TEST_MAIN" B
        ON A."TEST_ID" = B."TEST_ID"
        WHERE "RESULT_ID" = ${resultId}
    `;

    return Response.json(
      { message: "결과 조회 성공", user: selectResult[0] },
      { status: 200 },
    );
  } catch (error) {
    console.error("API /test/result GET 에러:", error);
    return Response.json(
      { error: "결과 조회 실패", details: String(error) },
      { status: 500 },
    );
  }
}
