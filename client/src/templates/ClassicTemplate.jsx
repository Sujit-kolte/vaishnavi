export default function Classic({ data }) {
  return (
    <div className="bg-gray-100 p-6 border">
      <h2 className="text-3xl font-serif">{data.fullName}</h2>
      <p>{data.email} | {data.phone}</p>

      <hr className="my-3" />

      <Section title="Summary" content={data.summary} />
      <Section title="Experience" content={data.experience} />
      <Section title="Education" content={data.education} />
      <Section title="Skills" content={data.skills} />
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
      <h3 className="font-bold mt-4">{title}</h3>
      <p>{content}</p>
    </>
  );
}