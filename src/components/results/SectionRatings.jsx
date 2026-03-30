import React from 'react';

const SECTION_LABELS = {
  summary: 'Summary',
  experience: 'Experience',
  skills: 'Skills',
  education: 'Education',
};

function getDotColor(score) {
  if (score >= 8) return '#1D9E75';
  if (score >= 5) return '#EF9F27';
  return '#E24B4A';
}

const SectionRatings = React.memo(function SectionRatings({ sectionRatings }) {
  return (
    <section aria-label="Section ratings">
      <h2 className="text-base font-semibold text-gray-800 mb-3">Section Ratings</h2>
      <div className="space-y-4">
        {Object.entries(SECTION_LABELS).map(([key, label]) => {
          const data = sectionRatings?.[key];
          const score = data?.score ?? 0;
          const feedback = data?.feedback ?? '';
          const color = getDotColor(score);

          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <div className="flex items-center gap-0.5" aria-label={`${label} score: ${score} out of 10`}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: i < score ? color : '#E5E7EB',
                      }}
                    />
                  ))}
                </div>
              </div>
              {feedback && (
                <p className="text-xs text-gray-500 leading-relaxed">{feedback}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
});

export default SectionRatings;
