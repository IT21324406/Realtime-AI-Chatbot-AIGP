import { useState, useEffect, useRef } from 'react';
import ChatBox from './components/ChatBox';
import DiarizedTranscript from './components/DiarizedTranscript';
import { AudioRecorder } from './utils/audioRecorder';
import { DiarizationSimulator } from './utils/diarizationSimulator';
import { speak } from './utils/speak';
import { sendToGemini } from './utils/geminiApi';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [diarizedTranscript, setDiarizedTranscript] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef(null);
  const audioRecorderRef = useRef(new AudioRecorder());
  const diarizationSimulatorRef = useRef(new DiarizationSimulator());

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(finalTranscript);
          handleUserMessage(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const handleUserMessage = async (userText) => {
    if (!userText.trim()) return;

    const userTimestamp = new Date();
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: userText,
      sender: 'user',
      timestamp: userTimestamp
    };
    setMessages(prev => [...prev, userMessage]);

    // Add to diarization simulator
    diarizationSimulatorRef.current.addUserMessage(userText, userTimestamp);
    updateDiarizedTranscript();

    setIsProcessing(true);

    try {
      // Get AI response
      const aiResponse = await sendToGemini(userText);
      
      const aiTimestamp = new Date();
      
      // Add AI message to chat
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: aiTimestamp
      };
      setMessages(prev => [...prev, aiMessage]);

      // Add to diarization simulator
      diarizationSimulatorRef.current.addAIMessage(aiResponse, aiTimestamp);
      updateDiarizedTranscript();

      // Speak AI response and capture audio
      await speakAndCapture(aiResponse);

    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
      setTranscript('');
    }
  };

  const speakAndCapture = async (text) => {
    try {
      // Create a stream to capture the TTS audio
      const ttsStream = await audioRecorderRef.current.createTTSStream(text);
      // Start recording the AI speech
      audioRecorderRef.current.startRecording(ttsStream);
      // Speak the text, pausing mic during TTS
      await new Promise((resolve) => {
        speak(text, {
          onStart: () => {
            recognitionRef.current?.stop();
          },
          onEnd: () => {
            recognitionRef.current?.start();
            resolve();
          }
        });
      });
      // Stop recording and get the audio blob
      const audioBlob = await audioRecorderRef.current.stopRecording();
      if (audioBlob) {
        console.log('AI audio captured:', audioBlob.size, 'bytes');
        // In a real implementation, you would send this to a backend for transcription
        // For now, we simulate the AI audio transcription
        simulateAIAudioTranscription(text);
      }
    } catch (error) {
      console.error('Error in speak and capture:', error);
      // Fallback to just speaking, with mic pause/resume
      await new Promise((resolve) => {
        speak(text, {
          onStart: () => recognitionRef.current?.stop(),
          onEnd: () => {
            recognitionRef.current?.start();
            resolve();
          }
        });
      });
    }
  };

  const simulateAIAudioTranscription = (text) => {
    // Simulate processing time for AI audio transcription
    setTimeout(() => {
      console.log('AI audio transcription completed:', text);
      // The diarized transcript is already updated when we add the AI message
    }, 500);
  };

  const updateDiarizedTranscript = () => {
    const formattedTranscript = diarizationSimulatorRef.current.formatTranscript();
    setDiarizedTranscript(formattedTranscript);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setDiarizedTranscript([]);
    diarizationSimulatorRef.current.clearHistory();
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>🎙️ Real-Time AI Conversation</h1>
          <p>Voice-powered AI chat with live transcription & diarization</p>
        </header>

        <div className="main-content">
          <div className="chat-section">
            <ChatBox 
              messages={messages} 
              isListening={isListening}
              isProcessing={isProcessing}
              transcript={transcript}
              onToggleListening={toggleListening}
              onClearConversation={clearConversation}
            />
          </div>

          <div className="transcript-section">
            <DiarizedTranscript transcript={diarizedTranscript} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
