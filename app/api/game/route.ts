import { sql } from "@/lib/db";

//게임조회
export async function GET() {
  try {
    const games = await sql`
      SELECT "GAME_ID_PK" as gameIdPk
            , "GAME_TITLE" as gameTitle
            , "GAME_TYPE_CODE" as gameTypeCode
            , "GAME_INFO" as gameInfo
            , "GAME_HASHTAG" as gameHashtag
      FROM "GAME_MAIN"
      ORDER BY "GAME_ID_PK" DESC
    `;

    return Response.json(games);
  } catch (error) {
    console.error("API /games GET 에러:", error);
    return Response.json(
      { error: "DB 조회 실패", details: String(error) },
      { status: 500 },
    );
  }
}
