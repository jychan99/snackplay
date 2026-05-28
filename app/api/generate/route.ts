import { sql } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

function getUserIdFromToken(token: string) {
  return token.split("_")[0];
}

function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) {
    return "";
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const targetCookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));

  return targetCookie ? decodeURIComponent(targetCookie.split("=")[1]) : "";
}

export async function POST(request: Request) {
  try {
    const { testId, testResult } = await request.json();
    const token = getCookieValue(request.headers.get("cookie"), "authToken");
    const userId = token ? getUserIdFromToken(token) : "";

    const apiKey = process.env.GENAI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "서버에 GENAI_API_KEY가 설정되어 있지 않습니다." },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

    const prompt = `
당신은 심리테스트 결과 분석 전문가입니다.
아래 사용자의 테스트 응답 데이터를 바탕으로 사용자에게 가장 어울리는 회사를 추천하세요.

반드시 JSON 형식만 응답하세요.
설명 문장, 마크다운 코드블록, 주석은 절대 포함하지 마세요.

응답 형식:
{
  "result": "최종 결과값",
  "resultDetail": "최종 결과가 나온 근거 설명"
}

result는 회사명을 작성해주세요 예) "result": "SK하이닉스"
resultDetail은 사용자의 응답, 선택지, scale 값을 근거로 왜 그 결과가 나왔는지 한국어로 200자 이내로 설명하세요 .

testId: ${testId}
userId: ${userId}
사용자 테스트 응답 데이터:
${JSON.stringify(testResult, null, 2)}
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    let parsedResult;
    try {
      parsedResult = JSON.parse(text);
    } catch {
      return Response.json(
        {
          error: "AI 응답을 JSON으로 해석하지 못했습니다.",
          rawText: text,
        },
        { status: 500 },
      );
    }

    // 결과기록
    const recordResult = await sql`
      INSERT INTO "TEST_RESULT" ("TEST_ID", "USER_ID", "RESULT", "RESULT_DETAIL")
      VALUES (${testId}, ${userId}, ${parsedResult.result}, ${parsedResult.resultDetail})
      RETURNING "TEST_ID" as "testId", "USER_ID" as "userId", "RESULT" as result, "RESULT_DETAIL" as "resultDetail", "RESULT_ID" as "resultId"
    `;

    return Response.json({
      result: parsedResult.result,
      resultDetail: parsedResult.resultDetail,
      resultId: recordResult[0].resultId,
    });
  } catch (err) {
    return Response.json(
      { error: String(err) },
      { status: 500 },
    );
  }
}
