export default App; app.jsx             
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// HOME
app.get("/", (req, res) => {
  res.send("CareerForge AI Backend Running...");
});

// TEST
app.get("/test", (req, res) => {
  res.json({ message: "Backend working ✅" });
});

// RESUME
app.post("/api/resume", (req, res) => {
  const { name, email, phone, skills, education, experience, projects } = req.body;

  const resume = {
    name,
    summary: `${name} is skilled in ${skills}`,
    education,
    experience,
    skills,
    projects,
    contact: { email, phone },
  };

  res.json(resume);
});

// ATS
app.post("/ats-check", (req, res) => {
  res.json({
    score: 80,
    status: "Good",
    matchedKeywords: ["java", "react"],
    suggestions: []
  });
});

// CHAT
app.post("/chat", (req, res) => {
  res.json({ reply: "AI response working 👍" });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 