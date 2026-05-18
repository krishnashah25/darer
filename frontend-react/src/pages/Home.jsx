import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio, Users, Flame, Gamepad2, Music, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('live');

  // Stream data
  const liveStreams = [
    { id: 1, title: '🔴T1 VS HLE🔴 LCK FINALS!', streamer: 'Caedrel', game: 'League of Legends', viewers: '42K', lang: 'English', avatar: 'caedrel', image: 'https://placehold.co/360x200/0c0c12/00fff7?text=LCK+FINALS' },
    { id: 2, title: 'RANKED SHANKS X HAMY GO! 🎮', streamer: 'shanks_ttv', game: 'VALORANT', viewers: '3.4K', lang: 'English', avatar: 'shanks', image: 'https://placehold.co/360x200/0c0c12/ff00ff?text=SHANKS+LIVE' },
    { id: 3, title: 'NUCLEAR CAM! CHILL STREAMING 💬', streamer: 'cawcawTV', game: 'Just Chatting', viewers: '2.5K', lang: 'English', avatar: 'cawcaw', image: 'https://placehold.co/360x200/0c0c12/fffc00?text=JUST+CHATTING' },
    { id: 4, title: 'Pistols only challenge! 🔫', streamer: 'shroud', game: 'Counter-Strike', viewers: '71.6K', lang: 'English', avatar: 'shroud', image: 'https://placehold.co/360x200/0c0c12/39ff14?text=SHROUD+CS' },
    { id: 5, title: 'Survival server with viewers!', streamer: 'cowTV', game: 'Minecraft', viewers: '200', lang: 'Hindi', avatar: 'cow', image: 'https://placehold.co/360x200/0c0c12/00fff7?text=MINECRAFT' },
  ];

  const justChattingStreams = [
    { id: 6, title: 'Taylien Variety Hub - AMA! 💬', streamer: 'Taylien', game: 'Just Chatting', viewers: '3.4K', lang: 'English', avatar: 'taylien', image: 'https://placehold.co/360x200/0c0c12/ff00ff?text=TAYLIEN+IRL' },
    { id: 7, title: 'PIXEL STREAMING & IRL TALK 👾', streamer: 'PixelVibe', game: 'Just Chatting', viewers: '180', lang: 'English', avatar: 'pixel', image: 'https://placehold.co/360x200/0c0c12/fffc00?text=PIXEL+TALK' },
    { id: 8, title: 'CHATTING AND EATING SNACKS 🍕', streamer: 'jasontheween', game: 'Just Chatting', viewers: '32.4K', lang: 'English', avatar: 'jasontheween', image: 'https://placehold.co/360x200/0c0c12/39ff14?text=JASON+EATS' },
  ];

  const categories = [
    { name: 'Just Chatting', viewers: '224.4K', image: 'https://placehold.co/230x300/12121c/ff00ff?text=Just+Chatting' },
    { name: 'VALORANT', viewers: '111.5K', image: 'https://placehold.co/230x300/12121c/00fff7?text=VALORANT' },
    { name: 'League of Legends', viewers: '95K', image: 'https://placehold.co/230x300/12121c/fffc00?text=LOL' },
    { name: 'Counter-Strike 2', viewers: '84.2K', image: 'https://placehold.co/230x300/12121c/39ff14?text=CS2' },
    { name: 'Minecraft', viewers: '45.1K', image: 'https://placehold.co/230x300/12121c/00fff7?text=Minecraft' },
    { name: 'IRL & Travel', viewers: '12K', image: 'https://placehold.co/230x300/12121c/ff00ff?text=IRL' },
  ];

  const followedLive = [
    { id: 10, title: 'RANKED SHANKS X HAMY GO! 🎮', streamer: 'shanks_ttv', game: 'VALORANT', viewers: '3.4K', lang: 'English', avatar: 'shanks', image: 'https://placehold.co/360x200/0c0c12/ff00ff?text=VALORANT' },
    { id: 11, title: 'Taylien Minecraft Sub Run! ⛏️', streamer: 'Taylien', game: 'Minecraft', viewers: '3.4K', lang: 'English', avatar: 'taylien', image: 'https://placehold.co/360x200/0c0c12/00fff7?text=MINECRAFT' },
  ];

  const followedOffline = [
    { name: 'noobmaster_69', game: 'Fortnite', avatarSeed: 'noobmaster' },
    { name: 'LunaCraft', game: 'World of Warcraft', avatarSeed: 'luna' },
    { name: 'ShadowDragon', game: 'Elden Ring', avatarSeed: 'shadow' },
  ];

  return (
    <div style={styles.container}>
      {/* Top Tab Navigator */}
      <nav style={styles.tabs}>
        <button
          style={{
            ...styles.tabButton,
            color: activeTab === 'following' ? 'var(--accent-pink)' : '#999',
            borderBottom: activeTab === 'following' ? '2.5px solid var(--accent-pink)' : 'none',
          }}
          onClick={() => setActiveTab('following')}
        >
          Following
        </button>
        <button
          style={{
            ...styles.tabButton,
            color: activeTab === 'live' ? 'var(--accent-pink)' : '#999',
            borderBottom: activeTab === 'live' ? '2.5px solid var(--accent-pink)' : 'none',
          }}
          onClick={() => setActiveTab('live')}
        >
          Live Channels
        </button>
      </nav>

      {/* Main Tab Contents */}
      {activeTab === 'live' ? (
        <div style={styles.content} className="tab-transition" key="live">
          {/* Row 1: Live on Darer */}
          <section className="streams-row-container">
            <h2 className="row-title neon-glow-cyan">
              <Radio size={20} color="red" />
              <span>Live on Darer</span>
            </h2>
            <div className="stream-cards-flex">
              {liveStreams.map((stream) => (
                <StreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          </section>

          {/* Row 2: Just Chatting & IRL */}
          <section className="streams-row-container">
            <h2 className="row-title neon-glow-pink">
              <Users size={20} />
              <span>Just Chatting & IRL</span>
            </h2>
            <div className="stream-cards-flex">
              {justChattingStreams.map((stream) => (
                <StreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          </section>

          {/* Row 3: Categories */}
          <section className="streams-row-container">
            <h2 className="row-title neon-glow-yellow" style={{ color: 'var(--warning-yellow)' }}>
              <Flame size={20} />
              <span>Categories We Think You'll Like</span>
            </h2>
            <div className="categories-grid">
              {categories.map((cat) => (
                <div key={cat.name} className="category-card">
                  <img src={cat.image} alt={cat.name} className="category-image" />
                  <p className="category-name">{cat.name}</p>
                  <p className="category-viewers">{cat.viewers} viewers</p>
                </div>
              ))}
            </div>
          </section>

          {/* Row 4: Team FPS */}
          <section className="streams-row-container">
            <h2 className="row-title neon-glow-cyan">
              <Gamepad2 size={20} />
              <span>Team FPS Action</span>
            </h2>
            <div className="stream-cards-flex">
              {liveStreams.filter(s => s.game === 'VALORANT' || s.game === 'Counter-Strike').map((stream) => (
                <StreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* Following Tab Content */
        <div style={styles.content} className="tab-transition" key="following">
          <section className="streams-row-container">
            <h2 className="row-title neon-glow-cyan">
              <Radio size={20} color="red" />
              <span>Your Live Channels</span>
            </h2>
            <div className="stream-cards-flex" style={{ flexWrap: 'wrap', gap: '20px' }}>
              {followedLive.map((stream) => (
                <StreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          </section>

          <section className="streams-row-container" style={{ marginTop: '30px' }}>
            <h2 className="row-title" style={{ color: 'var(--text-secondary)' }}>
              <Users size={20} />
              <span>Offline Channels</span>
            </h2>
            <div style={styles.offlineGrid}>
              {followedOffline.map((offline) => (
                <Link
                  key={offline.name}
                  to={`/profile/${offline.name}`}
                  style={styles.offlineCard}
                  className="offline-streamer-card"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${offline.avatarSeed}`}
                    alt={offline.name}
                    style={styles.offlineAvatar}
                  />
                  <div style={styles.offlineInfo}>
                    <h4 style={styles.offlineName}>{offline.name}</h4>
                    <p style={styles.offlineGame}>{offline.game}</p>
                  </div>
                  <span style={styles.offlineTag}>OFFLINE</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

// Inline Sub-component for StreamCard
function StreamCard({ stream }) {
  return (
    <Link to={`/stream/${stream.streamer}`} className="stream-card-item">
      <div className="thumbnail-wrapper">
        <img src={stream.image} alt={stream.title} />
        <span className="badge-live">LIVE</span>
        <span className="badge-viewers">{stream.viewers} viewers</span>
      </div>
      <div className="card-content">
        <div className="card-avatar-row">
          <img
            src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${stream.avatar}`}
            alt={stream.streamer}
            className="card-avatar"
          />
          <div className="card-details">
            <h3 className="card-title">{stream.title}</h3>
            <p className="card-streamer">@{stream.streamer}</p>
            <p className="card-game">{stream.game}</p>
            <div className="card-tags">
              <span className="tag-item yellow">{stream.lang}</span>
              <span className="tag-item">Neon</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid var(--border-color)',
    marginBottom: '24px',
  },
  tabButton: {
    background: 'none',
    border: 'none',
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  content: {
    width: '100%',
  },
  offlineGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
    gap: '20px',
  },
  offlineCard: {
    display: 'flex',
    alignItems: 'center',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    padding: '16px',
    borderRadius: '12px',
    gap: '16px',
    textDecoration: 'none',
    color: '#fff',
    transition: 'all 0.2s',
  },
  offlineAvatar: {
    width: '46px',
    height: '46px',
    borderRadius: '8px',
    backgroundColor: '#161622',
    border: '1.5px solid var(--border-color)',
    opacity: 0.6,
  },
  offlineInfo: {
    flex: 1,
  },
  offlineName: {
    fontSize: '15px',
    fontWeight: '700',
    margin: 0,
    color: 'var(--text-primary)',
  },
  offlineGame: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  offlineTag: {
    background: '#191924',
    color: 'var(--text-secondary)',
    fontSize: '10px',
    fontWeight: '700',
    padding: '4px 8px',
    borderRadius: '4px',
  },
};
