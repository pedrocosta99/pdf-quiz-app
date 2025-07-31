import React from "react";

interface QuestionCountInputProps {
  questionCount: number;
  setQuestionCount: (value: number) => void;
}

const QuestionCountInput: React.FC<QuestionCountInputProps> = ({
  questionCount,
  setQuestionCount,
}) => {
  const handleDecrease = () => {
    if (questionCount > 1) setQuestionCount(questionCount - 1);
  };

  const handleIncrease = () => {
    if (questionCount < 10) setQuestionCount(questionCount + 1);
  };

  return (
    <div className="w-full text-center">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Number of Questions (1–10)
      </label>

      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handleDecrease}
          disabled={questionCount <= 1}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-50"
        >
          −
        </button>

        <div className="w-16 h-10 border-2 border-purple-700 rounded-md flex items-center justify-center text-lg font-semibold text-gray-800">
          {questionCount}
        </div>

        <button
          onClick={handleIncrease}
          disabled={questionCount >= 10}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-50"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuestionCountInput;
