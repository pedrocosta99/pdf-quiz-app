import { create } from 'zustand';

type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
};

type MainStore = {
  text: string;
  setText: (pdf: string) => void;

  questionCount: number;
  setQuestionCount: (n: number) => void;

  questions: QuizQuestion[];
  setQuestions: (q: QuizQuestion[]) => void;

  updateQuestionText: (index: number, text: string) => void;
  updateAnswerText: (qindex: number, aIndex: number, value: string) => void;

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

  updateQuestionText: (index, text) =>
    set((state) => {
      const updated = [...state.questions];
      updated[index] = { ...updated[index], question: text };
      return { questions: updated };
    }),

  updateAnswerText: (qIndex, aIndex, value) =>
    set((state) => {
      const updated = [...state.questions];
      const newAnswers = [...updated[qIndex].options];
      newAnswers[aIndex] = value;
      updated[qIndex] = { ...updated[qIndex], options: newAnswers };
      return { questions: updated };
    }),

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
