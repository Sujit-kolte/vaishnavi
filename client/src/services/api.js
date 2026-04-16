import axios from "axios";

// Use env instead of hardcoded URL (IMPORTANT for deployment)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// =========================
// RESUME GENERATION
// =========================
export const generateResume = async (formData) => {
  const response = await API.post("/api/resume", formData);
  return response.data;
};

// =========================
// AI CHAT
// =========================
export const askAI = async (message, userData) => {
  const response = await API.post("/chat", {
    message,
    userData,
  });
  return response.data;
};

// =========================
// ATS CHECK (optional helper)
// =========================
export const checkATS = async (data) => {
  const response = await API.post("/api/ats", data);
  return response.data;
};