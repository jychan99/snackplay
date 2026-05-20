// import { getBaseUrl } from "./base";

// 전체 테스트
export async function getAllTest() {
  let data;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/test/list`,
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

// 메인 인기 테스트 ////////////////작업필요
export async function getPopularTest() {
  let data;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/test/list`,
    );
    data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "인기 테스트 불러오기 실패");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("네트워크 오류");
    }
  }
  // 내림차순, likes 숫자 큰 순서대로 (백엔드에서 해야하나...)
  return data;
}

// 내가 진행한 테스트
export async function getMyTestData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/test/list/mytestlist`,
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message || "데이터 가져오기 실패");
    }
    return data;
  } catch (error) {
    console.error("getTests 에러:", error);
  }
}
// 내가 만든 테스트

// 내가 좋아요한 테스트

// 테스트 상세 데이터
export async function getDetailTest(id: number) {
  let data;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/test/info?testId=${id}`,
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
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({testId,testResult}),
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
