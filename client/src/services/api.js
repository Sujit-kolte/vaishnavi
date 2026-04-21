import API from "../utils/api";

// =========================
// RESUME GENERATION
// =========================
export const generateResume = async (formData) => {
  const response = await API.post("/api/resume/generate", formData);
  return response.data;
};

// =========================
// AI CHAT
// =========================
export const askAI = async (message, userData) => {
  const response = await API.post("/api/ai/chat", {
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
