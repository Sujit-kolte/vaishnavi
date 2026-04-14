import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1586281380349-632531db7ed4')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-xl text-center backdrop-blur-sm">
        <h1 className="text-5xl font-bold mb-6">
          Create Your Professional Resume in Minutes
        </h1>

        <p className="mb-6 text-lg">
          AI-powered resume builder with modern templates.
        </p>

        <button
          onClick={() => navigate("/build")}
          className="bg-blue-600 px-8 py-3 rounded-lg text-xl hover:bg-blue-700 transition"
        >
          Build Resume
        </button>
      </div>
    </div>
  );
}