import React from "react";
import PdfFolder from "@/assets/PdfFolder.png";
import Image from "next/image";
import { useGenerateQuiz } from "@/hooks/useGenerateQuiz";
import { useUploadPdf } from "@/hooks/useUploadPdf";

interface PdfUploadInputProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PdfUploadInput: React.FC<PdfUploadInputProps> = ({
  handleFileChange,
}) => {
  const { isPending: isPendingPdf } = useUploadPdf();
  const { isPending: isPendingQuiz } = useGenerateQuiz();

  return (
    <label
      className={`relative w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition
      ${isPendingQuiz ? "opacity-50 cursor-not-allowed" : "hover:border-blue-400"}`}
    >
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={isPendingQuiz}
        className="absolute w-full h-full opacity-0 cursor-pointer"
      />

      {isPendingPdf ? (
        <div className="flex flex-col items-center space-y-2 text-blue-600">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-sm font-medium">Reading your materials...</p>
        </div>
      ) : isPendingQuiz ? (
        <div className="flex flex-col items-center space-y-2 text-purple-600">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-l-4 border-purple-600"></div>
          <p className="text-base font-semibold tracking-wide">
            Generating quiz...
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center px-4">
          <Image
            src={PdfFolder}
            alt="Upload PDF"
            width={64}
            height={64}
            className="mb-2"
          />
          <p className="text-base font-medium">
            <strong>Click to upload</strong> or drag and drop files
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Drop course materials and start generating –{" "}
            <span className="font-semibold">for FREE</span>
          </p>
        </div>
      )}
    </label>
  );
};

export default PdfUploadInput;
