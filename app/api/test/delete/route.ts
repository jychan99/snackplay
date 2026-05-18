import { sql } from "@/lib/db";

//테스트 삭제
export async function POST(request: Request) {
  try {
    const { testId } = await request.json();

    // 테스트 삭제
    const result = await sql`
      DELETE FROM "TEST_MAIN" WHERE "TEST_ID" = ${testId}
    `;

    return Response.json(
      { message: "테스트 삭제 성공", test: result[0] },
      { status: 200 },
    );
  } catch (error) {
    console.error("API /test/delete POST 에러:", error);
    return Response.json(
      { error: "테스트 삭제 실패", details: String(error) },
      { status: 500 },
    );
  }
}
