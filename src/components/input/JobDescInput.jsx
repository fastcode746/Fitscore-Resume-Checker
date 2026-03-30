import React, { useCallback, useRef } from 'react';

const MAX_CHARS = 8000;

const JobDescInput = React.memo(function JobDescInput({ value, onChange, error }) {
  const textareaRef = useRef(null);
  const isValid = value.trim().length >= 100;
  const isOver = value.length > MAX_CHARS;

  const handleClear = useCallback(() => {
    onChange('');
    setTimeout(() => textareaRef.current?.focus(), 0);
  }, [onChange]);

  return (
    <section aria-label="Job Description input">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor="job-desc" className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="1" width="12" height="14" rx="1.5" stroke="#374151" strokeWidth="1.4" />
            <path d="M5 5h6M5 8h6M5 11h3" stroke="#374151" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          Job Description
        </label>
        <div className="flex items-center gap-1">
          {isValid && !isOver && (
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill="#1D9E75" />
              <path d="M5 8.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {value.length > 0 && (
            <button
              onClick={handleClear}
              aria-label="Clear job description"
              className="p-0.5 rounded cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <textarea
          id="job-desc"
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={10}
          placeholder="Paste the full job description here..."
          aria-label="Job description"
          aria-invalid={!!error || isOver}
          className="w-full resize-none rounded-lg border text-sm p-3 transition-colors outline-none"
          style={{
            borderColor: error || isOver ? '#E24B4A' : '#D1D5DB',
            boxShadow: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = error || isOver ? '#E24B4A' : '#0F6E56';
            e.target.style.boxShadow = `0 0 0 2px ${error || isOver ? 'rgba(226,75,74,0.2)' : 'rgba(15,110,86,0.2)'}`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error || isOver ? '#E24B4A' : '#D1D5DB';
            e.target.style.boxShadow = 'none';
          }}
        />
        <div
          className="absolute bottom-2 right-2 text-xs pointer-events-none"
          style={{ color: isOver ? '#E24B4A' : '#9CA3AF' }}
        >
          {value.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
        </div>
      </div>

      {(error || isOver) && (
        <p className="mt-1 text-xs" style={{ color: '#E24B4A' }}>
          {isOver ? `Too long — remove ${(value.length - MAX_CHARS).toLocaleString()} characters.` : error}
        </p>
      )}
    </section>
  );
});

export default JobDescInput;
