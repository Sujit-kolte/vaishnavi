import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";

export default function Preview() {
  const { state } = useLocation();
  const data = state;

  if (!data) return <div>No Data</div>;

  const downloadPDF = () => {
    const element = document.getElementById("resume");
    html2pdf().from(element).save();
  };

  return (
    <div className="p-10">
      <div id="resume" className="bg-white p-8 shadow-lg">
        {data.photo && (
          <img
            src={data.photo}
            alt="profile"
            className="w-28 h-28 rounded-full mb-4"
          />
        )}
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p>{data.email}</p>
        <h2 className="text-xl mt-4 font-semibold">Summary</h2>
        <p>{data.summary}</p>
        <h2 className="text-xl mt-4 font-semibold">Skills</h2>
        <p>{data.skills}</p>
        <h2 className="text-xl mt-4 font-semibold">Experience</h2>
        <p>{data.experience}</p>
      </div>

      <button
        onClick={downloadPDF}
        className="bg-red-600 text-white px-4 py-2 mt-4 rounded"
      >
        Download PDF
      </button>
    </div>
  );
}