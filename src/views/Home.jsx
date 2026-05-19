import React, { useState } from 'react';
import { Search, Sparkles, TrendingDown, ArrowRight, Award, Plus, Calendar, Bell, HelpCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AdherenceRing from '../components/AdherenceRing';

export default function Home() {
  const { 
    currentUser, 
    navigateTo, 
    reminders, 
    recordAdherence, 
    reviews,
    stores,
    notifications
  } = useAppContext();

  const [searchVal, setSearchVal] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal) {
      navigateTo('search', { query: searchVal });
    } else {
      navigateTo('search');
    }
  };

  // Calculate today's adherence progress
  const todayStr = "2026-05-19"; // static date matches mock clock
  const activeReminders = reminders.filter(r => r.isActive);
  const totalRems = activeReminders.length;
  const takenRems = activeReminders.filter(r => r.takenDays.includes(todayStr)).length;
  const adherencePct = totalRems > 0 ? Math.round((takenRems / totalRems) * 100) : 100;

  // Unread notifications count
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <div className="screen-scroll-container fade-in">
      
      {/* Dashboard Top Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0 10px 0',
        marginBottom: '10px'
      }}>
        <div>
          <span className="label-md">Welcome Back,</span>
          <h3 style={{ fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>👋 {currentUser ? currentUser.name.split(' ')[0] : 'Guest'}</span>
          </h3>
        </div>
        
        {/* Right side alert bell */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-icon-only" 
            onClick={() => navigateTo('notifications')}
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            {unreadNotifCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '16px',
                height: '16px',
                backgroundColor: 'var(--error)',
                color: '#ffffff',
                fontSize: '9px',
                fontWeight: '800',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {unreadNotifCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Global Quick Search Form */}
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: '18px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="input-field"
            style={{
              paddingLeft: '44px',
              borderRadius: 'var(--radius-pill)',
              borderWidth: '1.5px',
              borderColor: 'var(--primary)'
            }}
            placeholder="Search branded drugs (e.g. Lipitor, Calpol)..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <Search size={18} color="var(--primary)" style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)'
          }} />
        </div>
      </form>

      {/* Primary Hero: Savings Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: '#ffffff',
        border: 'none',
        padding: '20px 16px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          right: '-20px',
          bottom: '-20px',
          fontSize: '110px',
          opacity: 0.12,
          pointerEvents: 'none'
        }}>
          🛡️
        </div>
        
        <span className="generic-badge" style={{ backgroundColor: 'var(--secondary)', color: '#ffffff', marginBottom: '8px', display: 'inline-block' }}>
          NATIONAL HEALTH SCHEME
        </span>
        <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>
          Generic Meds Save Up to 90%
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--primary-light)', marginBottom: '16px', maxWidth: '85%' }}>
          Jan Aushadhi alternatives are WHO-GMP certified, identical in strength but cost a fraction of retail prices.
        </p>

        <div style={{
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-card)',
          padding: '10px 12px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: 'var(--primary-light)' }}>
              Avg. Monthly Savings
            </div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>
              ₹1,840.00 / Patient
            </div>
          </div>
          <button 
            className="btn btn-success" 
            style={{ width: 'auto', padding: '6px 12px', fontSize: '12px', borderRadius: '4px' }}
            onClick={() => navigateTo('search')}
          >
            Compare Prices <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Dynamic 4-Button Quick Utilities Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        marginBottom: '16px'
      }}>
        
        {/* OCR Prescription Scanner */}
        <button 
          onClick={() => navigateTo('prescription_scanner')}
          className="card card-interactive"
          style={{
            padding: '12px',
            margin: 0,
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            borderLeft: '3px solid var(--primary)',
            background: 'var(--surface)',
            borderTop: 'none',
            borderRight: 'none',
            borderBottom: 'none',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '18px' }}>📷</span>
          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-main)' }}>Prescription OCR</span>
          <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Scan doctor handwritten scripts</span>
        </button>

        {/* Real-time Savings Calculator */}
        <button 
          onClick={() => navigateTo('savings_calculator')}
          className="card card-interactive"
          style={{
            padding: '12px',
            margin: 0,
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            borderLeft: '3px solid var(--secondary)',
            background: 'var(--surface)',
            borderTop: 'none',
            borderRight: 'none',
            borderBottom: 'none',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '18px' }}>🧮</span>
          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-main)' }}>Savings Calculator</span>
          <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Compare drug bills side-by-side</span>
        </button>

        {/* Government Schemes / ABHA ID */}
        <button 
          onClick={() => navigateTo('government_schemes')}
          className="card card-interactive"
          style={{
            padding: '12px',
            margin: 0,
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            borderLeft: '3px solid var(--primary)',
            background: 'var(--surface)',
            borderTop: 'none',
            borderRight: 'none',
            borderBottom: 'none',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '18px' }}>🏛️</span>
          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-main)' }}>Gov Schemes</span>
          <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Link digital ABHA Health ID</span>
        </button>

        {/* Stock Replenishment / Kendra Booking */}
        <button 
          onClick={() => navigateTo('stock_request')}
          className="card card-interactive"
          style={{
            padding: '12px',
            margin: 0,
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            borderLeft: '3px solid var(--secondary)',
            background: 'var(--surface)',
            borderTop: 'none',
            borderRight: 'none',
            borderBottom: 'none',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '18px' }}>📦</span>
          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-main)' }}>Kendra Booking</span>
          <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Book generic strip stock</span>
        </button>

      </div>

      {/* Adherence and Reminders Checklist */}
      <div className="card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h4 style={{ fontSize: '15px' }}>Daily Refills &amp; Adherence</h4>
            <span style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: '600' }}>Medication Schedule</span>
          </div>
          <button 
            className="btn btn-ghost" 
            style={{ width: 'auto', padding: '4px 8px', fontSize: '12px', color: 'var(--primary)' }}
            onClick={() => navigateTo('reminders')}
          >
            Manage Schedule
          </button>
        </div>

        {totalRems > 0 ? (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <AdherenceRing value={adherencePct} />
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeReminders.slice(0, 2).map((rem) => {
                const taken = rem.takenDays.includes(todayStr);
                return (
                  <div 
                    key={rem.id} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--surface-alt)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: taken ? 'var(--text-light)' : 'var(--text-main)', textDecoration: taken ? 'line-through' : 'none' }}>
                        {rem.medicineName}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-light)' }}>
                        {rem.time} • {rem.dosage}
                      </div>
                    </div>
                    
                    <input
                      type="checkbox"
                      checked={taken}
                      onChange={() => recordAdherence(rem.id, todayStr)}
                      style={{
                        width: '18px',
                        height: '18px',
                        accentColor: 'var(--secondary)',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                );
              })}
              {activeReminders.length > 2 && (
                <div style={{ fontSize: '11px', textAlign: 'center', color: 'var(--text-light)', fontWeight: '600' }}>
                  + {activeReminders.length - 2} more medications scheduled
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>No active medical reminders set today.</p>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', width: 'auto', fontSize: '12px' }} onClick={() => navigateTo('reminders')}>
              <Plus size={14} /> Add Medicine Reminder
            </button>
          </div>
        )}
      </div>

      {/* Nearest Store Locator */}
      <div className="card card-interactive" style={{ padding: '14px 16px' }} onClick={() => navigateTo('store_locator')}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h4 style={{ fontSize: '15px' }}>Store Locator</h4>
          <span style={{
            fontSize: '11px',
            backgroundColor: 'var(--secondary-light)',
            color: 'var(--secondary-dark)',
            padding: '2px 8px',
            borderRadius: '10px',
            fontWeight: '700'
          }}>
            {stores[0].distance} km Away
          </span>
        </div>
        <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
          {stores[0].name}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          {stores[0].address.substring(0, 60)}...
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '10px',
          color: 'var(--primary)',
          fontSize: '12px',
          fontWeight: '700'
        }}>
          Open Map &amp; Pincode Finder <ArrowRight size={14} />
        </div>
      </div>

      {/* 🚨 Emergency Medical Support Box */}
      <div className="card" style={{ borderColor: 'var(--error)', background: 'var(--error-light)', padding: '14px 16px', margin: '0 0 16px 0' }}>
        <h4 style={{ fontSize: '14px', color: 'var(--error)', fontWeight: '800', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🚨 Emergency Medical Support
        </h4>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.4' }}>
          Instantly connect with national health support channels or locate government civil emergency units:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <a href="tel:102" className="btn btn-secondary" style={{ borderColor: 'var(--error)', color: 'var(--error)', margin: 0, padding: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', textDecoration: 'none' }}>
            📞 Ambulance (102)
          </a>
          <a href="tel:112" className="btn btn-secondary" style={{ borderColor: 'var(--error)', color: 'var(--error)', margin: 0, padding: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', textDecoration: 'none' }}>
            📞 Emergency (112)
          </a>
        </div>
      </div>

      {/* Customer Review Ticker */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 4px' }}>
          <h4 style={{ fontSize: '15px' }}>Verified Savings Stories</h4>
          <button 
            className="btn btn-ghost" 
            style={{ width: 'auto', padding: '0', fontSize: '12px', color: 'var(--primary)' }}
            onClick={() => navigateTo('reviews')}
          >
            View Feed
          </button>
        </div>
        
        <div className="card" style={{ padding: '12px 14px', margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700' }}>{reviews[0].userName}</span>
            <div style={{ color: 'var(--accent)', fontSize: '12px' }}>
              {"★".repeat(reviews[0].rating)}
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            "{reviews[0].comment.substring(0, 120)}..."
          </p>
          <div style={{ fontSize: '10px', color: 'var(--secondary-dark)', fontWeight: '700', marginTop: '6px' }}>
            Saved ₹₹ for salt: {reviews[0].medicineName}
          </div>
        </div>
      </div>

    </div>
  );
}
