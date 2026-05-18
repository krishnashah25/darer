import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ShieldAlert, LogIn } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          // Logged in successfully
          onLoginSuccess(data.user || { username });
          navigate('/');
        } else {
          setError(data.message || 'Invalid username or password!');
        }
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      // Fallback for mock environment (very helpful if backend server is not running)
      setError('Connection refused. Playing offline as Guest streamer!');
      setTimeout(() => {
        onLoginSuccess({ username, isMock: true });
        navigate('/');
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.authCard}>
        <div style={styles.header}>
          <h1 className="logo" style={styles.logo}>DARER</h1>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Log in to start getting dared</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <ShieldAlert size={16} color="#ff4a4a" />
            <span style={styles.errorText}>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} style={styles.form}>
          {/* Username */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !username || !password}
            className="btn-neon cyan"
            style={styles.submitBtn}
          >
            <LogIn size={16} />
            <span>{isLoading ? 'Logging in...' : 'Log In'}</span>
          </button>
        </form>

        <div style={styles.footer}>
          <span>Don't have an account? </span>
          <Link to="/signup" style={styles.signupLink}>Sign Up</Link>
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
  logo: {
    fontSize: '36px',
    fontWeight: '800',
    color: 'var(--primary-cyan)',
    letterSpacing: '2px',
    textShadow: '0 0 10px rgba(0, 255, 247, 0.4)',
    margin: '0 0 12px 0',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginTop: '6px',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'rgba(255, 74, 74, 0.08)',
    border: '1px solid rgba(255, 74, 74, 0.2)',
    padding: '12px 16px',
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
    gap: '20px',
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
    transition: 'border-color 0.2s',
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
  submitBtn: {
    width: '100%',
    padding: '10px',
    justifyContent: 'center',
    marginTop: '10px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  signupLink: {
    color: 'var(--accent-pink)',
    fontWeight: '700',
    textShadow: '0 0 5px rgba(255, 0, 255, 0.3)',
  },
};
