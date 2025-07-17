"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { instance } from "../utils/axiosInstace";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
export default function ViewWordsPage() {
  const qc = useQueryClient();
  const {
    data: words,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => instance.get("/words").then((res) => res.data),
    queryKey: ["words"],
  });

  const {
    mutate: deleteWord,
    isPending: isDeletePending,
    isError: deleteIsError,
    error: deleteError,
  } = useMutation({
    mutationFn: ({ id }) =>
      instance.delete(`/word/${id}`).then((res) => res.data),
    onSuccess: () => {
      toast.success("Successfully delete word.");
      qc.invalidateQueries({ queryKey: ["words"]})
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          toast.error("Word does not exist");
          return;
        }
        const msg = err.response?.data?.message || err.message;
        toast.error(msg);
      }
    },
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
            <th className="w-10 px-6 py-3 sr-only">Delete</th>
          </tr>
        </thead>
        <tbody className="py-4">
          {words &&
            words.map(({ id, word, definition }) => (
              <tr
                key={id}
                className="group border-b border-l border-r border-gray-200"
              >
                <td className="px-6 py-4">{word}</td>
                <td className="px-6 py-4">{definition}</td>
                <td
                  className="opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity"
                  onClick={() => deleteWord({ id })}
                >
                  <TrashIcon className="w-4 h-4 mr-4" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
