import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, Shield, FileText, CheckCircle, Copy, CreditCard, Search, ExternalLink } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SCHEMES_DATA = [
  {
    id: "scheme-1",
    name: "PM Bhartiya Janaushadhi Pariyojana (PMBJP)",
    description: "Democratizes premium healthcare by offering WHO-GMP certified high-quality generic alternative formulations at 50% to 90% discount ceilings.",
    benefits: "Direct retail discount up to 90% on chronic cardiovascular, diabetic, gastrointestinal, and respiratory prescriptions.",
    eligibility: "Open to all Indian residents. No income limits or documentation certificates required at retail counters.",
    documents: ["No documentation required (Present standard valid prescription from any registered practitioner)"],
    officialUrl: "http://janaushadhi.gov.in"
  },
  {
    id: "scheme-2",
    name: "Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    description: "The world's largest government-funded health assurance scheme, offering cashless secondary and tertiary hospitalization cover.",
    benefits: "Cashless clinical coverage up to ₹5 Lakhs per family per year for secondary and tertiary care hospitalization.",
    eligibility: "Specifically targeted to low-income, rural, and economically vulnerable families identified in SECC databases.",
    documents: ["Aadhaar Card", "Ration Card (BPL)", "SECC Letter copy", "Income Certificate"],
    officialUrl: "https://pmjay.gov.in"
  },
  {
    id: "scheme-3",
    name: "Ayushman Bharat Digital Mission (ABDM)",
    description: "Constructs digital healthcare infrastructure by linking diagnostic history logs, lab tests, and clinic prescriptions to your digital identity.",
    benefits: "Federated health record lockers, authenticated clinic sharing, and digital identity mapping across registered hospitals.",
    eligibility: "Open to all Indian citizens. Generates unique 14-digit ABHA IDs instantly using basic Aadhaar demographics.",
    documents: ["Aadhaar Card", "Mobile number linked to Aadhaar (for secure OTP validations)"],
    officialUrl: "https://abdm.gov.in"
  },
  {
    id: "scheme-4",
    name: "Rashtriya Swasthya Bima Yojana (RSBY)",
    description: "Government-supported health insurance program designed for unrecognized sector workers below the poverty line (BPL).",
    benefits: "Cashless clinical coverage up to ₹30,000 per family per year for defined medical procedures and transport costs.",
    eligibility: "Unorganized sector workers belonging to designated BPL categories.",
    documents: ["BPL Certificate", "Aadhaar Card", "Employer work certificate"],
    officialUrl: "https://rsby.gov.in"
  }
];

