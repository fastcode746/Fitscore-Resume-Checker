import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SIZE = 140;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getColor(score) {
  if (score >= 75) return '#1D9E75';
  if (score >= 50) return '#EF9F27';
  return '#E24B4A';
}

function getLabel(score) {
  if (score >= 90) return 'Excellent Match';
  if (score >= 75) return 'Good Match';
  if (score >= 50) return 'Moderate Match';
  return 'Weak Match';
}

const ScoreCircle = React.memo(function ScoreCircle({ score }) {
  const shouldReduceMotion = useReducedMotion();
  const color = getColor(score);
  const label = getLabel(score);
  const targetOffset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

  return (
    <div
      className="flex flex-col items-center gap-2"
      aria-label={`Match score: ${score} out of 100`}
      role="img"
    >
      <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={STROKE}
        />
        {/* Animated arc */}
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.4, ease: 'easeOut' }}
        />
        {/* Center text — counter-rotate to stay upright */}
        <g style={{ transform: `rotate(90deg) translate(0, -${SIZE}px)` }}>
          <text
            x={SIZE / 2}
            y={SIZE / 2 - 6}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="30"
            fontWeight="700"
            fill={color}
          >
            {score}
          </text>
          <text
            x={SIZE / 2}
            y={SIZE / 2 + 18}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="#9CA3AF"
          >
            / 100
          </text>
        </g>
      </svg>
      <span className="text-sm font-semibold" style={{ color }}>
        {label}
      </span>
    </div>
  );
});

export default ScoreCircle;
