import { create } from 'zustand';

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

type AppStore = {
  text: string;
  setText: (pdf: string) => void;

  questions: QuizQuestion[];
  setQuestions: (q: QuizQuestion[]) => void;

  answers: Record<number, string>;
  setAnswer: (index: number, value: string) => void;

  reset: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  text: '',
  setText: (pdf) => set({ text: pdf }),

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
