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

// 테스트 진행 데이터
export interface TestInfo {
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

export interface TestContent {
  contentId: number;
  testId: number;
  testNumbering: number;
  question: string;
  answer: TestAnswer[];
}

export interface TEST_DETAIL_RESPONSE {
  testInfo: TestInfo[];
  testContent: TestContent[];
}
