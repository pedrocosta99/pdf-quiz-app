"use client";

import { ResultsReview } from "@/components/ResultsReview";
import { ResultSummary } from "@/components/ResultSummary";
import { useStore } from "@/store";

export default function ResultPage() {
  const { questions } = useStore();

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600 animate-pulse">Loading…</p>
      </div>
    );
  }

  const correctCount = questions.filter(
    (q) => q.userAnswerIndex === q.correctAnswerIndex,
  ).length;

  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);

  let message = "";
  if (percentage >= 90) message = "Excellent job!";
  else if (percentage >= 70) message = "Great work!";
  else if (percentage >= 50) message = "Good effort!";
  else message = "Keep practicing, you’ll get there!";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 flex flex-col items-center">
      <ResultSummary
        correctCount={correctCount}
        total={total}
        message={message}
      />

      <ResultsReview questions={questions} />
    </main>
  );
}
