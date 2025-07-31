type AnswerOptionProps = {
  index: number;
  value: string;
  isCorrect: boolean;
  onChange: (val: string) => void;
  onMarkCorrect: () => void;
};

export function AnswerOption({
  index,
  value,
  isCorrect,
  onChange,
  onMarkCorrect,
}: AnswerOptionProps) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 rounded border ${
        isCorrect ? "border-green-400 bg-green-50" : "border-gray-100"
      }`}
    >
      <div className="flex-1">
        <label className="text-sm text-gray-500">Opção {index + 1}</label>
        <input
          className="w-full border-none bg-transparent text-sm font-medium text-gray-800 outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <button
        onClick={onMarkCorrect}
        className={`ml-4 text-xs font-medium px-2 py-1 rounded ${
          isCorrect
            ? "text-green-600 border border-green-300 bg-green-50"
            : "text-gray-500 hover:text-green-600"
        }`}
      >
        {isCorrect ? "✓ Correta" : "Marcar como correta"}
      </button>
    </div>
  );
}
