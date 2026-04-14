export default function Contact() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf')",
      }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-xl w-full max-w-4xl backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

            <p className="mb-2"><strong>Name:</strong> Vaishnavi Misal</p>
            <p className="mb-2"><strong>Phone:</strong> 8669000702</p>
            <p className="mb-2">
              <strong>Email:</strong> misalvaishnavi30@gmail.com
            </p>
            <p className="mb-4">
              <strong>Location:</strong> Pune, Maharashtra, India
            </p>
          </div>

          {/* Google Map */}
          <div>
            <iframe
              title="Pune Map"
              src="https://www.google.com/maps?q=Pune,Maharashtra&output=embed"
              width="100%"
              height="250"
              className="rounded-lg"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}