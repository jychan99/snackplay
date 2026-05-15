import { sql } from "@/lib/db";

function getUserIdFromToken(token: string) {
  return token.split("_")[0];
}

function getCookieValue(cookieHeader:string | null, name:string){
  if(!cookieHeader){
    return "";
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const targetCookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));

  return targetCookie ? decodeURIComponent(targetCookie.split("=")[1]) : "";
}

//로그인 유저 정보 조회
export async function GET(request: Request) {
  const token = getCookieValue(request.headers.get("cookie"), "authToken");
  const userId = token ? getUserIdFromToken(token) : "";

  try {
    const users = await sql`
      SELECT "ID" as id, "NICKNAME" as nickname, "ROLE" as role
      FROM "USER_MAIN"
      WHERE "ID" = ${userId}
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
