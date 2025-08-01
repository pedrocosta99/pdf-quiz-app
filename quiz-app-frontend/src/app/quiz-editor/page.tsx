"use client";

import { QuestionCard } from "@/components/QuestionCard";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import PurpleCurve from "@/assets/PurpleCurve.png";
import Image from "next/image";

export default function ReviewPage() {
  const {
    questions,
    updateQuestionText,
    updateAnswerText,
    setQuestions,
    isQuizReady,
  } = useStore();
  const router = useRouter();

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600 animate-pulse">Loading…</p>
      </div>
    );
  }

  const handleContinue = () => {
    router.push("/quiz");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 flex flex-col md:flex-row justify-center items-center mb-6 gap-2">
          <Image
            src={PurpleCurve}
            alt="Purple Curve"
            className="inline-block w-8 h-8 mr-2"
          />
          Review and edit your questions
        </h1>

        {questions.map((q, i) => (
          <QuestionCard
            key={i}
            index={i}
            questionData={q}
            updateQuestionText={(newText) => updateQuestionText(i, newText)}
            updateAnswerText={(j, newText) => updateAnswerText(i, j, newText)}
            markCorrect={(j) => {
              const updated = [...questions];
              updated[i].correctAnswerIndex = j;
              setQuestions(updated);
            }}
          />
        ))}

        <button
          onClick={handleContinue}
          disabled={!isQuizReady}
          className="w-full max-w-xs mx-auto block bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start the quiz
        </button>
      </div>
    </main>
  );
}
