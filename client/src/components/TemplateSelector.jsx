import React from "react";

const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const templates = [
    { id: "modern", name: "Modern" },
    { id: "professional", name: "Professional" },
    { id: "minimal", name: "Minimal" },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-6 mb-6 transition">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
        Choose Resume Template
      </h2>

      <div className="flex flex-wrap gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`px-6 py-3 rounded-xl font-semibold border transition ${
              selectedTemplate === template.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-slate-100 dark:bg-slate-700 dark:text-white border-slate-300 dark:border-slate-600"
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;