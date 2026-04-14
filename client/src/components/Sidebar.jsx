import React from "react";

const Sidebar = () => {
  const items = [
    "Dashboard",
    "Resume Builder",
    "Templates",
    "ATS Checker",
    "AI Assistant",
    "Career Tips",
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 shadow-lg min-h-screen p-6 hidden lg:block transition">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Workspace</h2>
        <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
          Build smarter. Apply better.
        </p>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:text-slate-200 cursor-pointer transition-all font-medium text-slate-700"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-10 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <p className="text-sm font-medium mb-2">Pro Tip</p>
        <p className="text-sm leading-6">
          Use strong action verbs and job keywords to improve ATS score.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;