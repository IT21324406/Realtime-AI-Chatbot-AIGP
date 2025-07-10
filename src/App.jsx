import { useState } from "react";
import ChatBox from "./components/ChatBox";
import { useTranscription } from "./hooks/useTranscription";
import { getGeminiResponse } from "./utils/geminiApi";
import { speak } from "./utils/speak";
import { formatAIResponse } from "./utils/formatResponse";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [interim, setInterim] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { start, stop } = useTranscription(handleTranscription);

  function handleTranscription(text) {
    setInterim(text);
  }

  async function handleStartRecording() {
    setIsRecording(true);
    start();
  }

  async function handleStopRecording() {
    setIsRecording(false);
    stop();
  }

  async function handleSend() {
    const userText = interim.trim();
    if (!userText) return;
    
    setIsLoading(true);
    const timestamp = Date.now();
    
    setMessages((prev) => [...prev, { 
      sender: "user", 
      text: userText, 
      timestamp: timestamp 
    }]);
    setInterim("");
    
    try {
      const aiText = await getGeminiResponse(userText);
      const formattedAIResponse = formatAIResponse(aiText);
      setMessages((prev) => [...prev, { 
        sender: "ai", 
        text: formattedAIResponse, 
        timestamp: Date.now() 
      }]);
      speak(formattedAIResponse);
    } catch (error) {
      setMessages((prev) => [...prev, { 
        sender: "ai", 
        text: "Sorry, I encountered an error. Please try again.", 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClearChat() {
    setMessages([]);
    setInterim("");
  }

  return (
    <div className="App">
      <h2>🎙️ Real-Time Conversational AI</h2>
      
      {/* Status Bar */}
      <div className="status-bar">
        <span className={`status-indicator ${isRecording ? 'recording' : 'ready'}`}></span>
        <span style={{ color: '#333', fontSize: '14px' }}>
          {isRecording ? 'Recording... Speak now!' : 'Ready to record'}
        </span>
      </div>

      {/* Control Buttons */}
      <div className="buttons">
        <button 
          onClick={handleStartRecording} 
          disabled={isRecording || isLoading}
        >
          🎤 Start Recording
        </button>
        <button 
          onClick={handleStopRecording} 
          disabled={!isRecording || isLoading}
        >
          ⏹ Stop Recording
        </button>
        <button 
          onClick={handleSend} 
          disabled={isLoading || isRecording || !interim.trim()}
        >
          {isLoading ? '🤔 Processing...' : '✅ Send to AI'}
        </button>
        <button 
          onClick={handleClearChat}
          disabled={messages.length === 0}
        >
          🗑️ Clear Chat
        </button>
      </div>

      {/* Live Speech Display */}
      <div className="speech-display">
        <strong>Live Speech</strong>
        {interim || "Click 'Start Recording' and speak to see your words here..."}
      </div>
      
      {/* Chat Messages */}
      <ChatBox messages={messages} />
    </div>
  );
}
