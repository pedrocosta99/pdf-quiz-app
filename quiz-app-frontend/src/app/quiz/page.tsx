"use client";

import { QuizOptionList } from "@/components/QuizOptionsList";
import { QuizPagination } from "@/components/QuizPagination";
import { useStore } from "@/store";
import { useState } from "react";

export default function QuizPage() {
  const { questions, setAnswerIndex } = useStore();
  const [current, setCurrent] = useState(0);

  const q = questions[current];
  const isAnswered = typeof q.userAnswerIndex === "number";
  const isCorrect = q.userAnswerIndex === q.correctAnswerIndex;

  const handleAnswer = (index: number) => {
    if (!isAnswered) setAnswerIndex(current, index);
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-200">
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Pergunta {current + 1} de {questions.length}
          </p>
          <h2 className="text-lg font-semibold text-gray-800">{q.question}</h2>
        </div>

        <QuizOptionList
          options={q.options}
          correctAnswerIndex={q.correctAnswerIndex}
          userAnswerIndex={q.userAnswerIndex}
          isAnswered={isAnswered}
          onSelect={handleAnswer}
        />

        {isAnswered && (
          <p
            className={`text-sm ${isCorrect ? "text-green-600" : "text-red-600"}`}
          >
            {isCorrect
              ? "Resposta correta!"
              : `Resposta incorreta. Resposta certa: "${q.options[q.correctAnswerIndex]}"`}
          </p>
        )}

        <QuizPagination
          current={current}
          total={questions.length}
          onPrevious={() => setCurrent(Math.max(0, current - 1))}
          onNext={() => setCurrent(Math.min(questions.length - 1, current + 1))}
        />
      </div>
    </main>
  );
}
