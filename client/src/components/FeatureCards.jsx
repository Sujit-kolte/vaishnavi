import React from "react";
import { supabase } from "../services/supabase"

const cards = [
  {
    title: "AI Resume Summary",
    desc: "Generate a professional and impactful summary instantly.",
    icon: "✨",
  },
  {
    title: "ATS Score Checker",
    desc: "Analyze your resume and improve job compatibility.",
    icon: "📊",
  },
  {
    title: "Resume Templates",
    desc: "Choose from clean, modern, and professional layouts.",
    icon: "📄",
  },
  {
    title: "AI Career Assistant",
    desc: "Get help with interview prep, projects, and cover letters.",
    icon: "🤖",
  },
];

const FeatureCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-700"
        >
          <div className="text-4xl mb-4">{card.icon}</div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            {card.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-7">
            {card.desc}
          </p>
        </div>
      ))}
    </section>
  );
};

export default FeatureCards;