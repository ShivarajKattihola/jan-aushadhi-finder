import React, { useState } from 'react';
import { Camera, FileText, Sparkles, Check, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const PRESETS = [
  {
    name: "Standard Diabetes & BP Prescription",
    image: "📝",
    medicines: [
      { name: "Lipitor", strength: "20mg", mappedGeneric: "Atorvastatin", dosage: "1 Tablet, Before Bed" },
      { name: "Glucophage 500mg", strength: "500mg", mappedGeneric: "Metformin Hydrochloride", dosage: "1 Tablet, With Breakfast" }
    ]
  },
  {
    name: "Flu & Infection Prescription",
    image: "🗒️",
    medicines: [
      { name: "Augmentin 625 DUO", strength: "625mg", mappedGeneric: "Amoxicillin + Clavulanate Potassium", dosage: "1 Tablet, Twice Daily" },
      { name: "Calpol 650", strength: "650mg", mappedGeneric: "Paracetamol", dosage: "1 Tablet, As needed for fever" }
    ]
  }
];

export default function Scanner() {
  const { navigateTo, addMedReminder, medicines: dbMedicines, addToast } = useAppContext();
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState("");
  const [scanResult, setScanResult] = useState(null);

  const startScan = (preset) => {
    setSelectedPreset(preset);
    setScanning(true);
    setScanResult(null);

    // Simulate OCR reading steps
    const steps = [
      "Uploading prescription to secure clinical cloud...",
      "Analyzing handwritten doctor script utilizing AI OCR...",
      "Detecting primary chemical active compounds...",
      "Matching found brands with Jan Aushadhi generic alternatives...",
      "Calculating potential monthly medical expense savings..."
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        setScanStep(steps[currentStepIdx]);
        currentStepIdx++;
      } else {
        clearInterval(interval);
        finalizeScan(preset);
      }
    }, 1200);
  };

  const finalizeScan = (preset) => {
    // Process preset medicines and find price details from dbMedicines
    const mapped = preset.medicines.map(m => {
      const match = dbMedicines.find(dbm => dbm.name.toLowerCase() === m.name.toLowerCase());
      return {
        ...m,
        brandPrice: match ? match.brandPrice : 150.00,
        genericPrice: match ? match.genericPrice : 25.00,
        savingsPct: match ? match.savingsPct : 83,
        packSize: match ? match.packSize : "10 Tablets"
      };
    });

    const totalBranded = mapped.reduce((sum, item) => sum + item.brandPrice, 0);
    const totalGeneric = mapped.reduce((sum, item) => sum + item.genericPrice, 0);
    const totalSaved = totalBranded - totalGeneric;
    const avgSavingsPct = Math.round((totalSaved / totalBranded) * 100);

    setScanResult({
      medicines: mapped,
      totalBranded,
      totalGeneric,
      totalSaved,
      avgSavingsPct
    });
    setScanning(false);
    addToast("Prescription OCR scanning completed successfully!", "success");
  };

  const handleAddAllToReminders = () => {
    if (!scanResult) return;
    scanResult.medicines.forEach(med => {
      addMedReminder({
        medicineName: med.mappedGeneric,
        dosage: med.dosage,
        frequency: "Daily",
        time: med.dosage.includes("Breakfast") ? "08:30" : "21:30"
      });
    });
    addToast("All medications added to your daily schedule!", "success");
    navigateTo('reminders');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {!scanning && !scanResult && (
        <div className="card fade-in" style={{ textAlign: 'center', padding: '24px 16px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <Camera size={32} />
          </div>
          
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Smart Prescription Scanner</h3>
          <p className="body-md" style={{ marginBottom: '20px' }}>
            Upload or select an image of your prescription. Our secure AI extracts names and identifies affordable, certified generic matches.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input 
              type="file" 
              id="prescription-file-picker" 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  startScan(PRESETS[Math.floor(Math.random() * PRESETS.length)]);
                }
              }} 
            />
            <div style={{
              border: '2px dashed var(--border)',
              borderRadius: '8px',
              padding: '24px 12px',
              backgroundColor: 'var(--surface-alt)',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }} onClick={() => document.getElementById('prescription-file-picker').click()}>
              <Sparkles size={20} color="var(--primary)" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '14px', fontWeight: '700' }}>Select Prescription Image</div>
              <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>Supports JPEG, PNG up to 10MB</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
              <span style={{ fontSize: '11px', fontWeight: '700', padding: '0 8px', color: 'var(--text-light)' }}>OR DEMO PRESETS</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
            </div>

            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                className="btn btn-secondary"
                style={{ fontSize: '13px', padding: '10px' }}
                onClick={() => startScan(preset)}
              >
                <FileText size={16} /> {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {scanning && (
        <div className="card fade-in" style={{ padding: '24px 16px', textAlign: 'center' }}>
          <div className="scanner-container" style={{
            height: '160px',
            backgroundColor: 'var(--surface-alt)',
            border: '2px solid var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            <div className="scanner-glow-line" />
            <span style={{ transform: 'scale(1.5)', display: 'block' }}>
              {selectedPreset ? selectedPreset.image : "📝"}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '12px' }}>
            <span className="pulse-indicator" />
            <span className="pulse-indicator pulse-amber" />
            <span className="pulse-indicator pulse-red" />
          </div>

          <h4 style={{ fontSize: '15px', marginBottom: '4px' }}>AI OCR Scanner Active</h4>
          <p style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }} className="shimmer skeleton-text">
            {scanStep}
          </p>
        </div>
      )}

      {scanResult && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Savings celebration card */}
          <div className="card" style={{
            backgroundColor: 'var(--secondary-light)',
            borderColor: 'var(--secondary)',
            textAlign: 'center',
            padding: '20px 16px'
          }}>
            <span className="generic-badge" style={{ backgroundColor: 'var(--secondary)', color: 'white', marginBottom: '8px' }}>
              SAVINGS UNLOCKED
            </span>
            <h3 style={{ color: 'var(--secondary-dark)', fontSize: '28px', fontWeight: '800' }}>
              Save {scanResult.avgSavingsPct}%!
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Your monthly expenses drop from <b style={{ textDecoration: 'line-through' }}>₹{scanResult.totalBranded.toFixed(2)}</b> to <b>₹{scanResult.totalGeneric.toFixed(2)}</b>!
            </p>
          </div>

          <h4 style={{ fontSize: '14px', fontWeight: '700', paddingLeft: '4px' }}>EXTRACTED MEDICINES</h4>

          {scanResult.medicines.map((med, idx) => (
            <div key={idx} className="comparison-card">
              <div className="branded-side">
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-light)' }}>
                  PRESCRIBED BRAND
                </span>
                <span className="branded-name">{med.name} ({med.strength})</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ₹{med.brandPrice.toFixed(2)}
                </span>
              </div>
              <div className="generic-side">
                <div className="generic-name-row">
                  <div>
                    <span className="generic-badge" style={{ marginBottom: '2px', display: 'inline-block' }}>
                      GENERIC ALTERNATIVE
                    </span>
                    <h5 style={{ fontSize: '15px', color: 'var(--secondary-dark)' }}>{med.mappedGeneric}</h5>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Dosage: {med.dosage}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>₹{med.genericPrice.toFixed(2)}</div>
                    <div style={{ fontSize: '10px', color: 'var(--secondary-dark)', fontWeight: '700' }}>
                      Save {med.savingsPct}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
            <button className="btn btn-primary" onClick={handleAddAllToReminders}>
              <Check size={18} /> Add All To Daily Reminders
            </button>
            <button className="btn btn-secondary" onClick={() => navigateTo('store_locator')}>
              <ShoppingBag size={18} /> Locate Kendras with Stock
            </button>
            <button className="btn btn-ghost" style={{ padding: '8px' }} onClick={() => setScanResult(null)}>
              Scan Another Prescription
            </button>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--surface)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--border)',
            fontSize: '11px',
            color: 'var(--text-muted)'
          }}>
            <ShieldCheck size={16} color="var(--secondary)" />
            All Jan Aushadhi generic alternatives are WHO-GMP certified, bio-equivalent and identical in clinical potency to premium brands.
          </div>
        </div>
      )}
    </div>
  );
}
