const express = require("express");
const router = express.Router();

/* =========================================
   TEST ROUTE
========================================= */
router.get("/test", (req, res) => {
  res.json({ message: "Resume API working" });
});

/* =========================================
   GENERATE RESUME
========================================= */
router.post("/generate", (req, res) => {
  try {
    const { name, email, phone, skills, education, experience, projects } =
      req.body;

    const generatedResume = `
========================================
              ${name || "Your Name"}
========================================

Email: ${email || "your@email.com"}
Phone: ${phone || "0000000000"}

----------------------------------------
PROFESSIONAL SUMMARY
----------------------------------------
${name || "Candidate"} is a motivated and detail-oriented candidate with skills in ${skills || "various technologies"}. Passionate about learning, software development, and problem solving.

----------------------------------------
EDUCATION
----------------------------------------
${education || "Not provided"}

----------------------------------------
SKILLS
----------------------------------------
${skills || "Not provided"}

----------------------------------------
EXPERIENCE
----------------------------------------
${experience || "Not provided"}

----------------------------------------
PROJECTS
----------------------------------------
${projects || "Not provided"}

----------------------------------------
CAREER OBJECTIVE
----------------------------------------
To secure a challenging position in a reputed organization where I can use my technical and problem-solving skills to contribute effectively and grow professionally.
`;

    res.json({
      resume: generatedResume,
    });
  } catch (error) {
    console.error("Generate Resume Error:", error);
    res.status(500).json({
      error: "Error generating resume",
    });
  }
});

/* =========================================
   SAVE RESUME
========================================= */
router.post("/save", (req, res) => {
  try {
    res.json({
      success: true,
      message: "Resume saved successfully!",
    });
  } catch (error) {
    console.error("Save Resume Error:", error);
    res.status(500).json({
      success: false,
      message: "Error saving resume",
    });
  }
});

/* =========================================
   ATS CHECK
========================================= */
router.post("/ats-check", (req, res) => {
  try {
    const { skills, experience, projects, education } = req.body;

    // Simple ATS scoring based on content
    let score = 50; // Base score

    if (skills && skills.length > 10) score += 10;
    if (experience && experience.length > 20) score += 10;
    if (projects && projects.length > 0) score += 10;
    if (education && education.length > 0) score += 10;

    const tips = [];
    if (!skills || skills.length < 5) tips.push("Add more technical skills");
    if (!experience || experience.length < 10)
      tips.push("Provide more work experience details");
    if (!projects || projects.length === 0)
      tips.push("Add projects to showcase your work");
    if (!education || education.length === 0)
      tips.push("Include your educational background");

    res.json({
      score: Math.min(score, 100),
      tips: tips,
      status: score >= 70 ? "Good" : "Needs Improvement",
    });
  } catch (error) {
    console.error("ATS Check Error:", error);
    res.status(500).json({
      error: "Error checking ATS score",
    });
  }
});

module.exports = router;
