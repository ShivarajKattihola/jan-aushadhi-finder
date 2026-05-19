import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Check, Plus, AlertCircle, Trash } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AdherenceRing from '../components/AdherenceRing';

export default function Reminders() {
  const { 
    reminders, 
    addMedReminder, 
    toggleReminderActive, 
    recordAdherence, 
    navigateBack,
    addToast
  } = useAppContext();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("1 Tablet");
  const [time, setTime] = useState("09:00");
  const [freq, setFreq] = useState("Daily");

  const todayStr = "2026-05-19"; // static system date matches mock data

  const handleAdd = (e) => {
    e.preventDefault();
    if (!medName) {
      addToast("Enter a valid drug name", "error");
      return;
    }
    addMedReminder({
      medicineName: medName,
      dosage,
      frequency: freq,
      time
    });
    setMedName("");
    setDrawerOpen(false);
  };

  // Calculations for daily adherence progress
  const activeReminders = reminders.filter(r => r.isActive);
  const totalCount = activeReminders.length;
  const takenCount = activeReminders.filter(r => r.takenDays.includes(todayStr)).length;
  const progressPct = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 100;

  return (
    <div className="screen-scroll-container fade-in" style={{ paddingBottom: '32px' }}>
      
      {/* Navigation Top */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0 12px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
        <button className="btn-icon-only" onClick={navigateBack}>
          <ArrowLeft size={16} />
        </button>
        <h3 className="title-md" style={{ margin: 0 }}>Medication Schedule</h3>
      </div>

      {/* Overview Adherence Dashboard Card */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '18px 16px', background: 'var(--surface-alt)' }}>
        <AdherenceRing value={progressPct} />
        
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '15px', color: 'var(--text-main)' }}>Today's Adherence</h4>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            You've taken <b>{takenCount} of {totalCount}</b> scheduled doses for today.
          </p>
          <div style={{
            fontSize: '11px',
            color: progressPct >= 80 ? 'var(--secondary-dark)' : 'var(--accent)',
            fontWeight: '700'
          }}>
            {progressPct >= 80 ? "🎉 Outstanding adherence rate!" : "⚠️ Log pending doses."}
          </div>
        </div>
      </div>

      {/* Header controls list */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 10px 0', padding: '0 4px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-light)' }}>
          DAILY SCHEDULED MEDS ({reminders.length})
        </h4>
        <button 
          className="btn btn-secondary" 
          style={{ width: 'auto', padding: '6px 12px', fontSize: '12px' }}
          onClick={() => setDrawerOpen(true)}
        >
          <Plus size={14} /> Add Reminder
        </button>
      </div>

      {/* Checklist items */}
      <div>
        {reminders.map((rem) => {
          const taken = rem.takenDays.includes(todayStr);
          return (
            <div 
              key={rem.id}
              className="card"
              style={{
                borderColor: taken ? 'var(--secondary)' : 'var(--border)',
                borderLeft: `4px solid ${taken ? 'var(--secondary)' : 'var(--primary)'}`,
                opacity: rem.isActive ? 1 : 0.6,
                padding: '14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                
                {/* Info */}
                <div style={{ flex: 1, paddingRight: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <h5 style={{ 
                      fontSize: '14px', 
                      color: taken ? 'var(--text-light)' : 'var(--text-main)',
                      textDecoration: taken ? 'line-through' : 'none',
                      fontWeight: '700'
                    }}>
                      {rem.medicineName}
                    </h5>
                    {!rem.isActive && (
                      <span className="generic-badge" style={{ backgroundColor: 'var(--border)', color: 'var(--text-light)', fontSize: '9px' }}>
                        MUTED
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text-light)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={11} /> {rem.time}
                    </span>
                    <span>{rem.dosage}</span>
                  </div>
                </div>

                {/* Checklist action */}
                {rem.isActive && (
                  <button
                    onClick={() => recordAdherence(rem.id, todayStr)}
                    className="btn-icon-only"
                    style={{
                      borderColor: taken ? 'var(--secondary)' : 'var(--border)',
                      backgroundColor: taken ? 'var(--secondary-light)' : 'transparent',
                      color: taken ? 'var(--secondary-dark)' : 'var(--text-light)'
                    }}
                  >
                    <Check size={16} />
                  </button>
                )}
              </div>

              {/* Bottom toggle controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '10px', fontSize: '11px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Adherence Status: {taken ? "🟢 Taken" : "🔴 Pending"}</span>
                <span 
                  onClick={() => toggleReminderActive(rem.id)}
                  style={{ color: 'var(--primary)', fontWeight: '700', cursor: 'pointer' }}
                >
                  {rem.isActive ? "Pause Alerts" : "Resume Alerts"}
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* --- ADD MEDICATION DRAWER MODAL --- */}
      {drawerOpen && (
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
        }} onClick={() => setDrawerOpen(false)}>
          
          <div 
            className="card slide-in-up" 
            style={{ width: '100%', maxWidth: '410px', margin: 0, borderRadius: '20px 20px 0 0', padding: '24px 16px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px' }}>Add Medicine to Daily Tracker</h3>
              <button className="btn-icon-only" style={{ border: 'none' }} onClick={() => setDrawerOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleAdd}>
              <div className="form-group">
                <label className="form-label">Active Medicine Compound / Brand</label>
                <input 
                  type="text" 
                  value={medName} 
                  onChange={(e) => setMedName(e.target.value)} 
                  className="input-field" 
                  placeholder="e.g. Paracetamol, Metformin..." 
                  required 
                />
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
