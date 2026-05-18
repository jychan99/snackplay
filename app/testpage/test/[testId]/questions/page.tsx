"use client";

import type { TEST_CONTENT } from "@/types/index";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type QuestionForm = {
  id: string;
  question: string;
  answer1: string;
  answer1Scale: string;
  answer2: string;
  answer2Scale: string;
  answer3: string;
  answer3Scale: string;
  answer4: string;
  answer4Scale: string;
};

type QuestionField = keyof Omit<QuestionForm, "id">;

const answerNumbers = [1, 2, 3, 4] as const;

function createBlankQuestion(): QuestionForm {
  return {
    id: crypto.randomUUID(),
    question: "",
    answer1: "",
    answer1Scale: "",
    answer2: "",
    answer2Scale: "",
    answer3: "",
    answer3Scale: "",
    answer4: "",
    answer4Scale: "",
  };
}

function createQuestionFromContent(content: TEST_CONTENT): QuestionForm {
  return {
    id: String(content.contentId || crypto.randomUUID()),
    question: content.question || "",
    answer1: content.answer1 || "",
    answer1Scale: content.answer1Scale || "",
    answer2: content.answer2 || "",
    answer2Scale: content.answer2Scale || "",
    answer3: content.answer3 || "",
    answer3Scale: content.answer3Scale || "",
    answer4: content.answer4 || "",
    answer4Scale: content.answer4Scale || "",
  };
}

export default function Page() {
  const params = useParams<{ testId: string }>();
  const parsedTestId = Number(params.testId);
  const [questions, setQuestions] = useState<QuestionForm[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!parsedTestId) {
      return;
    }

    const fetchQuestions = async () => {
      const response = await fetch(`/api/test/questions?testId=${parsedTestId}`);

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      const contents = (data.questions || []) as TEST_CONTENT[];
      const nextQuestions = contents.map(createQuestionFromContent);

      setQuestions(nextQuestions.length > 0 ? nextQuestions : [createBlankQuestion()]);
    };

    fetchQuestions();
  }, [parsedTestId]);

  const addQuestion = () => {
    setQuestions((currentQuestions) => [
      ...currentQuestions,
      createBlankQuestion(),
    ]);
  };

  const deleteQuestion = (id: string) => {
    setQuestions((currentQuestions) => {
      const nextQuestions = currentQuestions.filter((item) => item.id !== id);
      return nextQuestions.length > 0 ? nextQuestions : [createBlankQuestion()];
    });
  };

  const moveQuestion = (index: number, direction: "left" | "right") => {
    setQuestions((currentQuestions) => {
      const targetIndex = direction === "left" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= currentQuestions.length) {
        return currentQuestions;
      }

      const nextQuestions = [...currentQuestions];
      const currentQuestion = nextQuestions[index];
      nextQuestions[index] = nextQuestions[targetIndex];
      nextQuestions[targetIndex] = currentQuestion;

      return nextQuestions;
    });
  };

  const updateQuestion = (
    id: string,
    field: QuestionField,
    value: string,
  ) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const saveQuestions = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!parsedTestId) {
      return;
    }

    setIsSaving(true);

    try {
      await fetch("/api/test/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testId: parsedTestId,
          questionCount: questions.length,
          questions: questions.map((item) => ({
            question: item.question,
            answer1: item.answer1,
            answer1Scale: item.answer1Scale,
            answer2: item.answer2,
            answer2Scale: item.answer2Scale,
            answer3: item.answer3,
            answer3Scale: item.answer3Scale,
            answer4: item.answer4,
            answer4Scale: item.answer4Scale,
          })),
        }),
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
        테스트 질문 편집
      </h1>
      <form onSubmit={saveQuestions} className="space-y-8">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {questions.map((content, index) => {
            const number = index + 1;

            return (
              <section
                key={content.id}
                className="relative min-w-[320px] rounded-md bg-zinc-100 p-4 dark:bg-zinc-800"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h2 className="font-semibold">질문 {number}</h2>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveQuestion(index, "left")}
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    >
                      {"\u2190"}
                    </button>
                    <button
                      type="button"
                      onClick={() => moveQuestion(index, "right")}
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    >
                      {"\u2192"}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteQuestion(content.id)}
                      className="rounded border border-red-300 px-2 py-1 text-sm text-red-600"
                    >
                      X
                    </button>
                  </div>
                </div>
                <input
                  name={`question-${number}`}
                  value={content.question}
                  onChange={(event) =>
                    updateQuestion(content.id, "question", event.target.value)
                  }
                  placeholder="질문"
                  className="mb-3 w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {answerNumbers.map((answerNumber) => {
                  const answerField = `answer${answerNumber}` as QuestionField;
                  const scaleField =
                    `answer${answerNumber}Scale` as QuestionField;

                  return (
                    <div
                      key={answerNumber}
                      className="mb-2 grid grid-cols-[1fr_120px] gap-2"
                    >
                      <input
                        name={`answer${answerNumber}-${number}`}
                        value={content[answerField]}
                        onChange={(event) =>
                          updateQuestion(
                            content.id,
                            answerField,
                            event.target.value,
                          )
                        }
                        placeholder={`답변 ${answerNumber}`}
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                      <input
                        name={`answer${answerNumber}Scale-${number}`}
                        value={content[scaleField]}
                        onChange={(event) =>
                          updateQuestion(
                            content.id,
                            scaleField,
                            event.target.value,
                          )
                        }
                        placeholder="scale"
                        className="rounded-md border border-gray-300 px-3 py-2"
                      />
                    </div>
                  );
                })}
              </section>
            );
          })}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addQuestion}
            className="rounded-md bg-zinc-700 px-4 py-2 text-white hover:bg-zinc-800"
          >
            + 질문 추가
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isSaving ? "저장 중" : "저장"}
          </button>
        </div>
      </form>
    </main>
  );
}
