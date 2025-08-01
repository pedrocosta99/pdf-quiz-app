type QuizPaginationProps = {
  current: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function QuizPagination({
  current,
  total,
  onPrevious,
  onNext,
}: QuizPaginationProps) {
  return (
    <div className="flex justify-between items-center pt-4 gap-4">
      <button
        onClick={onPrevious}
        disabled={current === 0}
        className="text-sm px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>

      <button
        onClick={onNext}
        disabled={current === total - 1}
        className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
