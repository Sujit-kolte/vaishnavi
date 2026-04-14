export default function Modern({ data }) {
  return (
    <div className="bg-slate-800 text-white p-6 rounded">
      <h2 className="text-3xl font-bold text-blue-400">{data.fullName}</h2>
      <p>{data.email} | {data.phone}</p>

      <Section title="Summary" content={data.summary} />
      <Section title="Skills" content={data.skills} />
      <Section title="Experience" content={data.experience} />
      <Section title="Education" content={data.education} />
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
      <h3 className="text-blue-300 mt-4">{title}</h3>
      <p>{content}</p>
    </>
  );
}