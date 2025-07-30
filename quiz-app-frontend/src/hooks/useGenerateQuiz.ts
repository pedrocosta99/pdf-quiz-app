// hooks/useGenerateQuiz.ts
import { useMutation } from '@tanstack/react-query';
import { Question } from '@/types';

export function useGenerateQuiz() {
  return useMutation({
    mutationFn: async (text: string): Promise<Question[]> => {
    const res = await fetch('/api/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: text,
    });
    const data = await res.json();
    return data.questions;
    },
  });
}
