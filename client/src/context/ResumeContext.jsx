import { createContext, useContext, useState, useEffect } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem("resumeData");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          email: "",
          summary: "",
          skills: [],
          education: [],
          experience: [],
          photo: "",
        };
  });

  const [template, setTemplate] = useState("classic");

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(form));
  }, [form]);

  return (
    <ResumeContext.Provider
      value={{
        form,
        setForm,
        template,
        setTemplate,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);