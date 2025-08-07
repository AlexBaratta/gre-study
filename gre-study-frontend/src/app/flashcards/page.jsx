"use client";
import { FlashcardArray } from "react-quizlet-flashcard";
import { useWords } from "../utils/fetchWordsUtils";
import { createCardsArray } from "../utils/createCardsArray";

export default function FlashcardsPage() {
  const { data: words, isLoading, isError, error } = useWords();
  console.log("Words", words);
  const cardsArray = createCardsArray(words);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="storyContainer">
      {cardsArray && <FlashcardArray cards={cardsArray} />}
    </div>
  );
}
