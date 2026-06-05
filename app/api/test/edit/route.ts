import { sql } from "@/lib/db";

function getUserIdFromToken(token: string) {
  return token.split("_")[0];
}

function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) {
    return "";
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const targetCookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));

  return targetCookie ? decodeURIComponent(targetCookie.split("=")[1]) : "";
}

//테스트 수정을 위한 데이터 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const testId = Number(searchParams.get("testId"));

    const tests = await sql`
      SELECT "TEST_ID" as "testId"
            , "TEST_TITLE" as "testTitle"
            , "TEST_INFO" as "testInfo"
            , "HASHTAG" as "hashtag"
            , "LIKE" as "like"
      FROM "TEST_MAIN"
      ORDER BY "TEST_ID" DESC
    `;

    return Response.json(tests);
  } catch (error) {
    console.error("API /test GET 에러:", error);
    return Response.json(
      { error: "DB 조회 실패", details: String(error) },
      { status: 500 },
    );
  }
}

//테스트 저장 (생성 및 수정)
export async function POST(request: Request) {
  try {
    const token = getCookieValue(request.headers.get("cookie"), "authToken");
    const userId = token ? getUserIdFromToken(token) : "";
    const { testId, testTitle, testInfo, hashtag, questions } =
      await request.json();

    if (!testTitle || !testInfo || !hashtag) {
      return Response.json(
        { error: "테스트 제목, 설명, 해시태그를 입력해주세요." },
        { status: 400 },
      );
    }

    const requestedTestId = Number(testId) || null;

    if (!requestedTestId) {
      return Response.json({ error: "testId가 필요합니다." }, { status: 400 });
    }

    //TEST_ID는 시퀀스로 자동 생성되지만, 수정 시에는 기존 TEST_ID를 사용해야 함
    const saved = await sql`
      UPDATE "TEST_MAIN"
      SET
        "TEST_TITLE" = ${testTitle},
        "TEST_INFO" = ${testInfo},
        "HASHTAG" = ${hashtag},
        "USER_ID" = ${userId}
      WHERE "TEST_ID" = ${requestedTestId}
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
