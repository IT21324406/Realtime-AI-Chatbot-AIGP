export default function ChatBox({ messages }) {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div key={index} className={`chat-msg ${msg.sender}`}>
          <strong>{msg.sender === "user" ? "User" : "AI Agent"}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
}
