import { useStore } from "@/store";
import { useRouter } from "next/navigation";

type ResultSummaryProps = {
  correctCount: number;
  total: number;
  message: string;
};

export function ResultSummary({
  correctCount,
  total,
  message,
}: ResultSummaryProps) {
  const percentage = (correctCount / total) * 100;
  const router = useRouter();
  const { reset } = useStore();

  const handleQuizRestart = () => {
    reset();
    router.push("/");
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center space-y-6 border border-gray-100 relative overflow-hidden">
      <div className="text-5xl">✅</div>

      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
        {message}
      </h2>

      <div className="text-5xl font-bold text-gray-900">
        {correctCount}/{total}
      </div>

      <div className="flex items-center justify-center gap-2 px-8">
        <div
          className={`flex h-3 rounded-full bg-green-500 ${percentage == 0 ? 'hidden' : ''}`}
          style={{ width: `${percentage}%` }}
        />
        <div
          className={`flex h-3 rounded-full bg-red-400 ${percentage == 100 ? 'hidden' : ''}`}
          style={{ width: `${100 - percentage}%` }}
        />
      </div>

      <div className="flex justify-center gap-6 text-sm text-gray-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          Answered Correctly
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          Missed Answers
        </div>
      </div>

      <div className="flex justify-around">
        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition">
          Share results
        </button>
        <button
          onClick={handleQuizRestart}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition"
        >
          Start New Quiz
        </button>
      </div>
    </div>
  );
}
