"use client";
import { useRouter } from "next/navigation";
import { useUploadPdf } from "../hooks/useUploadPdf";
import { useGenerateQuiz } from "../hooks/useGenerateQuiz";
import { useStore } from "../store/index";
import { ChangeEvent, useState } from "react";
import PdfUploadInput from "@/components/PdfUploadInput";
import QuestionCountInput from "@/components/QuestionCountInput";
import PurpleCurve from "@/assets/PurpleCurve.png";
import Image from "next/image";

export default function UploadPage() {
  const { mutateAsync: uploadPdf, isPending: isPendingPdf } = useUploadPdf();
  const { mutateAsync: generateQuiz, isPending: isPendingQuiz } =
    useGenerateQuiz();
  const router = useRouter();
  const { text, setText, questionCount, setQuestionCount, setQuestions } =
    useStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setLocalError("Por favor, envie um arquivo PDF válido.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setLocalError("O arquivo não pode ultrapassar 5MB.");
      return;
    }

    try {
      const uploadResult = await uploadPdf(file);
      setText(uploadResult.text);

      const quizQuestions = await generateQuiz({ text, questionCount });
      setQuestions(quizQuestions);

      router.push("/quiz-editor");
    } catch {
      setLocalError("Erro ao processar o PDF. Tente novamente");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 flex-col">
      <section className="w-full max-w-md text-center mb-6 px-4">
        <div className="flex flex-col items-center space-y-2">
          <Image src={PurpleCurve} alt="Logo" width={40} height={40} />

          <h1 className="text-2xl font-bold text-gray-900">
            Unstuck Quiz Generator
          </h1>

          <p className="text-gray-500 text-sm">
            Generate quiz from your course materials or textbooks to help you
            study faster and smarter.
          </p>
        </div>
      </section>

      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-6 space-y-6">
        <PdfUploadInput
          isPendingPdf={isPendingPdf}
          isPendingQuiz={isPendingQuiz}
          handleFileChange={handleFileChange}
        />

        <QuestionCountInput
          questionCount={questionCount}
          setQuestionCount={setQuestionCount}
        />
      </div>

      <div className="h-16 mt-4 w-full max-w-md">
        {localError ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 shadow-sm text-center">
            ❌ Erro: {localError}
          </div>
        ) : null}
      </div>
    </main>
  );
}
