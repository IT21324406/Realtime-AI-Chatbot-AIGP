# Real-Time AI Chat (Browser Only)

This is a small project I made for this technical assessment. The idea was to build a real-time chat app where you can talk to an AI using your mic, and it talks back. Everything runs in the browser—no backend or server needed.

## Features
- You click the mic button and start talking. The app transcribes what you say in real time (using your browser’s speech recognition).
- Your message is sent to Google Gemini AI, which replies with a text response.
- The AI’s reply is shown in the chat and also spoken out loud (using browser text-to-speech).
- There’s a transcript area that shows both your messages and the AI Agent’s, with timestamps and who said what (user/AI Agent).

## How I Built It (My Approach)
- I wanted to keep it simple and browser-only, so I used the Web Speech API for transcription and the Speech Synthesis API for the AI Agent’s voice.
- For the AI, I used Google Gemini’s API (Put it in the .env file which i did not push to the repo).
- I made sure the mic pauses when the AI is talking, so it doesn’t pick up its own voice (to avoid feedback loops).
- The transcript is just a list of messages with who said what and when. The AI agent’s transcript comes from its text, not from the mic.


## How to Run It
1. Make sure you have Node.js and npm installed. 
2. Clone this repo, checkout to the dev-modifications branch and go into the `realtime-ai-chat` folder:
   ```bash
   git clone https://github.com/IT21324406/Realtime-AI-Chatbot-AIGP.git
   cd realtime-ai-chat
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Add your Gemini API key:
   - Open `src/utils/geminiApi.js`
   - Replace `'YOUR_GEMINI_API_KEY'` with your actual key
5. Start the app:
   ```bash
   npm run dev
   ```
6. Open your browser at [http://localhost:5173]

## How to Use
- Click the mic button to start talking.
- Speak naturally—your words will show up live.
- Wait for the AI to reply (it’ll talk back and show its message).
- Check the transcript area to see the conversation history.
- Use the clear button to reset everything.

## Main Parts of the App
- `App.jsx`: Main logic and state.
- `components/ChatBox.jsx`: The chat area and controls.
- `hooks/useTranscription.js`: Handles the mic and transcription.
- `utils/geminiApi.js`: Talks to Gemini AI.
- `utils/speak.js`: Makes the AI talk (TTS).

## Limitations
- Everything is browser-only—no real speaker separation, just labels.

Thank you for checking it out!
