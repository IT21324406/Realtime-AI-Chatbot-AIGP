import { useEffect, useRef } from 'react';

export default function ChatBox({ messages }) {
  const chatBoxRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const formatMessage = (text) => {
    // Split by line breaks and render each line
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // If line starts with bullet point, add proper styling
      if (line.trim().startsWith('•')) {
        return (
          <div key={index} style={{ marginLeft: '20px', marginBottom: '4px' }}>
            {line}
          </div>
        );
      }
      // If line is empty, add spacing
      if (line.trim() === '') {
        return <div key={index} style={{ height: '8px' }}></div>;
      }
      // Regular line
      return <div key={index}>{line}</div>;
    });
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="chat-box" ref={chatBoxRef}>
      {messages.map((msg, index) => (
        <div key={index} className={`chat-msg ${msg.sender}`}>
          <strong>{msg.sender === "user" ? "User" : "AI Agent"}</strong>
          <div className="timestamp">
            {formatTimestamp(msg.timestamp || Date.now())}
          </div>
          <div style={{ marginTop: '4px', whiteSpace: 'pre-line' }}>
            {formatMessage(msg.text)}
          </div>
        </div>
      ))}
    </div>
  );
}
