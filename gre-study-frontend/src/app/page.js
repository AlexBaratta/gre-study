"use client";

import Image from "next/image";
import CrosswordGenerator from "./components/CrosswordGenerator";
import { instance } from "./utils/axiosInstace";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import log from "./utils/logger";
export default function Home() {
  const [words, setWords] = useState();
  const fetchWords = async () => {
    try {
      const result = await instance.get("/get-all");
      log.info(result);
      log.info("data", result.data);
      setWords(result.data);
      log.info(words);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        log.info("Axios Error:", err);
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
