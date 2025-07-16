"use client";

import Image from "next/image";
import CrosswordGenerator from "./components/CrosswordGenerator";
import { instance } from "./utils/axiosInstace";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

export default function Home() {
  const [words, setWords] = useState();
  const fetchWords = async () => {
    try {
      const result = await instance.get("/get-all");
      console.log(result);
      console.log("data", result.data);
      setWords(result.data);
      console.log(words);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("Axios Error:", err);
      }
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  if (!words) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <CrosswordGenerator words={words} />
    </div>
  );
}
