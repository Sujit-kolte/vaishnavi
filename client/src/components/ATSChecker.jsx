import React from "react";
import { supabase } from "../services/supabase";

const ATSChecker = ({ resumeData }) => {
  if (!resumeData) return null;

  const skillsText = (resumeData.skills || "").toLowerCase();
  const summaryText = (resumeData.summary || "").toLowerCase();
  const projectsText = (resumeData.projects || "").toLowerCase();
  const experienceText = (resumeData.experience || "").toLowerCase();

  const importantKeywords = [
    "java",
    "python",
    "react",
    "node",
    "sql",
    "api",
    "communication",
    "teamwork",
    "problem solving",
    "web development",
  ];

  const foundKeywords = importantKeywords.filter(
    (keyword) =>
      skillsText.includes(keyword) ||
      summaryText.includes(keyword) ||
      projectsText.includes(keyword) ||
      experienceText.includes(keyword)
  );

  const missingKeywords = importantKeywords.filter(
    (keyword) => !foundKeywords.includes(keyword)
  );

  let score = Math.round((foundKeywords.length / importantKeywords.length) * 100);

  if (score < 40) score += 20;
  if (score > 100) score = 100;

  let scoreColor = "text-red-500";
  if (score >= 70) scoreColor = "text-green-600";
  else if (score >= 50) scoreColor = "text-yellow-500";

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">ATS Resume Checker</h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
        <div>
          <p className="text-slate-600 mb-2">Your estimated ATS Score</p>
          <h3 className={`text-5xl font-extrabold ${scoreColor}`}>{score}/100</h3>
        </div>

        <div className="bg-slate-100 rounded-2xl px-6 py-4">
          <p className="text-slate-700 font-semibold">
            {score >= 80
              ? "Excellent! Your resume is ATS-friendly."
              : score >= 60
              ? "Good, but can still be improved."
              : "Your resume needs stronger keywords and structure."}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <h4 className="text-xl font-bold text-green-700 mb-3">Detected Keywords</h4>
          {foundKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {foundKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-green-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-600">No strong keywords detected.</p>
          )}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <h4 className="text-xl font-bold text-red-700 mb-3">Missing Keywords</h4>
          {missingKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-600">Great! No major keywords missing.</p>
          )}
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <h4 className="text-xl font-bold text-blue-700 mb-3">Improvement Suggestions</h4>
        <ul className="list-disc pl-6 text-slate-700 space-y-2">
          <li>Add more technical keywords related to your job role.</li>
          <li>Use action verbs in projects and experience sections.</li>
          <li>Include measurable achievements if possible.</li>
          <li>Keep your summary concise and role-specific.</li>
        </ul>
      </div>
    </div>
  );
};

export default ATSChecker;