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
    const { name, email, phone, skills, education, experience, projects } = req.body;

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
      success: true,
      resume: generatedResume,
    });
  } catch (error) {
    console.error("Generate Resume Error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating resume",
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

module.exports = router;