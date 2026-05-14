import type { TEST_CONTENT } from "@/types/index";
import { headers } from "next/headers";

interface PageProps {
  params: Promise<{ testId: string }>;
}

async function getTestContents(testId: number) {
  const baseUrl = await getBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/test/questions?testId=${testId}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return data.questions as TEST_CONTENT[];
}

async function getBaseUrl() {
  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") || "http";

  return `${protocol}://${host}`;
}

export async function saveTestContents(formData: FormData) {
  "use server";

  const baseUrl = await getBaseUrl();
  const testId = Number(formData.get("testId"));
  const questionCount = Math.max(Number(formData.get("questionCount")) || 1, 1);

  if (!testId) {
    return;
  }

  const questions = Array.from({ length: questionCount }, (_, index) => {
    const number = index + 1;

    return {
      question: String(formData.get(`question-${number}`) || "").trim(),
      answer1: String(formData.get(`answer1-${number}`) || ""),
      answer1Scale: String(formData.get(`answer1Scale-${number}`) || ""),
      answer2: String(formData.get(`answer2-${number}`) || ""),
      answer2Scale: String(formData.get(`answer2Scale-${number}`) || ""),
      answer3: String(formData.get(`answer3-${number}`) || ""),
      answer3Scale: String(formData.get(`answer3Scale-${number}`) || ""),
      answer4: String(formData.get(`answer4-${number}`) || ""),
      answer4Scale: String(formData.get(`answer4Scale-${number}`) || ""),
    };
  });

  await fetch(`${baseUrl}/api/test/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ testId, questionCount, questions }),
  });
}

function getContentValue(
  content: TEST_CONTENT | undefined,
  key: keyof TEST_CONTENT,
) {
  return content?.[key]?.toString() || "";
}

export default async function Page({ params }: PageProps) {
  const { testId } = await params;
  const parsedTestId = Number(testId);
  const contents = await getTestContents(parsedTestId);
  const initialQuestionCount = Math.max(contents.length, 1);

  return (
    <main className="mx-auto w-full max-w-3xl py-12 px-6">
      <h1 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
        테스트 질문 편집
      </h1>
      <form action={saveTestContents} className="space-y-8">
        <input type="hidden" name="testId" value={parsedTestId} />
        <input
          id="question-count"
          type="hidden"
          name="questionCount"
          value={initialQuestionCount}
        />
        <div id="question-list" className="space-y-8">
          {Array.from({ length: initialQuestionCount }, (_, index) => {
            const number = index + 1;
            const content = contents.find(
              (item) => item.testNumbering === number,
            );

            return (
              <section
                key={number}
                className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-800"
              >
                <h2 className="mb-3 font-semibold">질문 {number}</h2>
                <input
                  name={`question-${number}`}
                  defaultValue={content?.question || ""}
                  placeholder="질문"
                  className="mb-3 w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {[1, 2, 3, 4].map((answerNumber) => (
                  <div
                    key={answerNumber}
                    className="mb-2 grid grid-cols-[1fr_120px] gap-2"
                  >
                    <input
                      name={`answer${answerNumber}-${number}`}
                      defaultValue={getContentValue(
                        content,
                        `answer${answerNumber}` as keyof TEST_CONTENT,
                      )}
                      placeholder={`답변 ${answerNumber}`}
                      className="rounded-md border border-gray-300 px-3 py-2"
                    />
                    <input
                      name={`answer${answerNumber}Scale-${number}`}
                      defaultValue={getContentValue(
                        content,
                        `answer${answerNumber}Scale` as keyof TEST_CONTENT,
                      )}
                      placeholder="scale"
                      className="rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                ))}
              </section>
            );
          })}
        </div>
        <button
          id="add-question-button"
          type="button"
          className="rounded-md bg-zinc-700 px-4 py-2 text-white hover:bg-zinc-800"
        >
          + 질문 추가
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          저장
        </button>
      </form>
    </main>
  );
}
