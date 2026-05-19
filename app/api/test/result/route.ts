import { sql } from "@/lib/db";

//결과등록
export async function POST(request: Request) {
  try {
    const { testId, userId, result, resultDetail } = await request.json();

    // 결과기록
    const recordResult = await sql`
      INSERT INTO "TEST_RESULT" ("TEST_ID", "USER_ID", "RESULT", "RESULT_DETAIL")
      VALUES (${testId}, ${userId}, ${result}, ${resultDetail})
      RETURNING "TEST_ID" as testId, "USER_ID" as userId, "RESULT" as result, "RESULT_DETAIL" as resultDetail
    `;

    return Response.json(
      { message: "결과 등록 성공", user: recordResult[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error("API /test/result POST 에러:", error);
    return Response.json(
      { error: "결과 등록 실패", details: String(error) },
      { status: 500 },
    );
  }
}
