import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { supabase } from './lib/supabase' // adjust path

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
// SAVE TO SUPABASE
// =========================
const saveResume = async () => {
  const { data, error } = await supabase
    .from('resumes')
    .insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        skills: formData.skills,
        education: formData.education,
        experience: formData.experience,
        projects: formData.projects,
      }
    ])

  if (error) {
    console.log("❌ Error:", error.message)
  } else {
    console.log("✅ Saved:", data)
  }
}
  // =========================
  // GENERATE RESUME
  // =========================
  const generateResume = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
// =========================
// SAVE TO SUPABASE
// =========================


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

      const response = await fetch("http://localhost:5000/ats-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: formData.skills,
          experience: formData.experience,
          projects: formData.projects,
          education: formData.education,
        }),
      });

      const data = await response.json();
      setAtsResult(data);
      setActiveSection("ats");
    } catch (error) {
      console.error("ATS Checker Error:", error);
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
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          userData: formData,
        }),
      });

      const data = await response.json();

      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply || "No reply from backend.",
        },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Backend not responding. Please check if server is running.",
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
    
    {/* LEFT: BRAND */}
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

    {/* CENTER: NAV MENU */}
    <div className="hidden lg:flex items-center gap-2 bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-inner">
      {[
        { key: "home", label: "Home"},
        { key: "build", label: "Build Resume"  },
        { key: "ats", label: "ATS Checker" },
        { key: "assistant", label: "AI Assistant" },
        { key: "templates", label: "Templates"},
        { key: "tips", label: "Career Tips" },
      ].map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveSection(item.key)}
          className={`px-4 py-2.5 rounded-xl text-sm xl:text-base font-semibold transition-all duration-300 flex items-center gap-2 ${
            activeSection === item.key
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-[1.02]"
              : "text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm"
          }`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>

    {/* RIGHT: SEARCH + DARK MODE + QUICK ACTION */}
    <div className="flex items-center gap-3">
      
      {/* SEARCH LOOK */}
      <div className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 min-w-[220px]">
        <span className="text-slate-400">🔍</span>
        <input
          type="text"
          placeholder="Search section..."
          className="bg-transparent outline-none text-sm w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
          onFocus={() => setActiveSection("build")}
        />
      </div>

      {/* DARK MODE */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-5 py-2.5 rounded-2xl font-semibold shadow-md bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-800 dark:text-white hover:scale-105 transition-all duration-300"
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      {/* QUICK CTA */}
      <button
        onClick={() => setActiveSection("build")}
        className="hidden md:block px-5 py-2.5 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 shadow-lg transition-all duration-300"
      >
        + New Resume
      </button>
    </div>
  </div>

  {/* MOBILE NAV */}
  <div className="lg:hidden px-4 md:px-8 pb-4">
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
      {[
        { key: "home", label: "Home"},
        { key: "build", label: "Build" },
        { key: "ats", label: "ATS" },
        { key: "assistant", label: "AI"  },
        { key: "templates", label: "Temp" },
        { key: "tips", label: "Tips"},
      ].map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveSection(item.key)}
          className={`px-3 py-3 rounded-2xl text-sm font-semibold transition-all flex flex-col items-center justify-center gap-1 ${
            activeSection === item.key
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
              : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  </div>
</nav>
      <div className="flex">
        {/* ================= SIDEBAR ================= */}
      

        {/* ================= MAIN ================= */}
        <main className="flex-1 p-6 md:p-10">
          {/* ================= HOME ================= */}
          {activeSection === "home" && (
            <>
              <section className="rounded-[2rem] p-10 md:p-14 text-white shadow-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-fuchsia-700 relative overflow-hidden">
                <div className="max-w-4xl">
                  <p className="tracking-[0.3em] text-sm uppercase mb-6 text-blue-100">
                    AI-Powered Career Builder
                  </p>
                  <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                    Build a <span className="text-yellow-300">Job-Winning Resume</span> with AI
                  </h1>
                  <p className="text-xl text-blue-100 leading-9 max-w-3xl mb-8">
                    Create polished resumes, improve summaries, optimize ATS score,
                    and get AI-powered career guidance — all in one beautiful platform.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setActiveSection("build")}
                      className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
                    >
                      Build Resume
                    </button>
                    <button
                      onClick={() => setActiveSection("assistant")}
                      className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
                    >
                      Explore AI Assistant
                    </button>
                  </div>

                  <div className="mt-10 bg-white/10 border border-white/20 rounded-3xl px-6 py-5 backdrop-blur-md max-w-2xl">
                    <p className="italic text-lg">
                      “Your resume is your first impression — make it unforgettable.”
                    </p>
                  </div>
                </div>
              </section>

              <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
                {[
                  {
                    title: "AI Resume Summary",
                    desc: "Generate a professional and impactful summary instantly.",
                    icon: "✨",
                  },
                  {
                    title: "ATS Score Checker",
                    desc: "Analyze your resume and improve job compatibility.",
                    icon: "📊",
                  },
                  {
                    title: "Resume Templates",
                    desc: "Choose from clean, modern, and professional layouts.",
                    icon: "📄",
                  },
                  {
                    title: "AI Career Assistant",
                    desc: "Get help with interview prep, projects, and cover letters.",
                    icon: "🤖",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`${cardBg} rounded-[2rem] p-7 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition`}
                  >
                    <div className="text-4xl mb-5">{item.icon}</div>
                    <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
                    <p className="text-slate-500 leading-8 text-lg">{item.desc}</p>
                  </div>
                ))}
              </section>
            </>
          )}

          {/* ================= BUILD RESUME ================= */}
          {activeSection === "build" && (
            <>
              <section className={`${cardBg} rounded-[2rem] p-8 shadow-xl`}>
                <h2 className="text-4xl font-bold mb-8">Build Your Resume</h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={`w-full p-4 rounded-2xl border ${inputBg}`} />
                  <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={`w-full p-4 rounded-2xl border ${inputBg}`} />
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className={`w-full p-4 rounded-2xl border ${inputBg}`} />
                  <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (e.g. Java, Python, SQL)" className={`w-full p-4 rounded-2xl border ${inputBg}`} />
                  <input name="education" value={formData.education} onChange={handleChange} placeholder="Education" className={`w-full p-4 rounded-2xl border ${inputBg}`} />
                  <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience / Internship" className={`w-full p-4 rounded-2xl border ${inputBg}`} />
                </div>

                <textarea
                  name="projects"
                  value={formData.projects}
                  onChange={handleChange}
                  placeholder="Projects"
                  rows="4"
                  className={`w-full p-4 rounded-2xl border mt-5 ${inputBg}`}
                />

                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={generateResume}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
                  >
                    {loading ? "Generating..." : "Generate Resume"}
                  </button>

                  <button
                    onClick={checkATS}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
                  >
                    {loadingAts ? "Checking ATS..." : "Check ATS Score"}
                  </button>

                  {resume && (
                    <button
                      onClick={downloadPDF}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
                    >
                      Download PDF
                    </button>
                  )}
                </div>
              </section>

              {/* ================= RESUME PREVIEW ================= */}
              {resume && (
                <div ref={resumeRef} className="resume-preview-card">
                  <div className="resume-top">
                    <div>
                      <h1>{resume.name}</h1>
                      <p><strong>Email:</strong> {resume.contact?.email}</p>
                      <p><strong>Phone:</strong> {resume.contact?.phone}</p>
                    </div>
                  </div>

                  <div className="resume-block">
                    <h2>Professional Summary</h2>
                    <p>{resume.summary}</p>
                  </div>

                  <div className="resume-block">
                    <h2>Education</h2>
                    <p>{resume.education}</p>
                  </div>

                  <div className="resume-block">
                    <h2>Skills</h2>
                    <p>{resume.skills}</p>
                  </div>

                  <div className="resume-block">
                    <h2>Experience</h2>
                    <p>{resume.experience}</p>
                  </div>

                  <div className="resume-block">
                    <h2>Projects</h2>
                    <p>{resume.projects}</p>
                  </div>

                  <div className="resume-block">
                    <h2>Career Objective</h2>
                    <p>
                      Seeking an opportunity to apply my technical skills, problem-solving
                      ability, and passion for software development in a growth-oriented organization.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ================= ATS CHECKER ================= */}
          {activeSection === "ats" && (
            <section className={`${cardBg} rounded-[2rem] p-8 shadow-xl`}>
              <h2 className="text-4xl font-bold mb-6">ATS Resume Checker</h2>
              <p className="text-lg text-slate-500 mb-6">
                Check how ATS-friendly your resume content is.
              </p>

              <button
                onClick={checkATS}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
              >
                {loadingAts ? "Checking..." : "Check ATS Score"}
              </button>

              {atsResult && (
                <div className="mt-8 bg-slate-50 rounded-3xl p-6 shadow-inner">
                  <h3 className="text-3xl font-bold text-blue-700 mb-4">
                    ATS Score: {atsResult.score}/100
                  </h3>

                  <p className="text-xl font-medium mb-4">
                    Status:{" "}
                    <span className="text-green-600 font-bold">{atsResult.status}</span>
                  </p>

                  <div className="mb-5">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">
                      Matched Keywords:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {atsResult.matchedKeywords?.length > 0 ? (
                        atsResult.matchedKeywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {keyword}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">No strong keywords found.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">
                      Suggestions to Improve:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 leading-8">
                      {atsResult.suggestions?.length > 0 ? (
                        atsResult.suggestions.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))
                      ) : (
                        <li>Your resume looks ATS-friendly 🎉</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ================= AI ASSISTANT ================= */}
          {activeSection === "assistant" && (
            <section className={`${cardBg} rounded-[2rem] p-8 shadow-xl`}>
              <h2 className="text-4xl font-bold mb-6">AI Career Assistant</h2>

              <div className={`rounded-3xl p-5 h-[450px] overflow-y-auto border ${darkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                <div className="space-y-4">
                  {chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`max-w-[80%] px-5 py-4 rounded-3xl text-base leading-8 shadow ${
                        msg.role === "user"
                          ? "ml-auto bg-blue-600 text-white"
                          : darkMode
                          ? "bg-slate-800 text-white"
                          : "bg-white text-slate-900"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}

                  {chatLoading && (
                    <div className={`max-w-[80%] px-5 py-4 rounded-3xl shadow ${darkMode ? "bg-slate-800 text-white" : "bg-white text-slate-900"}`}>
                      Thinking...
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 flex gap-4">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder='Ask something like "Write resume summary"'
                  className={`flex-1 p-4 rounded-2xl border ${inputBg}`}
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold"
                >
                  Send
                </button>
              </div>
            </section>
          )}

          {/* ================= TEMPLATES ================= */}
          {activeSection === "templates" && (
            <section className={`${cardBg} rounded-[2rem] p-8 shadow-xl`}>
              <h2 className="text-4xl font-bold mb-6">Resume Templates</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {["Classic", "Modern", "Professional"].map((template, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border p-6 hover:shadow-xl transition bg-gradient-to-br from-blue-50 to-indigo-50"
                  >
                    <h3 className="text-2xl font-bold mb-3">{template} Template</h3>
                    <p className="text-slate-600 leading-7">
                      A clean and attractive layout suitable for job applications.
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ================= CAREER TIPS ================= */}
          {activeSection === "tips" && (
            <section className={`${cardBg} rounded-[2rem] p-8 shadow-xl`}>
              <h2 className="text-4xl font-bold mb-6">Career Tips</h2>
              <ul className="space-y-4 text-lg leading-8">
                <li>💡 Keep your resume to 1 page if you're a fresher.</li>
                <li>💡 Highlight projects with measurable outcomes.</li>
                <li>💡 Customize your resume for every job role.</li>
                <li>💡 Practice “Tell me about yourself” before interviews.</li>
                <li>💡 Add GitHub / LinkedIn if available.</li>
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;