const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI SUMMARY
exports.generateSummary = async (req, res) => {
  try {
    const { skills, experience } = req.body;

    const prompt = `
    Write a professional resume summary.
    Skills: ${skills}
    Experience: ${experience}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      summary: response.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// IMPROVE TEXT
exports.improveText = async (req, res) => {
  const { text } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: `Improve this resume line: ${text}` },
    ],
  });

  res.json({ improved: response.choices[0].message.content });
};