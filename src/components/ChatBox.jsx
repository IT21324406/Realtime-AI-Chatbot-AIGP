import { useEffect, useRef } from 'react';

export default function ChatBox({ 
  messages, 
  isListening, 
  isProcessing, 
  transcript, 
  onToggleListening, 
  onClearConversation 
}) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessage = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.trim().startsWith('•')) {
        return (
          <div key={index} style={{ marginLeft: '20px', marginBottom: '4px' }}>
            {line}
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={index} style={{ height: '8px' }}></div>;
      }
      return <div key={index}>{line}</div>;
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>💬 Live Chat</h2>
        <div className="controls">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className={`status-indicator ${isListening ? 'recording' : ''}`}></div>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              {isListening ? 'Listening...' : 'Ready'}
            </span>
          </div>
          <button
            className={`control-btn ${isListening ? 'secondary' : 'primary'}`}
            onClick={onToggleListening}
            disabled={isProcessing}
          >
            {isListening ? '⏹ Stop' : '🎤 Start'}
          </button>
          <button
            className="control-btn secondary"
            onClick={onClearConversation}
            disabled={messages.length === 0}
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      <div className="transcript-display">
        {transcript ? (
          <div style={{ width: '100%' }}>
            <strong style={{ color: '#1e40af', fontSize: '12px' }}>LIVE TRANSCRIPT:</strong>
            <div style={{ marginTop: '4px', color: '#374151' }}>{transcript}</div>
          </div>
        ) : (
          <div className="empty">
            {isListening ? 'Listening... Speak now!' : 'Click Start to begin speaking...'}
          </div>
        )}
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#6b7280', 
            fontStyle: 'italic',
            padding: '40px 20px'
          }}>
            Start a conversation to see messages here...
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                {formatMessage(message.text)}
              </div>
              <div className="message-time">
                {formatTime(message.timestamp)}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
