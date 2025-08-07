"use client";
import CrosswordGenerator from "@/app/components/CrosswordGenerator";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function DeckCrossword() {
  const params = useParams();
  const qc = useQueryClient();
  const deckId = params.deckId;
  console.log("Deck ID in Crossword page", deckId);

  const words = qc.getQueryData([`${deckId}-words`]);

  return (
    <div>
      <CrosswordGenerator words={words} />
    </div>
  );
}
