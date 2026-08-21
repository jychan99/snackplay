"use server";

import { sql } from "@/lib/db";
import type { TEST_MAIN } from "@/types/index";

// 테스트 목록 조회 (/api/test/list와 동일한 쿼리)
async function fetchTestList(): Promise<TEST_MAIN[]> {
  return (await sql`
    SELECT "TEST_ID" as "testId"
          , "TEST_TITLE" as "testTitle"
          , "TEST_INFO" as "testInfo"
          , "HASHTAG" as "hashtag"
          , "LIKE" as "like"
    FROM "TEST_MAIN"
    ORDER BY "TEST_ID" DESC
  `) as TEST_MAIN[];
}

// 전체 테스트
export async function getAllTest(): Promise<TEST_MAIN[]> {
  try {
    return await fetchTestList();
  } catch (err: unknown) {
    console.log(err instanceof Error ? err.message : "네트워크 오류");
    return [];
  }
}

// 메인 인기 테스트
export async function getPopularTest(): Promise<TEST_MAIN[]> {
  try {
    // 내림차순, likes 숫자 큰 순서대로 (백엔드에서 해야하나...)
    return await fetchTestList();
  } catch (err: unknown) {
    console.log(err instanceof Error ? err.message : "네트워크 오류");
    return [];
  }
}

// 테스트 결과 데이터
export async function getResult(id: string) {
  try {
    const selectResult = await sql`
      SELECT A."TEST_ID" as testId
            , A."RESULT_ID" as resultId
            , A."USER_ID" as userId
            , B."TEST_TITLE" as testTitle
            , A."RESULT" as result
            , A."RESULT_DETAIL" as resultDetail
        FROM "TEST_RESULT" A
        JOIN "TEST_MAIN" B
        ON A."TEST_ID" = B."TEST_ID"
        WHERE "RESULT_ID" = ${Number(id)}
    `;
    return selectResult[0];
  } catch (err: unknown) {
    console.log(err instanceof Error ? err.message : "네트워크 오류");
  }
}
