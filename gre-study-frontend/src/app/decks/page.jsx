"use client";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../utils/axiosInstance";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import DeckInfoCard from "../components/DeckInfoCard";
import { useRouter } from "next/navigation";
export default function DecksPage() {
  const router = useRouter();
  const {
    data: deckInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => instance.get("/get-all-deck-info").then((res) => res.data),
    queryKey: ["deck-info"],
    staleTime: 1000 * 60 * 5,
  });

  const handleOpenCreate = () => {
    router.push("/create-deck");
    console.log("Clicked");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;
  if (!deckInfo) return <div>No decks found</div>;

  return (
    <div>
      <DeckInfoCard deckInfo={deckInfo} />
      <div
        className="hover:cursor-pointer text-gray-800"
        onClick={() => handleOpenCreate()}
      >
        <PlusCircleIcon className="absolute bottom-0 right-0 w-13 h-13 m-7 transition duration-400 hover:scale-110 " />
      </div>
    </div>
  );
}
