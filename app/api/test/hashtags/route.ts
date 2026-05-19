import { sql } from "@/lib/db";

export async function GET() {
  try {
    const rows = await sql`
      SELECT "HASHTAG" as "hashtag"
          , "CODE" as "code"
          , "DESCRIPTION" as "description"
      FROM "SCALE_CODE"
      ORDER BY "HASHTAG", "CODE"
    `;

    const hashtags = rows.map((item) => ({
      hashtag: String(item.hashtag),
      code: String(item.code),
      description: String(item.description),
    }));

    return Response.json({ hashtags });
  } catch (error) {
    console.error("API /test/hashtags GET 에러:", error);
    return Response.json(
      { error: "해시태그 조회 실패", details: String(error) },
      { status: 500 },
    );
  }
}
