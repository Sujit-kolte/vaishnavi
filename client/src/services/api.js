import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const generateResume = async (formData) => {
  const response = await API.post("/api/resume", formData);
  return response.data;
};

export const askAI = async (message, userData) => {
  const response = await API.post("/chat", {
    message,
    userData,
  });
  return response.data;
};