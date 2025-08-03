export default function DeckInfoForm({ title, description, onChange }) {
  return (
    <div className="mb-4">
      <input
        className="border border-primary bg-white p-2 w-full rounded"
        name="title"
        value={title}
        onChange={onChange}
        placeholder="Title"
      />
      <textarea
        className="border border-primary bg-white p-2 w-full mt-2 rounded"
        name="description"
        value={description}
        onChange={onChange}
        placeholder="Description"
      />
    </div>
  );
}
