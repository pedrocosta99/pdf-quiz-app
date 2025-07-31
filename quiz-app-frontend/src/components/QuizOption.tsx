type QuizOptionProps = {
  text: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isAnswered: boolean;
  onClick: () => void;
};

export function QuizOption({
  text,
  isSelected,
  isCorrect,
  isAnswered,
  onClick,
}: QuizOptionProps) {
  const baseStyle = "w-full text-left px-4 py-2 rounded border";

  const selectedAndCorrect = "bg-green-50 border-green-500 text-green-800 font-semibold";
  const selectedAndWrong = "bg-red-50 border-red-500 text-red-700 font-semibold";
  const notSelected = "bg-white border-gray-200 text-gray-700";
  const hoverStyle = "hover:bg-blue-50 text-gray-800";

  let style = "";
  if (isAnswered) {
    if (isSelected) {
      style = isCorrect ? selectedAndCorrect : selectedAndWrong;
    } else {
      style = notSelected;
    }
  } else {
    style = `bg-white ${hoverStyle} border-gray-200`;
  }

  return (
    <button
      disabled={isAnswered}
      onClick={onClick}
      className={`${baseStyle} ${style}`}
    >
      {text}
    </button>
  );
}
