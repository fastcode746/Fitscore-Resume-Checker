import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const StrengthsList = React.memo(function StrengthsList({ strengths, topRecommendation }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-label="Your strengths">
      <h2 className="text-base font-semibold text-gray-800 mb-3">Your Strengths for This Role</h2>
      <ul className="space-y-2 mb-4">
        {(strengths ?? []).map((strength, i) => (
          <motion.li
            key={i}
            initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="flex items-start gap-2 text-sm text-gray-700"
          >
            <svg
              aria-hidden="true"
              className="shrink-0 mt-0.5"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="8" cy="8" r="7" fill="#1D9E75" />
              <path
                d="M5 8.5l2 2 4-4"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {strength}
          </motion.li>
        ))}
      </ul>

      {topRecommendation && (
        <div
          className="flex items-start gap-3 rounded-xl p-4"
          style={{ backgroundColor: '#F0FBF7', border: '1px solid #A7F3D0' }}
        >
          <svg
            aria-hidden="true"
            className="shrink-0 mt-0.5"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M9 1C5.686 1 3 3.686 3 7c0 2.21 1.194 4.14 2.97 5.17V14a1 1 0 001 1h4a1 1 0 001-1v-1.83C13.806 11.14 15 9.21 15 7c0-3.314-2.686-6-6-6z"
              fill="#0F6E56"
            />
            <path d="M6.5 17h5" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: '#0F6E56' }}>
              Top Recommendation
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{topRecommendation}</p>
          </div>
        </div>
      )}
    </section>
  );
});

export default StrengthsList;
