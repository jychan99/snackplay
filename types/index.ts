export interface USER_MAIN {
  id: string;
  password: string;
  nickname: string;
}

export interface GAME_MAIN {
  gameIdPk: number;
  gameTitle: string;
  gameTypeCode: string;
  gameInfo: string;
  gameHashtag: string;
  gameTQuestions: string;
  gameTAnswers: string;
}
