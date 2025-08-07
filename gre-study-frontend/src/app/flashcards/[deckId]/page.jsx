"use client";
import { createCardsArray } from "@/app/utils/createCardsArray";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FlashcardArray } from "react-quizlet-flashcard";
export default function FlashcardsIDPage() {
  const params = useParams();
  const deckId = params.deckId;
  const qc = useQueryClient();
  const words = qc.getQueryData([`${deckId}-words`]);

  const cardsArray = createCardsArray(words);

  return (
    <div className="storyContainer">
      {cardsArray && <FlashcardArray cards={cardsArray} />}
    </div>
  );
}
