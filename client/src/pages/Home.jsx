import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    summary: "",
  });

  const [photoPreview, setPhotoPreview] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const generateSummary = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai-summary",
        formData
      );
      setFormData({ ...formData, summary: res.data.summary });
    } catch (err) {
      alert("AI Failed");
    }
  };

  const saveResume = () => {
    localStorage.setItem("resume", JSON.stringify(formData));
    alert("Saved!");
  };

  const handlePreview = () => {
    navigate("/preview", {
      state: { ...formData, photo: photoPreview },
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Create Resume</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Name"
        name="name"
        onChange={handleChange}
      />
      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <input
        className="border p-2 w-full mb-3"
        placeholder="Skills"
        name="skills"
        onChange={handleChange}
      />
      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Experience"
        name="experience"
        onChange={handleChange}
      />

      <button
        onClick={generateSummary}
        className="bg-purple-600 text-white px-4 py-2 rounded mb-3"
      >
        Generate AI Summary
      </button>

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Summary"
        name="summary"
        value={formData.summary}
        onChange={handleChange}
      />

      <input type="file" accept="image/*" onChange={handlePhoto} />

      <div className="space-x-3 mt-4">
        <button
          onClick={saveResume}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>

        <button
          onClick={handlePreview}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Preview
        </button>
      </div>
    </div>
  );
}