export default function GovernmentSchemes() {
  const { navigateBack, addToast } = useAppContext();
  
  // ABHA Form states
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("1996");
  const [gender, setGender] = useState("Male");
  const [cardGenerated, setCardGenerated] = useState(false);
  const [mockAbhaId, setMockAbhaId] = useState("");

  // Scheme Search States
  const [schemeQuery, setSchemeQuery] = useState("");
  const [filteredSchemes, setFilteredSchemes] = useState(SCHEMES_DATA);

  useEffect(() => {
    const q = schemeQuery.toLowerCase().trim();
    if (!q) {
      setFilteredSchemes(SCHEMES_DATA);
      return;
    }
    const filtered = SCHEMES_DATA.filter(scheme => 
      scheme.name.toLowerCase().includes(q) || 
      scheme.description.toLowerCase().includes(q)
    );
    setFilteredSchemes(filtered);
  }, [schemeQuery]);

  const handleGenerateCard = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast("Please enter your name to register digital ID", "error");
      return;
    }
    // Generate mock ID structure
    const randPart = () => Math.floor(1000 + Math.random() * 9000);
    setMockAbhaId(`91-${randPart()}-${randPart()}-${randPart()}`);
    setCardGenerated(true);
    addToast("Ayushman Bharat ABHA Health ID generated!", "success");
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(mockAbhaId);
    addToast("ABHA Health ID copied to clipboard!", "success");
  };

  const handleApplyScheme = (schemeName, url) => {
    addToast(`Redirecting to official ${schemeName} portal...`, "info");
    setTimeout(() => {
      window.open(url, '_blank');
    }, 1000);
  };

  return (
    <div className="screen-scroll-container fade-in" style={{ paddingBottom: '32px' }}>
      
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0 12px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
        <button className="btn-icon-only" onClick={navigateBack}>
          <ArrowLeft size={16} />
        </button>
        <h3 className="title-md" style={{ margin: 0 }}>Government Health Schemes</h3>
      </div>

      {/* Hero section */}
      <div className="card" style={{ background: 'var(--primary-light)', borderColor: 'var(--primary)' }}>
        <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>🏛️</span>
        <h4 style={{ color: 'var(--primary-dark)', fontSize: '15px', fontWeight: '800' }}>National Digital Health Mission</h4>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Access India's digital health infrastructure, generic subsidy programs, and clinical price control systems.
        </p>
      </div>

      {/* --- MOCK DIGITAL ABHA CARD PORTAL --- */}
      <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CreditCard size={16} color="var(--secondary)" /> Link ABHA Digital Health ID
        </h4>
        
        {!cardGenerated ? (
          <form onSubmit={handleGenerateCard}>
            <p style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '12px' }}>
              Ayushman Bharat Health Account (ABHA) registers your health identity to store and share clinical prescriptions digitally.
            </p>
            
            <div className="form-group" style={{ marginBottom: '10px' }}>
              <label className="form-label">Full Name (As in Aadhaar Card)</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Rohan Sharma" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Year of Birth</label>
                <input 
                  type="number" 
                  min="1920" 
                  max="2026"
                  className="input-field" 
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Gender</label>
                <select className="input-field" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-secondary">
              Generate Secure ABHA ID Card
            </button>
          </form>
        ) : (
          <div className="fade-in">
            {/* Generated ABHA Card Mockup */}
            <div style={{
              background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '16px'
            }}>
              {/* Seal Background */}
              <div style={{
                position: 'absolute',
                right: '-16px',
                bottom: '-16px',
                fontSize: '80px',
                opacity: 0.1,
                pointerEvents: 'none'
              }}>
                🏛️
              </div>

              {/* Top Banner */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: '800', opacity: 0.8, display: 'block' }}>
                    Government of India
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.2px' }}>
                    Ayushman Bharat Health Account
                  </span>
                </div>
                <div style={{ backgroundColor: 'white', color: '#0f766e', fontSize: '9px', fontWeight: '900', padding: '1px 5px', borderRadius: '3px' }}>
                  ABHA
                </div>
              </div>

              {/* Card Body */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                {/* Photo Placeholder */}
                <div style={{
                  width: '50px',
                  height: '60px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  👤
                </div>

                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: '13px', fontWeight: '800', margin: 0 }}>{name}</h5>
                  
                  <div style={{ fontSize: '10px', opacity: 0.9, marginTop: '4px' }}>
                    <span>YOB: <b>{birthYear}</b></span> &bull; <span>Gender: <b>{gender}</b></span>
                  </div>

                  {/* ABHA Number */}
                  <div style={{ 
                    fontSize: '13px', 
                    fontWeight: '800', 
                    letterSpacing: '1px', 
                    marginTop: '6px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    display: 'inline-block'
                  }}>
                    {mockAbhaId}
                  </div>
                </div>

                {/* CSS Barcode */}
                <div style={{
                  display: 'flex',
                  gap: '2px',
                  backgroundColor: 'white',
                  padding: '4px',
                  borderRadius: '4px',
                  height: '42px',
                  width: '42px',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ fontSize: '16px' }}>🔲</div>
                  <span style={{ fontSize: '6px', color: '#000', fontWeight: 'bold' }}>SCAN</span>
                </div>
              </div>

              {/* Verification Mark */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '9px', opacity: 0.8 }}>
                <span>National Health Authority</span>
                <span style={{ color: '#34d399', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <CheckCircle size={8} fill="#34d399" color="#fff" /> CLINICAL DATA RECORD LINKED
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-primary" onClick={handleCopyId} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Copy size={14} /> Copy Health ID
              </button>
              <button className="btn btn-secondary" onClick={() => setCardGenerated(false)} style={{ flex: 1 }}>
                Reset Details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- SCHEMES SEARCH & LISTING --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 4px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', margin: 0 }}>
          Active Healthcare Schemes
        </h4>
      </div>

      {/* Scheme Search Input */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <input
          type="text"
          className="input-field"
          style={{ paddingLeft: '36px', height: '36px', fontSize: '12px' }}
          placeholder="Search schemes by keywords (e.g. subsidy, cashless)..."
          value={schemeQuery}
          onChange={(e) => setSchemeQuery(e.target.value)}
        />
        <Search size={14} color="var(--text-light)" style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)'
        }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                <Award size={16} color="var(--primary)" /> {scheme.name}
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: '1.4' }}>
                {scheme.description}
              </p>

              {/* Eligibility & Benefits Callouts */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', marginBottom: '12px', padding: '8px 10px', backgroundColor: 'var(--surface-alt)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                <div>
                  <b style={{ color: 'var(--primary)' }}>⚡ Eligibility: </b>
                  <span style={{ color: 'var(--text-muted)' }}>{scheme.eligibility}</span>
                </div>
                <div>
                  <b style={{ color: 'var(--secondary-dark)' }}>🏆 Benefits: </b>
                  <span style={{ color: 'var(--text-muted)' }}>{scheme.benefits}</span>
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-light)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                  📋 Required Documents Checklist
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {scheme.documents.map((doc, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--secondary-dark)' }}>✔</span>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portal Application Link */}
              <button 
                className="btn btn-secondary" 
                style={{ margin: 0, height: '32px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                onClick={() => handleApplyScheme(scheme.name, scheme.officialUrl)}
              >
                <ExternalLink size={12} /> Apply on Govt Portal
              </button>
            </div>
          ))
        ) : (
          <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No government healthcare schemes match your keyword query.</p>
          </div>
        )}
      </div>

    </div>
  );
}
