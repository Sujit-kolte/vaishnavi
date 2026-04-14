export default function Minimal({ data }) {
  return (
    <div className="bg-white p-6 shadow-lg">
      {data.photo && (
        <img src={data.photo} className="w-24 h-24 rounded-full mb-4" />
      )}

      <h2 className="text-2xl font-bold">{data.fullName}</h2>
      <p>{data.email} | {data.phone}</p>

      <Section title="Summary" content={data.summary} />
      <Section title="Skills" content={data.skills} />
      <Section title="Education" content={data.education} />
      <Section title="Experience" content={data.experience} />
      <Section title="Projects" content={data.projects} />
      <Section title="Certifications" content={data.certifications} />
      <Section title="Languages" content={data.languages} />
    </div>
  );
}

function Section({ title, content }) {
  if (!content) return null;
  return (
    <>
      <h3 className="font-semibold mt-4">{title}</h3>
      <p>{content}</p>
    </>
  );
}