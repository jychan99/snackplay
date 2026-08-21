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
