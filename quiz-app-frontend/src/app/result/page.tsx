"use client";

import { ResultsReview } from "@/components/ResultsReview";
import { useStore } from "@/store";

export default function ResultPage() {
  const { questions } = useStore();

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
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 text-center space-y-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-blue-700">Quiz Result</h1>

        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-4 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-xl font-semibold text-gray-800">
          You got {correctCount} out of {total} questions right!
        </p>

        <p className="text-gray-600 text-lg">{message}</p>
      </div>

      <ResultsReview questions={questions} />
    </main>
  );
}
