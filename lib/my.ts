import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import { getUserIdFromToken } from "@/lib/auth";
import type { TEST_MAIN } from "@/types/index";

const emptyMyInfo = {
  myTests: [] as TEST_MAIN[],
  myTestResults: [] as TEST_MAIN[],
  likedTests: [] as TEST_MAIN[],
};

async function getAuthUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;
  return token ? getUserIdFromToken(token) : "";
}

// 유저정보
export async function getMyInfo() {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      return emptyMyInfo;
    }

    const myTests = (await sql`
      SELECT "TEST_ID" as "testId"
          , "USER_ID" as "userId"
          , "TEST_TITLE" as "testTitle"
          , "TEST_INFO" as "testInfo"
          , "HASHTAG" as "hashtag"
          , "LIKE" as "like"
      FROM "TEST_MAIN"
      WHERE "USER_ID" = ${userId}
    `) as TEST_MAIN[];

    const myTestResults = (await sql`
      SELECT A."TEST_ID"as "testId"
          , A."USER_ID" as "userId"
          , A."TEST_TITLE"  as "testTitle"
          , B."RESULT_ID" as "resultId"
      FROM "TEST_MAIN" A
      JOIN "TEST_RESULT" B
        ON A."TEST_ID" = B."TEST_ID"
      WHERE B."USER_ID" = ${userId}
    `) as TEST_MAIN[];

    const likedTests = (await sql`
      SELECT A."TEST_ID" as "testId"
          , A."USER_ID" as "userId"
          , A."TEST_TITLE" as "testTitle"
      FROM "TEST_MAIN" A
      JOIN "TEST_LIKE" B
        ON A."TEST_ID" = B."TEST_ID"
      WHERE B."USER_ID" = ${userId}
    `) as TEST_MAIN[];

    return { myTests, myTestResults, likedTests };
  } catch (err: unknown) {
    console.log(err instanceof Error ? err.message : "네트워크 오류");
    return emptyMyInfo;
  }
}

// 유저 변경
export async function modifyMyInfo() {}

// 내가 만든 테스트
export async function getMyTest(): Promise<TEST_MAIN[]> {
  try {
    const userId = await getAuthUserId();

    return (await sql`
      SELECT "TEST_ID" as "testId"
            , "TEST_TITLE" as "testTitle"
            , "TEST_INFO" as "testInfo"
            , "HASHTAG" as "hashtag"
            , "IMAGE_URL" as "imageUrl"
            , "LIKE" as "like"
      FROM "TEST_MAIN"
      WHERE "USER_ID" = ${userId}
      ORDER BY "TEST_ID" DESC
    `) as TEST_MAIN[];
  } catch (error) {
    console.error("getTests 에러:", error);
    return [];
  }
}

// 내가 진행한 테스트
export async function getPlayedTest() {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      return { myTestResults: [] as TEST_MAIN[] };
    }

    const myTestResults = (await sql`
      SELECT A."TEST_ID"as "testId"
          , A."USER_ID" as "userId"
          , A."TEST_TITLE"  as "testTitle"
          , A."IMAGE_URL" as "imageUrl"
          , B."RESULT_ID" as "resultId"
          , (SELECT COUNT("TEST_ID")
            FROM "TEST_LIKE"
            WHERE "TEST_ID" = A."TEST_ID") as "like"
      FROM "TEST_MAIN" A
      JOIN "TEST_RESULT" B
        ON A."TEST_ID" = B."TEST_ID"
      WHERE B."USER_ID" = ${userId}
    `) as TEST_MAIN[];

    return { myTestResults };
  } catch (error) {
    console.error("getTests 에러:", error);
    return { myTestResults: [] as TEST_MAIN[] };
  }
}

// 내가 좋아요한 테스트
export async function getLikedTest() {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      return { likedTests: [] as TEST_MAIN[] };
    }

    const likedTests = (await sql`
      SELECT A."TEST_ID" as "testId"
          , A."USER_ID" as "userId"
          , A."TEST_TITLE" as "testTitle"
          , A."IMAGE_URL" as "imageUrl"
          , (SELECT COUNT("TEST_ID")
            FROM "TEST_LIKE"
            WHERE "TEST_ID" = A."TEST_ID") as "like"
      FROM "TEST_MAIN" A
      JOIN "TEST_LIKE" B
        ON A."TEST_ID" = B."TEST_ID"
      WHERE B."USER_ID" = ${userId}
    `) as TEST_MAIN[];

    return { likedTests };
  } catch (error) {
    console.error("getTests 에러:", error);
    return { likedTests: [] as TEST_MAIN[] };
  }
}
