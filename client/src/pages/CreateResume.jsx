import { useState } from "react";
import ResumePreview from "../components/ResumePreview";
import html2pdf from "html2pdf.js";
import axios from "axios";

export default function CreateResume() {
  const [template, setTemplate] = useState("minimal");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
    certifications: "",
    languages: "",
    photo: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateSummary = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ai-summary", {
        skills: formData.skills,
        experience: formData.experience,
      });
      setFormData({ ...formData, summary: res.data.summary });
    } catch (err) {
      alert("AI Summary Failed");
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");
    html2pdf().from(element).save("resume.pdf");
  };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Smart Resume Builder
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        {/* FORM SECTION */}
        <div className="space-y-6">

          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="minimal">Minimal</option>
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
          </select>

          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({
                ...formData,
                photo: URL.createObjectURL(e.target.files[0]),
              })
            }
          />

          <textarea
            name="summary"
            placeholder="Professional Summary"
            onChange={handleChange}
            value={formData.summary}
            className="border p-3 rounded w-full"
          />

          <button
            type="button"
            onClick={generateSummary}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Generate AI Summary
          </button>

          <textarea
            name="skills"
            placeholder="Skills"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <textarea
            name="education"
            placeholder="Education"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <textarea
            name="experience"
            placeholder="Experience"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <textarea
            name="projects"
            placeholder="Projects"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <textarea
            name="certifications"
            placeholder="Certifications"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <textarea
            name="languages"
            placeholder="Languages"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <button
            type="button"
            onClick={downloadPDF}
            className="bg-green-600 text-white px-6 py-3 rounded w-full"
          >
            Download PDF
          </button>

        </div>

        {/* PREVIEW SECTION */}
        <div id="resume-preview">
          <ResumePreview data={formData} template={template} />
        </div>

      </div>
    </div>
  );
}