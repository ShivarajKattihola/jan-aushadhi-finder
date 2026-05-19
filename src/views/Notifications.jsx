import React, { useEffect } from 'react';
import { ArrowLeft, Bell, BellOff, CheckCircle, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Notifications() {
  const { notifications, markAllNotificationsRead, navigateBack } = useAppContext();

  // Mark all read as soon as they view this page
  useEffect(() => {
    markAllNotificationsRead();
  }, []);

  const getNotifIcon = (type) => {
    switch (type) {
      case 'savings':
        return <Sparkles size={16} color="var(--secondary)" />;
      case 'alert':
        return <AlertTriangle size={16} color="var(--error)" />;
      case 'reminder':
        return <CheckCircle size={16} color="var(--primary)" />;
      default:
        return <Bell size={16} color="var(--text-light)" />;
    }
  };

  return (
    <div className="screen-scroll-container fade-in" style={{ paddingBottom: '32px' }}>
      
      {/* Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0 12px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
        <button className="btn-icon-only" onClick={navigateBack}>
          <ArrowLeft size={16} />
        </button>
        <h3 className="title-md" style={{ margin: 0 }}>System Notifications</h3>
      </div>

      {notifications.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className="card fade-in"
              style={{
                borderColor: notif.read ? 'var(--border)' : 'var(--primary)',
                backgroundColor: notif.read ? 'var(--surface)' : 'var(--primary-light)',
                padding: '12px 14px',
                display: 'flex',
                gap: '12px',
                alignItems: 'start'
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                {getNotifIcon(notif.type)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2px' }}>
                  <h5 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
                    {notif.title}
                  </h5>
                  <span style={{ fontSize: '9px', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>
                    {notif.time}
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '16px' }}>
                  {notif.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: '32px 16px', textAlign: 'center' }}>
          <BellOff size={32} color="var(--text-light)" style={{ marginBottom: '12px', display: 'block', margin: '0 auto' }} />
          <h4 style={{ fontSize: '15px', marginBottom: '6px' }}>No Notifications</h4>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            You're all caught up! Real-time alerts on pharmacy inventories or price comparisons will appear here.
          </p>
        </div>
      )}

      {/* Trust message footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'var(--surface)',
        padding: '10px 12px',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--border)',
        fontSize: '11px',
        color: 'var(--text-muted)',
        marginTop: '20px'
      }}>
        <ShieldCheck size={16} color="var(--secondary)" />
        Patient notifications are HIPAA compliant and encrypted for secure transmission.
      </div>

    </div>
  );
}
