"use client";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../utils/axiosInstance";
import DeckInfoCard from "../components/DeckInfoCard";
export default function DecksPage() {
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;
  if (!deckInfo) return <div>No decks found</div>;

  return <DeckInfoCard deckInfo={deckInfo} />;
}
