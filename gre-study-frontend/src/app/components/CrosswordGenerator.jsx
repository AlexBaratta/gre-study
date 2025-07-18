"use client";
import Crossword from "@jaredreisinger/react-crossword";
import { generateLayout } from "crossword-layout-generator";
import { useEffect, useRef, useState } from "react";
import log from "../utils/logger.js"

export default function CrosswordGenerator({ words }) {
  log.debug("Words:", words)
  const [data, setData] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const crosswordRef = useRef();

  const checkAnswers = () => {
    if (isCorrect) {
      alert("YIPPPPIEE YOU DID IT");
    } else {
      alert(
        "YIIIKESSSSSS. YOU TOTALLY DID SOMETHING WRONG!!! IDK WHAT THO CUS IDK HOW TO CHECK INDIVIDUAL WORDS YET"
      );
    }
  };

  useEffect(() => {
    if (!words || words.length === 0) {
      return;
    }

    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const randomTen = shuffled.slice(0, 30);

    const layoutInput = randomTen.map((w) => ({
      clue: w.definition,
      answer: w.word.toUpperCase(),
    }));

    const layout = generateLayout(layoutInput);

    if (layout) {
      const across = {};
      const down = {};

      layout.result.forEach((item) => {
        if (typeof item.position !== "number") {
          return; // Skip this invalid item
        }

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

  return (
    <div>
      <Crossword data={data} onCrosswordCorrect={setIsCorrect} />
      <button
        onClick={checkAnswers}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Check Answers
      </button>
    </div>
  );
}
