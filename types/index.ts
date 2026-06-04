export interface USER_MAIN {
  id: string;
  password: string;
  nickname: string;
  role: string;
}

export interface TEST_MAIN {
  testId: number;
  userId: string;
  testTitle: string;
  testInfo: string;
  hashtag: string;
  like: number;
  isLiked: boolean;
  resultId?: number;
}

export interface TEST_CONTENT {
  contentId: number;
  testId: number;
  testNumbering: number;
  question: string;
  answer1: string;
  answer1Scale: string;
  answer2: string;
  answer2Scale: string;
  answer3: string;
  answer3Scale: string;
  answer4: string;
  answer4Scale: string;
}

export interface TEST_RESULT {
  resultId: number;
  testId: number;
  id: string;
  result: string;
  resultDetail: string;
  testingAt: Date;
}

export interface TEST_LIKE {
  TEST_ID: number;
  USER_ID: string;
}

export interface SCALE_CODE {
  codeId: number;
  hashtag: string;
  code: string;
  description: string;
}

// 테스트 진행 데이터 > 정보
export interface TEST_INFO {
  testId: number;
  testTitle: string;
  testInfo: string;
  hashtag: string;
  like: number;
}

export interface TestAnswer {
  content: string;
  scale: string | null;
}

// 테스트 진행 데이터 > 질문 내용
export interface TEST_CONTENT {
  contentId: number;
  testId: number;
  testNumbering: number;
  question: string;
  answer: TestAnswer[];
}

export interface TEST_ANSWER_ALL {
  testNumbering: number;
  question: string;
  content: string;
  scale: string | null;
}
// 테스트 결과 제출 데이터
export interface TEST_RESULT {
  testId: number;
  answer: TEST_ANSWER_ALL[];
}
// 확인창 props
