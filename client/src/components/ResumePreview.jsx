import React, { forwardRef } from "react";

const ResumePreview = forwardRef(({ resumeData, template }, ref) => {
  if (!resumeData) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 mb-8 transition">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Resume Preview
        </h2>
        <p className="text-slate-500 dark:text-slate-300 mt-3">
          Your AI-generated resume preview will appear here.
        </p>
      </div>
    );
  }

  const baseSection = (title, content) => (
    <section className="mb-6">
      <h2 className="text-xl font-bold text-blue-700 mb-2">{title}</h2>
      <p className="leading-7">{content}</p>
    </section>
  );

  const modernTemplate = (
    <div className="bg-white border border-slate-200 rounded-2xl p-10 max-w-4xl mx-auto text-slate-800">
      <div className="border-b pb-5 mb-6">
        <h1 className="text-4xl font-extrabold text-slate-900">{resumeData.name}</h1>
        <p className="text-slate-600 mt-2">
          {resumeData.contact?.email} | {resumeData.contact?.phone}
        </p>
      </div>
      {baseSection("Professional Summary", resumeData.summary)}
      {baseSection("Education", resumeData.education)}
      {baseSection("Experience", resumeData.experience)}
      {baseSection("Skills", resumeData.skills)}
      {baseSection("Projects", resumeData.projects)}
    </div>
  );

  const professionalTemplate = (
    <div className="bg-white border-4 border-blue-700 rounded-2xl p-10 max-w-4xl mx-auto text-slate-800">
      <div className="text-center border-b pb-5 mb-6">
        <h1 className="text-4xl font-extrabold text-blue-800 uppercase">{resumeData.name}</h1>
        <p className="text-slate-700 mt-2">
          {resumeData.contact?.email} | {resumeData.contact?.phone}
        </p>
      </div>
      {baseSection("Career Objective", resumeData.summary)}
      {baseSection("Academic Qualification", resumeData.education)}
      {baseSection("Professional Experience", resumeData.experience)}
      {baseSection("Technical Skills", resumeData.skills)}
      {baseSection("Projects", resumeData.projects)}
    </div>
  );

  const minimalTemplate = (
    <div className="bg-white border border-slate-300 rounded-2xl p-10 max-w-4xl mx-auto text-slate-800">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{resumeData.name}</h1>
        <p className="text-slate-500">
          {resumeData.contact?.email} | {resumeData.contact?.phone}
        </p>
      </div>
      {baseSection("Summary", resumeData.summary)}
      {baseSection("Education", resumeData.education)}
      {baseSection("Experience", resumeData.experience)}
      {baseSection("Skills", resumeData.skills)}
      {baseSection("Projects", resumeData.projects)}
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 mb-8 transition">
      <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
        Generated Resume
      </h2>

      <div ref={ref}>
        {template === "professional" && professionalTemplate}
        {template === "minimal" && minimalTemplate}
        {template === "modern" && modernTemplate}
      </div>
    </div>
  );
});

export default ResumePreview;