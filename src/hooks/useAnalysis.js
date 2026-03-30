import { useState, useCallback } from 'react';

const CLIENT_TIMEOUT_MS = 65000;

export function useAnalysis() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyse = useCallback(async (resumeText, jobDescription) => {
    setLoading(true);
    setError(null);

    for (let attempt = 0; attempt < 2; attempt++) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

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
            setLoading(false);
            return null;
          }
          if (response.status === 504 && attempt === 0) {
            // Server timed out — retry once silently
            continue;
          }
          setError(data.error || 'Analysis failed. Please try again.');
          setLoading(false);
          return null;
        }

        setResult(data);
        setLoading(false);
        return data;
      } catch (err) {
        clearTimeout(timeout);
        if (err.name === 'AbortError' && attempt === 0) {
          // Client timeout on first attempt — retry once silently
          continue;
        }
        if (err.name === 'AbortError') {
          setError('Analysis is taking too long. Please try again in a moment.');
        } else if (!navigator.onLine) {
          setError('No internet connection. Check your network and try again.');
        } else {
          setError('Connection failed. Check your internet and try again.');
        }
        setLoading(false);
        return null;
      }
    }

    // Both attempts timed out
    setError('Analysis is taking too long. Please try again in a moment.');
    setLoading(false);
    return null;
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { analyse, result, loading, error, reset };
}
