import { sql } from "@/lib/db";

export async function GET() {
  try {
    const hashtags = await sql`
      SELECT DISTINCT "HASHTAG" as "hashtag"
      FROM "SCALE_CODE"
      ORDER BY "HASHTAG"
    `;

    const scales = await sql`
      SELECT DISTINCT "SCALE" as "scale"
      FROM "SCALE_CODE"
      ORDER BY "SCALE"
    `;

    return Response.json({ hashtags, scales });
  } catch (error) {
    console.error("API /test/hashtags GET 에러:", error);
    return Response.json(
      { error: "해시태그 조회 실패", details: String(error) },
      { status: 500 },
    );
  }
}
