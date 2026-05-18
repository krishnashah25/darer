import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Trophy, Compass, PlusCircle, LogIn, UserPlus } from 'lucide-react';

export default function Header({ user, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header style={styles.header}>
      {/* Left side: Logo & Navigation */}
      <div style={styles.left}>
        <Link to="/" style={styles.logoLink}>
          <h1 className="logo" style={styles.logoText}>DARER</h1>
        </Link>
        <div style={styles.navLinks}>
          <Link to="/browse" style={styles.navLinkItem}>
            <Compass size={18} color="#00fff7" />
            <span style={styles.navText}>Browse</span>
          </Link>
          <Link to="/profile/Taylien" style={styles.navLinkItem}>
            <Trophy size={18} color="#ff00ff" />
            <span style={styles.navText}>Leader Board</span>
          </Link>
        </div>
      </div>

      {/* Middle: Search Box */}
      <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search streamers, games, dares..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchButton}>
            <Search size={18} color="#9ea4b0" />
          </button>
        </div>
      </form>

      {/* Right side: Auth state */}
      <div style={styles.right}>
        {user ? (
          <div style={styles.userContainer}>
            <Link to={`/profile/${user.username}`} style={styles.profileBtn}>
              <img
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                alt="Profile"
                style={styles.profileAvatar}
              />
              <span style={styles.profileName}>{user.username}</span>
            </Link>
            <button onClick={onLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        ) : (
          <div style={styles.authButtons}>
            <Link to="/login" className="btn-neon cyan" style={styles.btnAdjust}>
              <LogIn size={15} />
              <span>Log In</span>
            </Link>
            <Link to="/signup" className="btn-neon pink" style={styles.btnAdjust}>
              <UserPlus size={15} />
              <span>Sign Up</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '70px',
    backgroundColor: 'var(--bg-header)',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px',
    zIndex: 1000,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
  },
  logoText: {
    fontSize: '28px',
    fontWeight: '800',
    color: 'var(--primary-cyan)',
    letterSpacing: '2px',
    textShadow: '0 0 10px rgba(0, 255, 247, 0.3)',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    // Hidden on mobile, handled dynamically by CSS display styles
  },
  navLinkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    padding: '6px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s',
  },
  navText: {
    // Media query behavior can be handled in stylesheet if needed
  },
  searchForm: {
    flex: '0 1 450px',
    margin: '0 16px',
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#13131a',
    border: '1px solid var(--border-color)',
    borderRadius: '8px 0 0 8px',
    padding: '10px 16px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s',
  },
  searchButton: {
    backgroundColor: '#1b1b26',
    border: '1px solid var(--border-color)',
    borderLeft: 'none',
    borderRadius: '0 8px 8px 0',
    padding: '0 18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  authButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  btnAdjust: {
    padding: '6px 14px',
    fontSize: '13px',
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  profileBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 12px',
    borderRadius: '8px',
    backgroundColor: '#13131a',
    border: '1px solid var(--border-color)',
    transition: 'all 0.2s',
  },
  profileAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#1a1a24',
    border: '1.5px solid var(--primary-cyan)',
  },
  profileName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#fff',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: '#ff4a4a',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '4px 8px',
    transition: 'color 0.2s',
  },
};
