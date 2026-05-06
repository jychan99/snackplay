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

export interface GAME_T_ANSWERS{
answerIdPk:number
gameIdPk:number;
questionIdPk:number;
answerNumber:number;
answerContent1:string;
answerContent1Weight:number;
answerContent2:string;
answerContent2Weight:number;
answerContent3:string;
answerContent3Weight:number;
answerContent4:string;
answerContent4Weight:number;
}

export interface GAME_T_QUESTIONS{
questionIdPk:number;
gameIdPk:number;
questionTypeCode:string;
questionNumber:number;
questionContent:string;
questionWeight:number;
}

export interface T_WEIGHT_CODE{
  codeIdPk:number;
  gameHashtag:string;
  code:string;
  codeDescription:string;
}