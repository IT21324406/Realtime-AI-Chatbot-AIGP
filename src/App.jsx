import { useState } from "react";
import ChatBox from "./components/ChatBox";
import { useTranscription } from "./hooks/useTranscription";
import { getGeminiResponse } from "./utils/geminiApi";
import { speak } from "./utils/speak";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [interim, setInterim] = useState("");
  const { start, stop } = useTranscription(handleTranscription);

  function handleTranscription(text) {
    setInterim(text);
  }

  async function handleSend() {
    const userText = interim.trim();
    if (!userText) return;

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInterim("");

    const aiText = await getGeminiResponse(userText);
    speak(aiText);
    setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
  }

  return (
    <div className="App">
      <h2>🎙️ Real-Time Conversational AI</h2>
      <div className="buttons">
        <button onClick={start}>🎤 Start Talking</button>
        <button onClick={stop}>⏹ Stop</button>
        <button onClick={handleSend}>✅ Send to AI</button>
      </div>

      <p><strong>Live Speech:</strong> {interim}</p>
      <ChatBox messages={messages} />
    </div>
  );
}
