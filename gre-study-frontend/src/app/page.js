"use client";

import CrosswordGenerator from "./components/CrosswordGenerator";
import log from "./utils/logger";
import { useWords } from "./utils/fetchWordsUtils";
export default function Home() {
  const { data: words, isLoading, isError, error } = useWords();

  log.info("Words in main:", words);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <div>
      <CrosswordGenerator words={words} />
    </div>
  );
}
