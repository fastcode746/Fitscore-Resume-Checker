import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function getBarColor(score) {
  if (score >= 75) return '#1D9E75';
  if (score >= 50) return '#EF9F27';
  return '#E24B4A';
}

const LABELS = {
  keywords: 'Keywords',
  experience: 'Experience',
  skills: 'Skills',
  format: 'Format',
};

const ScoreBreakdown = React.memo(function ScoreBreakdown({ subscores }) {
  const shouldReduceMotion = useReducedMotion();
  const entries = Object.entries(LABELS);

  return (
    <section aria-label="Score breakdown">
      <h2 className="text-base font-semibold text-gray-800 mb-3">Score Breakdown</h2>
      <div className="space-y-3">
        {entries.map(([key, label], i) => {
          const score = subscores?.[key] ?? 0;
          const color = getBarColor(score);
          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="text-sm font-semibold" style={{ color }}>
                  {score}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.7, delay: i * 0.15, ease: 'easeOut' }
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default ScoreBreakdown;
