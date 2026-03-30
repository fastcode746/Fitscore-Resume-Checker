import { useState, useCallback } from 'react';

export async function extractTextFromPDF(file) {
  const [pdfjsLib, workerSrc] = await Promise.all([
    import('pdfjs-dist'),
    import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
  ]);
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc.default;

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const pageTexts = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(' ');
    pageTexts.push(pageText);
  }

  const text = pageTexts.join('\n');

  if (text.trim().length < 50) {
    throw new Error('This PDF appears to be scanned. Please paste your resume as text instead.');
  }

  return text.trim();
}

export function useExtract() {
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState(null);

  const extractText = useCallback(async (file) => {
    setExtracting(true);
    setError(null);
    try {
      const text = await extractTextFromPDF(file);
      return text;
    } catch (err) {
      const message = err.message || 'Failed to extract text from PDF.';
      setError(message);
      return null;
    } finally {
      setExtracting(false);
    }
  }, []);

  return { extracting, error, extractText };
}
