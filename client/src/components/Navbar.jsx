import React, { useState } from "react";
import { supabase } from "../services/supabase"

const Navbar = ({ darkMode, setDarkMode, scrollToSection, refs }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", ref: refs.homeRef },
    { label: "Build Resume", ref: refs.buildRef },
    { label: "ATS Checker", ref: refs.atsRef },
    { label: "AI Assistant", ref: refs.aiRef },
  ];

  const handleClick = (ref) => {
    scrollToSection(ref);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        
        {/* LOGO / PROJECT NAME */}
        <div
          onClick={() => handleClick(refs.homeRef)}
          className="cursor-pointer"
        >
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            CareerForge AI
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 tracking-wide">
            Smart Resume Builder
          </p>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-3">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(item.ref)}
              className="px-4 py-2 rounded-xl text-sm lg:text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-all duration-200"
            >
              {item.label}
            </button>
          ))}

          {/* DARK MODE BUTTON */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 px-5 py-2.5 rounded-2xl font-semibold shadow-md bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 text-slate-800 dark:text-white hover:scale-105 transition-all duration-300"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* MOBILE RIGHT SIDE */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-medium"
          >
            {darkMode ? "☀" : "🌙"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-medium"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-3 flex flex-col gap-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleClick(item.ref)}
                className="text-left px-4 py-3 rounded-xl font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;