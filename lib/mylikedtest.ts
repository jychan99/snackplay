import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { getUserIdFromToken } from "@/lib/auth";

export async function myLikedTest() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;
    const userId = authToken ? getUserIdFromToken(authToken) : "";

    if (!userId) {
      return { error: "로그인이 필요합니다." };
    }

    const likedTests = await sql`
      SELECT "TEST_ID" as "testId"
      FROM "TEST_LIKE"
      WHERE "USER_ID" = ${userId}
    `;

    return { likedTests };
  } catch (error) {
    console.error("getTests 에러:", error);
  }
}
