import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateSummary = async (req, res) => {
  const { role, skills, experience } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Write a professional resume summary for a ${role}
        with skills ${skills} and experience ${experience}`
      }
    ]
  });

  res.json({ summary: response.choices[0].message.content });
};
