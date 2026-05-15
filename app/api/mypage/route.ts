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

//마이페이지 유저 정보 조회
export async function GET(request: Request) {
  const token = getCookieValue(request.headers.get("cookie"), "authToken");
  const userId = token ? getUserIdFromToken(token) : "";

  try {
    //내가 만든 테스트 목록
    const myTests = await sql`
      SELECT "TEST_ID"
          , "USER_ID"
          , "TEST_TITLE"
          , "TEST_INFO"
          , "HASHTAG"
          , "LIKE"
      FROM "TEST_MAIN"
      WHERE "USER_ID" = ${userId}
    `

    //내가 시행한 테스트 목록
    const myTestResults = await sql`
      SELECT A."TEST_ID"
          , A."USER_ID"
          , A."TEST_TITLE"
      FROM "TEST_MAIN" A
      JOIN "TEST_RESULT" B
        ON A."TEST_ID" = B."TEST_ID"
      WHERE B."USER_ID" = ${userId}
    `
    //내가 좋아요한 테스트 목록
    const likedTests = await sql`
      SELECT A."TEST_ID"
          , A."USER_ID"
          , A."TEST_TITLE"
      FROM "TEST_MAIN" A
      JOIN "TEST_LIKE" B
        ON A."TEST_ID" = B."TEST_ID"
      WHERE B."USER_ID" = ${userId}
    `
        
    return Response.json({ myTests, myTestResults, likedTests });
  } catch (error) {
    console.error("API /users GET 에러:", error);
    return Response.json(
      { error: "DB 조회 실패", details: String(error) },
      { status: 500 },
    );
  }
}
