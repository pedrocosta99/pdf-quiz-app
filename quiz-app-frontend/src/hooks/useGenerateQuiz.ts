// hooks/useGenerateQuiz.ts
import { useMutation } from '@tanstack/react-query';
import { Question } from '@/types';
import { mockQuestions } from '@/mock';

export function useGenerateQuiz() {
  return useMutation({
    mutationFn: async ({ text, questionCount }: { text: string; questionCount: number }): Promise<Question[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate a delay
    return mockQuestions; // For testing purposes, return mock questions
    const res = await fetch(`http://localhost:8000/generate-quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, questionCount }),
    });
    const data = await res.json();
    return data.questions;
    },
  });
}
