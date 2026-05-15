export interface USER_MAIN {
  id: string;
  password: string;
  nickname: string;
  role: string;
}

export interface TEST_MAIN{
  testId: number;
  testTitle: string;
  testInfo: string;
  hashtag: string;
  like: number;
}

export interface TEST_CONTENT{
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

export interface TEST_RESULT{
  resultId: number;
  testId: number;
  id:string;
  result: string;
  resultDetail: string;
  testingAt: Date;
}

export interface TEST_LIKE{
  TEST_ID: number;
  USER_ID: string;
}

export interface SCALE_CODE{
  codeId: number;
  hashtag: string;
  code: string;
  description: string;
}
