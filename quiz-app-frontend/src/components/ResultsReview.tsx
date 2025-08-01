import { Question } from "@/types";

type ResultsReviewProps = {
  questions: Question[];
};

export function ResultsReview({ questions }: ResultsReviewProps) {
  return (
    <div className="w-full max-w-2xl mt-10 space-y-6">
      {questions.map((q, i) => {
        const userIndex = q.userAnswerIndex;
        const correctIndex = q.correctAnswerIndex;
        const userAnswer =
          typeof userIndex === "number" ? q.options[userIndex] : null;
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
                <li className="text-red-600">❌ Your Answer: {userAnswer}</li>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
