import { getIsLoggedIn } from "./auth";
import { sql } from "@/lib/db";

// 테스트 목록 조회 (/api/test/list와 동일한 쿼리)
async function fetchTestList() {
  return sql`
    SELECT "TEST_ID" as "testId"
          , "TEST_TITLE" as "testTitle"
          , "TEST_INFO" as "testInfo"
          , "HASHTAG" as "hashtag"
          , "LIKE" as "like"
    FROM "TEST_MAIN"
    ORDER BY "TEST_ID" DESC
  `;
}

// 전체 테스트
export async function getAllTest() {
  try {
    return await fetchTestList();
  } catch (err: unknown) {
    console.log(err instanceof Error ? err.message : "네트워크 오류");
  }
}

// 메인 인기 테스트
export async function getPopularTest() {
  try {
    // 내림차순, likes 숫자 큰 순서대로 (백엔드에서 해야하나...)
    return await fetchTestList();
  } catch (err: unknown) {
    console.log(err instanceof Error ? err.message : "네트워크 오류");
  }
}

// 테스트 상세 데이터
export async function getDetailTest(id: number) {
  let data;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/test/info?testId=${id}`,
      {
        next: { revalidate: 60 }, //isr
      },
    );
    data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "테스트 불러오기 실패");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("네트워크 오류");
    }
  }

  return data;
}

// 테스트 제출
export async function saveDetailTest() {
  let data;
  try {
    const testResult = JSON.parse(localStorage.getItem("test-result") ?? "{}");
    const testId = testResult.testId;

    if (!testResult.testId) {
      throw new Error("저장된 테스트 결과가 없습니다.");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ testId, testResult }),
      },
    );
    data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "테스트 제출 실패");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("네트워크 오류");
    }
  }
  return data;
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
