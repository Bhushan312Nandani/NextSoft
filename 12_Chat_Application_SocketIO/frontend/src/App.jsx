import { useState, useEffect, useRef } from 'react';
import { Send, Hash, Users } from 'lucide-react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');
const ROOMS = ['general', 'tech', 'gaming', 'random'];

export default function App() {
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [room, setRoom] = useState('general');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('message', (msg) => {
      if (msg.room === room) {
        setMessages(prev => [...prev, msg]);
      }
    });
    socket.on('onlineUsers', (count) => {
      setOnlineUsers(count);
    });
    return () => {
      socket.off('message');
      socket.off('onlineUsers');
    };
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
      joinRoom(room);
    }
  };

  const joinRoom = async (newRoom) => {
    setRoom(newRoom);
    socket.emit('joinRoom', newRoom);
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${newRoom}`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { user: username, text: message, room });
      setMessage('');
    }
  };

  if (!isJoined) {
    return (
      <div className="login-screen">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Hash size={32} color="var(--primary)" /> NexusChat
        </h1>
        <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Enter your username..." 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            autoFocus 
          />
          <button type="submit">Join Chat</button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <Hash size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> NexusChat
        </div>
        <ul className="room-list">
          {ROOMS.map(r => (
            <li 
              key={r} 
              className={`room-item ${room === r ? 'active' : ''}`}
              onClick={() => joinRoom(r)}
            >
              # {r}
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <Users size={16} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} /> {onlineUsers} Online
        </div>
      </div>

      <div className="chat-area">
        <div className="chat-header">
          <span># {room}</span>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>Logged in as <strong>{username}</strong></span>
        </div>
        
        <div className="messages-container">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.user === username ? 'self' : 'other'}`}>
              {msg.user !== username && <div className="msg-user">{msg.user}</div>}
              <div>{msg.text}</div>
              <div className="msg-time">
                {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input" onSubmit={sendMessage}>
          <input 
            type="text" 
            placeholder={`Message #${room}`} 
            value={message} 
            onChange={e => setMessage(e.target.value)} 
          />
          <button type="submit">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
