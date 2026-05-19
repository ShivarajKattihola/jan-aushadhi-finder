import React, { useState } from 'react';
import { ArrowLeft, User, Award, Shield, Heart, Star, LogOut, RefreshCw, Eye, WifiOff, Edit3, Save, Trash2, Settings, Bell, Hash, FileText, Plus, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Profile() {
  const { 
    currentUser, 
    navigateBack, 
    logout, 
    loginWithEmail, 
    addToast,
    offlineMode,
    savedMedicines,
    favoriteStores,
    medicines,
    stores,
    navigateTo,
    recentSearches,
    updateUserProfile
  } = useAppContext();

  // Safe active user profiles fallback
  const activeUser = currentUser || {
    name: "Rohan Sharma (Guest)",
    email: "rohan.sharma@gmail.com",
    phone: "+91 99887 76655",
    role: "customer",
    avatar: "https://api.dicebear.com/7.x/open-peeps/svg?seed=Rohan"
  };

  // --- EDIT PROFILE STATES ---
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(activeUser.name);
  const [emailInput, setEmailInput] = useState(activeUser.email);
  const [phoneInput, setPhoneInput] = useState(activeUser.phone);
  const [avatarSeed, setAvatarSeed] = useState("Rohan");

  // --- PREFERENCES STATES ---
  const [emailPref, setEmailPref] = useState(true);
  const [pushPref, setPushPref] = useState(true);
  const [smsPref, setSmsPref] = useState(false);

  // --- PRESCRIPTIONS DIGITAL HEALTH LOCKER ---
  const [prescriptions, setPrescriptions] = useState([
    { id: "pres-1", doctor: "Dr. A. K. Sahoo (Cardio)", date: "2026-05-10", diagnosis: "Hypertension Control", file: "prescription_cardiac_may2026.pdf" },
    { id: "pres-2", doctor: "Dr. Priya Rao (Diabetologist)", date: "2026-04-18", diagnosis: "Type 2 Diabetes", file: "report_hba1c_apr2026.pdf" }
  ]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadDocName, setUploadDocName] = useState("");
  const [uploadDiagnosis, setUploadDiagnosis] = useState("Hypertension Control");
  const [uploadFileName, setUploadFileName] = useState("prescription_may2026.pdf");

  // --- LOGOUT MODAL STATE ---
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (updateUserProfile) {
      updateUserProfile({
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        avatar: `https://api.dicebear.com/7.x/open-peeps/svg?seed=${avatarSeed}`
      });
    }
    setIsEditing(false);
    addToast("Profile details updated!", "success");
  };

  const handleCycleAvatar = () => {
    const seeds = ["Amit", "Rohan", "Sneha", "Pooja", "Vikram", "Kabir"];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    setAvatarSeed(randomSeed);
    addToast(`Avatar template updated to: ${randomSeed}`, "info");
  };

  const handleLinkPrescription = (e) => {
    e.preventDefault();
    if (!uploadDocName.trim()) {
      addToast("Please specify the prescribing doctor's name", "error");
      return;
    }
    const newPres = {
      id: `pres-${Date.now()}`,
      doctor: uploadDocName.trim(),
      date: new Date().toISOString().split('T')[0],
      diagnosis: uploadDiagnosis,
      file: uploadFileName.trim()
    };
    setPrescriptions([newPres, ...prescriptions]);
    setUploadDocName("");
    setShowUploadModal(false);
    addToast("Prescription linked to digital ABHA health locker!", "success");
  };

  const bookmarkedMeds = Array.isArray(medicines) && Array.isArray(savedMedicines)
    ? medicines.filter(m => savedMedicines.includes(m.id))
    : [];

  const handleToggleRole = () => {
    const targetRole = activeUser.role === 'customer' ? 'vendor' : 'customer';
    const email = targetRole === 'vendor' ? 'vendor@pmbjp.gov.in' : 'rohan.sharma@gmail.com';
    loginWithEmail(email, 'password', targetRole);
    addToast(`Switched active profile portal role to ${targetRole}!`, 'info');
  };

  return (
    <div className="screen-scroll-container fade-in" style={{ paddingBottom: '48px' }}>
      
      {/* Top Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0 12px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="btn-icon-only" onClick={navigateBack}>
            <ArrowLeft size={16} />
          </button>
          <h3 className="title-md" style={{ margin: 0 }}>My Health Account</h3>
        </div>
        <button className="btn-icon-only" onClick={() => navigateTo('settings')}>
          <Settings size={18} />
        </button>
      </div>

      {/* Temporary Test Text Verification banner */}
      <div style={{
        backgroundColor: 'var(--secondary-light)',
        color: 'var(--secondary-dark)',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '11px',
        fontWeight: '800',
        marginBottom: '16px',
        textAlign: 'center',
        border: '1px solid var(--secondary)'
      }}>
        🚀 TEXT: PROFILE SCREEN LOADED (Verified Stable Flow)
      </div>

      {/* --- EDIT MODE OR DISPLAY MODE --- */}
      {isEditing ? (
        <form onSubmit={handleSaveProfile} className="card" style={{ borderColor: 'var(--primary)', padding: '16px' }}>
          <h4 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--primary)' }}>Edit Profile Details</h4>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <img 
              src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${avatarSeed}`} 
              alt="Avatar avatar" 
              style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--border)', padding: '4px' }}
            />
            <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '11px', width: 'auto', margin: 0 }} onClick={handleCycleAvatar}>
              Change Avatar Logo
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Full Account Name</label>
            <input type="text" className="input-field" value={nameInput} onChange={(e) => setNameInput(e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="input-field" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="text" className="input-field" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} required />
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button type="button" className="btn btn-secondary" style={{ margin: 0 }} onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Save size={14} /> Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img 
              src={activeUser.avatar || `https://api.dicebear.com/7.x/open-peeps/svg?seed=${avatarSeed}`} 
              alt="Profile photo" 
              style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', padding: '2px', border: '2px solid var(--primary)', flexShrink: 0 }}
            />
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                {activeUser.name}
              </h4>
              <p style={{ fontSize: '11px', color: 'var(--text-light)', margin: '4px 0 2px 0' }}>
                ✉️ {activeUser.email}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-light)', margin: '0 0 4px 0' }}>
                📞 {activeUser.phone}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="generic-badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', textTransform: 'uppercase', fontSize: '9px', margin: 0 }}>
                  Role: {activeUser.role}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <Hash size={10} /> ID: PMBJP-84910
                </span>
              </div>
            </div>
          </div>
          
          <button className="btn btn-secondary" style={{ width: 'auto', padding: '6px', margin: 0 }} onClick={() => setIsEditing(true)}>
            <Edit3 size={14} />
          </button>
        </div>
      )}

      {/* Developer Role Switcher Quick Access */}
      <div className="card" style={{ borderColor: 'var(--primary)', background: 'var(--primary-light)', padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '700', display: 'block', color: 'var(--primary-dark)' }}>
              Developer Role Switcher
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              Toggle view between Customer and Vendor instantly
            </span>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: 'auto', padding: '6px 10px', fontSize: '11px', display: 'flex', gap: '4px', margin: 0 }}
            onClick={handleToggleRole}
          >
            <RefreshCw size={11} /> Switch Role
          </button>
        </div>
      </div>

      {/* --- PREFERENCES & CONFIGURATIONS --- */}
      <div className="card" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '12px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Bell size={14} color="var(--primary)" /> Notification Subscriptions
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px' }}>Email Dosage Schedules</span>
            <input type="checkbox" checked={emailPref} onChange={(e) => { setEmailPref(e.target.checked); addToast("Email preferences saved", "success"); }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
            <span style={{ fontSize: '12px' }}>Push Pill Alarms</span>
            <input type="checkbox" checked={pushPref} onChange={(e) => { setPushPref(e.target.checked); addToast("Push notifications saved", "success"); }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
            <span style={{ fontSize: '12px' }}>SMS OTP Refill Warnings</span>
            <input type="checkbox" checked={smsPref} onChange={(e) => { setSmsPref(e.target.checked); addToast("SMS alert subscription toggled", "info"); }} />
          </div>
        </div>
      </div>

      {/* --- CLINICAL RECENT SEARCH HISTORY --- */}
      <div className="card" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '12px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>🔎 Recent Search history</span>
          {recentSearches && recentSearches.length > 0 && (
            <button style={{ background: 'transparent', border: 'none', color: 'var(--error)', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }} onClick={() => addToast("Cache history purged!", "info")}>
              <Trash2 size={10} /> Clear
            </button>
          )}
        </h4>

        {recentSearches && recentSearches.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {recentSearches.map((term, i) => (
              <span key={i} className="generic-badge" style={{ backgroundColor: 'var(--surface-alt)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: '10px' }} onClick={() => navigateTo('search')}>
                {term}
              </span>
            ))}
          </div>
        ) : (
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            No recent search terms recorded.
          </span>
        )}
      </div>

      {/* --- DIGITAL PRESCRIPTIONS & REPORTS LOCKER --- */}
      {activeUser.role === 'customer' && (
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
              <FileText size={14} color="var(--primary)" /> Digital Health Locker
            </h4>
            <button 
              onClick={() => setShowUploadModal(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              <Plus size={12} /> Link Document
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {prescriptions.map((pres) => (
              <div 
                key={pres.id}
                style={{
                  padding: '8px 10px',
                  backgroundColor: 'var(--surface-alt)',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '800', display: 'block', color: 'var(--text-main)' }}>{pres.doctor}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)', display: 'block' }}>Diag: {pres.diagnosis} | Date: {pres.date}</span>
                  <span style={{ fontSize: '9px', color: 'var(--primary)', display: 'block', marginTop: '2px' }}>📄 {pres.file}</span>
                </div>
                <span className="generic-badge" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--secondary-dark)', margin: 0, fontSize: '9px' }}>
                  Linked ABHA
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- ADD DOCUMENT MODAL OVERLAY --- */}
      {showUploadModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(3px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <form onSubmit={handleLinkPrescription} className="card fade-in" style={{ width: '100%', maxWidth: '320px', padding: '18px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '12px', fontWeight: '800' }}>Link Medical Record</h4>
            
            <div className="form-group">
              <label className="form-label">Doctor / Lab Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Dr. S. K. Sen" 
                value={uploadDocName} 
                onChange={(e) => setUploadDocName(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Primary Diagnosis</label>
              <select 
                className="input-field" 
                value={uploadDiagnosis} 
                onChange={(e) => setUploadDiagnosis(e.target.value)}
              >
                <option>Hypertension Control</option>
                <option>Type 2 Diabetes</option>
                <option>Asthma &amp; Bronchitis</option>
                <option>General Bacterial Course</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Simulated PDF Filename</label>
              <input 
                type="text" 
                className="input-field" 
                value={uploadFileName} 
                onChange={(e) => setUploadFileName(e.target.value)} 
                required 
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button type="button" className="btn btn-secondary" style={{ margin: 0 }} onClick={() => setShowUploadModal(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ margin: 0 }}>
                Link PDF to ABHA
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Saved medicines list */}
      {activeUser.role === 'customer' && (
        <>
          {/* Clinical Medical History */}
          <div className="card">
            <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '10px', textTransform: 'uppercase' }}>
              🏥 Clinical Medical History
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Primary Diagnoses:</span>
                <b>Type 2 Diabetes, Hypertension</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Allergies:</span>
                <span style={{ color: 'var(--error)', fontWeight: '800' }}>Penicillin Compounds</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Next Refill Audit:</span>
                <b>June 04, 2026</b>
              </div>
            </div>
          </div>

          {/* Bookmarked Medicines Panel */}
          <div className="card">
            <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '10px', textTransform: 'uppercase' }}>
              Bookmarked Formulations ({bookmarkedMeds.length})
            </h4>
            {bookmarkedMeds.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {bookmarkedMeds.map(med => (
                  <div 
                    key={med.id} 
                    onClick={() => navigateTo('details', { medicine: med })}
                    style={{
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '8px 10px', 
                      backgroundColor: 'var(--surface-alt)', 
                      borderRadius: '6px',
                      cursor: 'pointer',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)', display: 'block' }}>{med.genericName}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Substitute for {med.name}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--secondary-dark)', fontWeight: '700' }}>
                      ₹{med.genericPrice.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '12px', color: 'var(--text-light)', fontStyle: 'italic', textAlign: 'center', margin: '10px 0' }}>
                No active bookmarked medicines yet.
              </p>
            )}
          </div>
        </>
      )}

      {/* Sign Out Card */}
      <button className="btn btn-secondary" style={{ borderColor: 'var(--error)', color: 'var(--error)', marginTop: '8px' }} onClick={() => setShowLogoutConfirm(true)}>
        <LogOut size={16} /> Sign Out Account
      </button>

      {/* App Version badge */}
      <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: 'var(--text-light)' }}>
        Jan-Aushadhi Finder v2.4.1-stabilized &bull; BPPI Certified
      </div>

      {/* --- CONFIRM LOGOUT MODAL DIALOG --- */}
      {showLogoutConfirm && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
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
