import { useContext } from "react";
import { ResumeContext } from "../context/ResumeContext";
import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import PhotoTemplate from "./PhotoTemplate";

const ResumeRenderer = () => {
  const { selectedTemplate, formData } = useContext(ResumeContext);

  switch (selectedTemplate) {
    case "classic":
      return <ClassicTemplate data={formData} />;
    case "modern":
      return <ModernTemplate data={formData} />;
    case "photo":
      return <PhotoTemplate data={formData} />;
    default:
      return null;
  }
};

export default ResumeRenderer;
