import { useNavigate } from "react-router-dom";
import { templates } from "../data/template";
import SiteHeader from "../components/SiteHeader";
import StepProgress from "../components/StepProgress";
import SiteFooter from "../components/SiteFooter";

export default function Template() {
  const navigate = useNavigate();

  const chooseTemplate = (templateName) => {
    navigate("/builder", { state: { template: templateName } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <StepProgress step={1} />

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              Choose Your Resume Template
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Pick a design you like. You can always change templates later
              without retyping your information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => chooseTemplate(tpl.id)}
                className="border border-gray-100 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700 transition-shadow cursor-pointer text-left overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src={tpl.image}
                    alt={tpl.name}
                    className="w-full h-64 object-cover"
                  />
                  {tpl.recommended && (
                    <span className="absolute top-2 left-2 text-xs bg-green-600 text-white px-2 py-1 rounded">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {tpl.name}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {tpl.columns === 2
                        ? "Two-column layout"
                        : "Single-column layout"}{" "}
                      · <span className="capitalize">{tpl.color}</span> style
                    </p>
                  </div>
                  <span className="inline-block mt-4 text-sm text-blue-600 dark:text-blue-400 font-medium">
                    Use this template →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}