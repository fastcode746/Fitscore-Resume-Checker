import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ScoreCircle from './ScoreCircle';
import ScoreBreakdown from './ScoreBreakdown';
import KeywordPills from './KeywordPills';
import SectionRatings from './SectionRatings';
import RewriteSuggestions from './RewriteSuggestions';
import StrengthsList from './StrengthsList';
import ResultsSkeleton from './ResultsSkeleton';
import ErrorMessage from '../shared/ErrorMessage';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-96 text-center px-6">
      <svg
        aria-hidden="true"
        className="mb-4"
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
      >
        <rect x="12" y="8" width="36" height="46" rx="4" stroke="#D1D5DB" strokeWidth="2.5" />
        <path
          d="M20 22h20M20 30h20M20 38h12"
          stroke="#D1D5DB"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="53" cy="49" r="10" stroke="#D1D5DB" strokeWidth="2.5" />
        <path d="M60 56l5 5" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <h2 className="text-lg font-semibold text-gray-400 mb-2">Ready to analyse</h2>
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
        Fill in the job description and upload your resume, then click Analyse.
      </p>
    </div>
  );
}

const Divider = () => <hr className="border-gray-200" />;

const ResultsPanel = React.memo(function ResultsPanel({
  result,
  loading,
  error,
  onRetry,
  onReset,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <ResultsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto pt-8">
        <ErrorMessage message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (!result) {
    return <EmptyState />;
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto space-y-6"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Score circle */}
      <div className="flex justify-center py-4">
        <ScoreCircle score={result.overallScore} />
      </div>

      <Divider />
      <ScoreBreakdown subscores={result.subscores} />

      <Divider />
      <StrengthsList
        strengths={result.strengths}
        topRecommendation={result.topRecommendation}
      />

      <Divider />
      <KeywordPills
        presentKeywords={result.presentKeywords}
        missingKeywords={result.missingKeywords}
      />

      <Divider />
      <SectionRatings sectionRatings={result.sectionRatings} />

      <Divider />
      <RewriteSuggestions rewriteSuggestions={result.rewriteSuggestions} />

      <Divider />
      <div className="pb-6">
        <button
          onClick={onReset}
          className="w-full py-3 rounded-lg border-2 text-sm font-medium cursor-pointer transition-colors active:scale-95"
          style={{ borderColor: '#0F6E56', color: '#0F6E56' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F0FBF7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          New Analysis
        </button>
      </div>
    </motion.div>
  );
});

export default ResultsPanel;
