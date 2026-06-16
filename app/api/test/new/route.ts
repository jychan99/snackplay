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

export async function POST(request: Request) {
  try {
    const token = getCookieValue(request.headers.get("cookie"), "authToken");
    const userId = token ? getUserIdFromToken(token) : "";
    const { testTitle, testInfo, hashtag, questions = [] } =
      await request.json();

    if (!testTitle || !testInfo || !hashtag) {
      return Response.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 },
      );
    }

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

    const result = await sql`
      INSERT INTO "TEST_MAIN" ("TEST_TITLE", "TEST_INFO", "HASHTAG", "USER_ID")
      VALUES (${testTitle}, ${testInfo}, ${hashtag}, ${userId})
      RETURNING "TEST_ID" as "testId", "TEST_TITLE" as "testTitle", "TEST_INFO" as "testInfo", "HASHTAG" as "hashtag"
    `;

    const savedTestId = result[0].testId;

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

    return Response.json(
      { message: "테스트 생성 성공", testId: savedTestId, test: result[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error("API /test/new POST 오류:", error);
    return Response.json(
      { error: "테스트 생성 실패", details: String(error) },
      { status: 500 },
    );
  }
}
