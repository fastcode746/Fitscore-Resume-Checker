import React, { useState, useCallback } from 'react';

const MAX_DISPLAY = 15;

const MissingPill = React.memo(function MissingPill({ keyword }) {
  const [showTip, setShowTip] = useState(false);

  const toggle = useCallback(() => setShowTip((s) => !s), []);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggle}
        aria-label={`Missing keyword: ${keyword}. Click for tip.`}
        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-opacity hover:opacity-80"
        style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}
      >
        <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 2l6 6M8 2L2 8" stroke="#991B1B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {keyword}
      </button>
      {showTip && (
        <div
          className="absolute z-10 bottom-full mb-1.5 left-1/2 w-56 rounded-lg p-2.5 text-xs shadow-lg"
          style={{
            backgroundColor: '#1F2937',
            color: '#F9FAFB',
            transform: 'translateX(-50%)',
          }}
        >
          Tip: Add &ldquo;{keyword}&rdquo; naturally in your experience or skills section.
          <div
            className="absolute top-full left-1/2"
            style={{
              transform: 'translateX(-50%)',
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid #1F2937',
            }}
          />
        </div>
      )}
    </div>
  );
});

const KeywordPills = React.memo(function KeywordPills({ presentKeywords, missingKeywords }) {
  const visiblePresent = (presentKeywords ?? []).slice(0, MAX_DISPLAY);
  const visibleMissing = (missingKeywords ?? []).slice(0, MAX_DISPLAY);
  const extraPresent = (presentKeywords?.length ?? 0) - MAX_DISPLAY;
  const extraMissing = (missingKeywords?.length ?? 0) - MAX_DISPLAY;

  return (
    <section aria-label="Keyword analysis">
      <h2 className="text-base font-semibold text-gray-800 mb-3">Keywords</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Found */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Found in Resume</p>
          <div className="flex flex-wrap gap-1.5">
            {visiblePresent.map((kw) => (
              <span
                key={kw}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}
              >
                <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5.5l2.5 2.5 4-5" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {kw}
              </span>
            ))}
            {extraPresent > 0 && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                +{extraPresent} more
              </span>
            )}
          </div>
        </div>

        {/* Missing */}
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Missing from Resume</p>
          {visibleMissing.length === 0 ? (
            <p className="text-xs font-medium" style={{ color: '#1D9E75' }}>
              Great! No critical keywords missing.
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {visibleMissing.map((kw) => (
                <MissingPill key={kw} keyword={kw} />
              ))}
              {extraMissing > 0 && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                  +{extraMissing} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default KeywordPills;
