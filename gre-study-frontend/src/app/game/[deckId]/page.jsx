"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const thing = "ssss";
const LetterSquares = ({ word, input }) => {
  return (
    <div className="flex justify-center ">
      {Array.from({ length: word?.length }).map((_, i) => {
        let color = "none";
        if (input[i]) {
          color =
            input[i].toLowerCase() === word[i].toLowerCase() ? "green" : "red";
        }
        return (
          <svg
            key={i}
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="5"
              width="10"
              height="10"
              fill={color}
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default function GamePage() {
  const params = useParams();
  const deckId = params.deckId;
  const qc = useQueryClient();
  const inputRef = useRef(null);

  const rawWords = qc.getQueryData([`${deckId}-words`]);
  const words = Array.isArray(rawWords) ? rawWords : [];

  const shuffled = useMemo(
    () => [...words].sort(() => Math.random() - 0.5),
    [words]
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState("");

  const current = shuffled[currentIdx];

  const handleInput = (e) => {
    const val = e.target.value;
    setInput(e.target.value);
    if (val.toLowerCase() === current?.word.toLowerCase()) {
      setCurrentIdx((idx) => (idx < shuffled.length - 1 ? idx + 1 : idx));
      setInput("");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [handleInput]);

  return (
    <div className="h-full flex justify-around items-center align-center gap-1 p-1">
      <div className="flex h-full bg-white justify-center items-center p-8 flex-1">
        <div className="bg-white text-3xl">{current?.definition}</div>
      </div>
      <div className="flex h-full bg-white items-center justify-center p-8 flex-1">
        <div className="bg-white">
          <input
            key={current?.word}
            onChange={handleInput}
            value={input}
            ref={inputRef}
            placeholder={`Starts with ${current?.word[0]}`}
            className="bg-white justify-center items-center text-center text-3xl focus:outline-none"
          />
          <LetterSquares word={current?.word} input={input} />
        </div>
      </div>
    </div>
  );
}
