export interface USER_MAIN {
  id: string;
  passWord: string;
  nickName: string;
}

export interface GAME_MAIN {
  gameIdPk: number;
  gameTitle: string;
  gameTypecode: string;
  gameInfo: string;
  gameHashTag: string;
  gameTQuestions: string;
  gameTAnswers: string;
}
