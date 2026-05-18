import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Star, Calendar, Clapperboard, Film, User, Info, Bell, ToggleLeft, ToggleRight } from 'lucide-react';

export default function Profile() {
  const { username } = useParams();
  const activeStreamer = username || 'Taylien';
  
  const [activeMenu, setActiveMenu] = useState('home');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [reminders, setReminders] = useState({ wed: false, fri: false, sat: false });

  // Streamer info data
  const streamerData = {
    Taylien: {
      bio: 'Hi! I’m Taylien, I’m a variety creator with an emphasis on trying to build the friendliest community I possibly can. Welcome to the pixel family! 👾',
      socials: { instagram: '@taylien_insta', discord: 'discord.gg/taylien', twitter: '@taylien_tweets' },
      avatar: 'taylien',
    },
    Caedrel: {
      bio: 'Ex-pro player, analyst, full-time streamer. Covering all things League of Legends. HALE!',
      socials: { twitter: '@caedrel', discord: 'discord.gg/caedrel' },
      avatar: 'caedrel',
    },
    shroud: {
      bio: 'I play games. Ex-CS pro. Resident aim god. Welcome to the stream.',
      socials: { twitter: '@shroud', instagram: '@shroud' },
      avatar: 'shroud',
    }
  };

  const streamer = streamerData[activeStreamer] || {
    bio: `Hi! I'm ${activeStreamer}. Welcome to my streaming channel. Expect exciting dares, premium games, and great vibes!`,
    socials: { discord: 'discord.gg/streamer', twitter: `@${activeStreamer}` },
    avatar: activeStreamer.toLowerCase()
  };

  const scheduleData = [
    { id: 'wed', day: 'Wednesday, August 20', time: '12:30 AM - 5:30 AM', topic: '🎮 VARIETY STEAMING / SUB RUNS' },
    { id: 'fri', day: 'Friday, August 22', time: '12:30 AM - 5:30 AM', topic: '🔥 IMPOSSIBLE DARES CHALLENGES' },
    { id: 'sat', day: 'Saturday, August 23', time: '12:30 AM - 5:30 AM', topic: '🏆 WEEKLY LEADERBOARDS & PVP' },
  ];

  const suggestedStreamers = [
    { name: 'Krtik', viewers: '2.4K', avatarSeed: 'krtik' },
    { name: 'Simran', viewers: 'Offline', avatarSeed: 'simran' },
    { name: 'Kashish', viewers: 'Offline', avatarSeed: 'kashish' },
    { name: 'Ashish', viewers: 'Offline', avatarSeed: 'ashish' },
  ];

  const pastVODs = [
    { id: 1, title: 'I survived 100 days using only fists! ⛏️', game: 'Minecraft', duration: '4:12:15', date: '3 days ago' },
    { id: 2, title: 'Fulfilling the $100 dare challenge! 💸', game: 'Minecraft', duration: '3:45:00', date: '6 days ago' },
    { id: 3, title: 'Cozy building stream & Chill chat ☕', game: 'Just Chatting', duration: '5:02:18', date: '1 week ago' },
  ];

  const userClips = [
    { id: 1, title: 'UNREAL double kill! 💥', views: '107 views', duration: '0:30', creator: 'xGigglypuff', date: '21 days ago' },
    { id: 2, title: 'Streamer gets dared to delete diamonds 💎', views: '2.5K views', duration: '0:45', creator: 'GamerGoku', date: '1 month ago' },
  ];

  const toggleReminder = (dayId) => {
    setReminders(prev => ({
      ...prev,
      [dayId]: !prev[dayId]
    }));
  };

  return (
    <div style={styles.container}>
      {/* Banner */}
      <div style={styles.bannerWrapper}>
        <img
          src="https://placehold.co/1200x250/09090d/00fff7?text=DARER+STREAMING+BANNER"
          alt="Banner"
          style={styles.bannerImage}
        />
      </div>

      {/* Streamer Header Details Card */}
      <div style={styles.profileHeader}>
        <div style={styles.headerRow}>
          <img
            src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${streamer.avatar}`}
            alt={activeStreamer}
            style={styles.avatar}
          />
          <div style={styles.streamerIntro}>
            <h2 style={styles.streamerName}>{activeStreamer}</h2>
            <p style={styles.lastLive}>Last live 3 days ago</p>
          </div>
          
          <div style={styles.actions}>
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

        <p style={styles.bioText}>{streamer.bio}</p>

        {/* Social Badges */}
        <div style={styles.socials}>
          {Object.entries(streamer.socials).map(([key, value]) => (
            <a key={key} href="#" style={styles.socialLink}>
              <span>{key === 'twitter' ? '🐦' : key === 'instagram' ? '📷' : '💬'} {value}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Sub Menu Tabs inside profile */}
      <div style={styles.tabsMenu}>
        <button
          style={{
            ...styles.tabLink,
            borderBottom: activeMenu === 'home' ? '2.5px solid var(--accent-pink)' : 'none',
            color: activeMenu === 'home' ? 'var(--accent-pink)' : 'var(--text-secondary)',
          }}
          onClick={() => setActiveMenu('home')}
        >
          <User size={16} style={{ marginRight: '6px' }} />
          <span>Home</span>
        </button>
        <button
          style={{
            ...styles.tabLink,
            borderBottom: activeMenu === 'about' ? '2.5px solid var(--accent-pink)' : 'none',
            color: activeMenu === 'about' ? 'var(--accent-pink)' : 'var(--text-secondary)',
          }}
          onClick={() => setActiveMenu('about')}
        >
          <Info size={16} style={{ marginRight: '6px' }} />
          <span>About</span>
        </button>
        <button
          style={{
            ...styles.tabLink,
            borderBottom: activeMenu === 'schedule' ? '2.5px solid var(--accent-pink)' : 'none',
            color: activeMenu === 'schedule' ? 'var(--accent-pink)' : 'var(--text-secondary)',
          }}
          onClick={() => setActiveMenu('schedule')}
        >
          <Calendar size={16} style={{ marginRight: '6px' }} />
          <span>Schedule</span>
        </button>
        <button
          style={{
            ...styles.tabLink,
            borderBottom: activeMenu === 'videos' ? '2.5px solid var(--accent-pink)' : 'none',
            color: activeMenu === 'videos' ? 'var(--accent-pink)' : 'var(--text-secondary)',
          }}
          onClick={() => setActiveMenu('videos')}
        >
          <Clapperboard size={16} style={{ marginRight: '6px' }} />
          <span>Videos</span>
        </button>
        <button
          style={{
            ...styles.tabLink,
            borderBottom: activeMenu === 'clips' ? '2.5px solid var(--accent-pink)' : 'none',
            color: activeMenu === 'clips' ? 'var(--accent-pink)' : 'var(--text-secondary)',
          }}
          onClick={() => setActiveMenu('clips')}
        >
          <Film size={16} style={{ marginRight: '6px' }} />
          <span>Clips</span>
        </button>
      </div>

      {/* Sub Menu Active Views */}
      <div style={styles.menuContent} className="tab-transition" key={activeMenu}>
        
        {/* SUBTAB 1: Home View */}
        {activeMenu === 'home' && (
          <div>
            <h3 style={styles.subTitle} className="neon-glow-cyan">Featured Broadcast Highlights</h3>
            <div style={styles.videosGrid}>
              {pastVODs.slice(0, 2).map((vod) => (
                <div key={vod.id} style={styles.vodCard}>
                  <div style={styles.vodThumbnail}>
                    <img src="https://placehold.co/360x200/0c0c12/00fff7?text=HIGHLIGHT" alt={vod.title} style={styles.vodImage} />
                    <span style={styles.durationBadge}>{vod.duration}</span>
                  </div>
                  <h4 style={styles.vodCardTitle}>{vod.title}</h4>
                  <p style={styles.vodCardMeta}>{vod.game} | {vod.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 2: About View */}
        {activeMenu === 'about' && (
          <div style={styles.aboutView}>
            <div style={styles.aboutPanel}>
              <h3 style={styles.subTitle} className="neon-glow-pink">About {activeStreamer}</h3>
              <p style={{ lineHeight: '1.6', color: '#ccc', fontSize: '14.5px' }}>{streamer.bio}</p>
            </div>
            
            {/* Suggested Streamers Grid */}
            <div style={{ marginTop: '30px' }}>
              <h3 style={styles.subTitle} className="neon-glow-cyan">{activeStreamer} Suggests These Streamers</h3>
              <div style={styles.suggestedGrid}>
                {suggestedStreamers.map((sug) => (
                  <div key={sug.name} style={styles.suggestedCard}>
                    <img
                      src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${sug.avatarSeed}`}
                      alt={sug.name}
                      style={styles.sugAvatar}
                    />
                    <div>
                      <h4 style={styles.sugName}>@{sug.name}</h4>
                      <span
                        style={{
                          fontSize: '11px',
                          color: sug.viewers === 'Offline' ? 'var(--text-secondary)' : 'var(--neon-green)',
                        }}
                      >
                        {sug.viewers === 'Offline' ? 'Offline' : `🔴 Live: ${sug.viewers}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: Schedule View */}
        {activeMenu === 'schedule' && (
          <div style={styles.scheduleList}>
            {scheduleData.map((day) => (
              <div key={day.id} style={styles.scheduleCard}>
                <div style={styles.schedInfo}>
                  <h3 style={styles.schedDay}>{day.day}</h3>
                  <p style={styles.schedTopic}>{day.topic}</p>
                  <p style={styles.schedTime}>{day.time}</p>
                </div>
                <button
                  onClick={() => toggleReminder(day.id)}
                  style={{
                    ...styles.remindBtn,
                    borderColor: reminders[day.id] ? 'var(--neon-green)' : 'var(--border-color)',
                    color: reminders[day.id] ? 'var(--neon-green)' : 'var(--text-secondary)',
                  }}
                >
                  <Bell size={16} />
                  <span>{reminders[day.id] ? 'Reminder Set' : 'Remind me'}</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* SUBTAB 4: Videos View */}
        {activeMenu === 'videos' && (
          <div>
            <h3 style={styles.subTitle} className="neon-glow-cyan">Past Recorded Broadcasts (VODs)</h3>
            <div style={styles.videosGrid}>
              {pastVODs.map((vod) => (
                <div key={vod.id} style={styles.vodCard}>
                  <div style={styles.vodThumbnail}>
                    <img src="https://placehold.co/360x200/0c0c12/fffc00?text=VOD+BROADCAST" alt={vod.title} style={styles.vodImage} />
                    <span style={styles.durationBadge}>{vod.duration}</span>
                  </div>
                  <h4 style={styles.vodCardTitle}>{vod.title}</h4>
                  <p style={styles.vodCardMeta}>{vod.game} | {vod.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 5: Clips View */}
        {activeMenu === 'clips' && (
          <div>
            <div style={styles.clipsFilter}>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Featured Clips Only</span>
              <button style={styles.filterSelector}>Sort: 30 Days</button>
            </div>
            <div style={styles.videosGrid}>
              {userClips.map((clip) => (
                <div key={clip.id} style={styles.vodCard}>
                  <div style={styles.vodThumbnail}>
                    <img src="https://placehold.co/360x200/0c0c12/ff00ff?text=CLIP+HIGHLIGHT" alt={clip.title} style={styles.vodImage} />
                    <span style={styles.durationBadge}>{clip.duration}</span>
                  </div>
                  <h4 style={styles.vodCardTitle}>{clip.title}</h4>
                  <p style={styles.vodCardMeta}>
                    Clipped by <strong>@{clip.creator}</strong> | {clip.views} | {clip.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  bannerWrapper: {
    width: '100%',
    maxHeight: '180px',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid var(--border-color)',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  profileHeader: {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    padding: '24px',
    marginTop: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    backgroundColor: '#161622',
    border: '2px solid var(--accent-pink)',
    padding: '3px',
    boxShadow: 'var(--shadow-glow-pink)',
  },
  streamerIntro: {
    flex: 1,
    minWidth: '180px',
  },
  streamerName: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#fff',
    margin: 0,
  },
  lastLive: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginTop: '4px',
    margin: 0,
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  actionBtn: {
    padding: '6px 14px',
    fontSize: '13px',
  },
  bioText: {
    fontSize: '14px',
    color: '#ccc',
    marginTop: '16px',
    lineHeight: '1.6',
    margin: '16px 0 0 0',
  },
  socials: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
    flexWrap: 'wrap',
  },
  socialLink: {
    backgroundColor: '#121217',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '12px',
    color: '#fff',
    transition: 'all 0.2s',
  },
  tabsMenu: {
    display: 'flex',
    borderBottom: '1px solid var(--border-color)',
    marginTop: '24px',
    overflowX: 'auto',
  },
  tabLink: {
    background: 'none',
    border: 'none',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
    flexShrink: 0,
  },
  menuContent: {
    paddingTop: '24px',
  },
  subTitle: {
    fontSize: '16px',
    fontWeight: '800',
    marginBottom: '16px',
  },
  videosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
    gap: '20px',
  },
  vodCard: {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    overflow: 'hidden',
    padding: '12px',
    transition: 'all 0.2s',
  },
  vodThumbnail: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '12px',
  },
  vodImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  durationBadge: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: '#fff',
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  vodCardTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#fff',
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  vodCardMeta: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    marginTop: '6px',
    margin: '6px 0 0 0',
  },
  aboutView: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  aboutPanel: {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    padding: '20px',
    borderRadius: '12px',
  },
  suggestedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '16px',
  },
  suggestedCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    padding: '12px',
    borderRadius: '10px',
  },
  sugAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: '#161622',
  },
  sugName: {
    fontSize: '13px',
    fontWeight: '700',
    margin: 0,
  },
  scheduleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  scheduleCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    padding: '20px',
    borderRadius: '12px',
    gap: '20px',
    flexWrap: 'wrap',
  },
  schedInfo: {
    flex: 1,
  },
  schedDay: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#fff',
    margin: 0,
  },
  schedTopic: {
    fontSize: '13px',
    color: 'var(--primary-cyan)',
    margin: '6px 0',
    fontWeight: '600',
  },
  schedTime: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  remindBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'none',
    border: '1.5px solid',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '700',
    transition: 'all 0.2s',
  },
  clipsFilter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  filterSelector: {
    backgroundColor: '#121217',
    border: '1px solid var(--border-color)',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '600',
    padding: '6px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
