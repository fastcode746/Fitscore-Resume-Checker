import { useState, useCallback } from 'react';
import { getHistory, saveHistory, MAX_HISTORY } from '../utils/storage';

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useHistory() {
  const [history, setHistory] = useState(() => getHistory());

  const addToHistory = useCallback((result, resumeText, jobDescription) => {
    const entry = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      jobTitle: jobDescription.slice(0, 60),
      resumeSnippet: resumeText.slice(0, 80),
      overallScore: result.overallScore,
      result,
      resumeText,
      jobDescription,
    };

    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, MAX_HISTORY);
      saveHistory(updated);
      return updated;
    });
  }, []);

  const removeFromHistory = useCallback((id) => {
    setHistory((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveHistory(updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  const loadEntry = useCallback((entry) => {
    return {
      resumeText: entry.resumeText,
      jobDescription: entry.jobDescription,
      result: entry.result,
    };
  }, []);

  return { history, addToHistory, removeFromHistory, clearHistory, loadEntry };
}
