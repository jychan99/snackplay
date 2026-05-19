import { sql } from "@/lib/db";

//테스트 저장 (생성 및 수정)
export async function POST(request: Request) {
  try {
    const { testId, testTitle, testInfo, hashtag, questions } =
      await request.json();

    if (!testTitle || !testInfo || !hashtag) {
      return Response.json(
        { error: "테스트 제목, 설명, 해시태그를 입력해주세요." },
        { status: 400 },
      );
    }

    const requestedTestId = Number(testId) || null;

    //TEST_ID는 시퀀스로 자동 생성되지만, 수정 시에는 기존 TEST_ID를 사용해야 함
    const saved = await sql`
      INSERT INTO "TEST_MAIN" (
        "TEST_ID",
        "TEST_TITLE",
        "TEST_INFO",
        "HASHTAG"
      )
      OVERRIDING SYSTEM VALUE
      VALUES (
        nextval(pg_get_serial_sequence('"TEST_MAIN"', 'TEST_ID'))::integer,
        ${testTitle},
        ${testInfo},
        ${hashtag}
      )
      ON CONFLICT ("TEST_ID") DO UPDATE
       SET
         "TEST_TITLE" = EXCLUDED."TEST_TITLE",
         "TEST_INFO" = EXCLUDED."TEST_INFO",
         "HASHTAG" = EXCLUDED."HASHTAG"
       RETURNING "TEST_ID" as "testId"
    `;

    const savedTestId = saved[0].testId;

    await sql`
      DELETE FROM "TEST_CONTENT"
      WHERE "TEST_ID" = ${savedTestId}
    `;

    for (let index = 0; index < questions.length; index += 1) {
      const item = questions[index];

      if (!item.question) {
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
          ${savedTestId},
          ${index + 1},
          ${item.question},
          ${item.answer1 || ""},
          ${item.answer1Scale || ""},
          ${item.answer2 || ""},
          ${item.answer2Scale || ""},
          ${item.answer3 || ""},
          ${item.answer3Scale || ""},
          ${item.answer4 || ""},
          ${item.answer4Scale || ""}
        )
      `;
    }

    return Response.json({
      message: "테스트 저장 성공",
      testId: savedTestId,
    });
  } catch (error) {
    console.error("API /test/edit POST 에러:", error);
    return Response.json(
      { error: "테스트 저장 실패", details: String(error) },
      { status: 500 },
    );
  }
}
