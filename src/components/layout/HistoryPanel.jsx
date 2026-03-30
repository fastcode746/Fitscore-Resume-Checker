import React, { useState, useCallback } from 'react';

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

function getScoreColor(score) {
  if (score >= 75) return { bg: '#D1FAE5', text: '#065F46' };
  if (score >= 50) return { bg: '#FEF3C7', text: '#92400E' };
  return { bg: '#FEE2E2', text: '#991B1B' };
}

const HistoryPanel = React.memo(function HistoryPanel({
  history,
  onLoadEntry,
  onRemoveEntry,
  onClearAll,
}) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <div className="mt-4 border-t border-gray-200 pt-3">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between text-sm font-medium text-gray-600 hover:text-gray-800 cursor-pointer transition-colors py-1"
        aria-expanded={open}
        aria-controls="history-list"
      >
        <span>Recent Analyses ({history.length})</span>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div id="history-list" className="mt-2 space-y-1">
          {history.length === 0 ? (
            <p className="text-xs text-gray-400 py-2">No previous analyses yet.</p>
          ) : (
            <>
              {history.map((entry) => {
                const { bg, text } = getScoreColor(entry.overallScore);
                return (
                  <div
                    key={entry.id}
                    className="flex items-center gap-2 group rounded-lg px-2 py-1.5 hover:bg-gray-50 transition-colors"
                  >
                    <button
                      onClick={() => onLoadEntry(entry)}
                      className="flex-1 flex items-center gap-2 text-left min-w-0 cursor-pointer"
                      aria-label={`Load analysis: ${entry.jobTitle}`}
                    >
                      <span
                        className="text-xs font-semibold px-1.5 py-0.5 rounded shrink-0"
                        style={{ backgroundColor: bg, color: text }}
                      >
                        {entry.overallScore}
                      </span>
                      <span className="text-xs text-gray-600 truncate">{entry.jobTitle}</span>
                      <span className="text-xs text-gray-400 shrink-0">{timeAgo(entry.timestamp)}</span>
                    </button>
                    <button
                      onClick={() => onRemoveEntry(entry.id)}
                      aria-label={`Delete analysis: ${entry.jobTitle}`}
                      className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 cursor-pointer transition-all"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3 3.5h8M5.5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M5 3.5l.5 8M9 3.5l-.5 8"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
              <div className="pt-1">
                <button
                  onClick={onClearAll}
                  className="text-xs text-gray-400 hover:text-red-400 cursor-pointer transition-colors underline underline-offset-2"
                >
                  Clear all
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default HistoryPanel;
