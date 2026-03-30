import React from 'react';

const ErrorMessage = React.memo(function ErrorMessage({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}
    >
      <div className="flex items-center gap-2">
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4a1 1 0 011 1v3a1 1 0 11-2 0V7a1 1 0 011-1zm0 7a1 1 0 100 2 1 1 0 000-2z"
            fill="#E24B4A"
          />
        </svg>
        <span className="font-semibold text-sm" style={{ color: '#991B1B' }}>
          Analysis Failed
        </span>
      </div>
      <p className="text-sm" style={{ color: '#7F1D1D' }}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="self-start text-sm font-medium px-4 py-2 rounded-lg cursor-pointer active:scale-95 transition-transform"
          style={{ backgroundColor: '#E24B4A', color: '#fff' }}
        >
          Try Again
        </button>
      )}
    </div>
  );
});

export default ErrorMessage;
