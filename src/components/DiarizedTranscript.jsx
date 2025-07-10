import { useEffect, useRef } from 'react';

export default function DiarizedTranscript({ transcript }) {
  const transcriptRef = useRef(null);

  // Auto-scroll to bottom when new entries are added
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

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

  return (
    <div className="diarized-transcript">
      <h3 style={{ 
        color: '#1e40af', 
        marginBottom: '15px', 
        fontSize: '18px',
        fontWeight: '600'
      }}>
        📝 Live Diarized Transcript
      </h3>
      <div 
        ref={transcriptRef}
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          padding: '15px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        {transcript.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#6b7280', 
            fontStyle: 'italic',
            padding: '20px'
          }}>
            Start a conversation to see the diarized transcript here...
          </div>
        ) : (
          transcript.map((entry, index) => (
            <div 
              key={index} 
              style={{
                marginBottom: '15px',
                padding: '12px 16px',
                borderRadius: '8px',
                background: entry.type === 'user' 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' 
                  : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                color: entry.type === 'user' ? 'white' : '#1e293b',
                border: entry.type === 'ai' ? '1px solid #e2e8f0' : 'none',
                marginLeft: entry.type === 'user' ? '20%' : '0',
                marginRight: entry.type === 'ai' ? '20%' : '0',
                animation: 'fadeInUp 0.4s ease'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <strong style={{ 
                  fontSize: '12px', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  opacity: 0.9
                }}>
                  {entry.speaker}
                </strong>
                <span style={{ 
                  fontSize: '11px', 
                  opacity: 0.7,
                  fontWeight: '500'
                }}>
                  {entry.formattedTime}
                </span>
              </div>
              <div style={{ 
                lineHeight: '1.5',
                fontSize: '14px',
                whiteSpace: 'pre-line'
              }}>
                {formatMessage(entry.text)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 