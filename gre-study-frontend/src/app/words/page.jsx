"use client";

import { QueryClient, useQuery } from "@tanstack/react-query";
import useGetFetchQuery from "../hooks/useGetFetchQuery";
import { useState } from "react";
import axios from "axios";
import { instance } from "../utils/axiosInstace";
export default function ViewWordsPage() {
  const {
    data: words,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => instance.get("/words").then((res) => res.data),
    queryKey: ["words"],
  });

  if (isLoading) return <div>Loading words...</div>;

  if (isError) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : error instanceof Error
      ? error.message
      : String(error);

    return <div>Error loading words: {message}</div>;
  }
  return (
    <div className="flex overflow-x-auto">
      <table className="text-left table-auto">
        <thead className="text-xl py-4 uppercase bg-gray-200">
          <tr className="bg-gray-200 uppercase text-sm tracking-wider">
            <th className="px-6 py-3 text-gray-700">Word</th>
            <th className="px-6 py-3 text-gray-700">Definition</th>
          </tr>
        </thead>
        <tbody className="py-4">
          {words &&
            words.map(({ id, word, definition }) => (
              <tr
                key={id}
                className="border-b border-l border-r border-gray-200"
              >
                <td className="px-6 py-4">{word}</td>
                <td className="px-6 py-4">{definition}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
