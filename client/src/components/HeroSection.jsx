import React from "react";
import { supabase } from "../services/supabase"

const HeroSection = ({ scrollToSection, buildRef, aiRef }) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-2xl p-8 md:p-14">
      {/* Decorative background blur circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl">
        <p className="uppercase tracking-[0.25em] text-sm text-blue-100 mb-4">
          AI-Powered Career Builder
        </p>

        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Build a <span className="text-yellow-300">Job-Winning Resume</span> with AI
        </h2>

        <p className="text-lg md:text-xl text-blue-100 max-w-3xl mb-8 leading-8">
          Create polished resumes, improve summaries, optimize ATS score,
          and get AI-powered career guidance — all in one beautiful platform.
        </p>

        <div className="flex flex-wrap gap-4 mb-10">
          <button
            onClick={() => scrollToSection(buildRef)}
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition"
          >
            Build Resume
          </button>

          <button
            onClick={() => scrollToSection(aiRef)}
            className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition"
          >
            Explore AI Assistant
          </button>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-2xl">
          <p className="italic text-lg text-blue-50">
            “Your resume is your first impression — make it unforgettable.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;