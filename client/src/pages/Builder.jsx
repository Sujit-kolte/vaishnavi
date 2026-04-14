import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import SiteHeader from "../components/SiteHeader";
import StepProgress from "../components/StepProgress";
import ResumePreview from "../components/ResumePreview";

import Form from "./Form";
import { ResumeContext } from "../context/ResumeContext";

export default function Builder() {
  const navigate = useNavigate();
  const { resumeData } = useContext(ResumeContext);

  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const goToPreview = () => {
    navigate("/preview");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <SiteHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Step Indicator */}
        <StepProgress currentStep={step} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* LEFT: FORM */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <Form step={step} />

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className="px-4 py-2 rounded border disabled:opacity-50"
              >
                Back
              </button>

              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={goToPreview}
                  className="px-6 py-2 bg-green-600 text-white rounded"
                >
                  Preview Resume
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
