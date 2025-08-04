"use client";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/outline";
export default function DeckInfoCard({ deckInfo, handleDelete }) {
  const router = useRouter();
  if (!deckInfo) return <div>No decks found</div>;

  const handleDeckClick = (id) => {
    console.log("Click with id", id);
    router.push(`/words/${id}`);
  };

  return (
    <ul className="divide-y">
      {deckInfo.map(({ id, title, description }) => (
        <li
          key={id}
          className="group flex justify-between gap-x-6 py-5 border border-primary rounded mb-3 bg-white transition-shadow duration-500 hover:shadow-lg hover:cursor-pointer"
          onClick={() => handleDeckClick(id)}
        >
          <div className="min-w-0 flex-auto pl-4">
            <p className="text-sm/6 font-semibold text-gray-900">{title}</p>
            <p className="mt-1 truncate text-xs/5 text-gray-500">
              {description}
            </p>
          </div>
          <div
            className="flex items-center opacity-0 [@media(any-hover:_none)]:opacity-100 transition duration-500 group-hover:opacity-100 hover:text-red-500 "
            onClick={(e) => handleDelete(e, id)}
          >
            <TrashIcon className="h-5 w-5 mr-4" />
          </div>
        </li>
      ))}
    </ul>
  );
}
