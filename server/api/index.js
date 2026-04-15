export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phone, skills, education, experience, projects, message } = req.body;

    // Resume
    if (name) {
      return res.status(200).json({
        name,
        summary: `${name} is skilled in ${skills}`,
        education,
        experience,
        skills,
        projects,
        contact: { email, phone },
      });
    }

    // ATS
    if (skills && !name) {
      return res.status(200).json({
        score: 80,
        status: "Good",
        matchedKeywords: ["java", "react"],
        suggestions: [],
      });
    }

    // Chat
    if (message) {
      return res.status(200).json({
        reply: `AI says: ${message}`,
      });
    }
  }

  return res.status(200).json({ message: "Backend working ✅" });
}