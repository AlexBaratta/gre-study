"use client";
import Crossword from "@jaredreisinger/react-crossword";
import { generateLayout } from "crossword-layout-generator";
import { useEffect, useState } from "react";

export default function CrosswordGenerator({ words }) {
  const [data, setData] = useState(null);

  useEffect(() => {
      console.log("Words", words)

    const layoutInput = words.map((w) => ({
      clue: w.definition,
      answer: w.word.toUpperCase(),
    }));

    const layout = generateLayout(layoutInput);

    if (layout) {
      const across = {};
      const down = {};

      layout.result.forEach((item) => {
        if (item.orientation === "across") {
          across[item.position] = {
            clue: item.clue,
            answer: item.answer,
            row: item.starty - 1,
            col: item.startx - 1,
          };
        } else {
          down[item.position] = {
            clue: item.clue,
            answer: item.answer,
            row: item.starty - 1,
            col: item.startx - 1,
          };
        }
      });

      setData({ across, down });
    }
  }, [words]);

  if (!data) {
    return <div>Generating crossword...</div>;
  }

  return <Crossword data={data} />;
}
