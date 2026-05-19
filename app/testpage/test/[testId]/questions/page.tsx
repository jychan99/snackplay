"use client";

import type { TEST_CONTENT } from "@/types/index";
import { Plus, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

type AnswerForm = {
  id: string;
  answer: string;
  scale: string;
};

type QuestionForm = {
  id: string;
  question: string;
  answers: AnswerForm[];
};

type SlideDirection = "left" | "right" | null;

const minAnswerCount = 2;
const maxAnswerCount = 4;

function createBlankAnswer(): AnswerForm {
  return {
    id: crypto.randomUUID(),
    answer: "",
    scale: "",
  };
}

function createBlankAnswers() {
  return Array.from({ length: minAnswerCount }, createBlankAnswer);
}

function createBlankQuestion(): QuestionForm {
  return {
    id: crypto.randomUUID(),
    question: "",
    answers: createBlankAnswers(),
  };
}

function createQuestionFromContent(content: TEST_CONTENT): QuestionForm {
  const answers = [
    { answer: content.answer1 || "", scale: content.answer1Scale || "" },
    { answer: content.answer2 || "", scale: content.answer2Scale || "" },
    { answer: content.answer3 || "", scale: content.answer3Scale || "" },
    { answer: content.answer4 || "", scale: content.answer4Scale || "" },
  ]
    .filter((item, index) => index < minAnswerCount || item.answer || item.scale)
    .map((item) => ({
      id: crypto.randomUUID(),
      answer: item.answer,
      scale: item.scale,
    }));

  return {
    id: String(content.contentId || crypto.randomUUID()),
    question: content.question || "",
    answers:
      answers.length >= minAnswerCount ? answers : createBlankAnswers(),
  };
}

export default function Page() {
  const params = useParams<{ testId: string }>();
  const parsedTestId = Number(params.testId);
  const [questions, setQuestions] = useState<QuestionForm[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null);
  const [isSaving, setIsSaving] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (!parsedTestId) {
      return;
    }

    const fetchQuestions = async () => {
      const response = await fetch(`/api/test/questions?testId=${parsedTestId}`);

      if (!response.ok) {
        setQuestions([createBlankQuestion()]);
        setCurrentQuestionIndex(0);
        return;
      }

      const data = await response.json();
      const questions = data.questions;
      const hashtags = data.hashtags;
      const scaleCodes = data.scaleCodes;
      const contents = (data.questions || []) as TEST_CONTENT[];
      const nextQuestions = contents.map(createQuestionFromContent);

      setQuestions(
        nextQuestions.length > 0 ? nextQuestions : [createBlankQuestion()],
      );
      setCurrentQuestionIndex(0);
    };

    fetchQuestions();
  }, [parsedTestId]);

  const addQuestion = () => {
    const newQuestion = createBlankQuestion();

    setSlideDirection("right");
    setQuestions((currentQuestions) => [...currentQuestions, newQuestion]);
    setCurrentQuestionIndex(questions.length);
  };

  const deleteQuestion = (id: string) => {
    setQuestions((currentQuestions) => {
      const nextQuestions = currentQuestions.filter((item) => item.id !== id);
      const safeQuestions =
        nextQuestions.length > 0 ? nextQuestions : [createBlankQuestion()];

      setSlideDirection("left");
      setCurrentQuestionIndex((currentIndex) =>
        Math.min(currentIndex, safeQuestions.length - 1),
      );

      return safeQuestions;
    });
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex === 0) {
      return;
    }

    setSlideDirection("left");
    setCurrentQuestionIndex((index) => Math.max(index - 1, 0));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex >= questions.length - 1) {
      return;
    }

    setSlideDirection("right");
    setCurrentQuestionIndex((index) =>
      Math.min(index + 1, questions.length - 1),
    );
  };

  const updateQuestion = (id: string, value: string) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((item) =>
        item.id === id ? { ...item, question: value } : item,
      ),
    );
  };

  const addAnswer = (questionId: string) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((item) =>
        item.id === questionId && item.answers.length < maxAnswerCount
          ? { ...item, answers: [...item.answers, createBlankAnswer()] }
          : item,
      ),
    );
  };

  const updateAnswer = (
    questionId: string,
    answerId: string,
    field: "answer" | "scale",
    value: string,
  ) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((item) =>
        item.id === questionId
          ? {
              ...item,
              answers: item.answers.map((answer) =>
                answer.id === answerId
                  ? { ...answer, [field]: value }
                  : answer,
              ),
            }
          : item,
      ),
    );
  };

  const deleteAnswer = (questionId: string, answerId: string) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((item) =>
        item.id === questionId && item.answers.length > minAnswerCount
          ? {
              ...item,
              answers: item.answers.filter((answer) => answer.id !== answerId),
            }
          : item,
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
            answer1: item.answers[0]?.answer || "",
            answer1Scale: item.answers[0]?.scale || "",
            answer2: item.answers[1]?.answer || "",
            answer2Scale: item.answers[1]?.scale || "",
            answer3: item.answers[2]?.answer || "",
            answer3Scale: item.answers[2]?.scale || "",
            answer4: item.answers[3]?.answer || "",
            answer4Scale: item.answers[3]?.scale || "",
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
        <div className="relative px-12">
          <button
            type="button"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-lg disabled:cursor-not-allowed disabled:opacity-30 dark:bg-zinc-900"
          >
            {"\u2190"}
          </button>
          <button
            type="button"
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex >= questions.length - 1}
            className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-lg disabled:cursor-not-allowed disabled:opacity-30 dark:bg-zinc-900"
          >
            {"\u2192"}
          </button>

          {currentQuestion ? (
            <section
              key={currentQuestion.id}
              className={`mx-auto min-h-[340px] max-w-2xl rounded-md bg-zinc-100 p-4 dark:bg-zinc-800 ${
                slideDirection === "left"
                  ? "animate-question-slide-from-left"
                  : ""
              } ${
                slideDirection === "right"
                  ? "animate-question-slide-from-right"
                  : ""
              }`}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="font-semibold">
                  질문 {currentQuestionIndex + 1} / {questions.length}
                </h2>
                {currentQuestionIndex > 0 ? (
                  <button
                    type="button"
                    onClick={() => deleteQuestion(currentQuestion.id)}
                    className="rounded border border-red-300 px-2 py-1 text-sm text-red-600"
                  >
                    X
                  </button>
                ) : null}
              </div>
              <input
                name={`question-${currentQuestionIndex + 1}`}
                value={currentQuestion.question}
                onChange={(event) =>
                  updateQuestion(currentQuestion.id, event.target.value)
                }
                placeholder="질문"
                className="mb-3 w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {currentQuestion.answers.map((answer, answerIndex) => (
                <div
                  key={answer.id}
                  className="mb-2 grid grid-cols-[1fr_120px_40px] gap-2"
                >
                  <input
                    name={`answer${answerIndex + 1}-${
                      currentQuestionIndex + 1
                    }`}
                    value={answer.answer}
                    onChange={(event) =>
                      updateAnswer(
                        currentQuestion.id,
                        answer.id,
                        "answer",
                        event.target.value,
                      )
                    }
                    placeholder={`답변 ${answerIndex + 1}`}
                    className="rounded-md border border-gray-300 px-3 py-2"
                  />
                  <input
                    name={`answer${answerIndex + 1}Scale-${
                      currentQuestionIndex + 1
                    }`}
                    value={answer.scale}
                    onChange={(event) =>
                      updateAnswer(
                        currentQuestion.id,
                        answer.id,
                        "scale",
                        event.target.value,
                      )
                    }
                    placeholder="scale"
                    className="rounded-md border border-gray-300 px-3 py-2"
                  />
                  {answerIndex >= minAnswerCount ? (
                    <button
                      type="button"
                      onClick={() =>
                        deleteAnswer(currentQuestion.id, answer.id)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-red-300 text-red-600"
                      aria-label={`답변 ${answerIndex + 1} 삭제`}
                    >
                      <Trash2 size={18} />
                    </button>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addAnswer(currentQuestion.id)}
                disabled={currentQuestion.answers.length >= maxAnswerCount}
                className="mt-3 flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Plus size={16} />
                답변 추가
              </button>
            </section>
          ) : null}
        </div>

        <div className="flex justify-center gap-2">
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
      <style jsx global>{`
        @keyframes question-slide-from-left {
          from {
            opacity: 0;
            transform: translateX(-36px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes question-slide-from-right {
          from {
            opacity: 0;
            transform: translateX(36px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-question-slide-from-left {
          animation: question-slide-from-left 180ms ease-out;
        }

        .animate-question-slide-from-right {
          animation: question-slide-from-right 180ms ease-out;
        }
      `}</style>
    </main>
  );
}
