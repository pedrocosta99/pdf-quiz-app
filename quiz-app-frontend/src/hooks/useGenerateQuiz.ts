// hooks/useGenerateQuiz.ts
import { useMutation } from "@tanstack/react-query";
import { Question } from "@/types";

export function useGenerateQuiz() {
  const apiUrl =
    process.env.NEXT_PUBLIC_QUIZ_API_URL || "http://localhost:8000";

  return useMutation({
    mutationFn: async ({
      text,
      questionCount,
    }: {
      text: string;
      questionCount: number;
    }): Promise<Question[]> => {
      const res = await fetch(`${apiUrl}/generate-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, questionCount }),
      });
      const data = await res.json();
      return data.questions;
    },
  });
}
