import React, { useState } from 'react';
import { ArrowLeft, Clock, ShieldCheck, Plus, Sparkles, Award, Star, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function MedicineDetails() {
  const { 
    selectedMedicine, 
    navigateBack, 
    addMedReminder, 
    reviews, 
    addToast,
    navigateTo,
    savedMedicines,
    toggleSaveMedicine
  } = useAppContext();

  const [reminderDrawerOpen, setReminderDrawerOpen] = useState(false);
  const [dosage, setDosage] = useState("1 Tablet");
  const [time, setTime] = useState("09:00");
  const [freq, setFreq] = useState("Daily");

  // Fallback if none selected
  if (!selectedMedicine) {
    return (
      <div className="screen-scroll-container">
        <button className="btn btn-primary" onClick={navigateBack}>Go Back</button>
      </div>
    );
  }

  // Filter reviews matching the current medicine
  const medReviews = reviews.filter(r => 
    r.medicineName.toLowerCase().includes(selectedMedicine.genericName.toLowerCase()) ||
    selectedMedicine.genericName.toLowerCase().includes(r.medicineName.toLowerCase())
  );

  const handleCreateReminder = (e) => {
    e.preventDefault();
    addMedReminder({
      medicineName: selectedMedicine.genericName,
      dosage,
      frequency: freq,
      time
    });
    setReminderDrawerOpen(false);
  };

  return (
    <div className="screen-scroll-container fade-in" style={{ paddingBottom: '32px' }}>
      
      {/* Top Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0 12px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="btn-icon-only" onClick={navigateBack}>
            <ArrowLeft size={16} />
          </button>
          <h3 className="title-md" style={{ margin: 0 }}>Clinical Formulation</h3>
        </div>
        <button 
          className="btn-icon-only" 
          onClick={() => toggleSaveMedicine(selectedMedicine.id)}
          style={{ 
            color: savedMedicines.includes(selectedMedicine.id) ? '#EF4444' : 'var(--text-light)',
            borderColor: savedMedicines.includes(selectedMedicine.id) ? '#FCA5A5' : 'var(--border)'
          }}
        >
          <Star size={16} fill={savedMedicines.includes(selectedMedicine.id) ? '#EF4444' : 'transparent'} />
        </button>
      </div>

      {/* Main Header Card */}
      <div className="card" style={{ borderColor: 'var(--secondary)', borderLeft: '5px solid var(--secondary)' }}>
        <span className="generic-badge" style={{ marginBottom: '6px', display: 'inline-block' }}>
          WHO-GMP BIO-EQUIVALENT SALT
        </span>
        <h2 className="title-md" style={{ color: 'var(--text-main)', fontSize: '20px' }}>{selectedMedicine.genericName}</h2>
        <p className="body-md" style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
          <b>Branded alternative to:</b> {selectedMedicine.name} ({selectedMedicine.manufacturer})
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          backgroundColor: 'var(--surface-alt)',
          padding: '10px',
          borderRadius: '6px',
          fontSize: '12px',
          marginBottom: '14px',
          border: '1px solid var(--border)'
        }}>
          <div>
            <span style={{ color: 'var(--text-light)', display: 'block' }}>Branded Retail Price</span>
            <span style={{ fontWeight: '600', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              ₹{selectedMedicine.brandPrice.toFixed(2)}
            </span>
          </div>
          <div>
            <span style={{ color: 'var(--secondary-dark)', display: 'block', fontWeight: '700' }}>Jan Aushadhi Price</span>
            <span style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '14px' }}>
              ₹{selectedMedicine.genericPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '700' }}>
            Savings: ₹{(selectedMedicine.brandPrice - selectedMedicine.genericPrice).toFixed(2)} ({selectedMedicine.savingsPct}%)
          </span>
          <span style={{
            fontSize: '11px',
            backgroundColor: 'var(--secondary)',
            color: '#ffffff',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: '700'
          }}>
            WHO-GMP Certified
          </span>
        </div>
      </div>

      {/* Quick Actions Drawer Trigger */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <button className="btn btn-primary" onClick={() => setReminderDrawerOpen(true)}>
          <Plus size={16} /> Add Refill Tracker
        </button>
        <button className="btn btn-secondary" onClick={() => navigateTo('store_locator')}>
          Locate Stores
        </button>
      </div>

      {/* Composition Description */}
      <div className="card" style={{ padding: '14px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Award size={14} color="var(--primary)" /> Chemical Composition
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{selectedMedicine.composition}</p>
      </div>

      {/* Primary Uses */}
      <div className="card" style={{ padding: '14px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '6px' }}>Therapeutic Uses</h4>
        <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {selectedMedicine.uses.map((use, idx) => (
            <li key={idx}>{use}</li>
          ))}
        </ul>
      </div>

      {/* Side Effects */}
      <div className="card" style={{ padding: '14px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '6px', color: 'var(--text-muted)' }}>Common Side Effects</h4>
        <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {selectedMedicine.sideEffects.map((side, idx) => (
            <li key={idx}>{side}</li>
          ))}
        </ul>
      </div>

      {/* Precautions */}
      <div className="card" style={{ padding: '14px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '6px', color: 'var(--error)' }}>Clinical Precautions</h4>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{selectedMedicine.precautions}</p>
      </div>

      {/* Medicine specific Review feed */}
      <div style={{ marginBottom: '10px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '10px', paddingLeft: '4px' }}>Patient Feedback</h4>
        
        {medReviews.length > 0 ? (
          medReviews.map((rev) => (
            <div key={rev.id} className="card" style={{ padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700' }}>{rev.userName}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--accent)', fontSize: '11px' }}>
                  <Star size={10} fill="var(--accent)" /> {rev.rating} / 5
                </div>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                "{rev.comment}"
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '10px', color: 'var(--text-light)' }}>
                <span>{rev.date}</span>
                <span>👍 {rev.likes} helpful votes</span>
              </div>
            </div>
          ))
        ) : (
          <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No feedback reviews registered yet for {selectedMedicine.genericName}.</p>
          </div>
        )}
      </div>

      {/* --- ADD REFILL TRACKER DRAWER OVERLAY --- */}
      {reminderDrawerOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(9, 28, 53, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end'
        }} onClick={() => setReminderDrawerOpen(false)}>
          
          <div 
            className="card slide-in-up" 
            style={{ width: '100%', maxWidth: '410px', margin: 0, borderRadius: '20px 20px 0 0', padding: '24px 16px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px' }}>Set Adherence Reminder</h3>
              <button className="btn-icon-only" style={{ border: 'none' }} onClick={() => setReminderDrawerOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateReminder}>
              <div className="form-group">
                <label className="form-label">Active Chemical Compound</label>
                <input type="text" className="input-field" value={selectedMedicine.genericName} disabled />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Single Dosage</label>
                  <select className="input-field" value={dosage} onChange={(e) => setDosage(e.target.value)}>
                    <option>1 Tablet</option>
                    <option>2 Tablets</option>
                    <option>1 Capsule</option>
                    <option>1 Spray/Puff</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Time of Day</label>
                  <input type="time" className="input-field" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Reminder Frequency</label>
                <select className="input-field" value={freq} onChange={(e) => setFreq(e.target.value)}>
                  <option>Daily</option>
                  <option>Twice Daily</option>
                  <option>Every Other Day</option>
                  <option>Weekly</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Add to Daily Checklist
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
