"use client";
import { FlashcardArray } from "react-quizlet-flashcard";
import { useWords } from "../utils/fetchWordsUtils";
export default function FlashcardsPage() {
  const { data: words, isLoading, isError, error } = useWords();
  console.log("Words", words)
  const cardsArray = words?.map(({ id, word, definition }) => ({
    id: id,
    frontHTML: <div className="w-full h-full flex items-center justify-center">{word}</div>,
    backHTML: <div className="w-full h-full flex items-center justify-center">{definition}</div>,
  }));

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="storyContainer">
      {cardsArray && <FlashcardArray cards={cardsArray} />}
    </div>
  );
}
