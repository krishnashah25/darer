import React, { useState } from 'react';
import { Bell, MessageSquare, Send, ArrowLeft } from 'lucide-react';

export default function Activity({ user }) {
  const [activeTab, setActiveTab] = useState('notifications');
  const [selectedChat, setSelectedChat] = useState(null);
  const [whisperText, setWhisperText] = useState('');

  // Notifications feed
  const notifications = [
    { id: 1, user: 'Caedrel', text: 'went live: LCK FINALS LIVE WATCH ALONG!', time: '2 min ago', avatar: 'caedrel' },
    { id: 2, title: 'Upload', user: 'shanks_ttv', text: 'uploaded a new clip: "Ace with knife only!"', time: '15 min ago', avatar: 'shanks' },
    { id: 3, user: 'shroud', text: 'went live: Battlefield 6 playtest!', time: '1 hour ago', avatar: 'shroud' },
    { id: 4, user: 'Taylien', text: 'went live: Minecraft survival build!', time: '3 hours ago', avatar: 'taylien' },
    { id: 5, user: 'ESLCS', text: 'went live: IEM Dallas Grand Finals!', time: '1 day ago', avatar: 'eslcs' },
  ];

  // Whispers (direct chats)
  const [chats, setChats] = useState([
    {
      id: 'ShadowDragon',
      user: '@ShadowDragon',
      lastMsg: 'Hey! Are you live now?',
      time: '2m ago',
      avatar: 'shadow',
      history: [
        { sender: 'ShadowDragon', text: 'Hey! Are you live now?' }
      ]
    },
    {
      id: 'PixelVibe',
      user: '@PixelVibe',
      lastMsg: 'Let’s stream tonight 👾',
      time: '20m ago',
      avatar: 'pixel',
      history: [
        { sender: 'PixelVibe', text: 'Hey there! Loved the last stream.' },
        { sender: 'You', text: 'Thanks!' },
        { sender: 'PixelVibe', text: 'Let’s stream tonight 👾' }
      ]
    },
    {
      id: 'LunaCraft',
      user: '@LunaCraft',
      lastMsg: 'You missed the raid 😭',
      time: '1h ago',
      avatar: 'luna',
      history: [
        { sender: 'LunaCraft', text: 'You missed the raid 😭' }
      ]
    }
  ]);

  const handleSelectChat = (chatId) => {
    const chat = chats.find(c => c.id === chatId);
    setSelectedChat(chat);
  };

  const handleSendWhisper = (e) => {
    e.preventDefault();
    if (!whisperText.trim()) return;

    setChats(prev => prev.map(chat => {
      if (chat.id === selectedChat.id) {
        const updatedHistory = [...chat.history, { sender: 'You', text: whisperText }];
        const updatedChat = {
          ...chat,
          lastMsg: whisperText,
          time: 'Just now',
          history: updatedHistory
        };
        // Update selected chat references as well
        setSelectedChat(updatedChat);
        return updatedChat;
      }
      return chat;
    }));

    setWhisperText('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>Activity & Whispers</h2>

      {/* Main Container Layout */}
      <div style={styles.contentCard}>
        {/* Chat window panel or tab details */}
        {selectedChat ? (
          /* Active Direct Whispers Chat View */
          <div style={styles.chatWindow}>
            <div style={styles.chatWindowHeader}>
              <button onClick={() => setSelectedChat(null)} style={styles.backBtn}>
                <ArrowLeft size={18} />
              </button>
              <img
                src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${selectedChat.avatar}`}
                alt={selectedChat.user}
                style={styles.chatAvatar}
              />
              <div>
                <h3 style={styles.chatUserHeader}>{selectedChat.user}</h3>
                <span style={styles.onlineBadge}>Online</span>
              </div>
            </div>

            {/* Private Message History */}
            <div style={styles.chatHistory}>
              {selectedChat.history.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.messageRow,
                    justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      ...styles.messageBubble,
                      backgroundColor: msg.sender === 'You' ? '#003a3d' : '#1b1b22',
                      border: msg.sender === 'You' ? '1px solid var(--primary-cyan)' : '1px solid var(--border-color)',
                      color: '#fff',
                    }}
                  >
                    <p style={{ margin: 0, fontSize: '13.5px' }}>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message send form */}
            <form onSubmit={handleSendWhisper} style={styles.messageForm}>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder={`Whisper to ${selectedChat.user}...`}
                  value={whisperText}
                  onChange={(e) => setWhisperText(e.target.value)}
                  style={styles.msgInput}
                />
                <button type="submit" style={styles.msgSendBtn}>
                  <Send size={16} color="var(--primary-cyan)" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Notifications and Chats Tabs view */
          <div>
            <div style={styles.tabs}>
              <button
                style={{
                  ...styles.tabBtn,
                  borderBottom: activeTab === 'notifications' ? '2.5px solid var(--accent-pink)' : 'none',
                  color: activeTab === 'notifications' ? 'var(--accent-pink)' : '#999',
                }}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={16} style={{ marginRight: '8px' }} />
                <span>Notifications</span>
              </button>
              <button
                style={{
                  ...styles.tabBtn,
                  borderBottom: activeTab === 'whispers' ? '2.5px solid var(--accent-pink)' : 'none',
                  color: activeTab === 'whispers' ? 'var(--accent-pink)' : '#999',
                }}
                onClick={() => setActiveTab('whispers')}
              >
                <MessageSquare size={16} style={{ marginRight: '8px' }} />
                <span>Whispers</span>
              </button>
            </div>

            <div style={styles.tabContent} className="tab-transition" key={activeTab}>
              {/* Tab 1: Notifications */}
              {activeTab === 'notifications' && (
                <div style={styles.notificationsList}>
                  {notifications.map((notif) => (
                    <div key={notif.id} style={styles.activityItem}>
                      <img
                        src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${notif.avatar}`}
                        alt={notif.user}
                        style={styles.avatar}
                      />
                      <div style={styles.activityInfo}>
                        <p style={styles.activityText}>
                          <strong style={{ color: 'var(--primary-cyan)' }}>@{notif.user}</strong> {notif.text}
                        </p>
                        <span style={styles.activityTime}>{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Whispers list */}
              {activeTab === 'whispers' && (
                <div style={styles.whispersList}>
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => handleSelectChat(chat.id)}
                      style={styles.chatCard}
                      className="whispers-chat-card"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${chat.avatar}`}
                        alt={chat.user}
                        style={styles.chatCardAvatar}
                      />
                      <div style={styles.chatCardInfo}>
                        <h4 style={styles.chatCardUser}>{chat.user}</h4>
                        <p style={styles.chatCardMsg}>{chat.lastMsg}</p>
                      </div>
                      <span style={styles.chatCardTime}>{chat.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '720px',
    margin: '0 auto',
    width: '100%',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '20px',
  },
  contentCard: {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: '#09090d',
  },
  tabBtn: {
    flex: 1,
    background: 'none',
    border: 'none',
    padding: '16px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  tabContent: {
    padding: '16px',
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#0c0c11',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    gap: '16px',
    transition: 'all 0.2s',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: '#161622',
    border: '1.5px solid var(--border-color)',
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontSize: '13.5px',
    margin: 0,
    color: '#eee',
  },
  activityTime: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
    display: 'inline-block',
    marginTop: '4px',
  },
  whispersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  chatCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#0c0c11',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    gap: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  chatCardAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: '#161622',
    border: '1.5px solid var(--border-color)',
  },
  chatCardInfo: {
    flex: 1,
    minWidth: 0,
  },
  chatCardUser: {
    fontSize: '14px',
    fontWeight: '700',
    margin: 0,
    color: '#fff',
  },
  chatCardMsg: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    margin: '4px 0 0 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  chatCardTime: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
  },
  chatWindow: {
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    backgroundColor: '#0c0c11',
  },
  chatWindowHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: '#09090d',
    gap: '12px',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
  },
  chatAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: '#161622',
    border: '1.5px solid var(--primary-cyan)',
  },
  chatUserHeader: {
    fontSize: '14px',
    fontWeight: '700',
    margin: 0,
    color: '#fff',
  },
  onlineBadge: {
    fontSize: '10px',
    color: 'var(--neon-green)',
    fontWeight: '600',
  },
  chatHistory: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  messageRow: {
    display: 'flex',
    width: '100%',
  },
  messageBubble: {
    padding: '10px 14px',
    borderRadius: '12px',
    maxWidth: '75%',
    lineHeight: '1.4',
  },
  messageForm: {
    padding: '16px',
    borderTop: '1px solid var(--border-color)',
    backgroundColor: '#09090d',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  msgInput: {
    width: '100%',
    backgroundColor: '#121217',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '10px 40px 10px 16px',
    color: '#fff',
    fontSize: '13px',
    outline: 'none',
  },
  msgSendBtn: {
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
