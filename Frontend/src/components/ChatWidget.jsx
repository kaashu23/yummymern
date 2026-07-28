import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@clerk/clerk-react';
import './ChatWidget.css'; // We will create this

const ChatWidget = () => {
  const { getToken, isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your AI concierge. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let headers = { 'Content-Type': 'application/json' };
      if (isSignedIn) {
        const token = await getToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ message: userMessage.text })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: `Server Error: ${data.error || data.message || 'Unknown error'}` }]);
      }
    } catch (error) {
      console.error("Chat fetch error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: `Network Error: ${error.message}. Please ensure the backend server is running and you have restarted it.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        className={`chat-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat assistant"
      >
        <span className="material-symbols-outlined">
          {isOpen ? 'close' : 'smart_toy'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="chat-window-container"
          >
            <div className="chat-header">
              <div className="chat-header-info">
                <span className="material-symbols-outlined">restaurant_menu</span>
                <h3>Yummy AI Concierge</h3>
              </div>
              <button 
                className="chat-close-btn md-hidden"
                onClick={() => setIsOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-message-row ${msg.role === 'ai' ? 'ai-row' : 'user-row'}`}>
                  <div className={`chat-bubble ${msg.role === 'ai' ? 'ai-bubble' : 'user-bubble'}`}>
                    {msg.role === 'ai' ? (
                       <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                       msg.text
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="chat-message-row ai-row">
                  <div className="chat-bubble ai-bubble typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="chat-input-area">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the menu..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !input.trim()}>
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
