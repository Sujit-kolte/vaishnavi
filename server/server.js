const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

/* =========================================
   MIDDLEWARE
========================================= */
app.use(cors());
app.use(express.json());

/* =========================================
   HOME ROUTE
========================================= */
app.get("/", (req, res) => {
  res.send("CareerForge AI Backend Running...");
});

/* =========================================
   TEST ROUTE
========================================= */
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working fine ✅" });
});

/* =========================================
   RESUME GENERATION ROUTE
========================================= */
app.post("/api/resume", (req, res) => {
  try {
    const { name, email, phone, skills, education, experience, projects } =
      req.body;

    if (!name || !email || !phone || !skills || !education || !experience || !projects) {
      return res.status(400).json({
        error: "Please fill all fields before generating resume.",
      });
    }

    const generatedResume = {
      name,
      summary: `${name} is a motivated and detail-oriented candidate with skills in ${skills}. Passionate about technology, software development, and problem solving.`,
      education,
      experience,
      skills,
      projects,
      contact: {
        email,
        phone,
      },
    };

    res.json(generatedResume);
  } catch (error) {
    console.error("Resume Generation Error:", error);
    res.status(500).json({ error: "Server error while generating resume." });
  }
});

/* =========================================
   ATS CHECKER ROUTE
========================================= */
app.post("/ats-check", (req, res) => {
  try {
    const { skills, experience, projects, education } = req.body;

    let score = 50;
    let suggestions = [];

    if (skills && skills.trim().length > 5) {
      score += 15;
    } else {
      suggestions.push("Add more relevant technical and soft skills.");
    }

    if (experience && experience.trim().length > 10) {
      score += 15;
    } else {
      suggestions.push("Add internship, training, or project-based experience.");
    }

    if (projects && projects.trim().length > 10) {
      score += 10;
    } else {
      suggestions.push("Add strong academic or personal projects.");
    }

    if (education && education.trim().length > 5) {
      score += 10;
    } else {
      suggestions.push("Add proper education details.");
    }

    const allText = `${skills} ${experience} ${projects}`.toLowerCase();

    const keywords = [
      "java",
      "python",
      "react",
      "node",
      "sql",
      "api",
      "mongodb",
      "javascript",
      "html",
      "css",
      "teamwork",
      "communication",
      "problem solving",
      "leadership",
      "web development"
    ];

    const matchedKeywords = keywords.filter((word) => allText.includes(word));
    score += Math.min(matchedKeywords.length * 2, 20);

    if (matchedKeywords.length < 5) {
      suggestions.push("Use more ATS-friendly keywords like Java, SQL, APIs, teamwork, problem solving, etc.");
    }

    if (score > 100) score = 100;

    const status =
      score >= 85
        ? "Excellent"
        : score >= 70
        ? "Good"
        : score >= 50
        ? "Average"
        : "Needs Improvement";

    res.json({
      score,
      matchedKeywords,
      suggestions,
      status,
    });
  } catch (error) {
    console.error("ATS Error:", error);
    res.status(500).json({
      score: 0,
      matchedKeywords: [],
      suggestions: ["Server error while checking ATS."],
      status: "Error",
    });
  }
});

/* =========================================
   CHAT ROUTE
========================================= */
app.post("/chat", (req, res) => {
  try {
    const { message, userData } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Please enter a message." });
    }

    const userMessage = message.toLowerCase();
    let reply = "";

    const name = userData?.name || "the candidate";
    const skills = userData?.skills || "technical skills";
    const education = userData?.education || "your academic background";
    const experience = userData?.experience || "your practical experience";
    const projects = userData?.projects || "your projects";

    if (userMessage.includes("summary")) {
      reply = `${name} is a motivated and detail-oriented candidate with skills in ${skills}. With a background in ${education} and experience in ${experience}, ${name} has worked on projects such as ${projects} and is eager to contribute effectively in a professional environment.`;
    } else if (userMessage.includes("skills")) {
      reply = `Recommended skills for your resume: ${skills}, SQL, API Integration, Communication, Teamwork, Problem Solving, and Web Development.`;
    } else if (userMessage.includes("project")) {
      reply = `Project Description: ${projects} is a strong practical project that demonstrates technical knowledge, real-world problem solving, and software development ability.`;
    } else if (
      userMessage.includes("experience") ||
      userMessage.includes("internship")
    ) {
      reply = `Experience Description: ${experience}. This experience helped ${name} improve practical skills, teamwork, and development understanding.`;
    } else if (userMessage.includes("interview")) {
      reply = `Interview Preparation:
1) Tell me about yourself.
2) Explain your project: ${projects}
3) What technologies have you used in ${skills}?
4) What challenges did you face during development?
5) Why should we hire you?`;
    } else if (userMessage.includes("cover")) {
      reply = `Cover Letter:
I am excited to apply for this opportunity. With my background in ${education}, technical skills in ${skills}, and experience in ${experience}, I am eager to contribute and continue growing professionally.`;
    } else if (userMessage.includes("ats")) {
      reply = `To improve ATS score, include role-specific keywords, measurable achievements, strong action verbs, and technical tools such as SQL, APIs, communication, teamwork, and problem solving.`;
    } else if (
      userMessage.includes("hello") ||
      userMessage.includes("hi") ||
      userMessage.includes("hey")
    ) {
      reply = `Hello ${name}! 👋
I can help you with:
- Resume Summary
- Skills Suggestions
- Project Descriptions
- ATS Improvement
- Interview Preparation
- Cover Letter Writing`;
    } else {
      reply = `Hello ${name}! I can help you with:
- Resume Summary
- Skills Suggestions
- Project Descriptions
- ATS Improvement
- Interview Preparation
- Cover Letter Writing

Try asking:
- "Write resume summary"
- "Suggest skills"
- "Describe my project"
- "Improve ATS score"
- "Write cover letter"`;
    }

    res.json({ reply });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ reply: "Server error in AI Assistant." });
  }
});

/* =========================================
   START SERVER
========================================= */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});