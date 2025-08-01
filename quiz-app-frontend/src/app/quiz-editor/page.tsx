"use client";

import { QuestionCard } from "@/components/QuestionCard";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import PurpleCurve from "@/assets/PurpleCurve.png";
import Image from "next/image";

export default function ReviewPage() {
  const { questions, updateQuestionText, updateAnswerText, setQuestions } =
    useStore();
  const router = useRouter();

  const handleContinue = () => {
    router.push("/quiz");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
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
          className="w-full max-w-xs mx-auto block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded"
        >
          Start the quiz
        </button>
      </div>
    </main>
  );
}
