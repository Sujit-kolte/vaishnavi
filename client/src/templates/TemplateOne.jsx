const TemplateOne = ({ resume }) => (
  <div className="p-10 max-w-2xl mx-auto bg-white shadow">
    <h1 className="text-2xl font-bold">{resume.name}</h1>
    <p>{resume.email} | {resume.phone}</p>
    <h2 className="mt-4 font-semibold">Skills</h2>
    <p>{resume.skills}</p>
  </div>
);

export default TemplateOne;
