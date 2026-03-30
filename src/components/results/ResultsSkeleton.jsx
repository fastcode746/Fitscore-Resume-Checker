import React from 'react';

function SkeletonBlock({ className, style }) {
  return (
    <div
      className={`skeleton-pulse rounded-lg bg-gray-200 ${className ?? ''}`}
      style={style}
    />
  );
}

const ResultsSkeleton = React.memo(function ResultsSkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading analysis results" aria-busy="true">
      {/* Score circle placeholder */}
      <div className="flex flex-col items-center gap-3 py-4">
        <SkeletonBlock style={{ width: 140, height: 140, borderRadius: '50%' }} />
        <SkeletonBlock style={{ width: 100, height: 16 }} />
      </div>

      <hr className="border-gray-200" />

      {/* Score breakdown placeholder */}
      <div className="space-y-3">
        <SkeletonBlock style={{ width: 140, height: 18 }} />
        {[100, 85, 95, 70].map((w, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between">
              <SkeletonBlock style={{ width: 70, height: 14 }} />
              <SkeletonBlock style={{ width: 28, height: 14 }} />
            </div>
            <SkeletonBlock style={{ width: '100%', height: 8, borderRadius: 999 }} />
          </div>
        ))}
      </div>

      <hr className="border-gray-200" />

      {/* Strengths placeholder */}
      <div className="space-y-2">
        <SkeletonBlock style={{ width: 180, height: 18 }} />
        {[220, 190, 240].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <SkeletonBlock style={{ width: 16, height: 16, borderRadius: '50%' }} />
            <SkeletonBlock style={{ width: w, height: 14 }} />
          </div>
        ))}
      </div>

      <hr className="border-gray-200" />

      {/* Keywords placeholder */}
      <div className="space-y-2">
        <SkeletonBlock style={{ width: 100, height: 18 }} />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-wrap gap-1.5">
            {[60, 80, 50, 70, 55].map((w, i) => (
              <SkeletonBlock key={i} style={{ width: w, height: 26, borderRadius: 999 }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[65, 75, 55, 80, 60].map((w, i) => (
              <SkeletonBlock key={i} style={{ width: w, height: 26, borderRadius: 999 }} />
            ))}
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Section ratings placeholder */}
      <div className="space-y-3">
        <SkeletonBlock style={{ width: 130, height: 18 }} />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between items-center">
              <SkeletonBlock style={{ width: 80, height: 14 }} />
              <div className="flex gap-0.5">
                {Array.from({ length: 10 }).map((_, j) => (
                  <SkeletonBlock key={j} style={{ width: 8, height: 8, borderRadius: '50%' }} />
                ))}
              </div>
            </div>
            <SkeletonBlock style={{ width: '80%', height: 12 }} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default ResultsSkeleton;
