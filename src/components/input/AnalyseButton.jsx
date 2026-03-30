import React from 'react';

const AnalyseButton = React.memo(function AnalyseButton({ onClick, loading, disabled }) {
  const isActive = !disabled && !loading;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={loading ? 'Analysing resume...' : 'Analyse my resume'}
      className="w-full flex items-center justify-center gap-2 rounded-lg font-semibold text-sm transition-all active:scale-95 cursor-pointer"
      style={{
        height: '48px',
        backgroundColor: isActive ? '#0F6E56' : '#D1D5DB',
        color: isActive ? '#fff' : '#9CA3AF',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        animation: isActive ? 'pulse-btn 2s ease-in-out infinite' : 'none',
      }}
    >
      {loading ? (
        <>
          <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            <path d="M9 2a7 7 0 017 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Analysing...
        </>
      ) : (
        <>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 1l1.8 5.4H16L11.6 9.6l1.8 5.4L9 12l-4.4 3 1.8-5.4L2 6.4h5.2L9 1z"
              fill={isActive ? 'white' : '#9CA3AF'}
            />
          </svg>
          Analyse My Resume
        </>
      )}

      <style>{`
        @keyframes pulse-btn {
          0%, 100% { box-shadow: 0 0 0 0 rgba(15,110,86,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(15,110,86,0); }
        }
      `}</style>
    </button>
  );
});

export default AnalyseButton;
