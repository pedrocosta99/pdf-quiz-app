import { Question } from "@/types";
import { create } from "zustand";

const initialValue = {
  questionCount: 3,
  text: '',
  questions: [],
}

type MainStore = {
  text: string;
  setText: (pdf: string) => void;

  questionCount: number;
  setQuestionCount: (n: number) => void;

  questions: Question[];
  setQuestions: (q: Question[]) => void;

  updateQuestionText: (index: number, text: string) => void;
  updateAnswerText: (qindex: number, aIndex: number, value: string) => void;

  setAnswerIndex: (qIndex: number, answerIndex: number) => void;

  reset: () => void;
};

export const useStore = create<MainStore>((set) => ({
  text: initialValue.text,
  setText: (pdf) => set({ text: pdf }),

  questionCount: initialValue.questionCount,
  setQuestionCount: (n) => set({ questionCount: n }),

  questions: initialValue.questions,
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

  setAnswerIndex: (qIndex, userAnswerIndex) =>
    set((state) => {
      const updated = [...state.questions];
      updated[qIndex] = {
        ...updated[qIndex],
        userAnswerIndex,
      };
      return { questions: updated };
    }),

    reset: () => set(initialValue),
}));
