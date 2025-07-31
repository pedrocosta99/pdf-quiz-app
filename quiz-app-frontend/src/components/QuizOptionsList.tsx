import { QuizOption } from "./QuizOption";

type QuizOptionListProps = {
  options: string[];
  correctAnswerIndex: number;
  userAnswerIndex?: number;
  isAnswered: boolean;
  onSelect: (index: number) => void;
};

export function QuizOptionList({
  options,
  correctAnswerIndex,
  userAnswerIndex,
  isAnswered,
  onSelect,
}: QuizOptionListProps) {
  return (
    <div className="space-y-2">
      {options.map((opt, i) => (
        <QuizOption
          key={i}
          text={opt}
          index={i}
          isSelected={userAnswerIndex === i}
          isCorrect={correctAnswerIndex === i}
          isAnswered={isAnswered}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}
