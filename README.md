# 🎙️ Real-Time AI Conversation with Diarization

A sophisticated voice-powered AI chat application featuring real-time transcription, AI responses, and simulated speaker diarization.

## ✨ Features

### 🎤 Real-Time Speech Recognition
- Live microphone transcription using Web Speech API
- Continuous listening with interim results
- Automatic processing when speech is finalized

### 🤖 AI Integration
- Powered by Google Gemini AI
- Natural conversational responses
- Text-to-speech output for AI responses

### 📝 Live Diarized Transcript
- **Speaker Identification**: Distinguishes between User and AI Agent
- **Timestamps**: Precise timing for each utterance
- **Real-time Updates**: Live transcript updates as conversation progresses
- **Professional UI**: Clean, modern interface with speaker bubbles

### 🎵 AI Audio Capture & Transcription
- Captures AI TTS audio using Web Audio API
- Simulates AI audio transcription processing
- Integrates with diarization system

### 🎨 Modern UI/UX
- Professional blue-themed design
- Responsive layout (chat + transcript side-by-side)
- Smooth animations and transitions
- Auto-scrolling chat and transcript
- Status indicators and controls

## 🚀 Getting Started

### Prerequisites
- Modern web browser with Web Speech API support
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd realtime-ai-chat
```

2. Install dependencies:
```bash
npm install
```

3. Configure your Gemini API key:
   - Open `src/utils/geminiApi.js`
   - Replace `'YOUR_GEMINI_API_KEY'` with your actual API key

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🎯 How to Use

1. **Start Listening**: Click the "🎤 Start" button to begin speech recognition
2. **Speak**: Talk naturally - your speech will be transcribed in real-time
3. **AI Response**: The AI will respond with both text and speech
4. **View Transcript**: Watch the diarized transcript update with speaker labels
5. **Clear**: Use the "🗑️ Clear" button to reset the conversation

## 🏗️ Architecture

### Frontend Components
- **App.jsx**: Main application logic and state management
- **ChatBox.jsx**: Chat interface with controls and message display
- **DiarizedTranscript.jsx**: Live transcript with speaker diarization

### Utilities
- **audioRecorder.js**: Captures AI TTS audio using MediaRecorder
- **diarizationSimulator.js**: Simulates speaker diarization logic
- **geminiApi.js**: Google Gemini AI integration
- **speak.js**: Text-to-speech functionality

### Key Features Implementation

#### Diarization Simulation
```javascript
// Adds user speech to conversation history
diarizationSimulator.addUserMessage(text, timestamp);

// Adds AI response to conversation history  
diarizationSimulator.addAIMessage(text, timestamp);

// Gets formatted transcript with speaker labels
const transcript = diarizationSimulator.formatTranscript();
```

#### AI Audio Capture
```javascript
// Creates audio stream from TTS
const ttsStream = await audioRecorder.createTTSStream(text);

// Records AI speech
audioRecorder.startRecording(ttsStream);
await speak(text);
const audioBlob = await audioRecorder.stopRecording();
```

## 🎨 UI Features

### Professional Design
- Gradient backgrounds and modern styling
- Responsive grid layout
- Smooth animations and transitions
- Professional color scheme (blue theme)

### User Experience
- Real-time status indicators
- Auto-scrolling chat and transcript
- Clear visual distinction between speakers
- Intuitive controls and feedback

## 🔧 Technical Details

### Browser Compatibility
- Requires Web Speech API support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- HTTPS required for microphone access

### API Integration
- Google Gemini AI for natural language processing
- Web Speech API for speech recognition
- Web Audio API for audio capture
- Speech Synthesis API for TTS

### Performance
- Efficient real-time processing
- Minimal latency in speech recognition
- Optimized audio capture and playback

## 🚧 Limitations & Future Enhancements

### Current Limitations
- Browser-only implementation (no backend)
- Simulated diarization (not true speaker separation)
- Limited to user microphone input
- No persistent storage

### Potential Enhancements
- Backend integration for true diarization
- System audio capture
- Conversation history persistence
- Multiple speaker support
- Advanced audio processing

## 📝 License

This project is for educational and assessment purposes.

---

**Note**: This is a proof-of-concept implementation demonstrating real-time conversational AI with simulated diarization. For production use, consider implementing a backend with proper audio processing and true speaker diarization capabilities.
