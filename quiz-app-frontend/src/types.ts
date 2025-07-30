export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  answerIndex?: number;
};

export type QuizState = {
  text: string;
  questions: Question[];
  questionCount: number;
};
