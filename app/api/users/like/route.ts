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
    const { testId } = await request.json();
    const testIdNumber = Number(testId);

    if (!userId) {
      return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    if (!testIdNumber) {
      return Response.json(
        { error: "테스트 ID가 필요합니다." },
        { status: 400 },
      );
    }

    const existingLike = await sql`
      SELECT "TEST_ID", "USER_ID"
      FROM "TEST_LIKE"
      WHERE "TEST_ID" = ${testIdNumber}
        AND "USER_ID" = ${userId}
    `;

    if (existingLike.length > 0) {
      await sql`
        DELETE FROM "TEST_LIKE"
        WHERE "TEST_ID" = ${testIdNumber}
          AND "USER_ID" = ${userId}
      `;

      const result = await sql`
        UPDATE "TEST_MAIN"
        SET "LIKE" = GREATEST(COALESCE("LIKE", 0) - 1, 0)
        WHERE "TEST_ID" = ${testIdNumber}
        RETURNING "TEST_ID" as "testId", "LIKE" as "like"
      `;

      return Response.json(
        { message: "좋아요 취소 성공", liked: false, test: result[0] },
        { status: 200 },
      );
    }

    await sql`
      INSERT INTO "TEST_LIKE" ("TEST_ID", "USER_ID")
      VALUES (${testIdNumber}, ${userId})
    `;

    const result = await sql`
      UPDATE "TEST_MAIN"
      SET "LIKE" = COALESCE("LIKE", 0) + 1
      WHERE "TEST_ID" = ${testIdNumber}
      RETURNING "TEST_ID" as "testId", "LIKE" as "like"
    `;

    return Response.json(
      { message: "좋아요 성공", liked: true, test: result[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error("API /users/like POST error:", error);
    return Response.json(
      { error: "좋아요 실패", details: String(error) },
      { status: 500 },
    );
  }
}
