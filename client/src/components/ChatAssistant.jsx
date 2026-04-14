import React, { useState } from "react";
import { askAI } from "../services/api";
import { supabase } from "../services/supabase"
const ChatAssistant = ({ resumeData }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "ai",
      text: "Hi! I can help you with resume summary, ATS tips, interview prep, project descriptions, skills, and cover letters.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (customMessage = null) => {
    const finalMessage = customMessage || message;
    if (!finalMessage.trim()) return;

    setChat((prev) => [...prev, { sender: "user", text: finalMessage }]);
    setLoading(true);

    try {
      const data = await askAI(finalMessage, resumeData);
      setChat((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: "Error connecting to backend." },
      ]);
    }

    setMessage("");
    setLoading(false);
  };

  const quickPrompts = [
    "Write resume summary",
    "Suggest skills",
    "Describe my project",
    "Prepare interview questions",
    "Improve ATS score",
    "Write cover letter",
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 mb-8 transition">
      <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
        AI Assistant
      </h2>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-3 mb-6">
        {quickPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => sendMessage(prompt)}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Box */}
      <div className="h-80 overflow-y-auto bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 mb-4 border border-slate-200 dark:border-slate-700">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl whitespace-pre-line shadow-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-600"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-slate-500 dark:text-slate-300 text-sm">
            AI is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Ask something about your resume..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border border-slate-300 dark:border-slate-600 rounded-xl p-4 bg-slate-50 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={() => sendMessage()}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-md font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;