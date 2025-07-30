'use client';

import { useStore } from '@/store';
import { useState } from 'react';

export default function QuizPage() {
  const {questions, setAnswerIndex} = useStore();
  const [current, setCurrent] = useState(0);


  const q = questions[current];
  const isAnswered = typeof q.answerIndex === 'number';
  const isCorrect = q.answerIndex === q.correctIndex;

  const handleAnswer = (index: number) => {
    if (!isAnswered) setAnswerIndex(current, index);
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-200">
        <div>
          <p className="text-sm text-gray-500 mb-1">Pergunta {current + 1} de {questions.length}</p>
          <h2 className="text-lg font-semibold text-gray-800">{q.question}</h2>
        </div>

        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const isSelected = q.answerIndex === i;
            const isRightAnswer = q.correctIndex === i;

            return (
              <button
                key={i}
                disabled={isAnswered}
                onClick={() => handleAnswer(i)}
                className={`
                  w-full text-left px-4 py-2 rounded border
                  ${
                    isAnswered
                      ? isSelected
                        ? isRightAnswer
                          ? 'bg-green-50 border-green-500 text-green-800 font-semibold'
                          : 'bg-red-50 border-red-500 text-red-700 font-semibold'
                        : 'bg-white border-gray-200 text-gray-700'
                      : 'bg-white hover:bg-blue-50 border-gray-200 text-gray-800'
                  }
                `}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'Resposta correta!' : `Resposta incorreta. Resposta certa: "${q.options[q.correctIndex]}"`}
          </p>
        )}

        <div className="flex justify-between pt-4">
          <button
            onClick={() => setCurrent((p) => Math.max(p - 1, 0))}
            disabled={current === 0}
            className="text-sm px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrent((p) => Math.min(p + 1, questions.length - 1))}
            disabled={current === questions.length - 1}
            className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </main>
  );
}
