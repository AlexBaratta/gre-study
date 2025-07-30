"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { instance } from "../utils/axiosInstance";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useWords } from "../utils/fetchWordsUtils";

const PER_PAGE = 20;

export default function ViewAllWordsPage() {
  const params = useParams();
  const deckId = params.deckId;

  console.log("Params", params);
  const qc = useQueryClient();
  const { data, isLoading, isError, error } = useWords();

  const words = Array.isArray(data) ? data : data?.content ?? [];

  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(words.length / PER_PAGE);

  const current = useMemo(() => {
    const start = page * PER_PAGE;
    return words.slice(start, start + PER_PAGE);
  }, [words, page]);

  useEffect(() => {
    if (page > 0 && page >= pageCount) {
      setPage(pageCount - 1);
    }
  }, [page, pageCount]);

  const { mutate: deleteWord } = useMutation({
    mutationFn: ({ id }) =>
      instance.delete(`/word/${id}`).then((res) => res.data),
    onSuccess: async () => {
      toast.success("Successfully deleted word.");
      await qc.invalidateQueries({ queryKey: ["words"] });
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

  const handlePageChange = ({ selected }) => setPage(selected);

  if (isLoading) return <div>Loading words...</div>;

  if (isError) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : error instanceof Error
      ? error.message
      : String(error);
    return <div>Error loading words: {message}</div>;
  }

  if (!words.length) {
    return (
      <div>
        <p>No words found.</p>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-x-auto">
      <ReactPaginate
        breakLabel="..."
        nextLabel="›"
        previousLabel="‹"
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        forcePage={page}
        containerClassName="flex items-center gap-2 my-4"
        pageClassName="list-none"
        previousClassName="list-none"
        nextClassName="list-none"
        breakClassName="list-none"
        activeClassName="active"
        disabledClassName="opacity-50 pointer-events-none"
        /* a */
        pageLinkClassName="block px-3 py-1 border rounded"
        previousLinkClassName="block px-3 py-1 border rounded"
        nextLinkClassName="block px-3 py-1 border rounded"
        breakLinkClassName="block px-3 py-1"
        activeLinkClassName="bg-blue-500 text-white"
      />

      <table className="text-left table-auto">
        <thead className="text-xl py-4 uppercase bg-gray-200">
          <tr className="bg-gray-200 uppercase text-sm tracking-wider">
            <th className="px-6 py-3 text-gray-700">Word</th>
            <th className="px-6 py-3 text-gray-700">Definition</th>
            <th className="w-10 px-6 py-3 sr-only">Delete</th>
          </tr>
        </thead>
        <tbody className="py-4">
          {current.map(({ id, word, definition }) => (
            <tr
              key={id}
              className="group border-b border-l border-r border-gray-200"
            >
              <td className="px-6 py-4">{word}</td>
              <td className="px-6 py-4">{definition}</td>
              <td
                className="opacity-0 [@media(any-hover:_none)]:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100 hover:text-red-600 focus:text-red-600 transition-opacity"
                onClick={() => deleteWord({ id })}
              >
                <TrashIcon className="w-4 h-4 mr-4" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="›"
        previousLabel="‹"
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        forcePage={page}
        containerClassName="flex items-center gap-2 my-4"
        pageClassName="list-none"
        previousClassName="list-none"
        nextClassName="list-none"
        breakClassName="list-none"
        activeClassName="active"
        disabledClassName="opacity-50 pointer-events-none"
        /* a */
        pageLinkClassName="block px-3 py-1 border rounded"
        previousLinkClassName="block px-3 py-1 border rounded"
        nextLinkClassName="block px-3 py-1 border rounded"
        breakLinkClassName="block px-3 py-1"
        activeLinkClassName="bg-blue-500 text-white"
      />

      <ToastContainer />
    </div>
  );
}
