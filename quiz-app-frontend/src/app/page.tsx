"use client";
import { useRouter } from "next/navigation";
import { useUploadPdf } from "../hooks/useUploadPdf";
import { useGenerateQuiz } from "../hooks/useGenerateQuiz";
import { useStore } from "../store/index";
import { ChangeEvent, useState } from "react";

export default function UploadPage() {
  const { mutateAsync: uploadPdf, isPending: isPendingPdf, isError, error } = useUploadPdf();
  const { mutateAsync: generateQuiz, isPending: isPendingQuiz  } = useGenerateQuiz();
  const router = useRouter();
  const { text, setText, questionCount, setQuestionCount, setQuestions } =
    useStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Por favor, envie um arquivo PDF válido.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("O arquivo não pode ultrapassar 5MB.");
      return;
    }

    try {
      const uploadResult = await uploadPdf(file);
      setText(uploadResult.text);

      const quizQuestions = await generateQuiz({text, questionCount});
      setQuestions(quizQuestions);

      router.push("/quiz-editor");
    } catch {
      setLocalError("Erro ao processar o PDF.");
    }

    // if (file) {
    //   mutate(
    //     { file, questionCount },
    //     {
    //       onSuccess: (data) => {
    //         setText(data.text);
    //         // setText(mockText)
    //         setQuestions(mockQuestions);
    //         router.push("/quiz-editor");
    //       },
    //     },
    //   );
    // }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-6 space-y-6">
        {text}
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Enviar PDF para Transcrição
        </h1>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantidade de perguntas (máx. 10):
        </label>
        <input
          type="number"
          min={1}
          max={10}
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
          className="w-full rounded border px-3 py-2 text-sm"
        />

        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Selecione um arquivo PDF:
          </span>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={isPendingPdf}
            className="block w-full text-sm text-gray-800
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
        </label>

        {isPendingPdf && (
          <p className="text-sm text-gray-600 text-center">
            ⏳ Processando PDF...
          </p>
        )}

        {isPendingQuiz && (
          <p className="text-sm text-gray-600 text-center">
            ⏳ Gerando Quiz...
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-600 text-center">
            ❌ Erro: {(error as Error).message}
          </p>
        )}
      </div>
    </main>
  );
}
