import React, { useState } from "react";
import { generateResume } from "../services/api";
import { supabase } from "../services/supabase";

const ResumeForm = ({ setResumeData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
  });

  const [loading, setLoading] = useState(false);

  const labels = {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    skills: "Skills",
    education: "Education",
    experience: "Experience",
    projects: "Projects",
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ GENERATE RESUME (AI)
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateResume(formData);

      setResumeData({
        ...data,
        name: formData.name,
        skills: formData.skills,
        education: data.education || formData.education,
        experience: data.experience || formData.experience,
        projects: data.projects || formData.projects,
        contact: {
          email: formData.email,
          phone: formData.phone,
        },
      });
    } catch (error) {
      console.error("Resume generation failed:", error);
      alert("Error generating resume");
    }
    setLoading(false);
  };

  // ✅ SAVE TO SUPABASE
  const handleSave = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase.from("resumes").insert([
      {
        user_id: user.id,
        title: formData.name + " Resume",
        skills: formData.skills.split(","),

        personal_info: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },

        education: formData.education,
        experience: formData.experience,
        ai_summary: "Generated Resume",
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error saving resume ❌");
    } else {
      alert("Resume saved successfully ✅");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">
        Build Your Resume
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {labels[field]}
            </label>
            <input
              type="text"
              name={field}
              placeholder={`Enter ${labels[field]}`}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>
        ))}
      </div>

      {/* GENERATE BUTTON */}
      <button
        onClick={handleGenerate}
        className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 shadow-md font-semibold transition"
      >
        {loading ? "Generating..." : "Generate Resume"}
      </button>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="mt-4 ml-4 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 shadow-md font-semibold transition"
      >
        Save Resume
      </button>
    </div>
  );
};

export default ResumeForm;