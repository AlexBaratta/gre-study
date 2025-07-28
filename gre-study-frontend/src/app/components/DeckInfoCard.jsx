"use client";
import { useRouter } from "next/navigation";
export default function DeckInfoCard({ deckInfo }) {
  const router = useRouter();
  if (!deckInfo) return <div>No decks found</div>;

  const handleDeckClick = (id) => {
    console.log("Click with id", id);
    router.push(`/words/${id}`);
  };

  return (
    <ul className="divide-y divide-gray-100">
      {deckInfo.map(({ id, name, description }) => (
        <li
          key={id}
          className="flex justify-between gap-x-6 py-5 hover:bg-gray-100"
          onClick={() => handleDeckClick(id)}
        >
          <div className="min-w-0 flex-auto pl-4">
            <p className="text-sm/6 font-semibold text-gray-900">{name}</p>
            <p className="mt-1 truncate text-xs/5 text-gray-500">
              {description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
