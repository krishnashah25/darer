import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Pause, Volume2, ShieldAlert, Heart, Star, Send, Coins, Vote, Award, Flame, CheckCircle, Clock } from 'lucide-react';

export default function StreamView({ user }) {
  const { username } = useParams();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  
  // Dynamic mock states
  const [viewersCount, setViewersCount] = useState(3421);
  const [chatList, setChatList] = useState([
    { id: 1, user: 'PixelGamer', text: 'LETS GOOO! 🔥', color: '#00fff7' },
    { id: 2, user: 'ShadowWarlock', text: 'Is this the knife-only round?', color: '#ff00ff' },
    { id: 3, user: 'darer_fan_99', text: 'I dare you to play without jumping!', color: '#fffc00' },
    { id: 4, user: 'Luna_Love', text: 'This stream is amazing tonight!', color: '#39ff14' },
    { id: 5, user: 'Kev_CS', text: 'Pledge $10 for the next dare!', color: '#ff8a00' },
  ]);

  const [daresList, setDaresList] = useState([
    { id: 1, text: 'Complete the current round using only a pistol', votes: 42, funding: 55, creator: 'ShadowWarlock', active: false },
    { id: 2, text: 'No jumping allowed for the next 5 minutes of gameplay', votes: 29, funding: 35, creator: 'darer_fan_99', active: false },
    { id: 3, text: 'Get a double kill with a single grenade throw', votes: 12, funding: 10, creator: 'GamerGod', active: false },
  ]);

  const [activeDare, setActiveDare] = useState({
    text: 'Get 3 knife kills in the next match',
    timeRemaining: 180, // 3 minutes
    payout: 120,
    status: 'IN PROGRESS'
  });

  const chatEndRef = useRef(null);

  // Auto-scrolling chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList]);

  // Simulated live viewers updater and message feed ticker
  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewersCount(prev => prev + Math.floor(Math.random() * 11) - 5);
    }, 4000);

    const mockUsers = ['GamerPro', 'KickFan', 'TwitchRefugee', 'xQc_Enjoyer', 'SniperPro', 'DarerHero'];
    const mockTexts = [
      'Wow, close call!',
      'HE IS POPPING OFF!',
      'HYPE HYPE HYPE!',
      'Pledge $50 for no shields!',
      'Completed the dare!',
      'OMG did you see that?',
      'Can you do the jump-shot next?'
    ];
    const mockColors = ['#00fff7', '#ff00ff', '#fffc00', '#39ff14', '#ff8a00', '#ff0055'];

    const chatInterval = setInterval(() => {
      const newUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const newText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
      const newColor = mockColors[Math.floor(Math.random() * mockColors.length)];

      setChatList(prev => [...prev, {
        id: Date.now(),
        user: newUser,
        text: newText,
        color: newColor
      }]);
    }, 3500);

    // Active dare timer
    const timerInterval = setInterval(() => {
      setActiveDare(prev => {
        if (prev.timeRemaining <= 1) {
          clearInterval(timerInterval);
          return { ...prev, timeRemaining: 0, status: 'COMPLETED' };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(chatInterval);
      clearInterval(timerInterval);
    };
  }, []);

  // Format active dare timer
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Submit Dare form
  const [newDareText, setNewDareText] = useState('');
  const [newDareFunding, setNewDareFunding] = useState(10);

  const handleDareSubmit = (e) => {
    e.preventDefault();
    if (!newDareText.trim()) return;

    if (!user) {
      alert('You must be logged in to submit a dare!');
      return;
    }

    const newDare = {
      id: Date.now(),
      text: newDareText,
      votes: 1,
      funding: Number(newDareFunding),
      creator: user.username,
      active: false
    };

    setDaresList(prev => [...prev, newDare]);
    setNewDareText('');
    setNewDareFunding(10);

    // Alert live chat about the dare!
    setChatList(prev => [...prev, {
      id: Date.now(),
      user: 'SYSTEM',
      text: `📣 @${user.username} submitted a new Dare: "${newDareText}" with $${newDareFunding}!`,
      color: '#fffc00'
    }]);
  };

  const handleVote = (dareId) => {
    setDaresList(prev => prev.map(dare => {
      if (dare.id === dareId) {
        return { ...dare, votes: dare.votes + 1 };
      }
      return dare;
    }));
  };

  const handleFund = (dareId, amount) => {
    if (!user) {
      alert('Please log in to pledge funding to dares!');
      return;
    }
    setDaresList(prev => prev.map(dare => {
      if (dare.id === dareId) {
        return { ...dare, funding: dare.funding + amount };
      }
      return dare;
    }));
    
    const targetDare = daresList.find(d => d.id === dareId);
    setChatList(prev => [...prev, {
      id: Date.now(),
      user: 'SYSTEM',
      text: `💸 @${user.username} pledged $${amount} more to "${targetDare.text}"!`,
      color: '#39ff14'
    }]);
  };

  // Chat message submit
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const sender = user ? user.username : 'Guest';
    setChatList(prev => [...prev, {
      id: Date.now(),
      user: sender,
      text: chatMessage,
      color: '#00fff7'
    }]);

    setChatMessage('');
  };

  return (
    <div style={styles.container}>
      {/* Top Banner Details */}
      <div style={styles.layoutRow}>
        {/* Left Side: Mock Video Stream Player and streamer bio */}
        <div style={styles.streamColumn}>
          {/* Mock Player */}
          <div style={styles.playerContainer}>
            {isPlaying ? (
              <div style={styles.playerCanvas} className="stream-canvas-glowing">
                <div style={styles.streamerPulse}>🔴 LIVE</div>
                {/* Visualizer animation placeholder */}
                <div style={styles.visualizerContainer}>
                  <div style={{ ...styles.visBar, animationDelay: '0.1s' }}></div>
                  <div style={{ ...styles.visBar, animationDelay: '0.4s' }}></div>
                  <div style={{ ...styles.visBar, animationDelay: '0.2s' }}></div>
                  <div style={{ ...styles.visBar, animationDelay: '0.6s' }}></div>
                  <div style={{ ...styles.visBar, animationDelay: '0.3s' }}></div>
                  <div style={{ ...styles.visBar, animationDelay: '0.5s' }}></div>
                </div>
                <h2 style={styles.playerTagline}>STREAMING LIVE FEED FROM {username?.toUpperCase()}</h2>
                <p style={styles.playerDesc}>Awaiting daring chat instructions...</p>
              </div>
            ) : (
              <div style={styles.playerPaused}>
                <h3 style={{ color: 'var(--text-secondary)' }}>Stream Paused</h3>
                <button onClick={() => setIsPlaying(true)} className="btn-neon cyan" style={{ marginTop: '16px' }}>
                  <Play size={16} /> Resume Stream
                </button>
              </div>
            )}
            
            {/* Player Controls Bar */}
            <div style={styles.controlsBar}>
              <button onClick={() => setIsPlaying(!isPlaying)} style={styles.controlButton}>
                {isPlaying ? <Pause size={18} color="#fff" /> : <Play size={18} color="#fff" />}
              </button>
              <div style={styles.volumeRow}>
                <Volume2 size={18} color="#fff" />
                <div style={styles.volumeSlider}>
                  <div style={styles.volumeActive}></div>
                </div>
              </div>
              <div style={{ flex: 1 }}></div>
              <span style={styles.streamStats}>{viewersCount.toLocaleString()} viewers | 1080p60fps</span>
            </div>
          </div>

          {/* Streamer Detail Panel */}
          <div style={styles.streamerPanel}>
            <img
              src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`}
              alt={username}
              style={styles.avatar}
            />
            <div style={styles.streamerInfo}>
              <h2 style={styles.streamerName}>{username}</h2>
              <p style={styles.streamerGame}>Playing <strong>VALORANT</strong></p>
              <div style={styles.streamerTags}>
                <span className="tag-item yellow">English</span>
                <span className="tag-item">Neon</span>
                <span className="tag-item">Dares ON</span>
              </div>
            </div>
            
            <div style={styles.channelActions}>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`btn-neon ${isFollowing ? 'cyan' : 'pink'}`}
                style={styles.actionBtn}
              >
                <Heart size={16} fill={isFollowing ? 'currentColor' : 'none'} />
                <span>{isFollowing ? 'Following' : 'Follow'}</span>
              </button>
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className="btn-neon yellow"
                style={styles.actionBtn}
              >
                <Star size={16} fill={isSubscribed ? 'currentColor' : 'none'} />
                <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
              </button>
            </div>
          </div>

          {/* Dares Board Section */}
          <div style={styles.sectionHeader}>
            <Award size={20} color="var(--primary-cyan)" />
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Active Viewer Dares Board</h3>
          </div>

          {/* Active Dare Tracker Panel */}
          <div style={styles.activeDarePanel}>
            <div style={styles.activeDareHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Flame size={18} color="red" />
                <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', color: '#ff4a4a' }}>
                  ACTIVE STREAM DARE CHALLENGE
                </span>
              </div>
              <span
                style={{
                  ...styles.statusBadge,
                  backgroundColor: activeDare.status === 'COMPLETED' ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 74, 74, 0.1)',
                  color: activeDare.status === 'COMPLETED' ? 'var(--neon-green)' : '#ff4a4a',
                  border: activeDare.status === 'COMPLETED' ? '1px solid var(--neon-green)' : '1px solid #ff4a4a',
                }}
              >
                {activeDare.status}
              </span>
            </div>
            <h4 style={styles.activeDareText}>"{activeDare.text}"</h4>
            <div style={styles.activeDareStats}>
              <div style={styles.statBox}>
                <Clock size={16} color="var(--text-secondary)" />
                <span>Time Remaining: <strong>{formatTime(activeDare.timeRemaining)}</strong></span>
              </div>
              <div style={styles.statBox}>
                <Coins size={16} color="var(--warning-yellow)" />
                <span>Payout Pool: <strong style={{ color: 'var(--warning-yellow)' }}>${activeDare.payout}</strong></span>
              </div>
            </div>
          </div>

          {/* Submitted Dares List */}
          <div style={styles.daresList}>
            {daresList.map((dare) => (
              <div key={dare.id} style={styles.dareCard}>
                <div style={styles.dareMain}>
                  <p style={styles.dareText}>"{dare.text}"</p>
                  <p style={styles.dareCreator}>Proposed by: <strong>@{dare.creator}</strong></p>
                </div>
                <div style={styles.dareActions}>
                  <button onClick={() => handleVote(dare.id)} style={styles.voteBtn}>
                    <Vote size={15} color="var(--primary-cyan)" />
                    <span>{dare.votes} Votes</span>
                  </button>
                  <button onClick={() => handleFund(dare.id, 5)} style={styles.fundBtn}>
                    <Coins size={15} color="var(--warning-yellow)" />
                    <span>${dare.funding} Pool (+Pledge $5)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Submit a Dare Form */}
          <form onSubmit={handleDareSubmit} style={styles.dareForm}>
            <h4 style={styles.formTitle}>Dare the Streamer & Pledge Payout</h4>
            <div style={styles.formRow}>
              <input
                type="text"
                placeholder="Enter dare challenge (e.g. play next round blindfolded...)"
                value={newDareText}
                onChange={(e) => setNewDareText(e.target.value)}
                style={styles.dareInput}
                required
              />
              <div style={styles.fundingInputCol}>
                <span style={styles.dollarSymbol}>$</span>
                <input
                  type="number"
                  min="5"
                  value={newDareFunding}
                  onChange={(e) => setNewDareFunding(e.target.value)}
                  style={styles.fundingInput}
                  required
                />
              </div>
              <button type="submit" className="btn-neon cyan" style={styles.submitDareBtn}>
                Send Dare
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Chat Column */}
        <div style={styles.chatColumn}>
          <div style={styles.chatHeader}>
            <span style={styles.chatTitle}>STREAM LIVE CHAT</span>
            <span style={styles.chatDot}>🔴</span>
          </div>

          {/* Chat Feed Messages Area */}
          <div style={styles.chatFeed}>
            {chatList.map((chat) => (
              <div key={chat.id} style={styles.chatRow}>
                <span style={{ ...styles.chatUser, color: chat.color }}>
                  {chat.user}:
                </span>
                <span style={styles.chatText}>{chat.text}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input form */}
          <form onSubmit={handleChatSubmit} style={styles.chatInputForm}>
            <div style={styles.chatInputWrapper}>
              <input
                type="text"
                placeholder="Send a chat message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                style={styles.chatInput}
              />
              <button type="submit" style={styles.chatSendButton}>
                <Send size={16} color="var(--primary-cyan)" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  layoutRow: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  streamColumn: {
    flex: '1 1 65%',
    display: 'flex',
    flexDirection: 'column',
  },
  playerContainer: {
    backgroundColor: '#000',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
  },
  playerCanvas: {
    width: '100%',
    aspectRatio: '16/9',
    background: 'radial-gradient(circle, #0e0e13 0%, #030305 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  streamerPulse: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    background: '#ff4a4a',
    color: '#fff',
    fontSize: '11px',
    fontWeight: '800',
    padding: '3px 8px',
    borderRadius: '4px',
    animation: 'pulse-badge 2s infinite',
  },
  visualizerContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    height: '60px',
    marginBottom: '20px',
  },
  visBar: {
    width: '6px',
    height: '40px',
    backgroundColor: 'var(--primary-cyan)',
    borderRadius: '3px',
    animation: 'pulse-badge 1.5s ease-in-out infinite alternate',
    boxShadow: 'var(--shadow-glow-cyan)',
  },
  playerTagline: {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--primary-cyan)',
    letterSpacing: '1.5px',
    marginBottom: '8px',
  },
  playerDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  playerPaused: {
    width: '100%',
    aspectRatio: '16/9',
    backgroundColor: '#0c0c0e',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsBar: {
    backgroundColor: '#0d0d12',
    borderTop: '1px solid var(--border-color)',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  controlButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  volumeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  volumeSlider: {
    width: '80px',
    height: '4px',
    backgroundColor: '#25252f',
    borderRadius: '2px',
    position: 'relative',
  },
  volumeActive: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: 'var(--primary-cyan)',
    borderRadius: '2px',
    boxShadow: 'var(--shadow-glow-cyan)',
  },
  streamStats: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  streamerPanel: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    padding: '16px 20px',
    borderRadius: '12px',
    marginTop: '16px',
    gap: '16px',
    flexWrap: 'wrap',
  },
  avatar: {
    width: '54px',
    height: '54px',
    borderRadius: '12px',
    backgroundColor: '#161622',
    border: '2px solid var(--primary-cyan)',
    padding: '3px',
  },
  streamerInfo: {
    flex: 1,
    minWidth: '200px',
  },
  streamerName: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#fff',
    margin: 0,
  },
  streamerGame: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginTop: '4px',
  },
  streamerTags: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  },
  channelActions: {
    display: 'flex',
    gap: '12px',
  },
  actionBtn: {
    padding: '6px 14px',
    fontSize: '13px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '32px',
    marginBottom: '16px',
  },
  activeDarePanel: {
    backgroundColor: 'rgba(255, 74, 74, 0.05)',
    border: '1.5px dashed rgba(255, 74, 74, 0.3)',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '20px',
  },
  activeDareHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  statusBadge: {
    fontSize: '10px',
    fontWeight: '800',
    padding: '3px 8px',
    borderRadius: '4px',
    letterSpacing: '0.5px',
  },
  activeDareText: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#fff',
    fontStyle: 'italic',
    lineHeight: '1.4',
    marginBottom: '16px',
  },
  activeDareStats: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  statBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#fff',
  },
  daresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  dareCard: {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    transition: 'all 0.2s',
  },
  dareMain: {
    flex: 1,
  },
  dareText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    margin: 0,
  },
  dareCreator: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    marginTop: '6px',
    marginBottom: 0,
  },
  dareActions: {
    display: 'flex',
    gap: '12px',
  },
  voteBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#13131c',
    border: '1px solid rgba(0, 255, 247, 0.2)',
    padding: '6px 12px',
    borderRadius: '6px',
    color: 'var(--primary-cyan)',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  fundBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#181813',
    border: '1px solid rgba(255, 252, 0, 0.2)',
    padding: '6px 12px',
    borderRadius: '6px',
    color: 'var(--warning-yellow)',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  dareForm: {
    backgroundColor: '#0b0b0e',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '20px',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
  },
  formTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: 'var(--primary-cyan)',
    marginBottom: '12px',
  },
  formRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  dareInput: {
    flex: 1,
    minWidth: '220px',
    backgroundColor: '#121217',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '10px 16px',
    color: '#fff',
    outline: 'none',
    fontSize: '14px',
  },
  fundingInputCol: {
    position: 'relative',
    width: '100px',
    display: 'flex',
    alignItems: 'center',
  },
  dollarSymbol: {
    position: 'absolute',
    left: '12px',
    color: 'var(--warning-yellow)',
    fontWeight: '700',
  },
  fundingInput: {
    width: '100%',
    backgroundColor: '#121217',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '10px 12px 10px 24px',
    color: 'var(--warning-yellow)',
    fontWeight: '700',
    outline: 'none',
    fontSize: '14px',
  },
  submitDareBtn: {
    padding: '8px 18px',
  },
  chatColumn: {
    flex: '1 1 30%',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    height: '620px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
  },
  chatHeader: {
    padding: '16px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatTitle: {
    fontSize: '13px',
    fontWeight: '800',
    letterSpacing: '1px',
    color: '#fff',
  },
  chatDot: {
    fontSize: '10px',
  },
  chatFeed: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  chatRow: {
    fontSize: '13px',
    lineHeight: '1.4',
  },
  chatUser: {
    fontWeight: '700',
    marginRight: '6px',
  },
  chatText: {
    color: '#eee',
  },
  chatInputForm: {
    padding: '16px',
    borderTop: '1px solid var(--border-color)',
  },
  chatInputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  chatInput: {
    width: '100%',
    backgroundColor: '#121217',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '10px 40px 10px 16px',
    color: '#fff',
    fontSize: '13px',
    outline: 'none',
  },
  chatSendButton: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
