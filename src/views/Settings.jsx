import React, { useState } from 'react';
import { ArrowLeft, Moon, Sun, Languages, Volume2, Shield, Info, Trash2, Camera, MapPin, HelpCircle, FileText, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Settings() {
  const { theme, toggleTheme, navigateBack, addToast, logout } = useAppContext();

  // --- SETTINGS TOGGLE STATES ---
  const [cameraPermission, setCameraPermission] = useState(true);
  const [geoPermission, setGeoPermission] = useState(true);
  const [restockAlerts, setRestockAlerts] = useState(true);
  const [pillReminderAlerts, setPillReminderAlerts] = useState(true);

  // --- COLLAPSIBLE ACCORDION STATES ---
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showTerms, setShowTerms] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  // --- LOGOUT DIALOG STATE ---
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to restore default application database? This clears all simulated changes.")) {
      localStorage.clear();
      addToast("Local database cleared. Reloading...", "info");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const faqs = [
    {
      q: "Are Jan Aushadhi generic medicines equivalent to branded ones?",
      a: "Absolutely. PMBJP generic formulations carry identical active pharmaceutical ingredients (APIs), strength, therapeutic dosage, and biological equivalence to premium branded equivalents, but cost 50% to 90% less."
    },
    {
      q: "How does the Prescription OCR scanner mapping work?",
      a: "Our scanner utilizes optical character recognition engines (OCR) to parse handwriting. It extracts the raw brand name, resolves typos using fuzzy matching databases, and instantly queries biological substitutes."
    },
    {
      q: "Is my medical diagnostic health data kept secure?",
      a: "Yes. All scanned records, ABHA health ID logs, and dosage calendar alarms remain strictly local on your hybrid mobile sandbox. We maintain full HIPAA and PMBJP confidentiality standards."
    }
  ];

  return (
    <div className="screen-scroll-container fade-in" style={{ paddingBottom: '48px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0 12px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
        <button className="btn-icon-only" onClick={navigateBack}>
          <ArrowLeft size={16} />
        </button>
        <h3 className="title-md" style={{ margin: 0 }}>Application Settings</h3>
      </div>

      {/* Display Theme settings */}
      <div className="card">
        <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '12px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />} Display contrast theme
        </h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '700', display: 'block' }}>
              {theme === 'dark' ? "Dark Mode Active" : "Light Mode Active"}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>
              Adjusts contrast for low-vision comfort
            </span>
          </div>

          <label className="switch">
            <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
            <span className="switch-slider" />
          </label>
        </div>
      </div>

      {/* Language Preferences */}
      <div className="card">
        <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '12px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Languages size={15} /> Language Options
        </h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: '700' }}>System Language</span>
          <select 
            className="input-field" 
            style={{ width: 'auto', padding: '6px 12px', fontSize: '12px' }}
            onChange={() => addToast("Language changed successfully", "success")}
          >
            <option>English</option>
            <option>हिन्दी (Hindi)</option>
            <option>ಕನ್ನಡ (Kannada)</option>
            <option>தமிழ் (Tamil)</option>
          </select>
        </div>
      </div>

      {/* Permissions Manager Panel */}
      <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🔒 Privacy &amp; Permissions Manager
        </h4>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '700', display: 'block', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Camera size={14} color="var(--primary)" /> Camera Access
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>Required to scan doctor handwritten scripts</span>
          </div>
          <input type="checkbox" checked={cameraPermission} onChange={(e) => { setCameraPermission(e.target.checked); addToast("Camera permissions updated", "info"); }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '700', display: 'block', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color="var(--primary)" /> Geolocation Access
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>Required to locate the nearest Kendra pharmacy</span>
          </div>
          <input type="checkbox" checked={geoPermission} onChange={(e) => { setGeoPermission(e.target.checked); addToast("Location permissions updated", "info"); }} />
        </div>
      </div>

      {/* Alarm Settings Panel */}
      <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ⏰ Med Reminders &amp; Alerts
        </h4>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '700', display: 'block' }}>Refill Reminders</span>
            <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>Receive daily notifications for schedule adherence</span>
          </div>
          <input type="checkbox" checked={pillReminderAlerts} onChange={(e) => { setPillReminderAlerts(e.target.checked); addToast("Pill reminder alerts toggled", "success"); }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '700', display: 'block' }}>Kendra Restock Alerts</span>
            <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>Receive alerts when low stock items arrive at Kendra</span>
          </div>
          <input type="checkbox" checked={restockAlerts} onChange={(e) => { setRestockAlerts(e.target.checked); addToast("Restock alert rules toggled", "info"); }} />
        </div>
      </div>

      {/* Help & Support Accordion (FAQ Drawers) */}
      <div className="card" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '12px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HelpCircle size={15} /> Help &amp; Support FAQs
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {faqs.map((faq, i) => {
            const isOpen = expandedFaq === i;
            return (
              <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <button 
                  onClick={() => toggleFaq(i)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    padding: '6px 0',
                    fontSize: '12px',
                    fontWeight: '800',
                    color: 'var(--text-main)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  <span>{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <p className="fade-in" style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: '1.4' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* About App / Terms and Privacy policy */}
      <div className="card" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '12px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={15} /> About &amp; Compliance Terms
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Terms Drawer */}
          <div>
            <button 
              onClick={() => setShowTerms(!showTerms)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                padding: '4px 0',
                fontSize: '12px',
                fontWeight: '700',
                color: 'var(--text-main)',
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <span>Clinical Terms of Use</span>
              <span>{showTerms ? "▲" : "▼"}</span>
            </button>
            {showTerms && (
              <p className="fade-in" style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: '1.4' }}>
                Generic alternatives shown on this platform conform strictly to the government NLEM list. Drug pricing ceilings are mapped from the National Pharmaceutical Pricing Authority (NPPA). Always consult a licensed clinical practitioner prior to swapping active prescription regimes.
              </p>
            )}
          </div>

          {/* About Drawer */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
            <button 
              onClick={() => setShowAbout(!showAbout)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                padding: '4px 0',
                fontSize: '12px',
                fontWeight: '700',
                color: 'var(--text-main)',
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <span>About Jan Aushadhi Finder</span>
              <span>{showAbout ? "▲" : "▼"}</span>
            </button>
            {showAbout && (
              <p className="fade-in" style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: '1.4' }}>
                Developed in coordination with PMBJP standards to democratize life-saving healthcare resources and maximize pricing transparencies. Built securely using high-contrast typography and local SQLite cache frameworks.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Database Reset Console */}
      <div className="card" style={{ borderColor: 'var(--error)', background: 'var(--error-light)' }}>
        <h4 style={{ fontSize: '14px', color: 'var(--error)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trash2 size={16} /> System Maintenance
        </h4>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Wipe simulated local storage transaction logs and restore defaults. Warning: This actions deletes added inventory, reviews, and reminder checklists.
        </p>
        <button className="btn btn-primary" style={{ backgroundColor: 'var(--error)', margin: 0 }} onClick={handleReset}>
          Reset Local Database
        </button>
      </div>

      {/* Logout Action Button at the very bottom of settings */}
      <button className="btn btn-secondary" style={{ borderColor: 'var(--error)', color: 'var(--error)', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => setShowLogoutConfirm(true)}>
        <LogOut size={16} /> Sign Out Account
      </button>

      {/* --- CONFIRM LOGOUT MODAL DIALOG --- */}
      {showLogoutConfirm && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="card fade-in" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--error)', width: '100%', maxWidth: '300px', padding: '20px', textAlign: 'center' }}>
            <h4 style={{ color: 'var(--error)', fontSize: '15px', fontWeight: '900', marginBottom: '8px' }}>Confirm Sign Out</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Are you sure you want to logout? This action will clear your active local persistent session logs.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary" style={{ margin: 0 }} onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" style={{ backgroundColor: 'var(--error)', margin: 0 }} onClick={() => { setShowLogoutConfirm(false); logout(); }}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
