import { cookies } from "next/headers";
import { sql } from "@/lib/db";

// authToken 쿠키에서 유저 ID 추출 ("{id}_..." 형태)
export function getUserIdFromToken(token: string) {
  return token.split("_")[0];
}

// 로그인 여부 체크
export async function getIsLoggedIn() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  return !!token;
}

// 유저 정보 가져오기
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  const userId = token ? getUserIdFromToken(token) : "";

  const users = await sql`
    SELECT "ID" as id, "NICKNAME" as nickname, "ROLE" as role
    FROM "USER_MAIN"
    WHERE "ID" = ${userId}
    ORDER BY "ID" DESC
  `;

  return users[0] || null;
}
