"use client";

import Image from "next/image";
import CrosswordGenerator from "./components/CrosswordGenerator";
import { instance } from "./utils/axiosInstace";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import log from "./utils/logger";
import { useQuery } from "@tanstack/react-query";
export default function Home() {
  // const [words, setWords] = useState();
  // const fetchWords = async () => {
  //   try {
  //     const result = await instance.get("/get-all");
  //     log.info(result);
  //     log.info("data", result.data);
  //     setWords(result.data);
  //     log.info(words);
  //   } catch (err) {
  //     if (axios.isAxiosError(err)) {
  //       log.info("Axios Error:", err);
  //     }
  //   }
  // };

  const {
    data: words,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => instance.get("/words").then((res) => res.data),
    queryKey: ["words"],
  });

  log.info("Words in main:", words);

  // useEffect(() => {
  //   fetchWords();
  // }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <div>
      <CrosswordGenerator words={words} />
    </div>
  );
}
