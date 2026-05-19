import React, { useState } from 'react';
import { Mail, Lock, Phone, User, ShieldCheck, HelpCircle, ArrowLeft, LogIn } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Auth() {
  const { 
    currentScreen, 
    navigateTo, 
    loginWithEmail, 
    loginWithPhone, 
    googleSignIn, 
    registerUser,
    addToast
  } = useAppContext();

  // Sub-screens of Auth state: 'login' | 'signup' | 'otp' | 'forgot'
  const [subView, setSubView] = useState('login'); // default to login
  const [role, setRole] = useState('customer'); // default role: customer
  const [authMethod, setAuthMethod] = useState('email'); // 'email' | 'phone'

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [countdown, setCountdown] = useState(30);

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast("Please fill in all credentials", "error");
      return;
    }
    loginWithEmail(email, password, role);
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!phone) {
      addToast("Enter a valid phone number", "error");
      return;
    }
    setOtpSent(true);
    addToast("SMS sent! Mock Verification code is: 123456", "info");
    
    // Countdown simulation
    let time = 30;
    const interval = setInterval(() => {
      time--;
      setCountdown(time);
      if (time <= 0) clearInterval(interval);
    }, 1000);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otpCode !== '123456') {
      addToast("Invalid OTP code. Try entering 123456", "error");
      return;
    }
    loginWithPhone(phone, role);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      addToast("All fields are mandatory", "error");
      return;
    }
    registerUser(name, email, phone, password, role);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      addToast("Please input your registered email", "error");
      return;
    }
    addToast("Mock password reset link sent to your inbox!", "success");
    setSubView('login');
  };

  // Render header according to current state
  const renderHeader = () => {
    let title = "Welcome Back";
    let subtitle = "Sign in to access low cost healthcare";
    if (subView === 'signup') {
      title = "Create Account";
      subtitle = "Join Jan-Aushadhi Finder network";
    } else if (subView === 'forgot') {
      title = "Reset Password";
      subtitle = "We'll send recovery instructions";
    } else if (subView === 'otp') {
      title = "Verification";
      subtitle = "SMS verification required";
    }

    return (
      <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '20px' }}>
        <h2 className="title-lg" style={{ fontSize: '24px', fontWeight: '800' }}>{title}</h2>
        <p className="body-md" style={{ fontSize: '13px' }}>{subtitle}</p>
      </div>
    );
  };

  return (
    <div className="screen-scroll-container slide-in-up" style={{ paddingBottom: '32px' }}>
      
      {/* Back button (Only if not on default login) */}
      {subView !== 'login' && (
        <button 
          onClick={() => {
            if (subView === 'otp') setOtpSent(false);
            setSubView('login');
          }}
          className="btn-icon-only"
          style={{ position: 'absolute', top: '56px', left: '16px', zIndex: 10 }}
        >
          <ArrowLeft size={16} />
        </button>
      )}

      {/* Brand logo spacer */}
      <div style={{ textAlign: 'center', margin: '40px 0 10px 0' }}>
        <span style={{ fontSize: '36px' }}>💊</span>
      </div>

      {renderHeader()}

      {/* Role selector Tabs (Only on Login & Signup views) */}
      {(subView === 'login' || subView === 'signup') && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          backgroundColor: 'var(--surface-alt)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)',
          padding: '4px',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => setRole('customer')}
            style={{
              padding: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: '700',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'var(--transition)',
              backgroundColor: role === 'customer' ? 'var(--surface)' : 'transparent',
              color: role === 'customer' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: role === 'customer' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            Customer
          </button>
          <button
            onClick={() => setRole('vendor')}
            style={{
              padding: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: '700',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'var(--transition)',
              backgroundColor: role === 'vendor' ? 'var(--surface)' : 'transparent',
              color: role === 'vendor' ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: role === 'vendor' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            Kendra Vendor
          </button>
        </div>
      )}

      {/* --- SubView 1: Main Login Screen --- */}
      {subView === 'login' && (
        <div>
          {/* Method tabs */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
            <span 
              onClick={() => setAuthMethod('email')}
              style={{
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                color: authMethod === 'email' ? 'var(--primary)' : 'var(--text-light)',
                borderBottom: authMethod === 'email' ? '2px solid var(--primary)' : 'none',
                paddingBottom: '6px'
              }}
            >
              Email / Password
            </span>
            <span 
              onClick={() => setAuthMethod('phone')}
              style={{
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                color: authMethod === 'phone' ? 'var(--primary)' : 'var(--text-light)',
                borderBottom: authMethod === 'phone' ? '2px solid var(--primary)' : 'none',
                paddingBottom: '6px'
              }}
            >
              Phone SMS OTP
            </span>
          </div>

          {authMethod === 'email' ? (
            /* Email Login Form */
            <form onSubmit={handleEmailLogin}>
              <div className="form-group">
                <label className="form-label"><Mail size={12} style={{ marginRight: '4px' }} /> Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field" 
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '8px' }}>
                <label className="form-label"><Lock size={12} style={{ marginRight: '4px' }} /> Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field" 
                  placeholder="••••••••"
                  required
                />
              </div>

              <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <span 
                  onClick={() => setSubView('forgot')}
                  style={{ fontSize: '12px', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}
                >
                  Forgot Password?
                </span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginBottom: '16px' }}>
                Sign In <LogIn size={16} />
              </button>
            </form>
          ) : (
            /* Phone Number Login trigger */
            <form onSubmit={handleSendOTP}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label"><Phone size={12} style={{ marginRight: '4px' }} /> Mobile Number</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 12px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-btn)',
                    backgroundColor: 'var(--surface-alt)',
                    fontSize: '14px',
                    fontWeight: '700'
                  }}>+91</span>
                  <input 
                    type="tel" 
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field" 
                    placeholder="99999 99999"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginBottom: '16px' }}>
                Send Verification OTP
              </button>
            </form>
          )}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
            <span style={{ fontSize: '11px', fontWeight: '700', padding: '0 12px', color: 'var(--text-light)' }}>SECURE SIGN IN</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }} />
          </div>

          {/* Google Button */}
          <button 
            className="btn btn-secondary" 
            style={{ 
              marginBottom: '24px', 
              backgroundColor: 'var(--surface)', 
              borderColor: 'var(--border)', 
              color: 'var(--text-muted)' 
            }}
            onClick={() => googleSignIn(role)}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" style={{ marginRight: '4px' }}>
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.18 4.114-3.418 0-6.2-2.782-6.2-6.2s2.782-6.2 6.2-6.2c1.5 0 2.87.535 3.938 1.417L20.89 4.71C18.666 2.65 15.69 1.4 12.24 1.4 6.2 1.4 1.4 6.2 1.4 12.2s4.8 10.8 10.8 10.8c5.8 0 10.8-4.2 10.8-10.8 0-.693-.07-1.3-.21-1.915H12.24z"/>
            </svg>
            Continue with Google
          </button>

          {/* Navigation Links */}
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Don't have an account?{' '}
              <b style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => setSubView('signup')}>
                Create Profile
              </b>
            </span>
          </div>
        </div>
      )}

      {/* --- SubView 2: Sign Up Form --- */}
      {subView === 'signup' && (
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label"><User size={12} style={{ marginRight: '4px' }} /> Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field" 
              placeholder="Rohan Sharma"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label"><Mail size={12} style={{ marginRight: '4px' }} /> Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field" 
              placeholder="rohan.sharma@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label"><Phone size={12} style={{ marginRight: '4px' }} /> Mobile Number</label>
            <input 
              type="tel" 
              pattern="[0-9]{10}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field" 
              placeholder="99999 99999"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label"><Lock size={12} style={{ marginRight: '4px' }} /> Create Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field" 
              placeholder="Minimum 8 characters"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: '20px' }}>
            Register Profile <ShieldCheck size={16} />
          </button>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Already registered?{' '}
              <b style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => setSubView('login')}>
                Sign In Instead
              </b>
            </span>
          </div>
        </form>
      )}

      {/* --- SubView 3: Forgot Password Screen --- */}
      {subView === 'forgot' && (
        <form onSubmit={handleForgotPassword}>
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label"><Mail size={12} style={{ marginRight: '4px' }} /> Registered Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field" 
              placeholder="rohan.sharma@example.com"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginBottom: '16px' }}>
            Send Reset Instructions
          </button>
          
          <button 
            type="button" 
            className="btn btn-ghost" 
            onClick={() => setSubView('login')}
          >
            Cancel and Return
          </button>
        </form>
      )}

      {/* --- SubView 4: Phone OTP Code entry --- */}
      {otpSent && (
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
          alignItems: 'center',
          padding: '20px'
        }}>
          <div className="card slide-in-up" style={{ width: '100%', maxWidth: '360px', margin: 0 }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '28px' }}>💬</span>
              <h3 style={{ fontSize: '18px', marginTop: '8px' }}>Enter 6-Digit OTP</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Sent to +91 {phone}</p>
            </div>

            <form onSubmit={handleVerifyOTP}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <input 
                  type="text" 
                  maxLength="6"
                  pattern="[0-9]{6}"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="input-field" 
                  style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontWeight: '800' }}
                  placeholder="000000"
                  required
                  autoFocus
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginBottom: '12px' }}>
                Verify &amp; Continue
              </button>

              <div style={{ textAlign: 'center' }}>
                {countdown > 0 ? (
                  <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                    Resend code in {countdown}s
                  </span>
                ) : (
                  <span 
                    onClick={() => {
                      setCountdown(30);
                      addToast("Mock code sent again! Code: 123456", "info");
                    }}
                    style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Resend SMS OTP Code
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}
