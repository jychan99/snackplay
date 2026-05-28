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
      SELECT "TEST_ID" as testId
            , "RESULT_ID" as resultId
            , "USER_ID" as userId
            , "RESULT" as result
            , "RESULT_DETAIL" as resultDetail
        FROM "TEST_RESULT"
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
