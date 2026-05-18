import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';

export default function Verify() {
  const [searchParams] = useSearchParams();
  const phone = searchParams.get('phone') || 'your phone number';
  const username = searchParams.get('username') || '';

  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return; // Allow numbers only

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Get last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace: move focus backwards
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate verifying API endpoints
      setTimeout(() => {
        setIsLoading(false);
        alert('Security verification successful! You can now log in.');
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError('Invalid OTP code. Please try again!');
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    alert(`A new 6-digit verification code has been sent to ${phone}!`);
    setOtp(Array(6).fill(''));
    inputRefs.current[0].focus();
  };

  const isComplete = otp.every(val => val !== '');

  return (
    <div style={styles.container}>
      <div style={styles.authCard}>
        <div style={styles.header}>
          <div style={styles.shieldIconWrapper}>
            <ShieldCheck size={36} color="var(--primary-cyan)" style={styles.shieldIcon} />
          </div>
          <h2 style={styles.title}>Security Verification</h2>
          <p style={styles.subtitle}>
            Enter the 6-digit OTP code sent to <strong style={{ color: '#fff' }}>{phone}</strong>
          </p>
        </div>

        {error && <div style={styles.errorText}>{error}</div>}

        <form onSubmit={handleOtpSubmit} style={styles.form}>
          <div style={styles.otpInputRow}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={{
                  ...styles.otpBox,
                  borderColor: digit !== '' ? 'var(--primary-cyan)' : 'var(--border-color)',
                  boxShadow: digit !== '' ? 'var(--shadow-glow-cyan)' : 'none',
                }}
                required
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!isComplete || isLoading}
            className="btn-neon cyan"
            style={{
              ...styles.submitBtn,
              backgroundColor: isComplete ? 'var(--primary-cyan)' : '#1e1e24',
              borderColor: isComplete ? 'var(--primary-cyan)' : 'var(--border-color)',
              color: isComplete ? '#000' : '#888',
            }}
          >
            <span>{isLoading ? 'Verifying...' : 'Verify OTP'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={styles.footer}>
          <button onClick={handleResend} style={styles.resendBtn}>
            <RefreshCw size={14} style={{ marginRight: '6px' }} />
            <span>Resend Code</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 140px)',
    width: '100%',
  },
  authCard: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '40px 32px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  shieldIconWrapper: {
    display: 'inline-flex',
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: 'rgba(0, 255, 247, 0.05)',
    border: '1.5px solid var(--primary-cyan)',
    boxShadow: 'var(--shadow-glow-cyan)',
    marginBottom: '16px',
  },
  shieldIcon: {
    filter: 'drop-shadow(var(--shadow-glow-cyan))',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: '12.5px',
    color: 'var(--text-secondary)',
    marginTop: '8px',
    lineHeight: '1.5',
  },
  errorText: {
    fontSize: '12.5px',
    color: '#ff4a4a',
    fontWeight: '600',
    backgroundColor: 'rgba(255, 74, 74, 0.08)',
    border: '1px solid rgba(255, 74, 74, 0.2)',
    padding: '10px 14px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  otpInputRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  otpBox: {
    width: '46px',
    height: '52px',
    backgroundColor: '#121217',
    border: '2px solid var(--border-color)',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '20px',
    fontWeight: '800',
    textAlign: 'center',
    outline: 'none',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  submitBtn: {
    width: '100%',
    padding: '10px',
    justifyContent: 'center',
    fontWeight: '800',
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px',
  },
  resendBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--accent-pink)',
    fontSize: '12.5px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'color 0.2s',
    textShadow: '0 0 5px rgba(255, 0, 255, 0.3)',
  },
};
