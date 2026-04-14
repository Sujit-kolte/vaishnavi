export default function About() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1492724441997-5dc865305da7')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-xl max-w-3xl text-center backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-6">About Smart Resume Builder</h1>

        <p className="text-lg mb-4">
          Smart Resume Builder is a modern AI-powered web application that helps
          users create professional resumes in minutes.
        </p>

        <p className="text-lg">
          Built with React, Node.js, and modern UI design, this platform allows
          users to generate, preview, and download resumes easily.
        </p>
      </div>
    </div>
  );
}