import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CopyButton from '../shared/CopyButton';

const SuggestionCard = React.memo(function SuggestionCard({ suggestion, index }) {
  const [reasonOpen, setReasonOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      className="rounded-xl border border-gray-200 overflow-hidden"
      style={{ backgroundColor: '#FAFAFA' }}
    >
      {/* Before */}
      <div className="p-3" style={{ backgroundColor: '#FFF5F5' }}>
        <span
          className="inline-block text-xs font-semibold px-2 py-0.5 rounded mb-2"
          style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}
        >
          Before
        </span>
        <p className="text-sm text-gray-700 leading-relaxed">{suggestion.original}</p>
      </div>

      {/* Arrow */}
      <div className="flex justify-center py-1 bg-white border-y border-gray-100">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M4 9l4 4 4-4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* After */}
      <div className="p-3" style={{ backgroundColor: '#F0FBF7' }}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className="inline-block text-xs font-semibold px-2 py-0.5 rounded"
            style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
          >
            After
          </span>
          <CopyButton text={suggestion.rewritten} />
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{suggestion.rewritten}</p>
      </div>

      {/* Why this works */}
      <div className="border-t border-gray-100">
        <button
          onClick={() => setReasonOpen((o) => !o)}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
        >
          Why this works
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{ transform: reasonOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {reasonOpen && (
          <p className="px-3 pb-3 text-xs text-gray-500 leading-relaxed">{suggestion.reason}</p>
        )}
      </div>
    </motion.article>
  );
});

const RewriteSuggestions = React.memo(function RewriteSuggestions({ rewriteSuggestions }) {
  if (!rewriteSuggestions?.length) return null;

  return (
    <section aria-label="AI rewrite suggestions">
      <h2 className="text-base font-semibold text-gray-800">AI Rewrite Suggestions</h2>
      <p className="text-xs text-gray-500 mb-3">Tailored to this job description</p>
      <div className="space-y-3">
        {rewriteSuggestions.map((s, i) => (
          <SuggestionCard key={i} suggestion={s} index={i} />
        ))}
      </div>
    </section>
  );
});

export default RewriteSuggestions;
