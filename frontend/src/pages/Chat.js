import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { LoadingContext } from '../contexts/LoadingContext';
import Spinner from '../components/Spinner';
import '../index.css';

const BACKEND_URL = 'http://localhost:5000';
let socket;

const Chat = () => {
  const { mentorId } = useParams();
  const userId = localStorage.getItem('userId') || '000000000000000000000000';
  const { loading, setLoading } = useContext(LoadingContext);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    socket = io(BACKEND_URL);

    setLoading(true);
    axios.post(`${BACKEND_URL}/api/conversations`, { userId, mentorId })
      .then(res => {
        const conv = res.data;
        setConversationId(conv._id);
        socket.emit('joinRoom', conv._id);
        return axios.get(`${BACKEND_URL}/api/messages/${conv._id}`);
      })
      .then(res => setMessages(res.data))
      .catch(() => console.error('Chat load error'))
      .finally(() => setLoading(false));

    socket.on('newMessage', msg => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [mentorId, userId, setLoading]);

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!text.trim() || !conversationId) return;
    socket.emit('sendMessage', { conversationId, sender: 'user', text });
    setText('');
  };

  if (loading) return <Spinner />;

  return (
    <div className="chat-container">
      <h2>Chat with Mentor</h2>
      <div className="messages">
        {messages.map(m => (
          <div
            key={m._id}
            className={m.sender === 'user' ? 'message user' : 'message mentor'}
          >
            {m.text}
            <div className="timestamp">{new Date(m.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="button button-primary">
          Send
        </button>
      </div>
    </div>
);
};

export default Chat;
