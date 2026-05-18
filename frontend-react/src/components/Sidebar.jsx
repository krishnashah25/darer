import React from 'react';
import { Link } from 'react-router-dom';
import { Radio } from 'lucide-react';

export default function Sidebar() {
  const liveChannels = [
    { name: 'Caedrel', game: 'League of Legends', viewers: '42K', avatarSeed: 'caedrel' },
    { name: 'shroud', game: 'Valorant', viewers: '71.6K', avatarSeed: 'shroud' },
    { name: 'jasontheween', game: 'Just Chatting', viewers: '32.4K', avatarSeed: 'jasontheween' },
    { name: 'pokimane', game: 'Valorant', viewers: '45.2K', avatarSeed: 'pokimane' },
    { name: 'ESLCS', game: 'Counter-Strike', viewers: '604', avatarSeed: 'eslcs' },
    { name: 'Taylien', game: 'Minecraft', viewers: '3.4K', avatarSeed: 'taylien' },
  ];

  return (
    <aside style={styles.sidebar} className="sidebar-desktop">
      <div style={styles.header}>
        <Radio size={16} color="#ff00ff" style={styles.liveIcon} />
        <h3 style={styles.title}>LIVE CHANNELS</h3>
      </div>
      <div style={styles.channelList}>
        {liveChannels.map((channel) => (
          <Link
            key={channel.name}
            to={`/stream/${channel.name}`}
            style={styles.channelItem}
            className="sidebar-channel-link"
          >
            <img
              src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${channel.avatarSeed}`}
              alt={channel.name}
              style={styles.avatar}
            />
            <div style={styles.info}>
              <p style={styles.name}>{channel.name}</p>
              <p style={styles.game}>{channel.game}</p>
            </div>
            <div style={styles.viewerRow}>
              <span style={styles.dot}>🔴</span>
              <span style={styles.viewers}>{channel.viewers}</span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '240px',
    backgroundColor: 'var(--bg-sidebar)',
    borderRight: '1px solid var(--border-color)',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 70px)',
    position: 'sticky',
    top: '70px',
    overflowY: 'auto',
    // Hidden on mobile, handled dynamically by responsive stylesheet
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px 12px 16px',
    borderBottom: '1px solid var(--border-color)',
    marginBottom: '12px',
  },
  liveIcon: {
    marginRight: '8px',
  },
  title: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '1px',
    color: 'var(--text-secondary)',
  },
  channelList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  channelItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    transition: 'all 0.2s',
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#fff',
    gap: '12px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: '#161622',
    border: '1.5px solid var(--border-color)',
    padding: '2px',
    objectFit: 'cover',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: '13px',
    fontWeight: '700',
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  game: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  viewerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  dot: {
    fontSize: '8px',
  },
  viewers: {
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
};
