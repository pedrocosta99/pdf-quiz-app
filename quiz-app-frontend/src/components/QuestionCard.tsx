import { Question } from "@/types";
import { AnswerOption } from "./AnswerOption";

type QuestionCardProps = {
  index: number;
  questionData: Question;
  updateQuestionText: (newText: string) => void;
  updateAnswerText: (optionIndex: number, newText: string) => void;
  markCorrect: (optionIndex: number) => void;
};

export function QuestionCard({
  index,
  questionData,
  updateQuestionText,
  updateAnswerText,
  markCorrect,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-sm">
      <label className="block text-sm font-semibold text-gray-700">
        Pergunta {index + 1}
      </label>
      <textarea
        className="w-full border rounded px-3 py-2 text-sm"
        value={questionData.question}
        onChange={(e) => updateQuestionText(e.target.value)}
      />

      <hr className="border-gray-200" />

      <p className="text-sm font-medium text-gray-700 mt-4">Respostas</p>
      <div className="space-y-2 mt-2">
        {questionData.options.map((opt, j) => (
          <AnswerOption
            key={j}
            index={j}
            value={opt}
            isCorrect={questionData.correctAnswerIndex === j}
            onChange={(val) => updateAnswerText(j, val)}
            onMarkCorrect={() => markCorrect(j)}
          />
        ))}
      </div>
    </div>
  );
}
