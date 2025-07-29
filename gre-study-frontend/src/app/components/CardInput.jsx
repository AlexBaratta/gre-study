import { TrashIcon } from "@heroicons/react/24/outline";
export default function CardInput({ index, card, onChange, onDelete }) {
  return (
    <div className="border p-4 rounded mb-4">
      <input
        className="border p-2 w-full mb-2 rounded"
        placeholder={`Word ${index + 1}`}
        name="word"
        value={card.word}
        onChange={(e) => onChange(index, e)}
      />
      <input
        className="border p-2 w-full rounded"
        placeholder={`Definition ${index + 1}`}
        name="definition"
        value={card.definition}
        onChange={(e) => onChange(index, e)}
      />
      <button type="button" onClick={onDelete} className="text-red-500">
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
