import { sql } from "@/lib/db";
import { TEST_CONTENT, SCALE_CODE } from "@/types";
import { revalidatePath } from "next/cache";

//테스트 질문 목록
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const testId = Number(searchParams.get("testId"));

    if (!testId) {
      return Response.json(
        { error: "testId가 필요합니다." },
        { status: 400 },
      );
    }

    const questions = await sql`
      SELECT "CONTENT_ID" as "contentId"
          , "TEST_ID" as "testId"
          , "TEST_NUMBERING" as "testNumbering"
          , "QUESTION" as "question"
          , "ANSWER_1" as "answer1"
          , "ANSWER_1_SCALE" as "answer1Scale"
          , "ANSWER_2" as "answer2"
          , "ANSWER_2_SCALE" as "answer2Scale"
          , "ANSWER_3" as "answer3"
          , "ANSWER_3_SCALE" as "answer3Scale"
          , "ANSWER_4" as "answer4"
          , "ANSWER_4_SCALE" as "answer4Scale"
      FROM "TEST_CONTENT"
      WHERE "TEST_ID" = ${testId}
      ORDER BY "TEST_NUMBERING"
    `;

    //해당 테스트의 해시태그
    const hashtags = await sql`
      SELECT A."HASHTAG" as "hashtag"
          , B."CODE" as "code"
      FROM "TEST_MAIN" A
      JOIN "SCALE_CODE" B
        ON A."HASHTAG" = B."HASHTAG"
      WHERE A."TEST_ID" = ${testId}
    `;

    //해시태그별 코드목록
    const scaleCodes = await sql`
      SELECT "HASHTAG" as "hashtag"
          , "CODE" as "code"
      FROM "SCALE_CODE"
    `;

    return Response.json({ questions, hashtags, scaleCodes });
  } catch (error) {
    console.error("API /test/questions GET 에러:", error);
    return Response.json(
      { error: "DB 조회 실패", details: String(error) },
      { status: 500 },
    );
  }
}

//질의응답 저장
export async function POST(request: Request) {
  try {
    const { testId, questionCount, questions } = await request.json();

    if (!testId) {
      return Response.json(
        { error: "testId가 필요합니다." },
        { status: 400 },
      );
    }

    await sql`
      DELETE FROM "TEST_CONTENT"
      WHERE "TEST_ID" = ${Number(testId)}
    `;

    const totalCount = Math.max(Number(questionCount) || 1, 1);

    for (let index = 1; index <= totalCount; index += 1) {
      const item = questions?.[index - 1];
      const question = String(item?.question || "").trim();

      if (!question) {
        continue;
      }

      await sql`
        INSERT INTO "TEST_CONTENT" (
          "TEST_ID",
          "TEST_NUMBERING",
          "QUESTION",
          "ANSWER_1",
          "ANSWER_1_SCALE",
          "ANSWER_2",
          "ANSWER_2_SCALE",
          "ANSWER_3",
          "ANSWER_3_SCALE",
          "ANSWER_4",
          "ANSWER_4_SCALE"
        )
        VALUES (
          ${Number(testId)},
          ${index},
          ${question},
          ${String(item?.answer1 || "")},
          ${String(item?.answer1Scale || "")},
          ${String(item?.answer2 || "")},
          ${String(item?.answer2Scale || "")},
          ${String(item?.answer3 || "")},
          ${String(item?.answer3Scale || "")},
          ${String(item?.answer4 || "")},
          ${String(item?.answer4Scale || "")}
        )
      `;
    }

    revalidatePath(`/testpage/test/${testId}/questions`);

    return Response.json({ message: "질문 저장 성공" });
  } catch (error) {
    console.error("API /test/questions POST 에러:", error);
    return Response.json(
      { error: "질문 저장 실패", details: String(error) },
      { status: 500 },
    );
  }
}
