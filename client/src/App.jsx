import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { createClient } from "@supabase/supabase-js";

// ================= SUPABASE =================
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [loading, setLoading] = useState(false);
  const [loadingAts, setLoadingAts] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
  });

  const [resume, setResume] = useState(null);
  const [atsResult, setAtsResult] = useState(null);

  const [chatMessage, setChatMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      text: "Hello 👋 I’m your AI Career Assistant.",
    },
  ]);

  const resumeRef = useRef();

  // ================= FORM HANDLER =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= SAVE TO SUPABASE =================
  const saveResume = async () => {
    const { error } = await supabase.from("resumes").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        skills: formData.skills,
        education: formData.education,
        experience: formData.experience,
        projects: formData.projects,
      },
    ]);

    if (error) {
      console.log("❌ Supabase Error:", error.message);
    } else {
      console.log("✅ Saved to Supabase");
    }
  };

  // ================= GENERATE RESUME (NO BACKEND) =================
  const generateResume = async () => {
    setLoading(true);

    const data = {
      name: formData.name,
      summary: `${formData.name} is skilled in ${formData.skills}`,
      education: formData.education,
      skills: formData.skills,
      experience: formData.experience,
      projects: formData.projects,
      contact: {
        email: formData.email,
        phone: formData.phone,
      },
    };

    setResume(data);
    await saveResume();
    setActiveSection("build");

    setLoading(false);
  };

  // ================= ATS CHECK (LOCAL LOGIC) =================
  const checkATS = async () => {
    setLoadingAts(true);

    const score = formData.skills.length > 20 ? 80 : 60;

    setAtsResult({
      score,
      status: score > 70 ? "Good" : "Needs Improvement",
      matchedKeywords: formData.skills.split(","),
      suggestions: [
        "Add more keywords",
        "Improve project descriptions",
        "Use strong action verbs",
      ],
    });

    setActiveSection("ats");
    setLoadingAts(false);
  };

  // ================= AI CHAT (MOCK RESPONSE) =================
  const sendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userText = chatMessage;

    setChatHistory((prev) => [...prev, { role: "user", text: userText }]);
    setChatMessage("");
    setChatLoading(true);

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `AI: I can help you improve "${userText}" for your resume.`,
        },
      ]);
      setChatLoading(false);
    }, 1000);
  };

  // ================= DOWNLOAD PDF =================
  const downloadPDF = () => {
    const opt = {
      margin: 0.3,
      filename: `${resume?.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4" },
    };

    html2pdf().set(opt).from(resumeRef.current).save();
  };

  // ================= UI =================
  return (
    <div className={darkMode ? "bg-black text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
      
      {/* NAV */}
      <nav className="p-4 flex justify-between bg-blue-600 text-white">
        <h1 className="font-bold">CareerForge AI</h1>

        <div className="flex gap-3">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light" : "Dark"}
          </button>

          <button onClick={() => setActiveSection("build")}>
            Build
          </button>
        </div>
      </nav>

      {/* HOME */}
      {activeSection === "home" && (
        <div className="p-10 text-center">
          <h1 className="text-4xl font-bold">AI Resume Builder</h1>
          <p>Create resumes easily with Supabase</p>
        </div>
      )}

      {/* BUILD */}
      {activeSection === "build" && (
        <div className="p-6">
          <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 m-2" />
          <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 m-2" />
          <input name="skills" placeholder="Skills" onChange={handleChange} className="border p-2 m-2" />

          <div className="mt-4">
            <button onClick={generateResume} className="bg-blue-600 text-white px-4 py-2 m-2">
              {loading ? "Generating..." : "Generate"}
            </button>

            <button onClick={checkATS} className="bg-purple-600 text-white px-4 py-2 m-2">
              Check ATS
            </button>

            {resume && (
              <button onClick={downloadPDF} className="bg-green-600 text-white px-4 py-2 m-2">
                Download PDF
              </button>
            )}
          </div>

          {resume && (
            <div ref={resumeRef} className="bg-white text-black p-6 mt-5">
              <h2>{resume.name}</h2>
              <p>{resume.summary}</p>
              <p>{resume.skills}</p>
            </div>
          )}
        </div>
      )}

      {/* ATS */}
      {activeSection === "ats" && atsResult && (
        <div className="p-6">
          <h2>ATS Score: {atsResult.score}</h2>
          <p>Status: {atsResult.status}</p>
        </div>
      )}

      {/* CHAT */}
      {activeSection === "assistant" && (
        <div className="p-6">
          <div className="h-64 overflow-auto border p-3">
            {chatHistory.map((m, i) => (
              <p key={i}><b>{m.role}:</b> {m.text}</p>
            ))}
          </div>

          <input
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            className="border p-2 mt-2 w-full"
          />

          <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 mt-2">
            Send
          </button>
        </div>
      )}

    </div>
  );
}

export default App;