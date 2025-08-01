import { useMutation } from "@tanstack/react-query";

const uploadPdf = async (file: File): Promise<{ text: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  const apiUrl =
    process.env.NEXT_PUBLIC_QUIZ_API_URL || "http://localhost:8000";

  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

  const response = await fetch(`${apiUrl}/transcribe-pdf`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Erro no upload do PDF");
  }

  return response.json();
};

export const useUploadPdf = () => {
  return useMutation({
    mutationFn: (file: File) => uploadPdf(file),
  });
};
