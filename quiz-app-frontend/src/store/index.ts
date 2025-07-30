import { create } from 'zustand';

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

type MainStore = {
  text: string;
  setText: (pdf: string) => void;

  questionCount: number;
  setQuestionCount: (n: number) => void;

  questions: QuizQuestion[];
  setQuestions: (q: QuizQuestion[]) => void;

  answers: Record<number, string>;
  setAnswer: (index: number, value: string) => void;

  reset: () => void;
};

export const useStore = create<MainStore>((set) => ({
  text: '',
  setText: (pdf) => set({ text: pdf }),

  questionCount: 10,
  setQuestionCount: (n) => set({ questionCount: n }),

  questions: [],
  setQuestions: (q) => set({ questions: q }),

  answers: {},
  setAnswer: (index, value) =>
    set((state) => ({
      answers: { ...state.answers, [index]: value },
    })),

  reset: () =>
    set({
      text: '',
      questions: [],
      answers: {},
    }),
}));
