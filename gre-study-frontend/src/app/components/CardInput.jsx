import { TrashIcon } from "@heroicons/react/24/outline";
export default function CardInput({ index, card, onChange, onDelete }) {
  return (
    <div className="border rounded mb-4 overflow-hidden">
      <div className="flex p-4 bg-gray-200">
        <p className="font-semibold">{index + 1}</p>
        <div className="flex justify-end w-full">
          <button
            type="button"
            onClick={onDelete}
            className="flex transition duration-400 hover:text-red-500 rounded-full border shrink-0 size-6 items-center justify-center"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <hr className="pb-2 w-full" />

      <div className="p-4">
        <input
          className="border p-2 w-full mb-2 rounded"
          placeholder={`Enter term`}
          name="word"
          value={card.word}
          onChange={(e) => onChange(index, e)}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder={`Enter definition`}
          name="definition"
          value={card.definition}
          onChange={(e) => onChange(index, e)}
        />
      </div>
    </div>
  );
}
