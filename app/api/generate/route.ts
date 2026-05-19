import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    //const { title, keywords, length } = body ?? {};

    //localhostdata를 바탕으로 결과를 해석하는 프롬프트를 생성합니다.

    // if (!title && !keywords) {
    //   return new Response(
    //     JSON.stringify({ error: "title 또는 keywords 중 하나는 필요합니다." }),
    //     { status: 400, headers: { "Content-Type": "application/json" } },
    //   );
    // }

    const apiKey = process.env.GENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "서버에 GENAI_API_KEY가 설정되어 있지 않습니다.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemInstructionPrompt = `로컬호스트에 쌓인 결과를바탕으로 결과를 해석한다.`; // 프롬프트에 사용자가 선택한 옵션들을 포함합니다.
    const prompt = `로컬호스트에 쌓인 결과를바탕으로 결과를 해석해줘`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    let text = "";
    if (response && typeof response.text === "function") {
      text = await response.text();
    } else {
      text = String(response ?? "");
    }

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
