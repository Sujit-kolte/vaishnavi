export default function PhotoTemplate({ data }) {
  return (
    <div className="flex gap-6">
      <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
      <div>
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p>{data.email}</p>
        <p className="mt-3">{data.summary}</p>
      </div>
    </div>
  );
}