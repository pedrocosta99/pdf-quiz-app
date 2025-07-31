export type Question = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  userAnswerIndex?: number;
};

export type QuizState = {
  text: string;
  questions: Question[];
  questionCount: number;
};
