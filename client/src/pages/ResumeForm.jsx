import React, { useState } from "react";
import axios from "axios";
import { supabase } from '../lib/supabase' // adjust path

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
  });
  

const saveResume = async () => {
  const { data, error } = await supabase
    .from('resumes')
    .insert([
      {
        name: name,
        email: email,
        skills: skills,
        experience: experience,
      }
    ])

  if (error) {
    console.log("Error:", error.message)
  } else {
    console.log("Saved:", data)
  }
}

  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/resume", formData);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error(error);
      setResponse("Error generating resume");
    }
  };
  

  return (
    <div style={{ width: "60%", margin: "auto", marginTop: "30px" }}>
      <h2>Smart Resume Builder</h2>

      {Object.keys(formData).map((field) => (
        <div key={field} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
      ))}

      <button onClick={saveResume}>
  Save Resume
</button>

      <pre style={{ marginTop: "20px", background: "#f4f4f4", padding: "15px" }}>
        {response}
      </pre>
    </div>
  );
};

export default ResumeForm;