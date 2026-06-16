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
//마이페이지 - 나의 테스트 조회
export async function GET(request: Request) {
  const token = getCookieValue(request.headers.get("cookie"), "authToken");
  const userId = token ? getUserIdFromToken(token) : "";
  try {
    const games = await sql`
      SELECT "TEST_ID" as "testId"
            , "TEST_TITLE" as "testTitle"
            , "TEST_INFO" as "testInfo"
            , "HASHTAG" as "hashtag"
            , "LIKE" as "like"
      FROM "TEST_MAIN"
      WHERE "USER_ID" = ${userId}
      ORDER BY "TEST_ID" DESC
    `;

    return Response.json(games);
  } catch (error) {
    console.error("API /test GET 에러:", error);
    return Response.json(
      { error: "DB 조회 실패", details: String(error) },
      { status: 500 },
    );
  }
}
