import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export default function Splash() {
  const { navigateTo } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateTo('onboarding');
    }, 1800);
    return () => clearTimeout(timer);
  }, [navigateTo]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '48px 24px',
      backgroundColor: 'var(--bg-main)',
      textAlign: 'center'
    }}>
      {/* Spacer */}
      <div />

      {/* Pulsing Brand Logo Container */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div 
          className="pulse-indicator" 
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '24px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            animation: 'pulse 1.8s infinite ease-in-out',
            marginBottom: '8px'
          }}
        >
          💊
        </div>
        
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '900', 
          color: 'var(--primary)',
          letterSpacing: '-0.5px',
          margin: 0
        }}>
          Jan-Aushadhi Finder
        </h1>
        
        <p style={{ 
          fontSize: '13px', 
          color: 'var(--secondary-dark)', 
          fontWeight: '800',
          textTransform: 'uppercase',
          margin: 0,
          letterSpacing: '1px'
        }}>
          Bureau of Pharma PSUs of India
        </p>

        {/* Dynamic Spinner */}
        <div style={{ 
          width: '28px', 
          height: '28px', 
          border: '3px solid var(--border)',
          borderTop: '3px solid var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginTop: '24px'
        }} />
      </div>

      {/* Footer Trust Seals */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <span style={{
          fontSize: '10px',
          backgroundColor: 'var(--secondary)',
          color: '#ffffff',
          padding: '4px 10px',
          borderRadius: '12px',
          fontWeight: '800',
          textTransform: 'uppercase'
        }}>
          WHO-GMP CERTIFIED SUBSTITUTE SEARCH
        </span>
        <p style={{ fontSize: '11px', color: 'var(--text-light)', margin: 0 }}>
          Digital India &bull; Affordable Quality Medicines
        </p>
      </div>

      {/* Spin and Pulse Animation CSS Injection */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 94, 184, 0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 16px rgba(0, 94, 184, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 94, 184, 0); }
        }
      `}</style>
    </div>
  );
}
