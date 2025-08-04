"use client";
import Crossword, {
  CrosswordGrid,
  CrosswordProvider,
  DirectionClues,
} from "@jaredreisinger/react-crossword";
import { generateLayout } from "crossword-layout-generator";
import { useEffect, useRef, useState } from "react";
import log from "../utils/logger.js";
import { useRouter } from "next/navigation.js";
import { toast, ToastContainer } from "react-toastify";

export default function CrosswordGenerator({ words }) {
  log.debug("Words:", words);
  const router = useRouter();
  const crosswordRef = useRef(null);
  const [data, setData] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [showStatus, setShowStatus] = useState(false);

  const onAnswerIncorrect = (direction, number, answer) => {
    setIncorrectAnswers((prev) => ({
      ...prev,
      [`${direction}-${number}`]: answer,
    }));
  };

  const onAnswerCorrect = (direction, number, answer) => {
    const key = `${direction}-${number}`;
    setIncorrectAnswers((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  useEffect(() => {
    if (!words || words.length === 0) {
      return;
    }

    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const randomTen = shuffled.slice(0, 30);

    const layoutInput = randomTen.map((w) => ({
      clue: w?.definition,
      answer: w?.word?.toUpperCase(),
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
    <div className="crossword flex">
      <CrosswordProvider
        ref={crosswordRef}
        data={data}
        onCrosswordCorrect={setIsCorrect}
        onAnswerIncorrect={onAnswerIncorrect}
        onAnswerCorrect={onAnswerCorrect}
        onCellChange={() => setShowStatus(false)}
        theme={{
          gridBackground: "#fff6f8",
          cellBackground: "#fee8ea",
          highlightBackground: "#eba4a1",
        }}
      >
        <CrosswordGrid />
        <div className="flex flex-col ml-10 gap-2">
          <DirectionClues direction="across" />
          <DirectionClues direction="down" />
        </div>
      </CrosswordProvider>
      <ToastContainer />
    </div>
  );
}
