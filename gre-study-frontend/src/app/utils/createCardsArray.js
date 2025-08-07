export function createCardsArray(words) {
  return words?.map(({ id, word, definition }) => ({
    id: id,
    frontHTML: (
      <div className="w-full h-full flex items-center justify-center">
        {word}
      </div>
    ),
    backHTML: (
      <div className="w-full h-full flex items-center justify-center">
        {definition}
      </div>
    ),
  }));
}
