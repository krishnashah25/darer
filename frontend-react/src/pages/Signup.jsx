import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ShieldAlert, UserPlus } from 'lucide-react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // DOB states
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  // Validate form completeness in real-time
  useEffect(() => {
    const valid =
      username.trim() !== '' &&
      password.length >= 6 &&
      phone.length >= 10 &&
      month !== '' &&
      day !== '' &&
      year !== '';
    setIsFormValid(valid);
  }, [username, password, phone, month, day, year]);

  // Date generators
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 121 }, (_, i) => currentYear - i); // 120 years back

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setError('');

    const dobString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, phone, dob: dobString }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.exists) {
          setError('User already exists! Please try another username.');
        } else {
          // Success! Redirect to OTP Verification page
          alert('Signup success! Please verify your phone number using the OTP.');
          navigate(`/verify?phone=${encodeURIComponent(phone)}&username=${encodeURIComponent(username)}`);
        }
      } else {
        setError(data.message || 'Registration failed. Try again.');
      }
    } catch (err) {
      console.error('Signup connection error:', err);
      // Fallback to local offline mode to verify the visual OTP flow anyway!
      alert('Local Mock Fallback: Moving to verification page.');
      navigate(`/verify?phone=${encodeURIComponent(phone)}&username=${encodeURIComponent(username)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.authCard}>
        <div style={styles.header}>
          <h1 className="logo" style={styles.logo}>DARER</h1>
          <h2 style={styles.title}>Join the Platform</h2>
          <p style={styles.subtitle}>Create your profile to challenge streamers</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <ShieldAlert size={16} color="#ff4a4a" />
            <span style={styles.errorText}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignupSubmit} style={styles.form}>
          {/* Username */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Pick a unique username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password (min 6 characters)</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? <EyeOff size={16} color="#9ea4b0" /> : <Eye size={16} color="#9ea4b0" />}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              placeholder="e.g. +1 555-019-2834"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* DOB Select Group */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Date of Birth</label>
            <div style={styles.dobSelectors}>
              {/* Month */}
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={styles.select}
                required
              >
                <option value="">Month</option>
                {months.map((m, index) => (
                  <option key={m} value={String(index + 1)}>{m}</option>
                ))}
              </select>

              {/* Day */}
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                style={styles.select}
                required
              >
                <option value="">Day</option>
                {days.map((d) => (
                  <option key={d} value={String(d)}>{d}</option>
                ))}
              </select>

              {/* Year */}
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={styles.select}
                required
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="btn-neon pink"
            style={{
              ...styles.submitBtn,
              backgroundColor: isFormValid ? 'var(--accent-pink)' : '#1e1e24',
              borderColor: isFormValid ? 'var(--accent-pink)' : 'var(--border-color)',
            }}
          >
            <UserPlus size={16} />
            <span>{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
          </button>
        </form>

        <div style={styles.footer}>
          <span>Already registered? </span>
          <Link to="/login" style={styles.loginLink}>Log In</Link>
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
    minHeight: 'calc(100vh - 100px)',
    width: '100%',
  },
  authCard: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '32px 28px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  logo: {
    fontSize: '32px',
    fontWeight: '800',
    color: 'var(--primary-cyan)',
    letterSpacing: '2px',
    textShadow: '0 0 10px rgba(0, 255, 247, 0.4)',
    margin: '0 0 8px 0',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginTop: '4px',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'rgba(255, 74, 74, 0.08)',
    border: '1px solid rgba(255, 74, 74, 0.2)',
    padding: '10px 14px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  errorText: {
    fontSize: '12.5px',
    color: '#ff4a4a',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12.5px',
    fontWeight: '700',
    color: '#eee',
  },
  input: {
    backgroundColor: '#121217',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '10px 16px',
    color: '#fff',
    outline: 'none',
    fontSize: '14px',
  },
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  eyeBtn: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  dobSelectors: {
    display: 'flex',
    gap: '8px',
  },
  select: {
    flex: 1,
    backgroundColor: '#121217',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '10px 12px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
  },
  submitBtn: {
    width: '100%',
    padding: '10px',
    justifyContent: 'center',
    marginTop: '10px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  loginLink: {
    color: 'var(--primary-cyan)',
    fontWeight: '700',
    textShadow: '0 0 5px rgba(0, 255, 247, 0.3)',
  },
};
