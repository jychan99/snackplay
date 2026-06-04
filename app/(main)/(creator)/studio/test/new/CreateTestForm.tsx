"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import BaseLink from "@/components/ui/BaseLink";
import Input from "@/components/ui/Input";
import ArrowIcon2 from "@/components/icon/ArrowIcon2";

type QuestionForm = {
  question: string;
  answers: AnswerForm[];
};

type HashtagOption = {
  hashtag: string;
  code: string;
  description: string;
};

type AnswerForm = {
  content: string;
  scale: string;
};

const createAnswer = (): AnswerForm => ({
  content: "",
  scale: "",
});

const createQuestion = (): QuestionForm => ({
  question: "",
  answers: [createAnswer(), createAnswer()],
});

export default function EditTestForm() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testTitle, setTestTitle] = useState("");
  const [testInfo, setTestInfo] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [hashtagOptions, setHashtagOptions] = useState<HashtagOption[]>([]);
  const [questions, setQuestions] = useState<QuestionForm[]>([
    createQuestion(),
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const slideCount = questions.length + 1;
  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < slideCount - 1;
  const currentQuestion = questions[currentSlide - 1];
  const isInfoSlide = currentSlide === 0;
  const uniqueHashtags = Array.from(
    new Set(hashtagOptions.map((item) => item.hashtag)),
  );
  const scaleOptions = hashtagOptions.filter(
    (item) => item.hashtag === hashtag,
  );

  useEffect(() => {
    const loadHashtags = async () => {
      try {
        const res = await fetch("/api/test/hashtags");
        const data = await res.json();

        if (res.ok) {
          setHashtagOptions(data.hashtags || []);
        }
      } catch (error) {
        console.error("해시태그 목록 조회 실패:", error);
      }
    };

    loadHashtags();
  }, []);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, createQuestion()]);
    setCurrentSlide(questions.length + 1);
  };

  const updateHashtag = (value: string) => {
    setHashtag(value);
    setQuestions((prev) =>
      prev.map((question) => ({
        ...question,
        answers: question.answers.map((answer) => ({
          ...answer,
          scale: "",
        })),
      })),
    );
  };

  const updateQuestion = (questionIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((item, index) =>
        index === questionIndex ? { ...item, question: value } : item,
      ),
    );
  };

  const updateAnswerContent = (
    questionIndex: number,
    answerIndex: number,
    value: string,
  ) => {
    setQuestions((prev) =>
      prev.map((item, index) =>
        index === questionIndex
          ? {
              ...item,
              answers: item.answers.map((answer, targetIndex) =>
                targetIndex === answerIndex
                  ? { ...answer, content: value }
                  : answer,
              ),
            }
          : item,
      ),
    );
  };

  const updateAnswerScale = (
    questionIndex: number,
    answerIndex: number,
    value: string,
  ) => {
    setQuestions((prev) =>
      prev.map((item, index) =>
        index === questionIndex
          ? {
              ...item,
              answers: item.answers.map((answer, targetIndex) =>
                targetIndex === answerIndex
                  ? { ...answer, scale: value }
                  : answer,
              ),
            }
          : item,
      ),
    );
  };

  const addAnswer = (questionIndex: number) => {
    setQuestions((prev) =>
      prev.map((item, index) =>
        index === questionIndex && item.answers.length < 4
          ? { ...item, answers: [...item.answers, createAnswer()] }
          : item,
      ),
    );
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    if (answerIndex < 2) {
      return;
    }

    setQuestions((prev) =>
      prev.map((item, index) =>
        index === questionIndex
          ? {
              ...item,
              answers: item.answers.filter(
                (_, targetIndex) => targetIndex !== answerIndex,
              ),
            }
          : item,
      ),
    );
  };

  const saveTest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/test/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testTitle,
          testInfo,
          hashtag,
          questions: questions.map((item, index) => ({
            testNumbering: index + 1,
            question: item.question,
            answer1: item.answers[0]?.content || "",
            answer1Scale: item.answers[0]?.scale || "",
            answer2: item.answers[1]?.content || "",
            answer2Scale: item.answers[1]?.scale || "",
            answer3: item.answers[2]?.content || "",
            answer3Scale: item.answers[2]?.scale || "",
            answer4: item.answers[3]?.content || "",
            answer4Scale: item.answers[3]?.scale || "",
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "저장에 실패했습니다.");
      }

      alert("저장되었습니다.");
    } catch (error) {
      alert(error instanceof Error ? error.message : "저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={saveTest} className="relative flex items-start gap-4">
      <button
        type="button"
        disabled={!canGoPrev}
        onClick={() => setCurrentSlide((prev) => prev - 1)}
        className="hidden sm:flex mt-56 h-12 w-12 shrink-0 items-center justify-center rounded-button border border-border-sub text-text-sub disabled:opacity-30"
      >
        <ArrowIcon2 className="rotate-180" size={14} />
      </button>

      <section className="box-custom mx-auto min-h-[560px]">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <BaseLink href="/studio/test" variant="outline" size="sm">
            돌아가기
          </BaseLink>
          <div className="flex gap-3 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addQuestion}
            >
              질문 추가
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSaving}
            >
              {isSaving ? "저장 중" : "저장하기"}
            </Button>
          </div>
        </div>

        <div className="transition-all duration-300 ease-out">
          {isInfoSlide ? (
            <>
              <div className="text-center">
                <p className="text-caption text-primary mb-1">테스트 만들기</p>
                <h2 className="text-h4 mb-10">새 테스트 편집</h2>
                <div className="w-full h-50 relative mb-10 overflow-hidden rounded-box">
                  <Image
                    src="/images/image_banner.png"
                    alt=""
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="grid gap-5">
                <Input
                  className="max-w-full"
                  label="테스트 제목"
                  id="test_title"
                  type="text"
                  value={testTitle}
                  onChange={(event) => setTestTitle(event.target.value)}
                  placeholder="테스트 제목을 입력해주세요"
                />
                <div>
                  <label htmlFor="test_info">테스트 설명</label>
                  <textarea
                    id="test_info"
                    value={testInfo}
                    onChange={(event) => setTestInfo(event.target.value)}
                    className="mt-2 w-full min-h-32 rounded-input border border-border-main bg-white py-[12px] px-[25px] text-body-m"
                    placeholder="테스트 설명을 입력해주세요"
                  />
                </div>
                <div>
                  <label htmlFor="test_hashtag">해시태그</label>
                  <select
                    id="test_hashtag"
                    value={hashtag}
                    onChange={(event) => updateHashtag(event.target.value)}
                    className="mt-2 w-full max-w-full rounded-input border border-border-main bg-white py-[12px] px-[25px] text-body-m"
                  >
                    <option value="">해시태그를 선택해주세요</option>
                    {uniqueHashtags.map((item) => (
                      <option key={item} value={item}>
                        #{item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          ) : (
            <div>
              <p className="text-h4 text-primary mb-6">질문 {currentSlide}</p>
              <div>
                <label htmlFor={`question_${currentSlide}`}>질문</label>
                <textarea
                  id={`question_${currentSlide}`}
                  value={currentQuestion.question}
                  onChange={(event) =>
                    updateQuestion(currentSlide - 1, event.target.value)
                  }
                  className="mt-2 w-full min-h-32 rounded-input border border-border-main bg-white py-[12px] px-[25px] text-body-m"
                  placeholder="질문을 입력해주세요"
                />
              </div>
              <div className="grid gap-4 mt-5">
                {currentQuestion.answers.map((answer, answerIndex) => (
                  <div
                    key={answerIndex}
                    className="rounded-box border border-border-sub bg-background p-4"
                  >
                    <Input
                      className="max-w-full"
                      label={`답변 ${answerIndex + 1}`}
                      id={`answer_${currentSlide}_${answerIndex + 1}`}
                      type="text"
                      value={answer.content}
                      onChange={(event) =>
                        updateAnswerContent(
                          currentSlide - 1,
                          answerIndex,
                          event.target.value,
                        )
                      }
                      placeholder="답변을 입력해주세요"
                    />
                    <div className="mt-4">
                      <label
                        htmlFor={`answer_scale_${currentSlide}_${answerIndex + 1}`}
                      >
                        SCALE
                      </label>
                      <select
                        id={`answer_scale_${currentSlide}_${answerIndex + 1}`}
                        value={answer.scale}
                        onChange={(event) =>
                          updateAnswerScale(
                            currentSlide - 1,
                            answerIndex,
                            event.target.value,
                          )
                        }
                        disabled={!hashtag}
                        className="mt-2 w-full rounded-input border border-border-main bg-white py-[12px] px-[25px] text-body-m disabled:bg-neutral-200 disabled:text-border-main"
                      >
                        <option value="">선택</option>
                        {scaleOptions.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.description}
                          </option>
                        ))}
                      </select>
                    </div>
                    {answerIndex >= 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          removeAnswer(currentSlide - 1, answerIndex)
                        }
                        className="mt-4"
                      >
                        삭제
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={currentQuestion.answers.length >= 4}
                  onClick={() => addAnswer(currentSlide - 1)}
                  className="justify-self-start"
                >
                  답변 추가
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <button
        type="button"
        disabled={!canGoNext}
        onClick={() => setCurrentSlide((prev) => prev + 1)}
        className="hidden sm:flex mt-56 h-12 w-12 shrink-0 items-center justify-center rounded-button border border-border-sub text-text-sub disabled:opacity-30"
      >
        <ArrowIcon2 size={14} />
      </button>
    </form>
  );
}
