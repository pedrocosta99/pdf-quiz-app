"use client";

import { useStore } from "@/store";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
  const questions = useStore((s) => s.questions);
  const updateQuestionText = useStore((s) => s.updateQuestionText);
  const updateAnswerText = useStore((s) => s.updateAnswerText);
  const setQuestions = useStore((s) => s.setQuestions);
  const router = useRouter();

  const handleContinue = () => {
    router.push("/quiz");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Revise ou Edite as Perguntas
        </h1>

        {questions.map((q, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-sm"
          >
            <label className="block text-sm font-semibold text-gray-700">
              Pergunta {i + 1}
            </label>
            <textarea
              className="w-full border rounded px-3 py-2 text-sm"
              value={q.question}
              onChange={(e) => updateQuestionText(i, e.target.value)}
            />

            <hr className="border-gray-200" />

            <p className="text-sm font-medium text-gray-700 mt-4">Respostas</p>
            <div className="space-y-2 mt-2">
              {q.options.map((option, j) => (
                <div
                  key={j}
                  className={`flex items-center justify-between px-4 py-2 rounded border ${
                    q.answerIndex === j
                      ? "border-green-400 bg-green-50"
                      : "border-gray-100"
                  }`}
                >
                  <div className="flex-1">
                    <label className="text-sm text-gray-500">
                      Opção {j + 1}
                    </label>
                    <input
                      className="w-full border-none bg-transparent text-sm font-medium text-gray-800 outline-none"
                      value={option}
                      onChange={(e) => updateAnswerText(i, j, e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => {
                      const updated = [...questions];
                      updated[i].answerIndex = j;
                      setQuestions(updated);
                    }}
                    className={`ml-4 text-xs font-medium px-2 py-1 rounded ${
                      q.answerIndex === j
                        ? "text-green-600 border border-green-300 bg-green-50"
                        : "text-gray-500 hover:text-green-600"
                    }`}
                  >
                    {q.answerIndex === j ? "✓ Correta" : "Marcar como correta"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleContinue}
          className="w-full max-w-xs mx-auto block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded"
        >
          Continuar para o Quiz
        </button>
      </div>
    </main>
  );
}
