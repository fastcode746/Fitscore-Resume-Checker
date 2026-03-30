import { useState, useCallback } from 'react';

export function useAnalysis() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyse = useCallback(async (resumeText, jobDescription) => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setError('Too many requests. Please wait 30 seconds and try again.');
        } else if (response.status === 504) {
          setError('Analysis is taking too long. Please try again.');
        } else {
          setError(data.error || 'Analysis failed. Please try again.');
        }
        return null;
      }

      setResult(data);
      return data;
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        setError('Analysis is taking too long. Please try again.');
      } else if (!navigator.onLine) {
        setError('Connection failed. Check your internet and try again.');
      } else {
        setError('Connection failed. Check your internet and try again.');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { analyse, result, loading, error, reset };
}
