import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Bell, User } from 'lucide-react';

export default function BottomBar() {
  return (
    <footer style={styles.bottomBar} className="bottombar-mobile">
      <NavLink
        to="/"
        style={({ isActive }) => ({
          ...styles.navLink,
          color: isActive ? 'var(--accent-pink)' : '#ffffff',
          textShadow: isActive ? '0 0 8px rgba(255, 0, 255, 0.4)' : 'none',
        })}
      >
        <Home size={20} />
        <span style={styles.label}>Home</span>
      </NavLink>

      <NavLink
        to="/browse"
        style={({ isActive }) => ({
          ...styles.navLink,
          color: isActive ? 'var(--accent-pink)' : '#ffffff',
          textShadow: isActive ? '0 0 8px rgba(255, 0, 255, 0.4)' : 'none',
        })}
      >
        <Compass size={20} />
        <span style={styles.label}>Browse</span>
      </NavLink>

      <NavLink
        to="/activity"
        style={({ isActive }) => ({
          ...styles.navLink,
          color: isActive ? 'var(--accent-pink)' : '#ffffff',
          textShadow: isActive ? '0 0 8px rgba(255, 0, 255, 0.4)' : 'none',
        })}
      >
        <Bell size={20} />
        <span style={styles.label}>Activity</span>
      </NavLink>

      <NavLink
        to="/profile/Taylien"
        style={({ isActive }) => ({
          ...styles.navLink,
          color: isActive ? 'var(--accent-pink)' : '#ffffff',
          textShadow: isActive ? '0 0 8px rgba(255, 0, 255, 0.4)' : 'none',
        })}
      >
        <User size={20} />
        <span style={styles.label}>Profile</span>
      </NavLink>
    </footer>
  );
}

const styles = {
  bottomBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70px',
    backgroundColor: '#07070b',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1000,
    paddingBottom: 'env(safe-area-inset-bottom)',
  },
  navLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    gap: '4px',
    flex: 1,
    transition: 'color 0.2s',
  },
  label: {
    fontSize: '11px',
    fontWeight: '600',
  },
};
