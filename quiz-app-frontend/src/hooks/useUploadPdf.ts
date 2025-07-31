import { useMutation } from '@tanstack/react-query';

const uploadPdf = async (file: File): Promise<{ text: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`http://localhost:8000/transcribe-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Erro no upload do PDF');
  }

  return response.json();
};

export const useUploadPdf = () => {
  return useMutation({
    mutationFn: (file: File) =>
      uploadPdf(file),
  });
};
