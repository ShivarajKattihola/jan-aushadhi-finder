import React from 'react';

export default function AdherenceRing({ value = 80 }) {
  // SVG Ring settings
  const radius = 34;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="circular-progress">
      <svg
        height={radius * 2}
        width={radius * 2}
      >
        <circle
          className="circle-bg"
          stroke="#D1D9E6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="circle-val"
          stroke="var(--secondary)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="circular-progress-text">
        <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>{value}%</span>
        <span style={{ fontSize: '8px', fontWeight: '600', color: 'var(--text-light)', textTransform: 'uppercase' }}>Taken</span>
      </div>
    </div>
  );
}
