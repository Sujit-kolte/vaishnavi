import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { generateSummary } from "../aiRoute";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/resume-builder");

const ResumeSchema = new mongoose.Schema({
  userId: String,
  resume: Object,
});

const Resume = mongoose.model("Resume", ResumeSchema);

app.post("/api/resume/save", async (req, res) => {
  const { userId, resume } = req.body;

  const existing = await Resume.findOne({ userId });
  if (existing) {
    existing.resume = resume;
    await existing.save();
  } else {
    await Resume.create({ userId, resume });
  }
  res.json({ success: true });
});

app.get("/api/resume/:userId", async (req, res) => {
  const data = await Resume.findOne({ userId: req.params.userId });
  res.json(data);
});

app.post("/api/ai/summary", generateSummary);

app.listen(5000, () => console.log("Server running on 5000"));
