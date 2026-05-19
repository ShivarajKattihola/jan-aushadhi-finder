import React, { useState } from 'react';
import { Sparkles, Shield, HeartPulse, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Onboarding() {
  const { navigateTo } = useAppContext();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      icon: <HeartPulse size={48} color="var(--primary)" />,
      title: "Smart Savings",
      desc: "Save up to 90% on your monthly healthcare bills by matching expensive branded medicines to WHO-certified generic alternatives."
    },
    {
      icon: <Shield size={48} color="var(--secondary)" />,
      title: "Government Verified",
      desc: "Every Jan-Aushadhi alternative is government approved, undergo strict testing, and hold identical bio-equivalent chemical standards."
    },
    {
      icon: <Sparkles size={48} color="var(--accent)" />,
      title: "Intelligent Scanner",
      desc: "Instantly scan handwritten doctor prescriptions with smart AI OCR to unlock immediate generic matches and set automatic refills."
    }
  ];

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      navigateTo('login');
    }
  };

  return (
    <div className="screen-scroll-container slide-in-up" style={{ paddingBottom: '24px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 38px)', justifyContent: 'space-between' }}>
      
      {/* Top Brand Logo */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '12px',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
          fontSize: '28px',
          fontWeight: '800',
          marginBottom: '8px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          💊
        </div>
        <h1 className="title-lg" style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)' }}>
          Jan-Aushadhi Finder
        </h1>
        <p className="label-md" style={{ color: 'var(--secondary-dark)', fontWeight: '700' }}>
          Affordable Healthcare Initiatives
        </p>
      </div>

      {/* Main onboarding Slide */}
      <div className="card fade-in" style={{ padding: '24px 16px', margin: '24px 0', border: '1px solid var(--border)' }} key={slide}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          {slides[slide].icon}
        </div>
        <h2 className="title-md" style={{ textAlign: 'center', marginBottom: '8px' }}>
          {slides[slide].title}
        </h2>
        <p className="body-md" style={{ textAlign: 'center', fontSize: '14px' }}>
          {slides[slide].desc}
        </p>
      </div>

      {/* Action Footer */}
      <div>
        {/* Pagination Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {slides.map((_, idx) => (
            <span
              key={idx}
              style={{
                width: idx === slide ? '20px' : '8px',
                height: '8px',
                borderRadius: '99px',
                backgroundColor: idx === slide ? 'var(--primary)' : 'var(--border)',
                transition: 'var(--transition)'
              }}
            />
          ))}
        </div>

        <button className="btn btn-primary" onClick={handleNext} style={{ marginBottom: '10px' }}>
          {slide === slides.length - 1 ? "Get Started" : "Continue"} <ArrowRight size={18} />
        </button>

        <button className="btn btn-ghost" onClick={() => navigateTo('login')} style={{ fontSize: '13px' }}>
          Skip Onboarding
        </button>
      </div>
    </div>
  );
}
