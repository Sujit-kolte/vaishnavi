import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { supabase } from "./lib/supabase";

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
      text: "Hello 👋 I’m your AI Career Assistant. Ask me for resume summary, skills, ATS tips, projects, cover letter, or interview help.",
    },
  ]);

  const resumeRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // =========================
  // SAVE TO SUPABASE (FIXED SAFE)
  // =========================
  const saveResume = async () => {
    try {
      const { data, error } = await supabase.from("resumes").insert([
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
        return;
      }

      console.log("✅ Saved to Supabase:", data);
    } catch (err) {
      console.log("❌ Unexpected Supabase error:", err.message);
    }
  };

  // =========================
  // GENERATE RESUME
  // =========================
  const generateResume = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error generating resume.");
        return;
      }

      setResume(data);
      await saveResume();
      setActiveSection("build");
    } catch (error) {
      console.error("Resume fetch error:", error);
      alert("Error generating resume. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ATS CHECKER
  // =========================
  const checkATS = async () => {
    try {
      setLoadingAts(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            skills: formData.skills,
            experience: formData.experience,
            projects: formData.projects,
            education: formData.education,
          }),
        }
      );

      const data = await response.json();
      setAtsResult(data);
      setActiveSection("ats");
    } catch (error) {
      console.error("ATS Error:", error);
      alert("Error checking ATS score");
    } finally {
      setLoadingAts(false);
    }
  };

  // =========================
  // AI CHAT
  // =========================
  const sendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userText = chatMessage;

    setChatHistory((prev) => [...prev, { role: "user", text: userText }]);
    setChatMessage("");
    setChatLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userText,
            userData: formData,
          }),
        }
      );

      const data = await response.json();

      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data?.reply || "No reply from backend.",
        },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Backend not responding. Please check server.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // =========================
  // DOWNLOAD PDF
  // =========================
  const downloadPDF = () => {
    if (!resumeRef.current) return;

    const opt = {
      margin: 0.3,
      filename: `${resume?.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(resumeRef.current).save();
  };

  const bgMain = darkMode
    ? "bg-slate-950 text-white"
    : "bg-slate-100 text-slate-900";

  const cardBg = darkMode
    ? "bg-slate-900 border border-slate-800"
    : "bg-white border border-slate-200";

  const inputBg = darkMode
    ? "bg-slate-800 text-white border-slate-700"
    : "bg-slate-100 text-slate-900 border-slate-300";

  return (
    <div className={`min-h-screen ${bgMain} transition-all duration-300`}>
      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="px-4 md:px-8 lg:px-10 py-4 flex items-center justify-between gap-4">
          
          <div
            onClick={() => setActiveSection("home")}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl font-extrabold shadow-lg">
              C
            </div>

            <div className="leading-tight">
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CareerForge AI
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                Smart Resume Builder
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-inner">
            {[
              { key: "home", label: "Home", icon: "🏠" },
              { key: "build", label: "Build Resume", icon: "📝" },
              { key: "ats", label: "ATS Checker", icon: "📊" },
              { key: "assistant", label: "AI Assistant", icon: "🤖" },
              { key: "templates", label: "Templates", icon: "📄" },
              { key: "tips", label: "Career Tips", icon: "💡" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeSection === item.key
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-5 py-2.5 rounded-2xl font-semibold shadow-md bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      <main className="flex-1 p-6 md:p-10">

        {/* HOME */}
        {activeSection === "home" && (
          <section className={`${cardBg} p-8 rounded-3xl`}>
            <h1 className="text-4xl font-bold">Welcome</h1>
          </section>
        )}

        {/* BUILD */}
        {activeSection === "build" && (
          <section className={`${cardBg} p-8 rounded-3xl`}>
            <h2 className="text-3xl font-bold mb-4">Build Resume</h2>

            <input name="name" onChange={handleChange} className={`p-3 w-full mb-3 ${inputBg}`} placeholder="Name" />
            <input name="email" onChange={handleChange} className={`p-3 w-full mb-3 ${inputBg}`} placeholder="Email" />

            <button onClick={generateResume} className="bg-blue-600 text-white px-6 py-3 rounded-xl">
              {loading ? "Generating..." : "Generate"}
            </button>

            {resume && (
              <button onClick={downloadPDF} className="ml-3 bg-green-600 text-white px-6 py-3 rounded-xl">
                Download PDF
              </button>
            )}
          </section>
        )}

      </main>
    </div>
  );
}

export default App;