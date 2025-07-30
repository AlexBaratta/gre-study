"use client";

import { useQuery } from "@tanstack/react-query";
import { instance } from "../utils/axiosInstance";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import DeckInfoCard from "../components/DeckInfoCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
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
  });

  const handleOpenCreate = () => {
    router.push("/create-deck");
    console.log("Clicked");
  };

  useEffect(() => {
    if (localStorage.getItem("deckCreated")) {
      toast.success("Deck created!");
      setTimeout(() => {
        localStorage.removeItem("deckCreated");
      }, 2000);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;
  if (!deckInfo) return <div>No decks found</div>;

  return (
    <div>
      <DeckInfoCard deckInfo={deckInfo} />
      <div
        className="fixed bottom-0 right-0 hover:cursor-pointer text-gray-800"
        onClick={() => handleOpenCreate()}
      >
        <PlusCircleIcon className="w-13 h-13 m-7 transition duration-400 hover:scale-110 " />
      </div>
      <ToastContainer />
    </div>
  );
}
