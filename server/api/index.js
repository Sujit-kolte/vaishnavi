export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      message: "Backend working ✅",
    });
  }

  if (req.method === "POST") {
    const { type, name, skills, message } = req.body;

    if (type === "resume") {
      return res.json({
        name,
        summary: `${name} is skilled in ${skills}`,
      });
    }

    if (type === "ats") {
      return res.json({
        score: 80,
        status: "Good",
      });
    }

    if (type === "chat") {
      return res.json({
        reply: `AI says: ${message}`,
      });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}