import React, { useState } from 'react';

export default function AnalyticsChart({ data }) {
  const [activeBar, setActiveBar] = useState(null);
  
  if (!data || data.length === 0) return null;
  
  const maxVal = Math.max(...data.map(d => d.sales));

  return (
    <div style={{ padding: '4px 0 10px 0' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        height: '110px',
        padding: '0 4px',
        gap: '10px',
        marginBottom: '10px'
      }}>
        {data.map((item, idx) => {
          // Calculate percentage height
          const pct = Math.max(10, (item.sales / maxVal) * 100);
          const isHovered = activeBar === idx;

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={() => setActiveBar(idx)}
              onMouseLeave={() => setActiveBar(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div style={{
                  position: 'absolute',
                  top: '-32px',
                  backgroundColor: 'var(--text-main)',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: '700',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  zIndex: 10,
                  whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  ₹{item.sales}
                </div>
              )}

              {/* Bar */}
              <div
                style={{
                  width: '100%',
                  height: `${pct}px`,
                  backgroundColor: isHovered ? 'var(--primary)' : 'var(--primary-light)',
                  borderRadius: '3px 3px 0 0',
                  border: isHovered ? '1.5px solid var(--primary-dark)' : '1px solid var(--border)',
                  borderBottom: 'none',
                  transition: 'all 0.2s ease',
                  minHeight: '12px'
                }}
              />
              
              {/* X label */}
              <span style={{
                fontSize: '10px',
                fontWeight: '600',
                color: isHovered ? 'var(--primary)' : 'var(--text-light)',
                marginTop: '4px'
              }}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid var(--border)',
        paddingTop: '8px',
        fontSize: '11px',
        color: 'var(--text-muted)'
      }}>
        <span>Mon: <b>₹{data[0].sales}</b></span>
        <span>Sun Peak: <b>₹{data[data.length - 1].sales}</b></span>
      </div>
    </div>
  );
}
