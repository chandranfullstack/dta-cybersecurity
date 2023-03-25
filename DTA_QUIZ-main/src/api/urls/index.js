export const APP_LOGIN = "api/auth/login/";

export const GET_QUIZ_LIST = "/quiz/allquiz";

export const ADMIN_LOGIN="/api/admin/quiz/all/meta"

export const GET_QUESTION_AND_GROUP = (quizID) =>
  `/quizgroup/allquizgroup?quizid=${quizID}`;

export const SAVE_QUESTION_ANSWER = "/answer/createquizanswer";

export const GET_RESULT_LIST = (quizID) => `/all/result?quizid=${quizID}`;

export const GET_QUESTION_ANSWER = (questionID, optionID, answerId) =>
  `/answer/allquizanswer?questionid=${questionID}&option=${optionID}&answerid=${answerId}`;
