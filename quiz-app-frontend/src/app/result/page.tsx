'use client';

import { useStore } from "@/store";

export default function ResultPage() {
  const questions = useStore((s) => s.questions);

  const correctCount = questions.filter(
    (q) => q.answerIndex === q.correctIndex
  ).length;

  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);

  let message = '';
  if (percentage >= 90) message = 'Excellent job!';
  else if (percentage >= 70) message = 'Great work!';
  else if (percentage >= 50) message = 'Good effort!';
  else message = 'Keep practicing, you’ll get there!';

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

       <div className="w-full max-w-2xl mt-10 space-y-6">
        {questions.map((q, i) => {
          const userIndex = q.answerIndex;
          const correctIndex = q.correctIndex;
          const userAnswer = typeof userIndex === 'number' ? q.options[userIndex] : null;
          const correctAnswer = q.options[correctIndex];
          const isCorrect = userIndex === correctIndex;

          return (
            <div
              key={i}
              className="bg-white border rounded-lg p-4 shadow-sm space-y-3"
            >
              <p className="font-semibold text-gray-800">
                {i + 1}. {q.question}
              </p>

              <ul className="space-y-1">
                <li className="text-green-700 font-semibold">
                  ✅ Correct Answer: {correctAnswer}
                </li>

                {!isCorrect && userAnswer && (
                  <li className="text-red-600">
                    ❌ Your Answer: {userAnswer}
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </main>
  );
}
