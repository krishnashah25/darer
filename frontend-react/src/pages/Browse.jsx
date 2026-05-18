import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Compass, Tv, ArrowUpDown } from 'lucide-react';

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState('');
  
  // Master streams list
  const allStreams = [
    { id: 1, title: '🔴T1 VS HLE🔴 LCK FINALS!', streamer: 'Caedrel', game: 'League of Legends', viewers: '42K', lang: 'English', avatar: 'caedrel', image: 'https://placehold.co/360x200/0c0c12/00fff7?text=LCK+FINALS' },
    { id: 2, title: 'RANKED SHANKS X HAMY GO! 🎮', streamer: 'shanks_ttv', game: 'VALORANT', viewers: '3.4K', lang: 'English', avatar: 'shanks', image: 'https://placehold.co/360x200/0c0c12/ff00ff?text=SHANKS+LIVE' },
    { id: 3, title: 'NUCLEAR CAM! CHILL STREAMING 💬', streamer: 'cawcawTV', game: 'Just Chatting', viewers: '2.5K', lang: 'English', avatar: 'cawcaw', image: 'https://placehold.co/360x200/0c0c12/fffc00?text=JUST+CHATTING' },
    { id: 4, title: 'Pistols only challenge! 🔫', streamer: 'shroud', game: 'Counter-Strike', viewers: '71.6K', lang: 'English', avatar: 'shroud', image: 'https://placehold.co/360x200/0c0c12/39ff14?text=SHROUD+CS' },
    { id: 5, title: 'Survival server with viewers!', streamer: 'cowTV', game: 'Minecraft', viewers: '200', lang: 'Hindi', avatar: 'cow', image: 'https://placehold.co/360x200/0c0c12/00fff7?text=MINECRAFT' },
    { id: 6, title: 'Taylien Variety Hub - AMA! 💬', streamer: 'Taylien', game: 'Just Chatting', viewers: '3.4K', lang: 'English', avatar: 'taylien', image: 'https://placehold.co/360x200/0c0c12/ff00ff?text=TAYLIEN+IRL' },
    { id: 7, title: 'PIXEL STREAMING & IRL TALK 👾', streamer: 'PixelVibe', game: 'Just Chatting', viewers: '180', lang: 'English', avatar: 'pixel', image: 'https://placehold.co/360x200/0c0c12/fffc00?text=PIXEL+TALK' },
    { id: 8, title: 'CHATTING AND EATING SNACKS 🍕', streamer: 'jasontheween', game: 'Just Chatting', viewers: '32.4K', lang: 'English', avatar: 'jasontheween', image: 'https://placehold.co/360x200/0c0c12/39ff14?text=JASON+EATS' },
    { id: 9, title: 'ESL PRO LEAGUE SEASON 20 🏆', streamer: 'ESLCS', game: 'Counter-Strike', viewers: '604', lang: 'English', avatar: 'eslcs', image: 'https://placehold.co/360x200/0c0c12/00fff7?text=ESL+CS' },
    { id: 10, title: '🔴 VCT CHAMPIONS WATCH ALONG! 🔴', streamer: 'pokimane', game: 'VALORANT', viewers: '45.2K', lang: 'English', avatar: 'pokimane', image: 'https://placehold.co/360x200/0c0c12/ff00ff?text=POKIMANE+VCT' }
  ];

  // Retrieve initial search parameter if present
  useEffect(() => {
    const urlQuery = searchParams.get('search') || '';
    setLocalSearch(urlQuery);
  }, [searchParams]);

  const handleLocalSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearch(query);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  // Filter streams dynamically
  const filteredStreams = allStreams.filter((stream) => {
    const searchString = localSearch.toLowerCase();
    return (
      stream.streamer.toLowerCase().includes(searchString) ||
      stream.title.toLowerCase().includes(searchString) ||
      stream.game.toLowerCase().includes(searchString)
    );
  });

  return (
    <div style={styles.container}>
      {/* Browse Header Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.titleBlock}>
          <Compass size={24} color="var(--primary-cyan)" style={styles.titleIcon} />
          <h2 style={styles.title}>Browse Channels</h2>
        </div>
        
        {/* Dynamic Search Box */}
        <div style={styles.searchBox}>
          <Search size={18} color="#9ea4b0" style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search active live streams..."
            value={localSearch}
            onChange={handleLocalSearchChange}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Grid displaying filtered active streams */}
      {filteredStreams.length > 0 ? (
        <div style={styles.grid}>
          {filteredStreams.map((stream) => (
            <Link key={stream.id} to={`/stream/${stream.streamer}`} className="stream-card-item">
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
                      <span className="tag-item">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={styles.noResults}>
          <Tv size={48} color="var(--text-secondary)" style={{ marginBottom: '16px' }} />
          <h3>No Live Streams Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            We couldn't find any channels matching "{localSearch}". Try searching for something else!
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '28px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '20px',
  },
  titleBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  titleIcon: {
    filter: 'drop-shadow(var(--shadow-glow-cyan))',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#fff',
  },
  searchBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '320px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#13131a',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '10px 16px 10px 40px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  noResults: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
    background: 'var(--bg-card)',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
  },
};
