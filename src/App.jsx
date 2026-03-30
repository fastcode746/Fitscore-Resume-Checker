import React, { useState, useCallback } from 'react';
import Header from './components/layout/Header';
import TwoPanel from './components/layout/TwoPanel';
import HistoryPanel from './components/layout/HistoryPanel';
import JobDescInput from './components/input/JobDescInput';
import ResumeUpload from './components/input/ResumeUpload';
import AnalyseButton from './components/input/AnalyseButton';
import ResultsPanel from './components/results/ResultsPanel';
import { useAnalysis } from './hooks/useAnalysis';
import { useHistory } from './hooks/useHistory';
import { validateJobDescription, validateResumeText } from './utils/validators';

export default function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [jobDescError, setJobDescError] = useState(null);
  const [resumeError, setResumeError] = useState(null);
  const [loadedResult, setLoadedResult] = useState(null);

  const { analyse, result, loading, error, reset } = useAnalysis();
  const { history, addToHistory, removeFromHistory, clearHistory, loadEntry } = useHistory();

  const effectiveResult = result ?? loadedResult;

  const handleAnalyse = useCallback(async () => {
    const jdValidation = validateJobDescription(jobDescription);
    const resumeValidation = validateResumeText(resumeText);

    setJobDescError(jdValidation.error);
    setResumeError(resumeValidation.error);

    if (!jdValidation.valid || !resumeValidation.valid) return;

    setLoadedResult(null);
    const analysisResult = await analyse(resumeText, jobDescription);
    if (analysisResult) {
      addToHistory(analysisResult, resumeText, jobDescription);
    }
  }, [jobDescription, resumeText, analyse, addToHistory]);

  const handleLoadHistory = useCallback(
    (entry) => {
      const { resumeText: rt, jobDescription: jd, result: r } = loadEntry(entry);
      setJobDescription(jd);
      setResumeText(rt);
      reset();
      setLoadedResult(r);
    },
    [loadEntry, reset]
  );

  const handleReset = useCallback(() => {
    reset();
    setLoadedResult(null);
  }, [reset]);

  const handleRetry = useCallback(() => {
    reset();
    setLoadedResult(null);
    // Slight delay so reset clears before re-triggering
    setTimeout(() => handleAnalyse(), 50);
  }, [reset, handleAnalyse]);

  const isButtonDisabled = !jobDescription.trim() || !resumeText.trim() || loading;

  const leftContent = (
    <div className="flex flex-col gap-4">
      <JobDescInput
        value={jobDescription}
        onChange={(v) => {
          setJobDescription(v);
          if (jobDescError) setJobDescError(null);
        }}
        error={jobDescError}
      />

      <ResumeUpload
        resumeText={resumeText}
        onResumeTextChange={(v) => {
          setResumeText(v);
          if (resumeError) setResumeError(null);
        }}
        error={resumeError}
      />

      <AnalyseButton
        onClick={handleAnalyse}
        loading={loading}
        disabled={isButtonDisabled}
      />

      <HistoryPanel
        history={history}
        onLoadEntry={handleLoadHistory}
        onRemoveEntry={removeFromHistory}
        onClearAll={clearHistory}
      />
    </div>
  );

  const rightContent = (
    <ResultsPanel
      result={effectiveResult}
      loading={loading}
      error={error}
      onRetry={handleRetry}
      onReset={handleReset}
    />
  );

  return (
    <>
      <Header />
      <TwoPanel leftContent={leftContent} rightContent={rightContent} />
    </>
  );
}
