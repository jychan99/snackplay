import { sql } from "@/lib/db";

export async function GET() {
  try {
    const users = await sql`
      SELECT "ID" as id, "PASSWORD" as password, "NICKNAME" as nickname
      FROM "USER_MAIN"
      ORDER BY "ID" DESC
    `;

    return Response.json(users);
  } catch (error) {
    console.error("API /users GET 에러:", error);
    return Response.json(
      { error: "DB 조회 실패", details: String(error) },
      { status: 500 },
    );
  }
}
