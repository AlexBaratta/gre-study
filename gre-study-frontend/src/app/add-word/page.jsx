"use client";
import { useState } from "react";
import { instance } from "../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import log from "../utils/logger.js";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function AddWordPage() {
  const qc = useQueryClient();
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  const { mutate: addWord, isPending: loading } = useMutation({
    mutationFn: ({ word, definition }) =>
      instance.post("/add-new", { word, definition }).then((res) => res.data),
    onSuccess: () => {
      toast.success("Successfully added new word.");
      setWord("");
      setDefinition("");
      qc.invalidateQueries({ queryKey: ["words"] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          toast.error("That word already exists.");
          return;
        }
        const msg = err.response?.data?.message || err.message;
        toast.error(msg);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    const trimmedWord = word.trim();
    const trimmedDefinition = definition.trim();
    if (!trimmedWord || !trimmedDefinition) {
      toast.error("Please enter a word & definition.");
      return;
    }

    addWord({ word: trimmedWord, definition: trimmedDefinition });
  };

  return (
    <div>
      <h1 className="">Add a new word</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block">Word</label>
          <input
            id="word"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
            className="w-full border px-3"
          />
        </div>
        <div>
          <label>Definition</label>
          <input
            id="definition"
            type="text"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            className="w-full border px-3"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add new word"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
