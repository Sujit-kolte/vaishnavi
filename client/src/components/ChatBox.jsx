import React, { useState } from "react";
import { sendMessageToAI } from "../services/api";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChat((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await sendMessageToAI(message);

      const botMessage = {
        sender: "bot",
        text: data.reply || "No response from AI",
      };

      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to backend" },
      ]);
      console.error(error);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <div style={{ width: "60%", margin: "auto", marginTop: "30px" }}>
      <h2>AI Chat Assistant</h2>

      <div
        style={{
          border: "1px solid #ccc",
          minHeight: "400px",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "10px",
          overflowY: "auto",
        }}
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "10px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px 15px",
                borderRadius: "15px",
                backgroundColor: msg.sender === "user" ? "#007bff" : "#f1f1f1",
                color: msg.sender === "user" ? "#fff" : "#000",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && <p>AI is typing...</p>}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={handleSend} style={{ padding: "10px 20px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;